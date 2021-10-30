<script lang="ts">
  import { store } from "$lib/store";
  import { createZombie, getZombie, getZombies } from "$lib/api/zombie_ownership";

  let zombie;

  async function create() {
    await createZombie();
  }

  async function find() {
    const address = $store.currentAddress;
    const [id] = await getZombies(address);
    if (id) zombie = await getZombie(id);
  }
</script>

<button on:click={create}>Create Zombie</button>
<button on:click={find}>Find Zombie</button>

{#if zombie}
  <ul class="well">
    <li>id: {zombie.id}</li>
    <li>dna: {zombie.dna}</li>
    <li>name: {zombie.name}</li>
    <li>winCount: {zombie.winCount}</li>
    <li>lossCount: {zombie.lossCount}</li>
  </ul>
{/if}

<style>
  .well {
    background-color: tomato;
    color: white;
  }
</style>
