<script>
  import { store } from "$lib/store";
  import { zombieOwnership } from "$lib/ethereum";

  $: data = {
    ...$store,
    contract: zombieOwnership?.address,
  };
</script>

<div>
  <pre><code>{JSON.stringify(data, null, 2)}</code></pre>
</div>

<style>
  div {
    background-color: #bbbbbb;
    padding: 0 0.2rem;
  }
</style>
