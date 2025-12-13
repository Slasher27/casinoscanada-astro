// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			// MINIMALIST COLOR PALETTE
			// Primary: Slate (professional, clean)
			// Accent: Red (CTAs only)
			// Support: Green (success), Yellow (bonuses)
			colors: {
				// Primary brand colors (Slate family - consistent)
				primary: {
					50: '#f8fafc',   // Lightest backgrounds
					100: '#f1f5f9',  // Card hover states
					200: '#e2e8f0',  // Borders, dividers
					300: '#cbd5e1',  // Disabled states
					600: '#475569',  // Secondary text
					700: '#334155',  // Primary text (dark)
					900: '#0f172a',  // Headings, hero sections
				},
				// Accent color (Red - CTAs only)
				accent: {
					50: '#fef2f2',   // Light backgrounds
					100: '#fee2e2',  // Hover backgrounds
					600: '#dc2626',  // Primary CTAs
					700: '#b91c1c',  // CTA hover states
				},
				// Success indicators (Green)
				success: {
					50: '#f0fdf4',   // Light backgrounds
					100: '#dcfce7',  // Borders
					600: '#16a34a',  // Text, icons
					700: '#15803d',  // Hover states
				},
				// Bonus/Highlight (Yellow)
				bonus: {
					50: '#fefce8',   // Light backgrounds
					100: '#fef9c3',  // Borders
					400: '#facc15',  // Badges, highlights
					700: '#a16207',  // Dark text
				},
				// Info/Feature (Blue - minimal use)
				info: {
					50: '#eff6ff',   // Light backgrounds
					100: '#dbeafe',  // Borders
					600: '#2563eb',  // Links, info text
					700: '#1d4ed8',  // Hover states
				},
			},

			// SPACING SCALE (4px base for consistency)
			spacing: {
				// Card padding standard
				'card': '1.25rem',      // 20px (p-5 equivalent)
				'card-sm': '1rem',      // 16px (p-4 equivalent)
				'card-lg': '1.5rem',    // 24px (p-6 equivalent)
				// Button padding
				'btn-sm': '0.5rem',     // 8px
				'btn-md': '0.75rem',    // 12px
				'btn-lg': '1rem',       // 16px
				// Section spacing
				'section': '3rem',      // 48px
				'section-lg': '4rem',   // 64px
			},

			// BORDER RADIUS (Minimalist hierarchy)
			borderRadius: {
				'card': '0.75rem',      // 12px (rounded-xl for cards)
				'btn': '0.5rem',        // 8px (rounded-lg for secondary buttons)
				'btn-primary': '9999px', // rounded-full for primary CTAs
				'badge': '9999px',       // rounded-full for pills/badges
			},

			// SHADOW HIERARCHY (Minimal - only 3 levels)
			boxShadow: {
				'card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',           // shadow-sm (default card)
				'card-hover': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', // shadow-md (hover)
				'button': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',     // shadow-md (buttons)
			},

			// TYPOGRAPHY SCALE (Mobile-first with responsive scaling)
			fontSize: {
				// Hero headings (h1)
				'hero': ['2.25rem', { lineHeight: '2.5rem', fontWeight: '900' }],        // 36px mobile
				'hero-lg': ['3.75rem', { lineHeight: '1', fontWeight: '900' }],          // 60px desktop
				// Page headings (h1)
				'heading-1': ['1.875rem', { lineHeight: '2.25rem', fontWeight: '700' }], // 30px mobile
				'heading-1-lg': ['2.25rem', { lineHeight: '2.5rem', fontWeight: '700' }],// 36px desktop
				// Section headings (h2)
				'heading-2': ['1.5rem', { lineHeight: '2rem', fontWeight: '700' }],      // 24px
				'heading-2-lg': ['1.875rem', { lineHeight: '2.25rem', fontWeight: '700' }], // 30px desktop
				// Subsection headings (h3)
				'heading-3': ['1.25rem', { lineHeight: '1.75rem', fontWeight: '600' }],  // 20px
				'heading-3-lg': ['1.5rem', { lineHeight: '2rem', fontWeight: '600' }],   // 24px desktop
				// Card titles
				'card-title': ['1.125rem', { lineHeight: '1.75rem', fontWeight: '700' }], // 18px
				// Body text
				'body': ['1rem', { lineHeight: '1.75rem', fontWeight: '400' }],          // 16px
				'body-sm': ['0.875rem', { lineHeight: '1.5rem', fontWeight: '400' }],    // 14px
			},

			// CONTAINER PADDING (Mobile-responsive)
			container: {
				center: true,
				padding: {
					DEFAULT: '1rem',    // 16px mobile
					sm: '1.5rem',       // 24px tablet
					lg: '2rem',         // 32px desktop
				},
			},

			// TRANSITIONS (Smooth, minimalist)
			transitionDuration: {
				'default': '200ms',
			},
			transitionTimingFunction: {
				'default': 'cubic-bezier(0.4, 0, 0.2, 1)',
			},
		},
	},
	plugins: [
		typography(),
	],
};
