/**
 * Utility functions for formatting database values for display
 */

/**
 * Format payout speed from minutes to human-readable string
 * @param minutes - Payout speed in minutes
 * @returns Formatted string like "8 Minutes" or "2 Days"
 */
export function formatPayoutTime(minutes: number | null): string {
	if (!minutes) return 'Unknown';

	if (minutes < 60) {
		return `${minutes} ${minutes === 1 ? 'Minute' : 'Minutes'}`;
	}

	const hours = Math.floor(minutes / 60);
	if (hours < 24) {
		return `${hours} ${hours === 1 ? 'Hour' : 'Hours'}`;
	}

	const days = Math.floor(hours / 24);
	return `${days} ${days === 1 ? 'Day' : 'Days'}`;
}

/**
 * Format currency with proper CAD symbol
 * @param amount - Amount in dollars
 * @returns Formatted string like "$20 CAD"
 */
export function formatCurrency(amount: number | null): string {
	if (amount === null || amount === undefined) return 'N/A';
	return `$${amount.toLocaleString()} CAD`;
}

/**
 * Format wagering requirement as multiplier
 * @param wagering - Wagering multiplier (e.g., 40)
 * @returns Formatted string like "40x"
 */
export function formatWagering(wagering: number | null): string {
	if (!wagering) return 'N/A';
	return `${wagering}x`;
}

/**
 * Format rating with star emoji
 * @param rating - Rating value (1-5)
 * @returns Formatted string like "4.8 ★"
 */
export function formatRating(rating: number | null): string {
	if (!rating) return 'N/A';
	return `${rating.toFixed(1)} ★`;
}

/**
 * Format percentage
 * @param value - Percentage value (e.g., 96.5)
 * @returns Formatted string like "96.5%"
 */
export function formatPercentage(value: number | null): string {
	if (value === null || value === undefined) return 'N/A';
	return `${value.toFixed(1)}%`;
}
