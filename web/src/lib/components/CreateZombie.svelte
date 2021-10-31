<script lang="ts">
  import { validateForm } from "@jmondi/form-validator";

  import { createZombie } from "$lib/api/zombie_ownership";
  import { createZombieSchema } from "$lib/forms";

  const data = {
    zombieName: "",
  };

  let errors: Record<string, string> = {};

  async function submit() {
    errors = await validateForm({ schema: createZombieSchema, data });
    if (!errors) await createZombie(data.zombieName);
  }
</script>

<form on:submit|preventDefault={submit}>
  <div>
    <label for="zombieName">Zombie Name</label>
    {#if errors?.zombieName}<span class="error">{errors.zombieName}</span>{/if}
    <input
      id="zombieName"
      name="zombieName"
      type="text"
      placeholder="Zombie"
      required="required"
      aria-label="zombie-name"
      aria-required="true"
      bind:value={data.zombieName}
    />
  </div>

  <button type="submit">Create Zombie</button>
</form>
