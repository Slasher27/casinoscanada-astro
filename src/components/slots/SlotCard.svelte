<script>
    export let slot;
    
    // Fallback if image fails
    const FALLBACK_IMG = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzlDQTNBRiI+PHBhdGggZD0iTTEyIDFMMyA1djZjMCA1LjU1IDMuODQgMTAuNzQgOSAxMiA1LjE2LTEuMjYgOS02LjQ1IDktMTJWNWwtOS00em0wIDEwLjk5aDdjLS41MyA0LjEyLTMuMjggNy43OS03IDguOTRWMTJINVY2LjNsNy0zLjExdjguOHoiLz48L3N2Zz4=';
  
    function handleImgError(e) {
      e.target.src = FALLBACK_IMG;
    }
  </script>
  
  <article class='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full group'>
    
    <!-- Hero / Mock Game Window Header -->
    <div class="relative bg-slate-900 border-b border-gray-200 pt-8 pb-0 overflow-hidden group-hover:bg-slate-800 transition-colors aspect-video flex items-end justify-center">
        <!-- Background Thumbnail (The Slot Image) -->
        <div class="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-110 duration-700" style="background-image: url('{slot.image_url}');"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>
  
        <!-- Browser Dots -->
        <div class='absolute top-3 left-4 flex gap-1.5 opacity-70 z-10'>
          <div class='w-2.5 h-2.5 rounded-full bg-red-400'></div>
          <div class='w-2.5 h-2.5 rounded-full bg-yellow-400'></div>
          <div class='w-2.5 h-2.5 rounded-full bg-green-400'></div>
        </div>
  
        <!-- Provider Badge -->
        <div class="absolute top-3 right-3">
             <span class="text-[10px] font-bold tracking-wider uppercase text-white bg-slate-800/80 px-2 py-1 rounded backdrop-blur-sm border border-slate-700">
                {slot.provider_name}
             </span>
        </div>

        <!-- Play Overlay (Optional, enhances "Game" feel) -->
        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <a href={`/slots/${slot.slug}/`} class="bg-white text-slate-900 rounded-full px-4 py-2 shadow-lg transform scale-90 group-hover:scale-100 transition-transform flex items-center gap-2 font-bold text-xs uppercase tracking-wide pointer-events-auto hover:bg-red-50 hover:text-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                </svg>
                <span>Play Demo</span>
            </a>
        </div>
    </div>
  
    <!-- Body -->
    <div class='p-4 flex-col flex flex-grow'>
      <h3 class='font-bold text-slate-900 leading-tight mb-2 group-hover:text-red-600 transition-colors'>
        <a href={`/slots/${slot.slug}/`} class="no-underline">
          {slot.title}
        </a>
      </h3>
  
      <div class="grid grid-cols-2 gap-2 mt-auto text-[11px] font-bold text-gray-500 border-t border-gray-100 pt-3">
        <div class="flex flex-col">
          <span class="uppercase text-gray-400 text-[9px]">RTP</span>
          <span class="text-green-600">{slot.rtp}%</span>
        </div>
        <div class="flex flex-col text-right">
          <span class="uppercase text-gray-400 text-[9px]">Volatility</span>
          <span class="text-slate-700">{slot.volatility}</span>
        </div>
      </div>
    </div>
  
    <!-- Footer Link -->
    <a href={`/slots/${slot.slug}/`} class="block bg-gray-50 hover:bg-red-600 hover:text-white text-center py-2 text-xs font-bold uppercase tracking-wide text-gray-500 transition-colors border-t border-gray-100">
        Play Demo
    </a>
  
  </article>
