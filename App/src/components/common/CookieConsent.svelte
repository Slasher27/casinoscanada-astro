<script lang="ts">
	// src/components/common/CookieConsent.svelte
	import { onMount } from 'svelte';

	let showBanner = $state(false);
	let isClosing = $state(false);

	onMount(() => {
		// Check if user has already consented
		const hasConsented = localStorage.getItem('cookie-consent');
		if (!hasConsented) {
			// Small delay for better UX (let page load first)
			setTimeout(() => {
				showBanner = true;
			}, 1000);
		}
	});

	function acceptCookies() {
		isClosing = true;
		localStorage.setItem('cookie-consent', 'accepted');

		// Wait for animation to finish before hiding
		setTimeout(() => {
			showBanner = false;
		}, 300);
	}

	function declineCookies() {
		isClosing = true;
		localStorage.setItem('cookie-consent', 'declined');

		// Wait for animation to finish before hiding
		setTimeout(() => {
			showBanner = false;
		}, 300);
	}
</script>

{#if showBanner}
	<div
		class="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-slide-up"
		class:animate-slide-down={isClosing}
	>
		<div
			class="max-w-6xl mx-auto bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 md:p-8"
		>
			<div class="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
				<!-- Icon -->
				<div class="flex-shrink-0 text-3xl">🍪</div>

				<!-- Text Content -->
				<div class="flex-grow">
					<h3 class="text-white font-bold text-lg mb-2">We Use Cookies</h3>
					<p class="text-slate-300 text-sm leading-relaxed">
						We use cookies to analyze site traffic and improve your experience. By
						clicking "Accept", you consent to our use of cookies. Your data is
						anonymized and we don't sell it to third parties.
						<a href="/privacy/" class="text-red-500 hover:text-red-400 underline"
							>Privacy Policy</a
						>
					</p>
				</div>

				<!-- Buttons -->
				<div class="flex gap-3 w-full md:w-auto md:flex-shrink-0">
					<button
						onclick={declineCookies}
						class="flex-1 md:flex-none px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors border border-slate-600"
					>
						Decline
					</button>
					<button
						onclick={acceptCookies}
						class="flex-1 md:flex-none px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition-colors shadow-lg"
					>
						Accept
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	@keyframes slide-up {
		from {
			transform: translateY(100%);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	@keyframes slide-down {
		from {
			transform: translateY(0);
			opacity: 1;
		}
		to {
			transform: translateY(100%);
			opacity: 0;
		}
	}

	.animate-slide-up {
		animation: slide-up 0.3s ease-out;
	}

	.animate-slide-down {
		animation: slide-down 0.3s ease-in;
	}
</style>
