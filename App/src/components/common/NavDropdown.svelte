<script lang="ts">
  interface DropdownItem {
    text: string;
    href: string;
  }

  interface NavLink {
    text: string;
    href: string;
    dropdown?: DropdownItem[];
  }

  export let link: NavLink;
  export let active: boolean = false;
  export let currentPath: string = '/';

  let isOpen = false;
  let dropdownRef: HTMLDivElement;

  function isActive(href: string): boolean {
    if (href === '/' && currentPath === '/') return true;
    if (href !== '/' && currentPath.startsWith(href)) return true;
    return false;
  }

  function toggle() {
    isOpen = !isOpen;
  }

  function close() {
    isOpen = false;
  }

  // Close dropdown when clicking outside
  function handleClickOutside(event: MouseEvent) {
    if (dropdownRef && !dropdownRef.contains(event.target as Node)) {
      close();
    }
  }

  // Close on escape key
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && isOpen) {
      close();
    }
  }
</script>

<svelte:window on:click={handleClickOutside} on:keydown={handleKeydown} />

<div class="relative h-full flex items-center" bind:this={dropdownRef}>
  <button
    on:click|stopPropagation={toggle}
    class="text-sm font-bold uppercase tracking-wide transition-colors relative flex items-center gap-1 h-full {active ? 'text-accent-600' : 'text-primary-600 hover:text-accent-600'}"
    aria-expanded={isOpen}
    aria-haspopup="true"
  >
    {link.text}
    <svg
      class={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M19 9l-7 7-7-7"
      />
    </svg>
    {#if active}
      <span
        class="absolute bottom-4 left-0 right-0 h-0.5 bg-accent-600"
        aria-hidden="true"
      />
    {/if}
  </button>

  {#if isOpen && link.dropdown}
    <div
      class="absolute top-full left-0 mt-0 w-48 bg-white border border-primary-200 rounded-card shadow-card-hover z-50 py-2"
      role="menu"
    >
      {#each link.dropdown as item}
        {@const itemActive = isActive(item.href)}
        <a
          href={item.href}
          on:click={close}
          class="block px-4 py-2.5 text-sm font-bold transition-colors {itemActive ? 'text-accent-600 bg-accent-50' : 'text-primary-700 hover:text-accent-600 hover:bg-primary-50'}"
          role="menuitem"
          aria-current={itemActive ? 'page' : undefined}
        >
          {item.text}
        </a>
      {/each}
    </div>
  {/if}
</div>
