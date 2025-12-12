/**
 * Database Type Definitions
 *
 * These types match the SQLite schema defined in src/db/schema.sql
 * Use these types instead of 'as any' to ensure type safety across the application.
 */

/**
 * Casino entity from the casinos table
 */
export interface Casino {
  id: string;
  name: string;
  website_url: string | null;
  established: number | null;
  license: string | null;
  owner: string | null;
  payout_speed_minutes: number | null;
  payout_ratio: number | null;
  theme_color: string | null;
  logo_url: string | null;
  thumbnail_url: string | null;
  bonus_offer: string | null;
  bonus_spins: number | null;
}

/**
 * Software provider entity from the software_providers table
 */
export interface SoftwareProvider {
  id: string;
  name: string;
  logo_url: string | null;
}

/**
 * Junction table record for casino-software relationship
 */
export interface CasinoSoftware {
  casino_id: string;
  provider_id: string;
}

/**
 * Slot game entity from the slots table
 */
export interface Slot {
  slug: string;
  title: string;
  provider_id: string | null;
  rtp: number | null;
  volatility: string | null;
  max_win: string | null;
  paylines: string | null;
  release_date: string | null;
  description: string | null;
  image_url: string | null;
  featured: number; // 0 = false, 1 = true
  min_bet: number | null;
  max_bet: number | null;
  layout: string | null;
  features: string | null; // JSON array string e.g., '["Free Spins", "Wilds"]'
}

/**
 * Payment method entity from the payment_methods table
 */
export interface PaymentMethod {
  id: string;
  name: string;
  logo_url: string | null;
  description: string | null;
  type: string | null;
  avg_speed: string | null;
  fees: string | null;
  min_deposit: number | null;
  max_withdrawal: number | null;
  pros: string | null; // JSON array string
  cons: string | null; // JSON array string
}

/**
 * Junction table record for casino-payment method relationship
 */
export interface CasinoPaymentMethod {
  casino_id: string;
  method_id: string;
}

// ===========================
// Enriched/Extended Types
// ===========================

/**
 * Casino with related payment methods
 */
export interface CasinoWithPayments extends Casino {
  payments: PaymentMethod[];
}

/**
 * Casino with related software providers
 */
export interface CasinoWithSoftware extends Casino {
  software: SoftwareProvider[];
}

/**
 * Casino with all relationships (payments + software)
 */
export interface CasinoWithRelations extends Casino {
  payments: PaymentMethod[];
  software: SoftwareProvider[];
}

/**
 * Slot with provider information
 */
export interface SlotWithProvider extends Slot {
  provider?: SoftwareProvider;
  provider_name?: string;
  provider_logo_url?: string;
}

/**
 * Payment method with parsed pros/cons arrays
 */
export interface PaymentMethodParsed extends Omit<PaymentMethod, 'pros' | 'cons'> {
  pros: string[];
  cons: string[];
}

/**
 * Slot with parsed features array
 */
export interface SlotParsed extends Omit<Slot, 'features'> {
  features: string[];
}

// ===========================
// Query Result Types
// ===========================

/**
 * Result from joining casino_payment_methods with payment_methods
 */
export interface CasinoPaymentJoin extends PaymentMethod {
  casino_id: string;
}

/**
 * Result from joining casino_software with software_providers
 */
export interface CasinoSoftwareJoin extends SoftwareProvider {
  casino_id: string;
}

/**
 * Result from joining slots with software_providers
 */
export interface SlotProviderJoin extends Slot {
  provider_name: string;
  provider_logo_url: string;
}

// ===========================
// Helper Types
// ===========================

/**
 * Generic database row type for unknown queries
 */
export type DatabaseRow = Record<string, unknown>;

/**
 * Type guard to check if a value is a Casino
 */
export function isCasino(value: unknown): value is Casino {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value
  );
}

/**
 * Type guard to check if a value is a Slot
 */
export function isSlot(value: unknown): value is Slot {
  return (
    typeof value === 'object' &&
    value !== null &&
    'slug' in value &&
    'title' in value
  );
}

/**
 * Parse JSON string safely with fallback
 */
export function parseJsonField<T = string[]>(jsonString: string | null, fallback: T = [] as T): T {
  if (!jsonString) return fallback;
  try {
    return JSON.parse(jsonString) as T;
  } catch {
    return fallback;
  }
}
