<script lang="ts">
  import { store } from "$lib/store";
  import { createZombie, getZombie, getZombies } from "$lib/api/zombie_ownership";

  let zombie;
  let zombies = [];

  let zombieName: string;

  async function create() {
    await createZombie(zombieName);
  }

  async function find() {
    const address = $store.currentAddress;
    zombies = await getZombies(address);
    if (zombies[0]) {
      zombie = await getZombie(zombies[0]);
    }
  }
</script>

<style>
  .well {
    background-color: tomato;
    color: white;
  }
</style>

<input type="text" bind:value={zombieName}>

<button on:click={create}>Create Zombie</button>
<button on:click={find}>Find Zombie</button>

{#if zombies}
  <ul>
    {#each zombies as z}
      <li>id: {z.toString()}</li>
    {/each}
  </ul>
{/if}

{#if zombie}
  <ul class="well">
    <li>id: {zombie.id}</li>
    <li>dna: {zombie.dna}</li>
    <li>name: {zombie.name}</li>
    <li>winCount: {zombie.winCount}</li>
    <li>lossCount: {zombie.lossCount}</li>
  </ul>
{/if}
