<script lang="ts">
  export let casinos: any[] = [];

  // State
  let searchQuery = '';
  let activeCategory = 'all'; // 'all', 'spins', 'deposit'
  
  // Filter Logic
  $: filteredCasinos = casinos.filter(c => {
      // 1. Search (Name or Bonus Text)
      const query = searchQuery.toLowerCase();
      const matchesSearch = c.name.toLowerCase().includes(query) || 
                            c.bonus_offer.toLowerCase().includes(query);

      // 2. Category
      let matchesCategory = true;
      if (activeCategory === 'spins') {
          matchesCategory = (c.bonus_spins || 0) > 0;
      } else if (activeCategory === 'deposit') {
          // Heuristic: If it mentions "%" it's likely a match bonus
          matchesCategory = c.bonus_offer.includes('%');
      }

      return matchesSearch && matchesCategory;
  });

  const FALLBACK_ICON = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzlDQTNBRiI+PHBhdGggZD0iTTEyIDFMMyA1djZjMCA1LjU1IDMuODQgMTAuNzQgOSAxMiA1LjE2LTEuMjYgOS02LjQ1IDktMTJWNWwtOS00em0wIDEwLjk5aDdjLS41MyA0LjEyLTMuMjggNy43OS03IDguOTRWMTJINVY2LjNsNy0zLjExdjguOHoiLz48L3N2Zz4=';
</script>

<div class="flex flex-col gap-6">

  <!-- Filter Toolbar -->
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6 flex flex-col md:flex-row gap-4 justify-between items-center sticky top-20 z-30">
      
      <!-- Categories -->
      <div class="flex p-1 bg-gray-100 rounded-xl">
          <button 
              on:click={() => activeCategory = 'all'}
              class="px-4 py-2 rounded-lg text-sm font-bold transition-all {activeCategory === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-gray-500 hover:text-slate-700'}"
          >
              All Bonuses
          </button>
          <button 
              on:click={() => activeCategory = 'spins'}
              class="px-4 py-2 rounded-lg text-sm font-bold transition-all {activeCategory === 'spins' ? 'bg-white text-slate-900 shadow-sm' : 'text-gray-500 hover:text-slate-700'}"
          >
              Free Spins
          </button>
          <button 
              on:click={() => activeCategory = 'deposit'}
              class="px-4 py-2 rounded-lg text-sm font-bold transition-all {activeCategory === 'deposit' ? 'bg-white text-slate-900 shadow-sm' : 'text-gray-500 hover:text-slate-700'}"
          >
              Deposit Match
          </button>
      </div>

      <!-- Search -->
      <div class="relative w-full md:w-64">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <input 
              type="text" 
              bind:value={searchQuery}
              placeholder="Find casino or bonus..." 
              class="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-shadow"
          />
      </div>
  </div>

  <!-- Results List -->
  <div class="flex flex-col gap-4">
      
    <!-- Desktop Header -->
    <div class="hidden lg:grid grid-cols-12 gap-4 bg-gray-50 p-4 rounded-t-xl text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">
        <div class="col-span-1 text-center">Rank</div>
        <div class="col-span-4">Casino & Key Stats</div>
        <div class="col-span-3">Software & Banking</div>
        <div class="col-span-2 text-center">Bonus</div>
        <div class="col-span-2 text-center">Action</div>
    </div>

    {#each filteredCasinos as casino, index (casino.id)}
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow relative">
            
            <!-- MOBILE / TABLET VIEW (< 1024px) -->
            <div class="lg:hidden p-5 flex flex-col gap-4">
                <!-- Top Row: Logo, Rank, Name, Info -->
                <div class="flex items-start gap-4">
                    <!-- Rank Badge -->
                    <div class="absolute top-0 left-0 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-br-lg z-10">
                        #{index + 1}
                    </div>

                    <div class="w-24 h-24 flex-shrink-0 flex items-center justify-center mt-2 overflow-hidden rounded-xl">
                        <img
                            src={casino.logo_url || FALLBACK_ICON}
                            alt={casino.name}
                            class="w-full h-full object-contain rounded-xl"
                        />
                    </div>
                    <div class="flex-grow pt-1">
                        <h3 class="text-xl font-black text-slate-900 leading-none mb-1">
                            {casino.name}
                        </h3>
                        <div class="flex flex-wrap gap-2 text-xs font-bold text-gray-500 mb-2">
                            <span class="bg-gray-100 px-2 py-0.5 rounded">{casino.license}</span>
                             <span class="bg-green-50 text-green-700 px-2 py-0.5 rounded border border-green-100">
                                RTP {casino.payout_ratio}%
                            </span>
                        </div>
                        <a href={`/reviews/${casino.id}-casino`} class="text-sm text-blue-600 font-bold hover:underline">
                            Read Review &rarr;
                        </a>
                    </div>
                </div>

                <!-- Middle: Bonus Box -->
                <div class="bg-yellow-50 border border-yellow-100 rounded-lg p-3 text-center">
                    <span class="block text-xs font-bold text-yellow-700 uppercase tracking-wide mb-1">Welcome Bonus</span>
                    <span class="block text-lg font-black text-slate-900">{casino.bonus_offer}</span>
                </div>

                <!-- Bottom: Specs & CTA -->
                <div class="flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-3">
                    <div class="flex flex-col gap-1">
                        <span class="text-xs text-gray-500 font-bold">Fast Payouts</span>
                         <span class="text-sm font-bold text-slate-800">⚡ {casino.payout_speed_minutes} mins</span>
                    </div>
                    <a
                        href={casino.website_url}
                        class="flex-grow sm:flex-grow-0 bg-red-600 text-white font-bold py-3 px-8 rounded-lg text-center shadow-md active:scale-95 transition-transform"
                    >
                        Play Now
                    </a>
                </div>
                
                <!-- Expanded Info (Tablet Optimization) -->
                <div class="hidden sm:flex items-center gap-2 pt-2 overflow-hidden opacity-75">
                     <span class="text-xs font-bold text-gray-400">Software:</span>
                     {#if casino.software}
                        {#each casino.software.slice(0, 6) as s}
                            <img src={s.logo_url} class="h-12 w-auto grayscale" alt={s.name} />
                        {/each}
                     {/if}
                </div>
            </div>

            <!-- DESKTOP VIEW (>= 1024px) -->
            <div class="hidden lg:grid grid-cols-12 gap-4 items-center p-4 min-h-[100px]">
                
                <!-- Rank -->
                <div class="col-span-1 flex justify-center">
                    <div class="w-10 h-10 rounded-full bg-slate-100 text-slate-600 font-black text-lg flex items-center justify-center border border-slate-200">
                        {index + 1}
                    </div>
                </div>

                <!-- Info -->
                <div class="col-span-4 flex items-center gap-4">
                    <div class="w-24 h-24 flex-shrink-0 flex items-center justify-center overflow-hidden rounded-xl">
                        <img
                            src={casino.logo_url || FALLBACK_ICON}
                            alt={casino.name}
                            class="w-full h-full object-contain rounded-xl"
                        />
                    </div>
                    <div>
                        <a href={`/reviews/${casino.id}-casino`} class="font-bold text-xl text-slate-900 hover:text-blue-600 transition-colors">
                            {casino.name}
                        </a>
                        <div class="flex items-center gap-2 mt-1">
                            <span class="text-xs font-bold bg-gray-100 px-2 py-0.5 rounded text-gray-600 border border-gray-200" title="License">
                                {casino.license}
                            </span>
                             <span class="text-xs font-bold text-green-600 flex items-center gap-1" title="Minimum Deposit">
                                💰 Min ${casino.min_deposit || 20}
                            </span>
                            <span class="text-xs font-bold text-blue-600 flex items-center gap-1" title="Payout Ratio">
                                📈 {casino.payout_ratio}%
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Logos (Software & Banking Mixed) -->
                <div class="col-span-3 flex flex-col justify-center gap-3">
                   <div class="flex items-center gap-2 overflow-hidden">
                       <span class="text-[10px] uppercase font-bold text-gray-400 w-12 shrink-0">Games</span>
                       {#if casino.software}
                           {#each casino.software as s}
                               <img src={s.logo_url} title={s.name} alt={s.name} class="h-16 w-auto object-contain grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all cursor-help" />
                           {/each}
                       {/if}
                   </div>
                   <div class="flex items-center gap-2 overflow-hidden">
                       <span class="text-[10px] uppercase font-bold text-gray-400 w-12 shrink-0">Bank</span>
                       {#if casino.payments}
                           {#each casino.payments as p}
                               <img src={p.logo_url} title={p.name} alt={p.name} class="h-6 w-auto object-contain" />
                           {/each}
                       {/if}
                   </div>
                </div>

                <!-- Bonus -->
                <div class="col-span-2 text-center flex flex-col justify-center">
                    <span class="font-bold text-slate-900 text-lg leading-tight">{casino.bonus_offer}</span>
                    {#if (casino.bonus_spins || 0) > 0}
                        <span class="text-xs text-red-600 font-bold bg-red-50 inline-block mx-auto px-2 py-0.5 rounded-full mt-1 border border-red-100">
                            + {casino.bonus_spins} Free Spins
                        </span>
                    {/if}
                </div>

                <!-- CTA -->
                <div class="col-span-2 flex flex-col gap-2 justify-center text-center">
                    <a
                        href={casino.website_url}
                        class="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg shadow-sm hover:shadow-md transition-all hover:scale-105"
                    >
                        Play Now
                    </a>
                    <a href={`/reviews/${casino.id}-casino`} class="text-xs font-bold text-gray-500 hover:text-gray-800 hover:underline">
                        View Review
                    </a>
                </div>
            </div>
        </div>
    {/each}
    
    {#if filteredCasinos.length === 0}
        <div class="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
            <div class="text-4xl mb-4">🔍</div>
            <h3 class="text-xl font-bold text-slate-900">No bonuses found</h3>
            <p class="text-gray-500">Try adjusting your search or filters.</p>
            <button on:click={() => {searchQuery = ''; activeCategory = 'all'}} class="mt-4 text-red-600 font-bold hover:underline">Clear Filters</button>
        </div>
    {/if}

  </div>
</div>
