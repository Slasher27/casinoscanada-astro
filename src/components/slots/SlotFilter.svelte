<script>
    import SlotCard from './SlotCard.svelte';
    import { fade } from 'svelte/transition';
  
    export let allSlots = [];
  
    // Filters State
    let searchTerm = '';
    let selectedProvider = 'all';
    let selectedVolatility = 'all';
    let sortBy = 'default';
  
    // Derived: Unique Providers
    $: providers = [...new Set(allSlots.map(s => s.provider_name))].sort();
  
    // Filter Logic
    $: filteredSlots = allSlots.filter(slot => {
        const matchSearch = slot.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchProvider = selectedProvider === 'all' || slot.provider_name === selectedProvider;
        const matchVol = selectedVolatility === 'all' || slot.volatility.toLowerCase() === selectedVolatility.toLowerCase();
        return matchSearch && matchProvider && matchVol;
    }).sort((a, b) => {
        if (sortBy === 'rtp_desc') return b.rtp - a.rtp;
        if (sortBy === 'rtp_asc') return a.rtp - b.rtp;
        if (sortBy === 'name') return a.title.localeCompare(b.title);
        return 0; // default (db order)
    });
  </script>
  
  <div class="space-y-6">
    <!-- Filters Toolbar -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            <!-- Search -->
            <div class="md:col-span-1">
                <label for="slot-search" class="block text-xs font-bold text-gray-500 uppercase mb-1">Search Games</label>
                <div class="relative">
                    <input 
                        id="slot-search"
                        type="text" 
                        bind:value={searchTerm}
                        placeholder="e.g. Starburst..." 
                        class="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-colors"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 absolute left-3 top-2.5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                    </svg>
                </div>
            </div>
  
            <!-- Provider Filter -->
            <div>
                <label for="slot-provider" class="block text-xs font-bold text-gray-500 uppercase mb-1">Provider</label>
                <select id="slot-provider" bind:value={selectedProvider} class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none">
                    <option value="all">All Providers</option>
                    {#each providers as p}
                        <option value={p}>{p}</option>
                    {/each}
                </select>
            </div>
  
            <!-- Volatility Filter -->
            <div>
                <label for="slot-volatility" class="block text-xs font-bold text-gray-500 uppercase mb-1">Volatility</label>
                <select id="slot-volatility" bind:value={selectedVolatility} class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none">
                    <option value="all">Any Volatility</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
            </div>
  
            <!-- Sort -->
            <div>
                <label for="slot-sort" class="block text-xs font-bold text-gray-500 uppercase mb-1">Sort By</label>
                <select id="slot-sort" bind:value={sortBy} class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none">
                    <option value="default">Default</option>
                    <option value="rtp_desc">Best RTP %</option>
                    <option value="name">Name (A-Z)</option>
                </select>
            </div>
        </div>
    </div>
  
    <!-- Results Grid -->
    {#if filteredSlots.length > 0}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {#each filteredSlots as slot (slot.slug)}
                <div transition:fade={{ duration: 200 }}>
                    <SlotCard {slot} />
                </div>
            {/each}
        </div>
    {:else}
        <div class="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <p class="text-gray-500 font-medium">No slots found matching your filters.</p>
            <button class="mt-2 text-red-600 font-bold hover:underline" on:click={() => {searchTerm = ''; selectedProvider='all'; selectedVolatility='all';}}>
                Clear Filters
            </button>
        </div>
    {/if}
  </div>
