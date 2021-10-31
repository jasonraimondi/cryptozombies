<script lang="ts">
  import { getAllZombiesForAddress } from "$lib/api/zombie_ownership";
  import { onMount } from "svelte";
  import CreateZombie from "$lib/components/CreateZombie.svelte";
  import { store, zombies } from "$lib/store";

  onMount(async () => {
    await getAllZombiesForAddress($store.currentAddress);
  });

  $: zombieIds = Object.keys($zombies)
  $: zombieValues = Object.values($zombies)
  $: isFirstZombie = zombieIds.length === 0;
</script>

<ul>
  <li>Zombies</li>
  <li>count: {zombieIds.length}</li>
  {#each zombieValues as zombie}
    <li>{JSON.stringify(zombie, null, 2)}</li>
  {/each}
</ul>

{#if isFirstZombie}
  <h4>Create Your First Zombie!</h4>
  <CreateZombie />
{/if}
