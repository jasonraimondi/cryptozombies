<script lang="ts">
import { browser } from '$app/env';

import { store } from "$lib/store";
import ConnectWallet from "$lib/components/ConnectWallet.svelte";

$: isContractInitialized = browser && window.zombieOwnership === undefined;

async function createZombieForAddress() {
  await window.zombieOwnership.createRandomZombie("Ruby");

  const [zombie1Id, ...extras] = await window.zombieOwnership.getZombiesByOwner($store[0]);
  console.log(zombie1Id);
  const zombie = await window.zombieOwnership.zombies(zombie1Id);

  alert(zombie1Id);
  console.log(zombie, extras)
}

</script>

{#if $store.length === 0}
  <ConnectWallet />
{:else}
  {#if isContractInitialized}
    <button on:click={createZombieForAddress}>Create Zombie</button>
  {:else}
    Nothing is here
  {/if}
{/if}

{JSON.stringify($store)}