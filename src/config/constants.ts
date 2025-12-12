/**
 * Site Configuration Constants
 *
 * Centralized configuration for site-wide values, URLs, and magic numbers.
 * Makes the codebase easier to maintain and update.
 */

// ========================================
// SITE METADATA
// ========================================

export const SITE_NAME = 'Casinos Canada';
export const SITE_URL = 'https://casinoscanada.online';
export const SITE_DESCRIPTION =
	'Independent reviews of online casinos for Canadian players. We test payout speeds, bonuses, and game fairness.';

// Social Media (add when available)
export const SOCIAL_MEDIA = {
	// twitter: 'https://twitter.com/casinoscanada',
	// facebook: 'https://facebook.com/casinoscanada',
	// instagram: 'https://instagram.com/casinoscanada',
};

export const CONTACT = {
	areaServed: 'CA',
	availableLanguage: ['English'],
	contactType: 'Customer Service',
};

// ========================================
// AUTHOR INFORMATION
// ========================================

export const DEFAULT_AUTHOR = 'Duwayne Cowney';
export const TEAM_AUTHOR = 'Casinos Canada Team';

// ========================================
// DEFAULT VALUES
// ========================================

export const DEFAULT_MIN_DEPOSIT = 20; // Default minimum deposit in CAD
export const DEFAULT_CASINO_LIMIT = 10; // Default number of casinos to show
export const DEFAULT_SLOTS_LIMIT = 10; // Default number of slots to show
export const FEATURED_CASINOS_HOMEPAGE = 10; // Number of casinos on homepage

// ========================================
// PAGINATION & LIMITS
// ========================================

export const RESULTS_PER_PAGE = 12; // Results per page for listings
export const RELATED_ITEMS_LIMIT = 5; // Number of related items in sidebar
export const TOP_PROVIDERS_LIMIT = 8; // Top software providers to show
export const RECENT_REVIEWS_LIMIT = 3; // Recent reviews on homepage

// ========================================
// IMAGE PATHS
// ========================================

export const DEFAULT_OG_IMAGE = '/images/social-share-default.svg';
export const FAVICON_PATH = '/favicon.svg';

export const IMAGE_PATHS = {
	casinos: '/images/casinos',
	slots: '/images/slots',
	payments: '/images/payments',
	software: '/images/software',
	placeholders: '/images/placeholders',
};

export const FALLBACK_IMAGES = {
	casino: `${IMAGE_PATHS.placeholders}/casino-placeholder.png`,
	slot: `${IMAGE_PATHS.placeholders}/slot-placeholder.png`,
	payment: `${IMAGE_PATHS.placeholders}/payment-placeholder.png`,
	software: `${IMAGE_PATHS.placeholders}/software-placeholder.png`,
};

// ========================================
// RATING THRESHOLDS
// ========================================

export const RATING_THRESHOLDS = {
	excellent: 4.5, // 4.5+ stars
	good: 4.0, // 4.0-4.4 stars
	average: 3.0, // 3.0-3.9 stars
	poor: 2.0, // 2.0-2.9 stars
	// Below 2.0 = very poor
};

// ========================================
// PAYOUT SPEED CATEGORIES (in minutes)
// ========================================

export const PAYOUT_SPEED = {
	instant: 10, // 0-10 minutes
	fast: 60, // 11-60 minutes
	moderate: 240, // 1-4 hours
	slow: 1440, // 4-24 hours
	// Above 1440 = very slow
};

// ========================================
// VOLATILITY LEVELS
// ========================================

export const VOLATILITY = {
	low: 'Low',
	medium: 'Medium',
	high: 'High',
	veryHigh: 'Very High',
} as const;

// ========================================
// PAYMENT METHOD TYPES
// ========================================

export const PAYMENT_TYPES = {
	card: 'Card',
	bankTransfer: 'Bank Transfer',
	eWallet: 'E-Wallet',
	crypto: 'Crypto',
	prepaid: 'Prepaid',
} as const;

// ========================================
// LICENSE JURISDICTIONS
// ========================================

export const LICENSE_JURISDICTIONS = {
	mga: 'MGA', // Malta Gaming Authority
	ukgc: 'UKGC', // UK Gambling Commission
	curacao: 'Curacao',
	kahnawake: 'Kahnawake',
	gibraltar: 'Gibraltar',
} as const;

// ========================================
// CURRENCY
// ========================================

export const CURRENCY = {
	code: 'CAD',
	symbol: '$',
	name: 'Canadian Dollar',
};

// ========================================
// DATE FORMATS
// ========================================

export const DATE_FORMATS = {
	long: 'MMMM DD, YYYY', // January 01, 2025
	short: 'MMM DD, YYYY', // Jan 01, 2025
	iso: 'YYYY-MM-DD', // 2025-01-01
};

// ========================================
// BONUS TYPES
// ========================================

export const BONUS_TYPES = {
	welcome: 'Welcome Bonus',
	noDeposit: 'No Deposit Bonus',
	freeSpins: 'Free Spins',
	reload: 'Reload Bonus',
	cashback: 'Cashback',
	vip: 'VIP Bonus',
} as const;

// ========================================
// FEATURE FLAGS
// ========================================

export const FEATURES = {
	enableComparison: true, // Enable casino comparison tool
	enableSearch: true, // Enable global search
	enableFilters: true, // Enable filtering on listing pages
	enableReviews: true, // Enable review system
	enableNewsletter: false, // Newsletter signup (not implemented yet)
	enableComments: false, // User comments (not implemented yet)
};

// ========================================
// API ENDPOINTS
// ========================================

export const API_ENDPOINTS = {
	search: '/api/search.json',
	// Add more API endpoints as needed
};

// ========================================
// EXTERNAL LINKS
// ========================================

export const EXTERNAL_LINKS = {
	github: 'https://github.com/anthropics/claude-code/issues',
	documentation: '/docs',
};

// ========================================
// SITEMAPS & SEO
// ========================================

export const SEO = {
	titleSuffix: ' | Casinos Canada',
	defaultImage: DEFAULT_OG_IMAGE,
	twitterCard: 'summary_large_image',
	locale: 'en_CA',
};

// ========================================
// HELPER FUNCTIONS
// ========================================

/**
 * Build full URL from path
 */
export function buildUrl(path: string): string {
	return `${SITE_URL}${path}`;
}

/**
 * Format currency
 */
export function formatCurrency(amount: number): string {
	return `${CURRENCY.symbol}${amount.toLocaleString('en-CA')}`;
}

/**
 * Get rating label from score
 */
export function getRatingLabel(rating: number): string {
	if (rating >= RATING_THRESHOLDS.excellent) return 'Excellent';
	if (rating >= RATING_THRESHOLDS.good) return 'Good';
	if (rating >= RATING_THRESHOLDS.average) return 'Average';
	if (rating >= RATING_THRESHOLDS.poor) return 'Poor';
	return 'Very Poor';
}

/**
 * Get payout speed label from minutes
 */
export function getPayoutSpeedLabel(minutes: number): string {
	if (minutes <= PAYOUT_SPEED.instant) return 'Instant';
	if (minutes <= PAYOUT_SPEED.fast) return 'Fast';
	if (minutes <= PAYOUT_SPEED.moderate) return 'Moderate';
	if (minutes <= PAYOUT_SPEED.slow) return 'Slow';
	return 'Very Slow';
}
