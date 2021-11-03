<script lang="ts">
  import { initializeWallet } from "$lib/services/ethereum_service";
</script>

<div>
  <h1>Welcome to CryptoZombies</h1>
  <h3>Let's get started...</h3>
  <button type="button" on:click={initializeWallet}>Connect Wallet</button>
</div>

<style>
  h1 {
    margin-bottom: 0.25em;
  }
  div {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  button {
    margin-top: 2em;
    background-color: var(--colors-blue-500);
    color: var(--colors-white);
    border: none;
    outline: none;
    padding: 1em;
    border-radius: 1em;
    transition: all 0.1s ease-in-out;
  }

  button:hover {
    background-color: var(--colors-blue-800);
  }
</style>
