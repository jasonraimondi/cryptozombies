<script lang="ts">
  import joi from "joi";
  import { createForm, validateForm } from "@jmondi/form-validator";
  import { getZombieService } from "$lib/services/zombie_service";
  import { currentAddress } from "$lib/store";

  type FormData = {
    zombieName: string;
  };

  let formData = {
    zombieName: "",
  };

  const createZombieSchema = createForm<FormData>({
    zombieName: joi.string().min(3).max(200).required(),
  });

  let errors: Record<string, string>;

  async function submit() {
    errors = await validateForm({ schema: createZombieSchema, data: formData });
    if (!errors) await getZombieService().createZombie(formData.zombieName);
    await getZombieService().storeZombies($currentAddress);
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
      bind:value={formData.zombieName}
    />
  </div>

  <button type="submit">Create Zombie</button>
</form>
