<script>
    export let slot;

    // Fallback if image fails
    const FALLBACK_IMG = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzlDQTNBRiI+PHBhdGggZD0iTTEyIDFMMyA1djZjMCA1LjU1IDMuODQgMTAuNzQgOSAxMiA1LjE2LTEuMjYgOS02LjQ1IDktMTJWNWwtOS00em0wIDEwLjk5aDdjLS41MyA0LjEyLTMuMjggNy43OS03IDguOTRWMTJINVY2LjNsNy0zLjExdjguOHoiLz48L3N2Zz4=';

    function handleImgError(e) {
      e.target.src = FALLBACK_IMG;
    }
  </script>

  <article class='bg-white rounded-card shadow-card border border-primary-200 overflow-hidden hover:shadow-card-hover transition-all duration-300 flex flex-col h-full group'>

    <!-- Hero / Mock Game Window Header -->
    <div class="relative bg-primary-900 border-b border-primary-200 pt-8 pb-0 overflow-hidden group-hover:bg-primary-700 transition-colors aspect-video flex items-end justify-center">
        <!-- Background Thumbnail (The Slot Image) -->
        <div class="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-110 duration-700" style="background-image: url('{slot.image_url}');"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-primary-900/90 to-transparent"></div>

        <!-- Browser Dots -->
        <div class='absolute top-3 left-4 flex gap-1.5 opacity-70 z-10'>
          <div class='w-2.5 h-2.5 rounded-full bg-accent-600'></div>
          <div class='w-2.5 h-2.5 rounded-full bg-bonus-400'></div>
          <div class='w-2.5 h-2.5 rounded-full bg-success-600'></div>
        </div>

        <!-- Provider Badge -->
        <div class="absolute top-3 right-3">
             <span class="text-[10px] font-bold tracking-wider uppercase text-white bg-primary-900/80 px-2 py-1 rounded-badge backdrop-blur-sm border border-primary-700">
                {slot.provider_name}
             </span>
        </div>

        <!-- Play Overlay (Enhanced "Game" feel) -->
        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <a href={`/slots/${slot.slug}/`} class="pointer-events-auto bg-white hover:bg-accent-50 text-primary-900 hover:text-accent-700 rounded-btn-primary px-4 py-2 shadow-button transform scale-90 group-hover:scale-100 transition-transform flex items-center gap-2 font-bold text-xs uppercase tracking-wide">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-accent-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                </svg>
                <span>Play Demo</span>
            </a>
        </div>
    </div>

    <!-- Body -->
    <div class='p-card-sm flex-col flex flex-grow'>
      <h3 class='font-bold text-primary-900 leading-tight mb-2 group-hover:text-accent-600 transition-colors'>
        <a href={`/slots/${slot.slug}/`} class="no-underline">
          {slot.title}
        </a>
      </h3>

      <div class="grid grid-cols-2 gap-2 mt-auto text-[11px] font-bold text-primary-600 border-t border-primary-200 pt-3">
        <div class="flex flex-col">
          <span class="uppercase text-primary-300 text-[9px]">RTP</span>
          <span class="text-success-600">{slot.rtp}%</span>
        </div>
        <div class="flex flex-col text-right">
          <span class="uppercase text-primary-300 text-[9px]">Volatility</span>
          <span class="text-primary-700">{slot.volatility}</span>
        </div>
      </div>
    </div>

    <!-- Footer Link -->
    <a href={`/slots/${slot.slug}/`} class="block bg-primary-50 hover:bg-accent-600 hover:text-white text-center py-2 text-xs font-bold uppercase tracking-wide text-primary-600 transition-colors border-t border-primary-200 rounded-b-btn">
        Play Demo
    </a>

  </article>
