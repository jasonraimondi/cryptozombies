<script lang="ts">
  import { resetState, state } from "$lib/state";

  function initialize(userAddress: string) {
    // This method initializes the dapp

    // We first store the user's address in the component's state
    state.update((s: any) => ({ ...s, selectedAddress: userAddress }))

    // Then, we initialize ethers, fetch the token's data, and start polling
    // for the user's balance.

    // Fetching the token data and the user's balance are specific to this
    // sample project, but you can reuse the same initialization pattern.
  }

  async function connectWallet() {
    const [selectedAddress] = await window.ethereum.enable();

    initialize(selectedAddress);

    // We reinitialize it whenever the user changes their account.
    window.ethereum.on("accountsChanged", ([newAddress]) => {
      initialize(newAddress);
    });

    // We reset the dapp state if the network is changed
    window.ethereum.on("networkChanged", ([networkId]) => {
      resetState();
    });
  }
</script>

<p>Please connect to your wallet.</p>
<button type="button" on:click={connectWallet}>Connect Wallet</button>