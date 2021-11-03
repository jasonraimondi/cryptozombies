<script>
  import DebuggerState from "$lib/components/debugger/DebuggerState.svelte";

  let enableDebugger = false;
  let allowDebugging = import.meta.env.NODE_ENV !== "production";
</script>

{#if allowDebugging}
  {#if enableDebugger}
    <DebuggerState />
  {/if}
  <div class="toggler">
    <button on:click={() => (enableDebugger = !enableDebugger)}>debug</button>
  </div>
{/if}

<style>
  .toggler {
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 9999;
  }
</style>
