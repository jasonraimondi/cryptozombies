<script lang="ts">
import { browser } from '$app/env';

import { store } from "$lib/store";
import ConnectWallet from "$lib/components/ConnectWallet.svelte";
import { BigNumber } from "ethers";

$: isContractInitialized = browser && window.zombieOwnership === undefined;

async function getZombies(): Promise<BigNumber[]> {
  return window.zombieOwnership.getZombiesByOwner($store.currentAddress);
}

async function getZombie(zombieId: string | BigNumber) {
  zombieId = typeof zombieId === "string" ? zombieId : zombieId.toString();
  const zombie = await window.zombieOwnership.zombies(zombieId);
  return { id: zombieId, ...zombie };
}

let zombie;

async function createZombie() {
  await window.zombieOwnership.createRandomZombie("Ruby").catch(() => {});
  const [id] = await getZombies();
  zombie = await getZombie(id);
  console.log({ zombie })
}
</script>

{#if !$store.currentAddress}
  <ConnectWallet />
{:else}
  {#if isContractInitialized}
    <button on:click={createZombie}>Fetch Zombie</button>
  {:else}
    Nothing is here
  {/if}
{/if}

{JSON.stringify($store)}

{#if zombie}
<div>
  <p>id: {zombie.id}</p>
  <p>dna: {zombie.dna}</p>
  <p>name: {zombie.name}</p>
  <p>winCount: {zombie.winCount}</p>
  <p>lossCount: {zombie.lossCount}</p>
</div>
{/if}