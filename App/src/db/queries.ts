/**
 * Database Query Helpers
 *
 * Reusable, type-safe database query functions.
 * Eliminates SQL duplication and provides a consistent API for data access.
 */

import { db } from './client';
import { safeQueryOne, safeQueryAll } from './safeQuery';
import type {
	Casino,
	CasinoWithRelations,
	CasinoWithPayments,
	CasinoWithSoftware,
	CasinoPaymentJoin,
	CasinoSoftwareJoin,
	Slot,
	SlotWithProvider,
	PaymentMethod,
	SoftwareProvider,
} from '../types/database';

// ========================================
// CASINO QUERIES
// ========================================

/**
 * Get a single casino by ID
 */
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

/**
 * Get all casinos
 */
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

/**
 * Get top N casinos by payout ratio
 */
export function getTopCasinos(limit: number = 10): Casino[] {
	return safeQueryAll<Casino>(
		db,
		{
			queryName: 'getTopCasinos',
			fallback: [],
		},
		(db) => db.prepare('SELECT * FROM casinos ORDER BY payout_ratio DESC LIMIT ?').all(limit) as Casino[]
	);
}

// ========================================
// PAYMENT METHOD QUERIES
// ========================================

/**
 * Get all payment methods for a casino
 */
export function getCasinoPaymentMethods(casinoId: string): PaymentMethod[] {
	return safeQueryAll<PaymentMethod>(
		db,
		{
			queryName: 'getCasinoPaymentMethods',
			fallback: [],
		},
		(db) =>
			db
				.prepare(
					`
			SELECT pm.*
			FROM payment_methods pm
			JOIN casino_payment_methods cpm ON pm.id = cpm.method_id
			WHERE cpm.casino_id = ?
		`
				)
				.all(casinoId) as PaymentMethod[]
	);
}

/**
 * Get payment methods for multiple casinos (with casino_id)
 * Returns array of payment methods with casino_id attached
 */
export function getPaymentMethodsForCasinos(
	casinoIds: string[]
): (CasinoPaymentJoin & { min_deposit: number | null })[] {
	if (casinoIds.length === 0) return [];

	return safeQueryAll<CasinoPaymentJoin & { min_deposit: number | null }>(
		db,
		{
			queryName: 'getPaymentMethodsForCasinos',
			fallback: [],
		},
		(db) => {
			const placeholders = casinoIds.map(() => '?').join(',');
			return db
				.prepare(
					`
			SELECT cpm.casino_id, pm.id, pm.name, pm.logo_url, pm.min_deposit
			FROM casino_payment_methods cpm
			JOIN payment_methods pm ON cpm.method_id = pm.id
			WHERE cpm.casino_id IN (${placeholders})
		`
				)
				.all(...casinoIds) as (CasinoPaymentJoin & { min_deposit: number | null })[];
		}
	);
}

/**
 * Get the payment method with lowest min_deposit for a casino
 */
export function getLowestDepositMethod(
	casinoId: string
): { name: string; min_deposit: number | null } | undefined {
	return safeQueryOne<{ name: string; min_deposit: number | null }>(
		db,
		{
			queryName: 'getLowestDepositMethod',
			fallback: undefined,
		},
		(db) =>
			db
				.prepare(
					`
			SELECT pm.name, pm.min_deposit
			FROM payment_methods pm
			JOIN casino_payment_methods cpm ON pm.id = cpm.method_id
			WHERE cpm.casino_id = ?
			AND pm.min_deposit IS NOT NULL
			ORDER BY pm.min_deposit ASC
			LIMIT 1
		`
				)
				.get(casinoId) as { name: string; min_deposit: number | null } | undefined
	);
}

/**
 * Get all payment methods
 */
export function getAllPaymentMethods(): PaymentMethod[] {
	return safeQueryAll<PaymentMethod>(
		db,
		{
			queryName: 'getAllPaymentMethods',
			fallback: [],
		},
		(db) => db.prepare('SELECT * FROM payment_methods ORDER BY name ASC').all() as PaymentMethod[]
	);
}

/**
 * Get a single payment method by ID
 */
export function getPaymentMethodById(id: string): PaymentMethod | undefined {
	return safeQueryOne<PaymentMethod>(
		db,
		{
			queryName: 'getPaymentMethodById',
			fallback: undefined,
		},
		(db) =>
			db.prepare('SELECT * FROM payment_methods WHERE id = ?').get(id) as
				| PaymentMethod
				| undefined
	);
}

// ========================================
// SOFTWARE PROVIDER QUERIES
// ========================================

/**
 * Get all software providers for a casino
 */
export function getCasinoSoftwareProviders(casinoId: string): SoftwareProvider[] {
	return safeQueryAll<SoftwareProvider>(
		db,
		{
			queryName: 'getCasinoSoftwareProviders',
			fallback: [],
		},
		(db) =>
			db
				.prepare(
					`
			SELECT sp.*
			FROM software_providers sp
			JOIN casino_software cs ON sp.id = cs.provider_id
			WHERE cs.casino_id = ?
		`
				)
				.all(casinoId) as SoftwareProvider[]
	);
}

/**
 * Get software providers for multiple casinos (with casino_id)
 */
export function getSoftwareProvidersForCasinos(casinoIds: string[]): CasinoSoftwareJoin[] {
	if (casinoIds.length === 0) return [];

	return safeQueryAll<CasinoSoftwareJoin>(
		db,
		{
			queryName: 'getSoftwareProvidersForCasinos',
			fallback: [],
		},
		(db) => {
			const placeholders = casinoIds.map(() => '?').join(',');
			return db
				.prepare(
					`
			SELECT cs.casino_id, sp.id, sp.name, sp.logo_url
			FROM casino_software cs
			JOIN software_providers sp ON cs.provider_id = sp.id
			WHERE cs.casino_id IN (${placeholders})
		`
				)
				.all(...casinoIds) as CasinoSoftwareJoin[];
		}
	);
}

/**
 * Get all software providers
 */
export function getAllSoftwareProviders(): SoftwareProvider[] {
	return safeQueryAll<SoftwareProvider>(
		db,
		{
			queryName: 'getAllSoftwareProviders',
			fallback: [],
		},
		(db) =>
			db.prepare('SELECT * FROM software_providers ORDER BY name ASC').all() as SoftwareProvider[]
	);
}

/**
 * Get a single software provider by ID
 */
export function getSoftwareProviderById(id: string): SoftwareProvider | undefined {
	return safeQueryOne<SoftwareProvider>(
		db,
		{
			queryName: 'getSoftwareProviderById',
			fallback: undefined,
		},
		(db) =>
			db.prepare('SELECT * FROM software_providers WHERE id = ?').get(id) as
				| SoftwareProvider
				| undefined
	);
}

/**
 * Get casinos that use a specific software provider
 */
export function getCasinosBySoftwareProvider(providerId: string, limit: number = 10): Casino[] {
	return safeQueryAll<Casino>(
		db,
		{
			queryName: 'getCasinosBySoftwareProvider',
			fallback: [],
		},
		(db) =>
			db
				.prepare(
					`
			SELECT c.*
			FROM casinos c
			JOIN casino_software cs ON c.id = cs.casino_id
			WHERE cs.provider_id = ?
			LIMIT ?
		`
				)
				.all(providerId, limit) as Casino[]
	);
}

// ========================================
// SLOT QUERIES
// ========================================

/**
 * Get all slots
 */
export function getAllSlots(): Slot[] {
	return safeQueryAll<Slot>(
		db,
		{
			queryName: 'getAllSlots',
			fallback: [],
		},
		(db) => db.prepare('SELECT * FROM slots ORDER BY title ASC').all() as Slot[]
	);
}

/**
 * Get a single slot by slug
 */
export function getSlotBySlug(slug: string): Slot | undefined {
	return safeQueryOne<Slot>(
		db,
		{
			queryName: 'getSlotBySlug',
			fallback: undefined,
		},
		(db) => db.prepare('SELECT * FROM slots WHERE slug = ?').get(slug) as Slot | undefined
	);
}

/**
 * Get featured slots
 */
export function getFeaturedSlots(limit: number = 10): Slot[] {
	return safeQueryAll<Slot>(
		db,
		{
			queryName: 'getFeaturedSlots',
			fallback: [],
		},
		(db) =>
			db
				.prepare('SELECT * FROM slots WHERE featured = 1 ORDER BY title ASC LIMIT ?')
				.all(limit) as Slot[]
	);
}

/**
 * Get slots by software provider
 */
export function getSlotsByProvider(providerId: string): Slot[] {
	return safeQueryAll<Slot>(
		db,
		{
			queryName: 'getSlotsByProvider',
			fallback: [],
		},
		(db) =>
			db
				.prepare('SELECT * FROM slots WHERE provider_id = ? ORDER BY title ASC')
				.all(providerId) as Slot[]
	);
}

/**
 * Get slot with provider information
 */
export function getSlotWithProvider(slug: string): SlotWithProvider | undefined {
	return safeQueryOne<SlotWithProvider>(
		db,
		{
			queryName: 'getSlotWithProvider',
			fallback: undefined,
		},
		(db) =>
			db
				.prepare(
					`
			SELECT
				s.*,
				sp.name as provider_name,
				sp.logo_url as provider_logo_url
			FROM slots s
			LEFT JOIN software_providers sp ON s.provider_id = sp.id
			WHERE s.slug = ?
		`
				)
				.get(slug) as SlotWithProvider | undefined
	);
}

// ========================================
// ENRICHED CASINO QUERIES
// ========================================

/**
 * Get a casino with all its payment methods
 */
export function getCasinoWithPayments(casinoId: string): CasinoWithPayments | undefined {
	const casino = getCasinoById(casinoId);
	if (!casino) return undefined;

	const payments = getCasinoPaymentMethods(casinoId);

	return {
		...casino,
		payments,
	};
}

/**
 * Get a casino with all its software providers
 */
export function getCasinoWithSoftware(casinoId: string): CasinoWithSoftware | undefined {
	const casino = getCasinoById(casinoId);
	if (!casino) return undefined;

	const software = getCasinoSoftwareProviders(casinoId);

	return {
		...casino,
		software,
	};
}

/**
 * Get a casino with all relationships (payments + software)
 */
export function getCasinoWithRelations(casinoId: string): CasinoWithRelations | undefined {
	const casino = getCasinoById(casinoId);
	if (!casino) return undefined;

	const payments = getCasinoPaymentMethods(casinoId);
	const software = getCasinoSoftwareProviders(casinoId);

	return {
		...casino,
		payments,
		software,
	};
}

/**
 * Get multiple casinos with all their relationships
 * More efficient than calling getCasinoWithRelations in a loop
 */
export function getCasinosWithRelations(casinoIds: string[]): CasinoWithRelations[] {
	if (casinoIds.length === 0) return [];

	return safeQueryAll<Casino>(
		db,
		{
			queryName: 'getCasinosWithRelations',
			fallback: [],
		},
		(db) => {
			const casinos = db
				.prepare(
					`SELECT * FROM casinos WHERE id IN (${casinoIds.map(() => '?').join(',')}) ORDER BY name ASC`
				)
				.all(...casinoIds) as Casino[];

			// Fetch all relations in bulk
			const allPayments = getPaymentMethodsForCasinos(casinoIds);
			const allSoftware = getSoftwareProvidersForCasinos(casinoIds);

			// Enrich each casino with its relations
			return casinos.map((casino) => ({
				...casino,
				payments: allPayments.filter((p) => p.casino_id === casino.id),
				software: allSoftware.filter((s) => s.casino_id === casino.id),
			}));
		}
	) as CasinoWithRelations[];
}

/**
 * Get casinos that accept a specific payment method
 */
export function getCasinosByPaymentMethod(
	methodId: string,
	limit: number = 10
): Pick<Casino, 'id' | 'name' | 'logo_url' | 'bonus_offer' | 'payout_speed_minutes'>[] {
	return safeQueryAll<Pick<Casino, 'id' | 'name' | 'logo_url' | 'bonus_offer' | 'payout_speed_minutes'>>(
		db,
		{
			queryName: 'getCasinosByPaymentMethod',
			fallback: [],
		},
		(db) =>
			db
				.prepare(
					`
			SELECT c.id, c.name, c.logo_url, c.bonus_offer, c.payout_speed_minutes
			FROM casinos c
			JOIN casino_payment_methods cpm ON c.id = cpm.casino_id
			WHERE cpm.method_id = ?
			LIMIT ?
		`
				)
				.all(methodId, limit) as Pick<
				Casino,
				'id' | 'name' | 'logo_url' | 'bonus_offer' | 'payout_speed_minutes'
			>[]
	);
}

// ========================================
// SEARCH & UTILITY QUERIES
// ========================================

/**
 * Get search index data for all entities
 */
export function getSearchIndex() {
	const casinos = safeQueryAll<{ id: string; name: string }>(
		db,
		{
			queryName: 'getSearchIndex:casinos',
			fallback: [],
		},
		(db) =>
			db.prepare('SELECT id, name FROM casinos').all() as {
				id: string;
				name: string;
			}[]
	);

	const slots = safeQueryAll<{ slug: string; title: string }>(
		db,
		{
			queryName: 'getSearchIndex:slots',
			fallback: [],
		},
		(db) =>
			db.prepare('SELECT slug, title FROM slots').all() as {
				slug: string;
				title: string;
			}[]
	);

	const payments = safeQueryAll<{ id: string; name: string }>(
		db,
		{
			queryName: 'getSearchIndex:payments',
			fallback: [],
		},
		(db) =>
			db.prepare('SELECT id, name FROM payment_methods').all() as {
				id: string;
				name: string;
			}[]
	);

	return {
		casinos,
		slots,
		payments,
	};
}

/**
 * Get software providers with game counts
 */
export function getSoftwareProvidersWithCounts(): (SoftwareProvider & { game_count: number })[] {
	return safeQueryAll<SoftwareProvider & { game_count: number }>(
		db,
		{
			queryName: 'getSoftwareProvidersWithCounts',
			fallback: [],
		},
		(db) =>
			db
				.prepare(
					`
			SELECT sp.id, sp.name, sp.logo_url, COUNT(s.slug) as game_count
			FROM software_providers sp
			LEFT JOIN slots s ON sp.id = s.provider_id
			GROUP BY sp.id
			ORDER BY game_count DESC
		`
				)
				.all() as (SoftwareProvider & { game_count: number })[]
	);
}

// ========================================
// HELPER FUNCTIONS
// ========================================

/**
 * Calculate minimum deposit from payment methods
 */
export function calculateMinDeposit(
	payments: (CasinoPaymentJoin & { min_deposit: number | null })[],
	defaultValue: number = 20
): number {
	const validDeposits = payments
		.map((p) => p.min_deposit)
		.filter((d): d is number => d !== null && d > 0);

	return validDeposits.length > 0 ? Math.min(...validDeposits) : defaultValue;
}

/**
 * Group items by casino_id (for join results)
 */
export function groupByCasinoId<T extends { casino_id: string }>(
	items: T[],
	casinoId: string
): T[] {
	return items.filter((item) => item.casino_id === casinoId);
}
