<script lang="ts">
  import { connectWallet } from "$lib/ethereum";
</script>

<button type="button" on:click={connectWallet}>Connect Wallet</button>
