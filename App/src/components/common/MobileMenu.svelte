<script lang="ts">
  import { slide, fade } from 'svelte/transition';
  import { onMount } from 'svelte';

  // Props passed from Header.astro
  export let navLinks: Array<{ text: string; href: string }> = [];
  export let currentPath: string = '/';

  // State: Is the menu open?
  let isOpen = false;

  // Helper to check if link is active
  function isActive(href: string): boolean {
    if (href === '/' && currentPath === '/') return true;
    if (href !== '/' && currentPath.startsWith(href)) return true;
    return false;
  }

  // Toggle menu
  function toggle() {
    isOpen = !isOpen;
    // Prevent body scroll when menu is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  // Close menu (used when clicking links or outside)
  function closeMenu() {
    if (isOpen) {
      isOpen = false;
      document.body.style.overflow = '';
    }
  }

  // Handle keyboard navigation
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && isOpen) {
      closeMenu();
    }
  }

  // Open search palette
  function openSearch() {
    closeMenu();
    window.dispatchEvent(new CustomEvent('open-search-palette'));
  }

  // Cleanup on unmount
  onMount(() => {
    return () => {
      document.body.style.overflow = '';
    };
  });
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="lg:hidden relative">
  <!-- Mobile Menu Button -->
  <button
    on:click={toggle}
    class="text-primary-900 dark:text-primary-400 p-2 focus:outline-none focus:ring-2 focus:ring-accent-600 focus:ring-offset-2 rounded-btn transition-colors hover:bg-primary-50 dark:hover:bg-white/10 shrink-0 relative z-50"
    aria-label={isOpen ? 'Close menu' : 'Open menu'}
    aria-expanded={isOpen}
    aria-controls="mobile-menu"
  >
    {#if isOpen}
      <svg class="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    {:else}
      <svg class="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    {/if}
  </button>

  <!-- Mobile Menu Panel -->
  {#if isOpen}
    <!-- Backdrop overlay -->
    <button
      transition:fade={{ duration: 200 }}
      on:click={closeMenu}
      class="fixed inset-0 bg-primary-900/50 dark:bg-black/80 backdrop-blur-sm z-40 cursor-default"
      aria-label="Close menu"
      tabindex="-1"
    ></button>

    <!-- Menu content -->
    <div
      id="mobile-menu"
      transition:slide={{ duration: 300 }}
      class="fixed top-20 left-0 right-0 w-full bg-white dark:bg-primary-900 border-b border-primary-200 dark:border-primary-700 shadow-card-hover z-50 max-h-[calc(100vh-5rem)] overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <nav class="flex flex-col p-4 space-y-1 container mx-auto">
        <!-- Navigation Links -->
        {#each navLinks as link}
          {@const active = isActive(link.href)}
          <a
            href={link.href}
            on:click={closeMenu}
            class="text-base sm:text-lg font-bold block px-4 py-3 rounded-btn transition-colors {active ? 'text-accent-600 dark:text-premium-gold-400 bg-accent-50 dark:bg-premium-gold-400/10' : 'text-primary-800 dark:text-primary-400 hover:text-accent-600 dark:hover:text-premium-gold-400 hover:bg-primary-50 dark:hover:bg-white/5'}"
            aria-current={active ? 'page' : undefined}
          >
            {link.text}
            {#if active}
              <span class="ml-2 text-accent-600 dark:text-premium-gold-400" aria-hidden="true">•</span>
            {/if}
          </a>
        {/each}

        <!-- Divider -->
        <hr class="border-primary-200 dark:border-primary-700 my-2" />

        <!-- Search Button -->
        <button
          on:click={openSearch}
          class="text-base sm:text-lg font-bold text-primary-800 dark:text-gray-200 hover:text-accent-600 dark:hover:text-accent-400 hover:bg-primary-50 dark:hover:bg-white/5 px-4 py-3 rounded-btn transition-colors text-left flex items-center gap-3 w-full"
          aria-label="Open search"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          Search
        </button>

        <!-- Compare CTA -->
        <a
          href="/compare/"
          on:click={closeMenu}
          class={`
            bg-accent-600 hover:bg-accent-700 text-white text-center font-bold
            py-3 sm:py-4 rounded-btn-primary shadow-button transition-all hover:scale-[1.02]
            block mt-2
            ${isActive('/compare/') ? 'ring-2 ring-accent-600 ring-offset-2' : ''}
          `}
          aria-label="Compare casinos"
        >
          Compare Casinos
        </a>
      </nav>
    </div>
  {/if}
</div>

<style>
  /* Ensure smooth animations */
  button, a {
    -webkit-tap-highlight-color: transparent;
  }
</style>