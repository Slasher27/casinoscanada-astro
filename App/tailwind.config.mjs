// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
	darkMode: 'class', // Enable class-based dark mode
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			// PREMIUM "WOW" COLOR PALETTE
			colors: {
				// Base Greys (Slate) - Kept for structure
				primary: {
					50: '#f8fafc',
					100: '#f1f5f9',
					200: '#e2e8f0',
					300: '#cbd5e1',
					400: '#94a3b8',
					500: '#64748b',
					600: '#475569',
					700: '#334155',
					800: '#1e293b',
					900: '#0f172a',
					950: '#020617', // Deepest background
				},
				// Premium High-End Accents (Gold & Purple)
				premium: {
					gold: {
						50: '#fffbeb',
						100: '#fef3c7',
						200: '#fde68a',
						300: '#fcd34d',
						400: '#fbbf24',
						500: '#f59e0b',
						600: '#d97706',
						700: '#b45309', // Rich gold
						800: '#92400e',
						900: '#78350f',
					},
					purple: {
						50: '#faf5ff',
						400: '#c084fc',
						500: '#a855f7', // Electric purple
						600: '#9333ea',
						900: '#581c87',
					},
				},
				// Legacy Accents (Red - for Urgent CTAs)
				accent: {
					50: '#fef2f2',
					100: '#fee2e2',
					500: '#ef4444',
					600: '#dc2626',
					700: '#b91c1c',
				},
				// Semantic Colors
				success: {
					500: '#22c55e',
					700: '#15803d',
				},
				bonus: {
					// Kept for familiarity but can blend with gold
					400: '#facc15',
					700: '#a16207',
				},
				// Dark Mode Specific Surfaces
				surface: {
					100: '#1e293b', // Lighter cards
					200: '#334155', // Hover states
					900: '#020617', // Main background
				},
			},

			// SPACING SCALE
			spacing: {
				card: '1.25rem', // 20px
				'card-sm': '1rem', // 16px
				'card-lg': '1.5rem', // 24px
				'btn-sm': '0.5rem', // 8px
				'btn-md': '0.75rem', // 12px
				'btn-lg': '1rem', // 16px
				section: '3rem', // 48px
				'section-lg': '4rem', // 64px
			},

			// BORDER RADIUS
			borderRadius: {
				card: '1rem', // 16px (slightly rounder for modern look)
				btn: '0.75rem', // 12px
				'btn-primary': '9999px',
				badge: '9999px',
			},

			// SHADOWS with Glow Effects
			boxShadow: {
				card: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
				'card-hover':
					'0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
				glow: '0 0 15px rgba(217, 119, 6, 0.3)', // Gold glow
				'glow-purple': '0 0 15px rgba(168, 85, 247, 0.3)', // Purple glow
				glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
			},

			// ANIMATIONS
			animation: {
				'fade-in': 'fadeIn 0.5s ease-out forwards',
				'slide-up': 'slideUp 0.5s ease-out forwards',
				'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				float: 'float 6s ease-in-out infinite',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				slideUp: {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
			},

			// TYPOGRAPHY
			fontSize: {
				hero: ['2.5rem', { lineHeight: '1.1', fontWeight: '900' }],
				'hero-lg': ['4.5rem', { lineHeight: '1.1', fontWeight: '900' }],
				'heading-1': ['2rem', { lineHeight: '1.25', fontWeight: '700' }],
				'heading-2': ['1.5rem', { lineHeight: '1.3', fontWeight: '700' }],
				body: ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
			},
			fontFamily: {
				sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'], // Ensure a clean font stack
			},
		},
	},
	plugins: [typography()],
};
