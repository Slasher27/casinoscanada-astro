<script lang="ts">
  // Exported props allow you to pass data from your MDX file
  export let initialAmount: number = 100;
  export let wageringReq: number = 40;

  // Internal state
  let deposit = initialAmount;
  
  // Reactive statement ($:) - This runs every time 'deposit' changes
  $: totalWager = (deposit * wageringReq).toLocaleString('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0
  });
</script>

<div class="not-prose my-8 p-6 bg-blue-50 border border-blue-200 rounded-xl shadow-sm">
  <div class="flex items-center gap-2 mb-4">
    <span class="text-2xl">🧮</span>
    <h4 class="text-blue-900 font-bold text-lg m-0">Bonus Wagering Calculator</h4>
  </div>
  
  <div class="flex flex-col gap-4">
    <label class="flex flex-col gap-1">
      <span class="text-sm font-bold text-gray-700 uppercase tracking-wider">Your Deposit</span>
      <div class="relative">
        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
        <input 
          type="number" 
          bind:value={deposit} 
          class="w-full pl-8 p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-lg font-mono text-gray-900 transition-all"
        />
      </div>
    </label>

    <div class="pt-4 border-t border-blue-200 flex justify-between items-center">
      <p class="text-sm text-gray-600 font-medium">Total to Wager:</p>
      <p class="text-2xl font-black text-blue-800">{totalWager}</p>
    </div>
  </div>
</div>