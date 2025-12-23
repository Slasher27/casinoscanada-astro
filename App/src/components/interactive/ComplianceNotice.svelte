<script lang="ts">
    import { userLocation } from '../../stores/user';
    import { fade, fly } from 'svelte/transition';

    let showNotice = $derived($userLocation?.region === 'Ontario' || $userLocation?.region === 'ON');
</script>

{#if showNotice}
    <div 
        in:fly={{ y: -20, duration: 500 }} 
        out:fade 
        class="bg-black/90 text-white text-xs py-2 px-4 shadow-md border-b border-white/10 relative z-50"
    >
        <div class="container mx-auto flex items-center justify-center gap-2">
            <span class="text-xl">⚠️</span>
            <p>
                <strong>Ontario Players:</strong> This content is intended for educational purposes. Please play specifically at <a href="https://igamingontario.ca" target="_blank" class="underline hover:text-accent-400">iGaming Ontario</a> licensed operators.
            </p>
        </div>
    </div>
{/if}
