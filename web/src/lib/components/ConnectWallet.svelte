<script lang="ts">
import { store } from "$lib/store";
import { ethers } from "ethers";
import { ZombieOwnershipArtifact } from "$lib/contracts";

let provider;

async function connectWallet() {
  provider = new ethers.providers.Web3Provider(window.ethereum)

  const [currentAddress] = await window.ethereum.request({ method: 'eth_requestAccounts' });

  initialize(currentAddress);

  // We reinitialize it whenever the user changes their account.
  window.ethereum.on("accountsChanged", ([currentAddress]) => {
    initialize(currentAddress);
  });

  // // We reset the dapp state if the network is changed
  // window.ethereum.on("networkChanged", ([networkId]) => {
  //   resetState();
  // });
}

function initialize(currentAddress: string) {
  store.set({ currentAddress });

  window.zombieOwnership = new ethers.Contract(
    import.meta.env.VITE_ZOMBIE_OWNERSHIP_ADDRESS,
    ZombieOwnershipArtifact.abi,
    provider.getSigner(0),
  );
}
</script>

<p>Please connect to your wallet.</p>
<button type="button" on:click={connectWallet}>Connect Wallet</button>