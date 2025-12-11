<script lang="ts">
  import { slide } from 'svelte/transition';

  // State: Is the menu open?
  let isOpen = false;

  function toggle() {
    isOpen = !isOpen;
  }
</script>

<button 
  on:click={toggle}
  class="md:hidden text-slate-900 p-2 focus:outline-none"
  aria-label="Toggle Menu"
>
  {#if isOpen}
    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
  {:else}
    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
  {/if}
</button>

{#if isOpen}
  <div 
    transition:slide={{ duration: 300 }}
    class="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-xl z-50 flex flex-col p-4 space-y-4"
  >
    <a href="/reviews" class="text-lg font-bold text-slate-800 hover:text-red-600 block">All Reviews</a>
    <a href="/bonuses" class="text-lg font-bold text-slate-800 hover:text-red-600 block">Bonuses</a>
    
    <a href="/slots" class="text-lg font-bold text-slate-800 hover:text-red-600 block">Free Slots</a>
    <a href="/software" class="text-lg font-bold text-slate-800 hover:text-red-600 block">Software</a>
    <a href="/banking" class="text-lg font-bold text-slate-800 hover:text-red-600 block">Banking</a>
    <hr class="border-gray-100" />
    <a href="/#top-list" class="bg-red-600 text-white text-center font-bold py-3 rounded-lg block">Top Casinos</a>
  </div>
{/if}