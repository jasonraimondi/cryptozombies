<script lang="ts">
  import { onDestroy, onMount } from "svelte";

  import CreateZombie from "$lib/components/CreateZombie.svelte";
  import { currentAddress, zombies } from "$lib/store";
  import { getZombieService } from "$lib/services/zombie_service";

  const zombieService = getZombieService();

  let z: any = [];

  async function doIt() {
    const result = await getZombieService().attack("0", "1");
    console.log("AttackResult", result);
  }

  $: {
    getZombieService().storeZombies($currentAddress);
  }

  $: getZombieService()
    .listAllZombies()
    .then(zombies => (z = zombies));

  onMount(() => {
    zombieService.contract.on("Transfer", (transfer) => {
      console.log("Transfer", transfer);
    });

    zombieService.contract.on("BattleWin", (zombieId) => {
      console.log("BattleWin", zombieId);
    });

    zombieService.contract.on("BattleLoss", (zombieId) => {
      console.log("BattleLoss", zombieId);
    });
  });

  onDestroy(() => {
    zombieService.contract.removeAllListeners();
  });
</script>



  <h4>Create Your First Zombie!</h4>
  <CreateZombie />

{#if $zombies.length === 0}
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
