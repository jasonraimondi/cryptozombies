<script lang="ts">
  import { onMount } from "svelte";

  import { initEthereum } from "$lib/ethereum";
  import { walletService } from "$lib/machines/wallet";

  import Debugger from "$lib/components/Debugger.svelte";
  import ConnectWallet from "$lib/components/ConnectWallet.svelte";

  onMount(initEthereum);
</script>

{#if $walletService.matches("init")}
  <p>Checking for Ethereum</p>
{:else if $walletService.matches("no_ethereum")}
  <p>Install Metamask to get started</p>
{:else if $walletService.matches("ethereum")}
  <ConnectWallet />
{:else if $walletService.matches("no_wallet")}
  <p>I couldnt find a wallet address...</p>
{:else if $walletService.matches("with_wallet")}
  <slot />
{/if}

<Debugger />
