<script>
  import { store } from "$lib/store";
  import { zombieOwnership } from "$lib/ethereum";
  import { walletService } from "$lib/machines/wallet";

  $: data = {
    XSTATE: $walletService.value,
    ...$store,
    contract: zombieOwnership?.address,
  };
</script>

<div class="debug-bar">
  <pre><code>{JSON.stringify(data, null, 2)}</code></pre>
</div>

<style>
  div {
    background-color: #bbbbbb;
    padding: 0 0.2rem;
  }
</style>
