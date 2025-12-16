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

		// Casino Link (All other data comes from DB)
		casinoId: z.string(),

		// NOTE: rating, minDeposit, wageringReq, payoutTime, pros, cons
		// are now stored in the database and fetched via casinoId.
		// This eliminates data duplication and ensures consistency.
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
