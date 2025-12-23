import { defineCollection, z } from 'astro:content';

const reviewsCollection = defineCollection({
	type: 'content',
	schema: z.object({
		// Core SEO Fields
		title: z.string(),
		metaDescription: z.string(),
		casinoCardText: z
			.string()
			.default('Casino Card Description Text Still Coming'),

		// Publishing Info
		pubDate: z.date(),
		updatedDate: z.date().optional(),
		author: z.string().default('Duwayne Cowney'),

		// Casino Identification
		casinoId: z.string(),
		name: z.string(),
		website: z.string().url(),

		// Basic Info
		established: z.number(),
		license: z.string(),
		owner: z.string().optional(),

		// Performance Metrics
		withdrawal_speed: z.number(), // in minutes
		rtp: z.number().default(96.5),
		rating: z.number().min(1).max(5),

		// Visual Assets
		theme_color: z.string().default('#000000'),
		logo: z.string(),
		thumbnail: z.string(),

		// Bonus Information
		bonus_offer: z.string(),
		bonus_spins: z.number().default(0),
		min_deposit: z.number(),
		wagering: z.number(),

		// Feature Flags
		sports_betting: z.boolean().default(false),
		poker: z.boolean().default(false),
		live_casino: z.boolean().default(false),
		mobile_app: z.boolean().default(false),

		// Review Content
		pros: z.array(z.string()),
		cons: z.array(z.string()),

		// Relationships (arrays of IDs)
		payment_methods: z.array(z.string()),
		software_providers: z.array(z.string()),

		// Recommendations (optional)
		recommended_for: z
			.array(
				z.object({
					type: z.string(), // 'payment', 'game', 'feature'
					context: z.string(), // 'bitcoin', 'starburst', 'mobile'
					reason: z.string(),
					priority: z.number().default(1),
				})
			)
			.optional(),
	}),
});

// NEW: Schema for Guides
const guidesCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		metaDescription: z.string(),
		pubDate: z.date(),
		updatedDate: z.date().optional(),
		author: z.string().default('Casinos Canada Team'),
		// Optional: category to group guides later (e.g., 'Banking', 'Strategy')
		category: z.string().optional(),
	}),
});

// NEW: Schema for Banking Guides
const bankingCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		metaDescription: z.string(),
		pubDate: z.date(),
		updatedDate: z.date().optional(),
		author: z.string().default('Casinos Canada Team'),
		paymentId: z.string(), // Links to SQLite ID
	}),
});

// Export all collections
export const collections = {
	reviews: reviewsCollection,
	guides: guidesCollection,
	banking: bankingCollection,
};
