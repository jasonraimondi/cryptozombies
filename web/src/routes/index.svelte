<script>
import TokenArtifact from "@jmondi/cryptozombies/artifacts/contracts/zombieownership.sol/ZombieOwnership.json";
import { browser } from '$app/env';

import { state } from "$lib/state";
import ConnectWallet from "$lib/components/ConnectWallet.svelte";

$: noWalletDetected = browser && window.ethereum === undefined;

// import { ethers } from "ethers";
//
// async function _intializeEthers() {
//   // We first initialize ethers by creating a provider using window.ethereum
//   this._provider = new ethers.providers.Web3Provider(window.ethereum);
//
//   // When, we initialize the contract using that provider and the token's
//   // artifact. You can do this same thing with your contracts.
//   this._token = new ethers.Contract(
//     contractAddress.Token,
//     TokenArtifact.abi,
//     this._provider.getSigner(0)
//   );
// }

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
