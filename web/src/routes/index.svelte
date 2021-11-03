<script lang="ts">
  import CreateZombie from "$lib/components/CreateZombie.svelte";
  import { currentAddress, zombies } from "$lib/store";
  import { getZombieService } from "$lib/services/zombie_service";

  let z: any = [];
  $: isFirstZombie = $zombies.length === 0;
  $: {
    getZombieService().storeZombies($currentAddress);
  }

  async function doIt() {
    const result = await getZombieService().attack("0", "1");
    console.log(result);
  }

  $: getZombieService()
    .listAllZombies()
    .then(zombies => (z = zombies));
</script>

{#if isFirstZombie}
  <h4>Create Your First Zombie!</h4>
  <CreateZombie />
{:else}
  <ul>
    <li>Zombies</li>
    <li>count: {z.length}</li>
    {#each z as zombie, id}
      <ul style="margin: 0.5em; background-color: var(--colors-blue-500);">
        {#await getZombieService().getZombieOwner(id) then owner}
          {#if owner.toLowerCase() === $currentAddress.toLowerCase()}
            <li>MINE</li>
          {:else}
            <li>Owner: {owner}</li>
          {/if}
        {/await}
        <li>ID: {id}</li>
        <li>Name: {zombie.name}</li>
        <li>DNA: {zombie.dna}</li>
        <li>Level: {zombie.level}</li>
        <li>Wins: {zombie.winCount}</li>
        <li>Losses: {zombie.lossCount}</li>
      </ul>
    {/each}
  </ul>

  <button on:click={doIt}>Attack another zombie</button>
{/if}
