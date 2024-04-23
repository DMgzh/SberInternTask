<!-- App.svelte -->

<script lang="ts">
  import { onMount } from 'svelte';

  let currency1: string = '';
  let currency2: string = '';
  let amount: number = 0;
  let exchangeRate: number = 0;
  let result: number = 0;
  let error: string = '';
  let displayCurrency1: string = '';
  let displayCurrency2: string = '';

  async function convertCurrency() {
    if (!currency1 || !currency2) {
      error = 'Invalid ammount format'
      return; 
    }

    const response = await fetch(`https://open.er-api.com/v6/latest/${currency1}`);
    const data = await response.json();

    if (data.result === "success") {
      exchangeRate = data.rates[currency2] || 0;
      result = amount * exchangeRate;
      error = '';
      displayCurrency1 = currency1;
      displayCurrency2 = currency2;
    } else {
      error = 'Invalid currency pair';
    }
  }

  function handleAmountInput(event) {
    amount = parseFloat(event.target.value);
    convertCurrency();
  }

  function handleSubmit() {
    convertCurrency();
  }

  onMount(() => {
    console.log("mounted");
  });
</script>

<h1>Currency Converter</h1>
<label for="currency1">First Currency (3-letter code):</label>
<input type="text" bind:value={currency1}>
<label for="currency2">Second Currency (3-letter code):</label>
<input type="text" bind:value={currency2}>
<button on:click={handleSubmit}>Submit</button>
<label for="amount">Amount:</label>
<input type="number" bind:value={amount} on:input={handleAmountInput}>
<div>
  {#if error}
    {error}
  {:else if exchangeRate}
    {amount} {displayCurrency1} equals {result.toFixed(2)} {displayCurrency2}
  {/if}
</div>
