/**
 * Safe Query Wrapper
 *
 * Provides consistent error handling, logging, and type safety for all database queries.
 * Prevents silent failures and provides visibility into database issues.
 */

import type Database from 'better-sqlite3';

/**
 * Query execution result
 */
export interface QueryResult<T> {
	success: boolean;
	data: T;
	error?: Error;
	queryTime?: number;
}

/**
 * Query options
 */
export interface QueryOptions {
	/** Query name for logging/debugging */
	queryName: string;
	/** Fallback value if query fails */
	fallback: unknown;
	/** Log slow queries above this threshold (ms) */
	slowQueryThreshold?: number;
	/** Whether to throw error instead of returning fallback */
	throwOnError?: boolean;
}

/**
 * Prepared statement wrapper for type-safe execution
 */
interface PreparedStatement<T> {
	get(...params: unknown[]): T | undefined;
	all(...params: unknown[]): T[];
	run(...params: unknown[]): Database.RunResult;
}

/**
 * Safe query executor for SELECT queries returning a single row
 *
 * @example
 * const result = safeQueryOne<Casino>(db, {
 *   queryName: 'getCasinoById',
 *   fallback: undefined,
 *   slowQueryThreshold: 100
 * }, (db) => db.prepare('SELECT * FROM casinos WHERE id = ?').get(casinoId));
 */
export function safeQueryOne<T>(
	db: Database.Database,
	options: QueryOptions,
	queryFn: (db: Database.Database) => T | undefined
): T | undefined {
	const startTime = performance.now();
	const { queryName, fallback, slowQueryThreshold = 100, throwOnError = false } = options;

	try {
		// Execute query
		const result = queryFn(db);
		const queryTime = performance.now() - startTime;

		// Log slow queries
		if (queryTime > slowQueryThreshold) {
			console.warn(`[SLOW QUERY] ${queryName} took ${queryTime.toFixed(2)}ms`);
		}

		return result;
	} catch (error) {
		const queryTime = performance.now() - startTime;

		// Log error with context
		console.error(`[DB ERROR] ${queryName} failed after ${queryTime.toFixed(2)}ms:`, error);

		// Re-throw or return fallback
		if (throwOnError) {
			throw new Error(`Database query '${queryName}' failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
		}

		return fallback as T | undefined;
	}
}

/**
 * Safe query executor for SELECT queries returning multiple rows
 *
 * @example
 * const casinos = safeQueryAll<Casino>(db, {
 *   queryName: 'getAllCasinos',
 *   fallback: [],
 * }, (db) => db.prepare('SELECT * FROM casinos').all());
 */
export function safeQueryAll<T>(
	db: Database.Database,
	options: QueryOptions,
	queryFn: (db: Database.Database) => T[]
): T[] {
	const startTime = performance.now();
	const { queryName, fallback, slowQueryThreshold = 100, throwOnError = false } = options;

	try {
		// Execute query
		const result = queryFn(db);
		const queryTime = performance.now() - startTime;

		// Log slow queries
		if (queryTime > slowQueryThreshold) {
			console.warn(
				`[SLOW QUERY] ${queryName} took ${queryTime.toFixed(2)}ms (returned ${result.length} rows)`
			);
		}

		return result;
	} catch (error) {
		const queryTime = performance.now() - startTime;

		// Log error with context
		console.error(`[DB ERROR] ${queryName} failed after ${queryTime.toFixed(2)}ms:`, error);

		// Re-throw or return fallback
		if (throwOnError) {
			throw new Error(`Database query '${queryName}' failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
		}

		return fallback as T[];
	}
}

/**
 * Safe query executor for INSERT/UPDATE/DELETE operations
 *
 * @example
 * const result = safeQueryRun(db, {
 *   queryName: 'insertCasino',
 *   fallback: { changes: 0, lastInsertRowid: 0 },
 * }, (db) => db.prepare('INSERT INTO casinos (...) VALUES (?)').run(values));
 */
export function safeQueryRun(
	db: Database.Database,
	options: QueryOptions,
	queryFn: (db: Database.Database) => Database.RunResult
): Database.RunResult {
	const startTime = performance.now();
	const { queryName, fallback, slowQueryThreshold = 100, throwOnError = false } = options;

	try {
		// Execute query
		const result = queryFn(db);
		const queryTime = performance.now() - startTime;

		// Log slow queries
		if (queryTime > slowQueryThreshold) {
			console.warn(
				`[SLOW QUERY] ${queryName} took ${queryTime.toFixed(2)}ms (${result.changes} changes)`
			);
		}

		return result;
	} catch (error) {
		const queryTime = performance.now() - startTime;

		// Log error with context
		console.error(`[DB ERROR] ${queryName} failed after ${queryTime.toFixed(2)}ms:`, error);

		// Re-throw or return fallback
		if (throwOnError) {
			throw new Error(`Database query '${queryName}' failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
		}

		return fallback as Database.RunResult;
	}
}

/**
 * Validate that a query uses parameterized statements (basic check)
 * This is a simple heuristic - real validation happens in better-sqlite3
 *
 * @throws Error if query appears to have SQL injection risk
 */
export function validateParameterizedQuery(sql: string, params: unknown[]): void {
	// Check for common SQL injection patterns (basic heuristic)
	const suspiciousPatterns = [
		/['"]\s*OR\s+/i, // ' OR
		/['"]\s*AND\s+/i, // ' AND
		/;\s*DROP\s+/i, // ; DROP
		/;\s*DELETE\s+/i, // ; DELETE
		/UNION\s+SELECT/i, // UNION SELECT
		/--/, // SQL comments
	];

	for (const pattern of suspiciousPatterns) {
		if (pattern.test(sql)) {
			console.warn('[SECURITY WARNING] Potentially unsafe SQL pattern detected:', sql);
		}
	}

	// Ensure placeholders match param count (basic check)
	const placeholderCount = (sql.match(/\?/g) || []).length;
	if (placeholderCount !== params.length) {
		throw new Error(
			`Parameter count mismatch: SQL has ${placeholderCount} placeholders, but ${params.length} parameters provided`
		);
	}
}
