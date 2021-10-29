<script lang="ts">
  import { store } from "$lib/store";
  import { initialize } from "$lib/ethereum";
  import { onMount } from "svelte";
  import Debugger from "$lib/components/Debugger.svelte";

  onMount(() => {
    initialize();
  })
</script>

{#if !$store.isWeb3}
	<p>Install Metamask</p>
{:else}
  <slot />

  <hr />

  <ul>
    <li>Contract Address: {import.meta.env.VITE_ZOMBIE_OWNERSHIP_ADDRESS}</li>
    <li>Selected Address: {$store.currentAddress}</li>
  </ul>
{/if}

<Debugger />
