<script>
import TokenArtifact from "@jmondi/cryptozombies/artifacts/contracts/zombieownership.sol/ZombieOwnership.json";
import { browser } from '$app/env';

import { state } from "$lib/state";
import ConnectWallet from "$lib/components/ConnectWallet.svelte";

$: noWalletDetected = browser && window.ethereum === undefined;


</script>

{#if noWalletDetected}
	<p>NO WALLET DETECTED</p>
{:else}
  {#if !$state.selectedAddress}
    <ConnectWallet />
  {:else}
    {#if !$state.tokenData || !$state.balance}
      <p>loading...</p>;
    {/if}
  {/if}
{/if}

<div>
  <pre><code>{JSON.stringify($state)}</code></pre>
</div>

<div>
  <pre><code>{JSON.stringify(TokenArtifact, null, 2)}</code></pre>
</div>
