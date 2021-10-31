<script lang="ts">
  import { createZombie } from "$lib/api/zombie_ownership";

  let zombieName: string;

  async function create() {
    await createZombie(zombieName);
  }
</script>

<label>
  Zombie Name
  <input type="text" bind:value={zombieName} />
</label>
<button on:click={create}>Create Zombie</button>
