<script lang="ts">
import { store } from "$lib/store";
import { ethers } from "ethers";
import { ZombieOwnershipArtifact } from "$lib/contracts";

let provider;

async function connectWallet() {
  provider = new ethers.providers.Web3Provider(window.ethereum)

  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

  console.log(accounts);

  initialize(accounts);

  // We reinitialize it whenever the user changes their account.
  window.ethereum.on("accountsChanged", (accounts) => {
    initialize(accounts);
  });

  // // We reset the dapp state if the network is changed
  // window.ethereum.on("networkChanged", ([networkId]) => {
  //   resetState();
  // });
}

function initialize(asdf: string[]) {
  store.set(asdf);

  window.zombieOwnership = new ethers.Contract(
    import.meta.env.VITE_ZOMBIE_OWNERSHIP_ADDRESS,
    ZombieOwnershipArtifact.abi,
    provider.getSigner(0),
  );
}
</script>

<p>Please connect to your wallet.</p>
<button type="button" on:click={connectWallet}>Connect Wallet</button>