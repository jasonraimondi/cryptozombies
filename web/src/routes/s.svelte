<script>
  import { interpret } from "xstate";
  import { createMachine } from "./machine";

  const toggleMachine = createMachine({
    id: "toggle",
    initial: "inactive",
    states: {
      inactive: {
        on: { TOGGLE: "active" },
      },
      active: {
        on: { TOGGLE: "inactive" },
      },
    },
  });

  const toggleService = interpret(toggleMachine).start();
</script>

<button on:click={() => toggleService.send("TOGGLE")}>
  {$toggleService.matches("inactive") ? "Off" : "On"}
</button>
