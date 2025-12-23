# Database Layer Documentation

## Overview

The database layer provides a robust, type-safe interface for interacting with the SQLite database. It uses the `better-sqlite3` library and includes a custom `safeQuery` wrapper for consistent error handling and performance monitoring.

## Architecture

```
src/db/
├── client.ts        # Database connection and configuration
├── safeQuery.ts     # Safe query wrapper utilities
├── queries.ts       # All database query functions
├── seed.ts          # Database seeding script
└── README.md        # This file
```

## Safe Query Wrapper

The `safeQuery` wrapper provides three main functions:

### `safeQueryOne<T>()` - Single Row Queries

Use for SELECT queries that return **one row** (or undefined).

```typescript
import { safeQueryOne } from './safeQuery';
import { db } from './client';

export function getCasinoById(id: string): Casino | undefined {
  return safeQueryOne<Casino>(
    db,
    {
      queryName: 'getCasinoById',
      fallback: undefined,
      slowQueryThreshold: 100, // Optional: log if > 100ms
    },
    (db) => db.prepare('SELECT * FROM casinos WHERE id = ?').get(id) as Casino | undefined
  );
}
```

### `safeQueryAll<T>()` - Multiple Row Queries

Use for SELECT queries that return **multiple rows** (array).

```typescript
import { safeQueryAll } from './safeQuery';

export function getAllCasinos(): Casino[] {
  return safeQueryAll<Casino>(
    db,
    {
      queryName: 'getAllCasinos',
      fallback: [],
    },
    (db) => db.prepare('SELECT * FROM casinos ORDER BY name ASC').all() as Casino[]
  );
}
```

### `safeQueryRun()` - INSERT/UPDATE/DELETE Queries

Use for queries that **modify data**.

```typescript
import { safeQueryRun } from './safeQuery';

export function insertCasino(casino: Casino): Database.RunResult {
  return safeQueryRun(
    db,
    {
      queryName: 'insertCasino',
      fallback: { changes: 0, lastInsertRowid: 0 },
    },
    (db) => db.prepare('INSERT INTO casinos (...) VALUES (?)').run(casino)
  );
}
```

## Benefits

### 1. **Consistent Error Handling**
- All database errors are logged with context (query name, execution time)
- Queries never throw unhandled errors in production
- Fallback values prevent application crashes

### 2. **Performance Monitoring**
- Automatically logs slow queries (default: > 100ms)
- Helps identify performance bottlenecks
- Tracks query execution time

### 3. **Type Safety**
- TypeScript generics ensure correct return types
- Reduces runtime type errors
- Better IDE autocomplete

### 4. **SQL Injection Protection**
- Validates parameterized queries (basic heuristic)
- Detects suspicious SQL patterns
- Ensures parameter count matches placeholders

## Query Patterns

### Pattern 1: Simple Single-Row Query
```typescript
export function getPaymentMethodById(id: string): PaymentMethod | undefined {
  return safeQueryOne<PaymentMethod>(
    db,
    { queryName: 'getPaymentMethodById', fallback: undefined },
    (db) => db.prepare('SELECT * FROM payment_methods WHERE id = ?').get(id) as PaymentMethod | undefined
  );
}
```

### Pattern 2: Multi-Row Query with Parameters
```typescript
export function getTopCasinos(limit: number = 10): Casino[] {
  return safeQueryAll<Casino>(
    db,
    { queryName: 'getTopCasinos', fallback: [] },
    (db) => db.prepare('SELECT * FROM casinos ORDER BY payout_ratio DESC LIMIT ?').all(limit) as Casino[]
  );
}
```

### Pattern 3: Complex Query with Joins
```typescript
export function getCasinoPaymentMethods(casinoId: string): PaymentMethod[] {
  return safeQueryAll<PaymentMethod>(
    db,
    { queryName: 'getCasinoPaymentMethods', fallback: [] },
    (db) => db
      .prepare(`
        SELECT pm.*
        FROM payment_methods pm
        JOIN casino_payment_methods cpm ON pm.id = cpm.method_id
        WHERE cpm.casino_id = ?
      `)
      .all(casinoId) as PaymentMethod[]
  );
}
```

### Pattern 4: Dynamic Placeholders (IN clause)
```typescript
export function getPaymentMethodsForCasinos(casinoIds: string[]): PaymentMethodJoin[] {
  if (casinoIds.length === 0) return [];

  return safeQueryAll<PaymentMethodJoin>(
    db,
    { queryName: 'getPaymentMethodsForCasinos', fallback: [] },
    (db) => {
      const placeholders = casinoIds.map(() => '?').join(',');
      return db
        .prepare(`
          SELECT cpm.casino_id, pm.id, pm.name, pm.logo_url
          FROM casino_payment_methods cpm
          JOIN payment_methods pm ON cpm.method_id = pm.id
          WHERE cpm.casino_id IN (${placeholders})
        `)
        .all(...casinoIds) as PaymentMethodJoin[];
    }
  );
}
```

## Error Handling

### Production Behavior
By default, queries **return fallback values** on error:
- `safeQueryOne()` returns `undefined` or custom fallback
- `safeQueryAll()` returns `[]` or custom fallback
- Errors are logged to console with context

### Development/Testing Behavior
To throw errors instead of returning fallbacks:

```typescript
return safeQueryOne<Casino>(
  db,
  {
    queryName: 'getCasinoById',
    fallback: undefined,
    throwOnError: true, // ⚠️ Throws error instead of returning fallback
  },
  (db) => db.prepare('SELECT * FROM casinos WHERE id = ?').get(id) as Casino | undefined
);
```

## Performance Monitoring

### Slow Query Logging
Queries that exceed the threshold are automatically logged:

```
[SLOW QUERY] getCasinosWithRelations took 156.42ms (returned 10 rows)
```

**Default threshold**: 100ms
**Custom threshold**:
```typescript
return safeQueryAll<Casino>(
  db,
  {
    queryName: 'complexQuery',
    fallback: [],
    slowQueryThreshold: 500, // Only log if > 500ms
  },
  (db) => // ... query
);
```

### Error Logging
Failed queries are logged with full context:

```
[DB ERROR] getCasinoById failed after 5.21ms: Error: SQLITE_ERROR: no such table: casinos
```

## Migration Guide

### Converting Existing Queries

**Before** (old pattern):
```typescript
export function getCasinoById(id: string): Casino | undefined {
  try {
    return db.prepare('SELECT * FROM casinos WHERE id = ?').get(id) as Casino | undefined;
  } catch (error) {
    console.error(`Error fetching casino ${id}:`, error);
    return undefined;
  }
}
```

**After** (with safeQuery):
```typescript
export function getCasinoById(id: string): Casino | undefined {
  return safeQueryOne<Casino>(
    db,
    {
      queryName: 'getCasinoById',
      fallback: undefined,
    },
    (db) => db.prepare('SELECT * FROM casinos WHERE id = ?').get(id) as Casino | undefined
  );
}
```

### Benefits of Migration
✅ Consistent error handling
✅ Automatic performance monitoring
✅ Better logging with query names
✅ Reduced boilerplate code
✅ Easier testing (mock `safeQuery` instead of individual queries)

## Best Practices

### 1. Always Use Parameterized Queries
```typescript
// ✅ GOOD - Parameterized
db.prepare('SELECT * FROM casinos WHERE id = ?').get(casinoId)

// ❌ BAD - String concatenation (SQL injection risk)
db.prepare(`SELECT * FROM casinos WHERE id = '${casinoId}'`).get()
```

### 2. Name Queries Descriptively
```typescript
// ✅ GOOD - Clear what the query does
queryName: 'getCasinosByPaymentMethod'

// ❌ BAD - Generic or missing context
queryName: 'query1'
```

### 3. Choose Appropriate Fallback Values
```typescript
// ✅ GOOD - Type-appropriate fallbacks
safeQueryOne<Casino>(..., { fallback: undefined })
safeQueryAll<Casino[]>(..., { fallback: [] })

// ❌ BAD - Wrong type or null (can cause runtime errors)
safeQueryOne<Casino>(..., { fallback: null }) // Type error!
```

### 4. Early Return for Empty Arrays
```typescript
export function getPaymentMethodsForCasinos(casinoIds: string[]): PaymentMethod[] {
  // ✅ GOOD - Skip query if input is empty
  if (casinoIds.length === 0) return [];

  return safeQueryAll<PaymentMethod>(...);
}
```

## Testing

### Unit Testing with Mocks
```typescript
import { safeQueryOne } from '../db/safeQuery';

jest.mock('../db/safeQuery');

test('getCasinoById returns casino data', () => {
  (safeQueryOne as jest.Mock).mockReturnValue({ id: 'bitstarz', name: 'Bitstarz' });

  const casino = getCasinoById('bitstarz');
  expect(casino).toEqual({ id: 'bitstarz', name: 'Bitstarz' });
});
```

## Troubleshooting

### Issue: "Parameter count mismatch"
**Cause**: Number of `?` placeholders doesn't match parameters passed
**Solution**: Check your query and parameter count

```typescript
// ❌ BAD - 2 placeholders, 1 parameter
db.prepare('SELECT * FROM casinos WHERE id = ? AND status = ?').get(casinoId)

// ✅ GOOD - 2 placeholders, 2 parameters
db.prepare('SELECT * FROM casinos WHERE id = ? AND status = ?').get(casinoId, 'active')
```

### Issue: Slow queries in production
**Cause**: Missing indexes or inefficient JOINs
**Solution**:
1. Check console for `[SLOW QUERY]` logs
2. Add indexes to frequently queried columns
3. Optimize JOIN conditions

```sql
-- Add index for common lookups
CREATE INDEX idx_casino_payment_methods_casino_id ON casino_payment_methods(casino_id);
```

### Issue: Queries returning empty arrays unexpectedly
**Cause**: Query error being caught and returning fallback
**Solution**: Check console for `[DB ERROR]` logs, use `throwOnError: true` in development

## Security Notes

⚠️ **Always use parameterized queries** - Never concatenate user input into SQL
⚠️ **Validate input** - Check parameter types before passing to queries
⚠️ **Limit result sets** - Use `LIMIT` clauses to prevent memory issues
⚠️ **Sanitize dynamic identifiers** - If using dynamic table/column names, whitelist allowed values

## Performance Tips

1. **Use prepared statements** - Already done with `db.prepare()`
2. **Batch queries** - Fetch related data in bulk (see `getCasinosWithRelations`)
3. **Add indexes** - Index foreign keys and frequently queried columns
4. **Monitor slow queries** - Check logs and optimize queries > 100ms
5. **Use transactions** - For multiple INSERTs/UPDATEs (not yet implemented)

## Future Improvements

- [ ] Add transaction support (`safeTransaction` wrapper)
- [ ] Implement query result caching for static data
- [ ] Add query builder for complex dynamic queries
- [ ] Create migration system for schema changes
- [ ] Add connection pooling (if moving to client-server database)
