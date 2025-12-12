<script lang="ts">
  import { onMount } from 'svelte';
  
  // Type Definitions
  type Entity = { id: string; name: string; logo_url: string };
  type Casino = {
      id: string;
      name: string;
      logo_url: string;
      website_url: string;
      rating_Global: number;
      payout_speed_minutes: number;
      payout_ratio: number;
      bonus_offer: string;
      bonus_spins: number;
      license: string;
      established: number;
      payments: Entity[];
      software: Entity[];
      min_deposit?: number;
  };

  export let allCasinos: Casino[] = [];

  // State: 3 Slots
  let selections = ['', '', '']; 
  let showModal = false;
  let activeIndex = 0; 
  let searchQuery = '';

  // Reactive Derived State
  $: selectedCasinos = selections.map(id => allCasinos.find(c => c.id === id));

  // Filtered Casinos for Modal
  $: filteredCasinos = allCasinos.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
      !selections.includes(c.id) // Exclude already selected
  );

  // Initialize from URL
  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    const c1 = params.get('c1');
    const c2 = params.get('c2');
    const c3 = params.get('c3');
    
    const newSelections = [...selections];
    if (c1 && allCasinos.find(c => c.id === c1)) newSelections[0] = c1;
    if (c2 && allCasinos.find(c => c.id === c2)) newSelections[1] = c2;
    if (c3 && allCasinos.find(c => c.id === c3)) newSelections[2] = c3;
    
    selections = newSelections;
  });

  // Update URL
  $: {
     if (typeof window !== 'undefined') {
         const url = new URL(window.location.href);
         selections.forEach((id, idx) => {
             const key = `c${idx + 1}`;
             if (id) url.searchParams.set(key, id);
             else url.searchParams.delete(key);
         });
         window.history.replaceState({}, '', url);
     }
  }

  function openSelection(index: number) {
      activeIndex = index;
      searchQuery = '';
      showModal = true;
  }

  function selectCasino(id: string) {
      const newSelections = [...selections];
      newSelections[activeIndex] = id;
      selections = newSelections;
      showModal = false;
  }
  
  function clearSlot(index: number) {
      const newSelections = [...selections];
      newSelections[index] = '';
      selections = newSelections;
  }

  const FALLBACK_ICON = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzlDQTNBRiI+PHBhdGggZD0iTTEyIDFMMyA1djZjMCA1LjU1IDMuODQgMTAuNzQgOSAxMiA1LjE2LTEuMjYgOS02LjQ1IDktMTJWNWwtOS00em0wIDEwLjk5aDdjLS41MyA0LjEyLTMuMjggNy43OS03IDguOTRWMTJINVY2LjNsNy0zLjExdjguOHoiLz48L3N2Zz4=';
</script>

<div class="max-w-7xl mx-auto px-2 md:px-4 py-8">

  <!-- Main Grid (1 col mobile, 3 col desktop) -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 bg-white md:rounded-3xl md:shadow-xl md:border md:border-gray-200 overflow-hidden divide-y md:divide-y-0 md:divide-x divide-gray-100">
      
      {#each selections as selectedId, index}
        {@const casino = selectedCasinos[index]}
        
        <div class="flex flex-col relative min-h-[500px] {index === 1 ? 'z-10 bg-white' : ''}"> <!-- Middle col z-index if needed -->
            
            {#if !casino}
                <!-- Empty State -->
                <div class="h-full flex flex-col items-center justify-center p-8 text-center bg-gray-50/50">
                    <button 
                        on:click={() => openSelection(index)}
                        class="group flex flex-col items-center gap-4 p-8 rounded-2xl border-2 border-dashed border-gray-300 hover:border-red-500 hover:bg-white transition-all w-full max-w-xs"
                    >
                        <div class="w-16 h-16 rounded-full bg-gray-200 group-hover:bg-red-50 text-gray-400 group-hover:text-red-600 flex items-center justify-center text-3xl font-bold transition-colors">
                            +
                        </div>
                        <span class="font-bold text-gray-500 group-hover:text-slate-900">Add Casino</span>
                    </button>
                </div>
            {:else}
                <!-- Filled State -->
                <div class="relative flex flex-col h-full bg-white">
                    <button on:click={() => clearSlot(index)} class="absolute top-2 right-2 p-2 bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-600 rounded-full z-10 transition-colors" aria-label="Remove Casino">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                    
                    <!-- Header -->
                    <div class="p-6 text-center border-b border-gray-100 bg-gray-50/30 pt-10">
                        <div class="w-24 h-24 mx-auto rounded-xl overflow-hidden shadow-sm border border-gray-100 mb-4 flex items-center justify-center bg-white">
                                <img src={casino.logo_url || FALLBACK_ICON} alt={casino.name} class="w-full h-full object-contain" />
                        </div>
                        <h2 class="text-xl font-black text-slate-900 leading-none">{casino.name}</h2>
                        <div class="mt-2 text-xs font-bold text-gray-400 uppercase tracking-widest">{casino.license || 'Licensed'}</div>
                    </div>

                    <!-- Comparison Rows -->
                    <div class="flex-grow flex flex-col divide-y divide-gray-100">
                        
                        <!-- Bonus -->
                        <div class="p-4 text-center bg-yellow-50/50">
                            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Welcome Bonus</span>
                            <span class="text-lg font-black text-slate-900 leading-tight block">{casino.bonus_offer}</span>
                            {#if casino.bonus_spins}<span class="text-xs font-bold text-red-600 mt-1 block">+ {casino.bonus_spins} Spins</span>{/if}
                        </div>

                        <!-- Speed -->
                        <div class="p-4 text-center">
                            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Payout Speed</span>
                            <span class="text-lg font-bold text-slate-800">⚡ {casino.payout_speed_minutes} mins</span>
                        </div>

                        <!-- RTP -->
                        <div class="p-4 text-center">
                            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">RTP Score</span>
                            <span class="text-lg font-bold text-green-600">{casino.payout_ratio}%</span>
                        </div>

                        <!-- Banking -->
                        <div class="p-4 text-center bg-gray-50/30">
                            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Banking</span>
                            <div class="flex flex-wrap justify-center gap-2">
                                {#each casino.payments.slice(0, 6) as pm}
                                        <img src={pm.logo_url} title={pm.name} alt={pm.name} class="h-8 w-auto object-contain" />
                                    {/each}
                            </div>
                        </div>

                        <!-- Software -->
                        <div class="p-4 text-center">
                            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Games</span>
                                <div class="flex flex-wrap justify-center gap-2">
                                    {#each casino.software.slice(0, 8) as sw}
                                        <img src={sw.logo_url} title={sw.name} alt={sw.name} class="h-12 w-auto object-contain grayscale opacity-80" />
                                    {/each}
                                </div>
                        </div>
                    </div>

                    <!-- CTA -->
                    <div class="p-6 bg-gray-50 text-center sticky bottom-0 z-10 border-t border-gray-100">
                        <a href={casino.website_url} class="block w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl shadow-md transform hover:-translate-y-0.5 transition-all text-sm uppercase tracking-wide">
                            Play Now
                        </a>
                        <a href={`/reviews/${casino.id}-casino`} class="inline-block mt-3 text-xs font-bold text-gray-500 hover:text-slate-900 hover:underline">Read Review</a>
                    </div>
                </div>
            {/if}
        </div>
      {/each}

  </div>

  <!-- Selection Modal (With Search) -->
  {#if showModal}
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <!-- Backdrop -->
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <div class="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" on:click={() => showModal = false}></div>
          
          <div class="relative bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[80vh] flex flex-col">
              <div class="p-4 border-b border-gray-100 bg-gray-50">
                  <div class="flex items-center justify-between mb-3">
                    <h3 class="font-bold text-lg text-slate-900">Select Casino</h3>
                    <button on:click={() => showModal = false} class="text-gray-400 hover:text-slate-900" aria-label="Close modal">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                  </div>
                  <!-- Search Input -->
                  <div class="relative">
                      <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                      <input 
                          type="text" 
                          bind:value={searchQuery}
                          placeholder="Search casinos..." 
                          class="w-full bg-white border border-gray-200 rounded-lg py-2.5 pl-10 pr-4 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                  </div>
              </div>
              
              <div class="overflow-y-auto p-2">
                  {#each filteredCasinos as casino}
                       <button 
                          on:click={() => selectCasino(casino.id)}
                          class="w-full flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors text-left group border border-transparent hover:border-gray-200"
                       >
                           <img src={casino.logo_url || FALLBACK_ICON} alt={casino.name} class="w-12 h-12 object-contain rounded-lg bg-white p-1 border border-gray-100" />
                           <div>
                               <div class="font-bold text-slate-900 group-hover:text-red-600">{casino.name}</div>
                               <div class="text-xs text-gray-500">{casino.bonus_offer}</div>
                           </div>
                       </button>
                  {/each}
                  {#if filteredCasinos.length === 0}
                      <div class="text-center py-8 text-gray-400 italic">No casinos found matching "{searchQuery}"</div>
                  {/if}
              </div>
          </div>
      </div>
  {/if}

</div>
