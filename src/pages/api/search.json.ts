import type { APIRoute } from 'astro';
import { db } from '../../db/client';

export const GET: APIRoute = async () => {
	// 1. Fetch Casinos
	const casinos = db.prepare('SELECT name, id FROM casinos').all() as any[];

	// 2. Fetch Slots
	const slots = db
		.prepare('SELECT title, slug, provider_id FROM slots')
		.all() as any[];

	// 3. Fetch Payments
	const payments = db
		.prepare('SELECT name, id FROM payment_methods')
		.all() as any[];

	// 4. Transform into a unified index
	const searchIndex = [
		// Core Static Pages
		{ title: 'Home', type: 'Page', url: '/' },
		{ title: 'Casino Reviews', type: 'Page', url: '/reviews' },
		{ title: 'Free Slots', type: 'Page', url: '/slots' },
		{ title: 'Banking Methods', type: 'Page', url: '/banking' },
		{ title: 'Bonuses', type: 'Page', url: '/bonuses' },

		// Casinos
		...casinos.map((c) => ({
			title: c.name,
			type: 'Casino',
			url: `/reviews/${c.id}`, // Note: ID implies path here, check layout logic if slug is preferred
		})),

		// Slots
		...slots.map((s) => ({
			title: s.title,
			type: 'Slot',
			url: `/slots/${s.slug}`,
		})),

		// Payments
		...payments.map((p) => ({
			title: p.name,
			type: 'Banking',
			url: `/banking/${p.id}`,
		})),
	];

	return new Response(JSON.stringify(searchIndex), {
		headers: {
			'Content-Type': 'application/json',
		},
	});
};
