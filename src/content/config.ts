import { defineCollection, z } from 'astro:content';

const reviewsCollection = defineCollection({
	type: 'content',
	schema: z.object({
		// Core SEO Fields
		title: z.string(),
		metaDescription: z.string(),

		// Publishing Info
		pubDate: z.date(),
		updatedDate: z.date().optional(),
		author: z.string().default('Duwayne Cowney'),

		// Rating & ID
		rating: z.number().min(1).max(5),
		casinoId: z.string(),

		// MISSING FIELDS (Add these to fix the error):
		payoutTime: z.string(), // <--- This was missing
		wageringReq: z.number().optional(),
		minDeposit: z.number().optional(),

		// Rich Data for Schema
		pros: z.array(z.string()).optional(),
		cons: z.array(z.string()).optional(),
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
