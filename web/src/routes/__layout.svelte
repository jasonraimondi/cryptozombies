<script lang="ts">
  import "normalize.css/normalize.css";
  import "../app.pcss";

  import { onMount } from "svelte";

  import { walletMachine } from "$lib/services/wallet_machine";
  import Debugger from "$lib/components/debugger/Debugger.svelte";
  import ConnectWallet from "$lib/components/ConnectWallet.svelte";
  import { initializeEthereum } from "$lib/services/ethereum_service";

  onMount(() => {
    if (window.ethereum) {
      initializeEthereum();
    } else {
      window.addEventListener("ethereum#initialized", initializeEthereum, { once: true });
      setTimeout(initializeEthereum, 3000);
    }
  });
</script>

<main>
  {#if $walletMachine.matches("init")}
    <p>Checking for Ethereum</p>
  {:else if $walletMachine.matches("no_ethereum")}
    <p>Install Metamask to get started</p>
  {:else if $walletMachine.matches("ethereum")}
    <ConnectWallet />
  {:else if $walletMachine.matches("no_wallet")}
    <p>I couldnt find a wallet address...</p>
  {:else if $walletMachine.matches("with_wallet")}
    <!-- Show the application after the wallet has been identified -->
    <slot />
  {:else}
    <p>If this is showing, that means a state in the $walletService is not being caught.</p>
  {/if}
</main>

<Debugger />
