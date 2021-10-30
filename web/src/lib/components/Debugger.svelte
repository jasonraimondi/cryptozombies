<script>
  import { store } from "$lib/store";
</script>

<div>
  <pre><code>{JSON.stringify($store, null, 2)}</code></pre>
</div>

<style>
  div {
    background-color: #bbbbbb;
    padding: 0 0.2rem;
  }
</style>
