<script>
  import { currentAddress, zombies } from "$lib/store";
  import { walletMachine } from "$lib/services/wallet_machine";

  $: formData = {
    state: $walletMachine.value,
    currentAddress: $currentAddress,
    zombies: $zombies,
  };

  currentAddress.subscribe(s => {
    console.log("user address:", s);
  });
</script>

<div class="debug-bar">
  <pre><code>{JSON.stringify(formData, null, 2)}</code></pre>
</div>

<style>
  div {
    background-color: #bbbbbb;
    padding: 0 0.2rem;
  }
</style>
