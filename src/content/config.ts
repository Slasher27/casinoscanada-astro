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

// Export both collections

export const collections = {
	reviews: reviewsCollection,
	guides: guidesCollection,
};
