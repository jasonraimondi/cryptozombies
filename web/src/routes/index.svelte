<script>
import TokenArtifact from "$lib/contracts/zombieownership.json";
import contractAddress from "$lib/contracts/contract-address.json";

import { state } from "$lib/state";
import { browser } from '$app/env';
import ConnectWallet from "$lib/components/ConnectWallet.svelte";

// This is the Hardhat Network id, you might change it in the hardhat.config.js
$: noWalletDetected = browser && window.ethereum === undefined;

</script>

{#if noWalletDetected}
	<p>NO WALLET DETECTED</p>
{:else}
  {#if !$state.selectedAddress}
    <ConnectWallet />
  {/if}
{/if}

<div>
  <pre><code>{JSON.stringify($state)}</code></pre>
</div>

<div>
  <pre><code> {JSON.stringify(contractAddress, null, 2)}</code></pre>
  <pre><code>{JSON.stringify(TokenArtifact, null, 2)}</code></pre>
</div>
