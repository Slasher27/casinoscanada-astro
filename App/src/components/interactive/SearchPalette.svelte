<script lang="ts">
  import { onMount } from 'svelte';

  let isOpen = false;
  let query = '';
  let activeIndex = 0;
  let results: any[] = [];
  let allItems: any[] = [];
  let searchInput: HTMLInputElement;

  // Fetch data only once
  onMount(() => {
    // 1. Fetch Data
    fetch('/api/search.json')
      .then(res => res.json())
      .then(data => { allItems = data; })
      .catch(e => console.error('Failed to load search index', e));

    // 2. Setup Listeners
    window.addEventListener('keydown', handleKeydown);
    const openHandler = () => open();
    window.addEventListener('open-search-palette', openHandler);

    // 3. Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('open-search-palette', openHandler);
    };
  });

  function open() {
    isOpen = true;
    query = '';
    activeIndex = 0;
    results = allItems.slice(0, 10); // Show generic top items initially or empty
    setTimeout(() => searchInput?.focus(), 50);
  }

  function close() {
    isOpen = false;
  }

  function handleKeydown(e: KeyboardEvent) {
    // Open Shortcut
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      isOpen ? close() : open();
    }
    // Slash shortcut (if not inputting)
    if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
      e.preventDefault();
      open();
    }

    if (!isOpen) return;

    // Navigation
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIndex = (activeIndex + 1) % results.length;
      scrollActiveIntoView();
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIndex = (activeIndex - 1 + results.length) % results.length;
      scrollActiveIntoView();
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      if (results[activeIndex]) {
        window.location.href = results[activeIndex].url;
        close();
      }
    }
  }

  // Reactive Search Filter
  $: {
    if (allItems.length > 0) {
      if (!query) {
        // Default View: Show specific "Main" pages
        results = allItems.filter(i => i.type === 'Page').slice(0, 5);
      } else {
        const lowerQ = query.toLowerCase();
        results = allItems
          .filter(item => item.title.toLowerCase().includes(lowerQ))
          .sort((a, b) => {
             // Prioritize exact starts
             const aStarts = a.title.toLowerCase().startsWith(lowerQ);
             const bStarts = b.title.toLowerCase().startsWith(lowerQ);
             if (aStarts && !bStarts) return -1;
             if (!aStarts && bStarts) return 1;
             return 0;
          })
          .slice(0, 10);
      }
      activeIndex = 0;
    }
  }

  function scrollActiveIntoView() {
    const el = document.getElementById(`search-item-${activeIndex}`);
    el?.scrollIntoView({ block: 'nearest' });
  }

  function getIcon(type: string) {
    if (type === 'Casino') return '🎰';
    if (type === 'Slot') return '🎮';
    if (type === 'Banking') return '💳';
    return '📄';
  }
</script>

{#if isOpen}
  <!-- Backdrop -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <div 
    class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-start justify-center pt-[15vh]"
    on:click|self={close}
    role="dialog"
    aria-modal="true"
    tabindex="-1"
  >
    <!-- Modal -->
    <div class="bg-white w-full max-w-xl rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
      
      <!-- Search Bar -->
      <div class="border-b border-gray-100 p-4 flex items-center gap-3">
        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        <input 
          bind:this={searchInput}
          bind:value={query}
          type="text" 
          placeholder="Search casinos, games, or payments..." 
          class="flex-grow text-lg outline-none text-gray-900 placeholder:text-gray-400"
        />
        <button on:click={close} class="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">ESC</button>
      </div>

      <!-- Results List -->
      <ul class="max-h-[60vh] overflow-y-auto p-2">
        {#if results.length === 0}
            <li class="p-8 text-center text-gray-400">
                No results found for "{query}"
            </li>
        {:else}
            {#each results as item, index}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <li 
                id="search-item-{index}"
                class="flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors {index === activeIndex ? 'bg-blue-50 text-blue-900' : 'text-gray-700 hover:bg-gray-50'}"
                on:mousemove={() => activeIndex = index}
                on:click={() => { window.location.href = item.url; close(); }}
            >
                <span class="text-xl w-8 text-center">{getIcon(item.type)}</span>
                <div class="flex-grow">
                    <div class="font-bold">{item.title}</div>
                    <div class="text-xs opacity-75 uppercase tracking-wider">{item.type}</div>
                </div>
                {#if index === activeIndex}
                    <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                {/if}
            </li>
            {/each}
        {/if}
      </ul>

      <!-- Footer -->
      <div class="bg-gray-50 px-4 py-2 border-t border-gray-100 flex justify-between text-xs text-gray-400">
        <div class="flex gap-4">
            <span><strong>↑↓</strong> to navigate</span>
            <span><strong>↵</strong> to select</span>
        </div>
        <div class="flex gap-2">
            <span><strong>ProTip:</strong> Search "Interac" to see best casinos</span>
        </div>
      </div>
    </div>
  </div>
{/if}
