<script lang="ts">
  import { browser } from "$app/env";
  import { store } from "$lib/store";

  $: noWalletDetected = browser && window.ethereum === undefined;
</script>

{#if noWalletDetected}
	<p>Install Metamask</p>
{:else}
  <slot />

  <hr />

  <ul>
    <li>Contract Address: {import.meta.env.VITE_ZOMBIE_OWNERSHIP_ADDRESS}</li>
    <li>Selected Address: {$store.currentAddress}</li>
  </ul>
{/if}
