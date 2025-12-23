<script lang="ts">
    import { fly, fade } from 'svelte/transition';
    import { userLocation } from '../../stores/user';

    interface Casino {
        id: string;
        name: string;
        logo: string;
        rating: number;
        bonus: string;
        tags: string[];
    }

    export let casinos: Casino[] = [];

    // State
    let step = 0;
    let loading = false;
    let selectedPriority: string = '';
    let selectedGame: string = '';
    let matchedCasino: Casino | null = null;

    // Steps Configuration
    const priorities = [
        { id: 'speed', label: 'Fast Payouts', icon: '⚡' },
        { id: 'bonus', label: 'Big Bonuses', icon: '💰' },
        { id: 'crypto', label: 'Crypto Friendly', icon: '₿', image: '/images/payments/bitcoin.png' }
    ];

    const games = [
        { id: 'slots', label: 'Online Slots', icon: '🎰' },
        { id: 'live', label: 'Live Dealer', icon: '🎥' },
        { id: 'tables', label: 'Table Games', icon: '🃏' }
    ];

    function nextStep(selection: string, type: 'priority' | 'game') {
        if (type === 'priority') selectedPriority = selection;
        if (type === 'game') selectedGame = selection;
        step++;

        if (step === 2) {
            findMatch();
        }
    }

    function findMatch() {
        loading = true;
        setTimeout(() => {
            // Simple matching logic (in reality, this would be more complex)
            // For now, we pick a high rated one, maybe biasing towards 'bitstarz' if crypto is selected
            let match = casinos[0];
            
            if (selectedPriority === 'crypto') {
                match = casinos.find(c => c.id === 'bitstarz') || casinos[0];
            } else if (selectedPriority === 'speed') {
                 match = casinos.find(c => c.tags.includes('Fast')) || casinos[0];
            }

            matchedCasino = match;
            loading = false;
        }, 1500); // Fake processing delay for engagement
    }

    function reset() {
        step = 0;
        selectedPriority = '';
        selectedGame = '';
        matchedCasino = null;
    }
</script>

<div class="bg-white dark:bg-primary-900 rounded-3xl shadow-glow overflow-hidden max-w-lg mx-auto border border-primary-100 dark:border-primary-800 transition-all duration-300">
    <!-- Header -->
    <div class="bg-gradient-to-r from-accent-600 to-premium-purple-600 p-6 text-center text-white relative overflow-hidden">
        <div class="absolute inset-0 bg-white/10 opacity-50 backdrop-blur-3xl"></div>
        <h2 class="text-2xl font-black relative z-10">Perfect Casino Finder</h2>
        <p class="text-white/90 text-sm relative z-10">Find your ideal match in 30 seconds</p>
    </div>

    <!-- Body -->
    <div class="p-8 min-h-[380px] flex flex-col justify-center relative">
        {#if step === 0}
            <div in:fly={{ x: 20, duration: 400 }} out:fly={{ x: -20, duration: 400 }} class="absolute inset-0 p-8 flex flex-col">
                <h3 class="text-xl font-bold text-primary-900 dark:text-white mb-6 text-center">What matters most to you?</h3>
                <div class="grid gap-3">
                    {#each priorities as p}
                        <button
                            onclick={() => nextStep(p.id, 'priority')}
                            class="flex items-center gap-4 p-4 rounded-xl border border-primary-200 dark:border-primary-700 hover:border-accent-500 hover:bg-accent-50 dark:hover:bg-accent-900/10 transition-all group text-left"
                        >
                            {#if p.image}
                                <img src={p.image} alt={p.label} class="w-8 h-8 object-contain" />
                            {:else}
                                <span class="text-2xl">{p.icon}</span>
                            {/if}
                            <span class="font-bold text-primary-700 dark:text-gray-200 group-hover:text-accent-600 dark:group-hover:text-accent-400">{p.label}</span>
                            <span class="ml-auto text-primary-300 group-hover:text-accent-500">→</span>
                        </button>
                    {/each}
                </div>
            </div>
        {/if}

        {#if step === 1}
            <div in:fly={{ x: 20, duration: 400 }} out:fly={{ x: -20, duration: 400 }} class="absolute inset-0 p-8 flex flex-col">
                <button onclick={() => step--} class="text-sm text-primary-400 hover:text-primary-600 mb-4 self-start">← Back</button>
                <h3 class="text-xl font-bold text-primary-900 dark:text-white mb-6 text-center">Favorite Game Type?</h3>
                <div class="grid gap-3">
                    {#each games as g}
                        <button
                            onclick={() => nextStep(g.id, 'game')}
                            class="flex items-center gap-4 p-4 rounded-xl border border-primary-200 dark:border-primary-700 hover:border-accent-500 hover:bg-accent-50 dark:hover:bg-accent-900/10 transition-all group text-left"
                        >
                            <span class="text-2xl">{g.icon}</span>
                            <span class="font-bold text-primary-700 dark:text-gray-200 group-hover:text-accent-600 dark:group-hover:text-accent-400">{g.label}</span>
                            <span class="ml-auto text-primary-300 group-hover:text-accent-500">→</span>
                        </button>
                    {/each}
                </div>
            </div>
        {/if}

        {#if step === 2}
            <div in:fade class="absolute inset-0 p-8 flex flex-col items-center justify-center text-center">
                {#if loading}
                    <div class="animate-spin text-4xl mb-4">🔮</div>
                    <h3 class="text-xl font-bold text-primary-900 dark:text-white">Analyzing {$userLocation?.region ? $userLocation.region + ' ' : ''}available casinos...</h3>
                    <p class="text-sm text-primary-500 mt-2">Matching your preferences</p>
                {:else if matchedCasino}
                    <div in:fly={{ y: 20 }} class="w-full">
                         <div class="text-sm font-bold text-accent-600 uppercase tracking-widest mb-2">Best Match</div>
                         <img src={matchedCasino.logo} alt={matchedCasino.name} class="w-24 h-24 object-contain mx-auto mb-4 rounded-xl shadow-lg" />
                         <h3 class="text-2xl font-black text-primary-900 dark:text-white mb-1">{matchedCasino.name}</h3>
                         <div class="text-yellow-500 font-bold mb-4">★ {matchedCasino.rating}/5</div>
                         
                         <div class="bg-bonus-100 dark:bg-bonus-900/30 text-bonus-700 dark:text-bonus-300 p-3 rounded-lg font-bold mb-6 text-sm">
                            {matchedCasino.bonus}
                         </div>

                         <a href={`/reviews/${matchedCasino.id}-casino/`} class="block w-full bg-accent-600 hover:bg-accent-700 text-white font-bold py-3 rounded-xl shadow-button hover:scale-105 transition-transform">
                            Read Review
                         </a>
                         <button onclick={reset} class="mt-4 text-xs text-primary-400 hover:underline">Start Over</button>
                    </div>
                {/if}
            </div>
        {/if}
    </div>
</div>
