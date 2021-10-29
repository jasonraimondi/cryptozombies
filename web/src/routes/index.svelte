<script lang="ts">
import { browser } from '$app/env';

import { store } from "$lib/store";
import ConnectWallet from "$lib/components/ConnectWallet.svelte";

$: isContractInitialized = browser && window.zombieOwnership === undefined;

async function getZombies() {
  return window.zombieOwnership.getZombiesByOwner($store.currentAddress);
}

async function getZombie(zombieId: string) {
  return window.zombieOwnership.zombies(zombieId);
}

async function createZombie() {
  await window.zombieOwnership.createRandomZombie("Ruby");
  const zombies = await getZombies();
  console.log({ zombies })
  const zombie = await getZombie(zombies[0]);
  console.log({ zombie })
}
</script>

{#if !$store.currentAddress}
  <ConnectWallet />
{:else}
  {#if isContractInitialized}
    <button on:click={createZombie}>Create Zombie</button>
  {:else}
    Nothing is here
  {/if}
{/if}

{JSON.stringify($store)}