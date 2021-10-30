<script lang="ts">
  import { store } from "$lib/store";
  import { ethers } from "ethers";
  import { ZombieOwnershipArtifact } from "$lib/contracts";
  import { ZombieOwnership } from "@jmondi/cryptozombies/typechain";

  let provider;

  async function connectWallet() {
    provider = new ethers.providers.Web3Provider(window.ethereum);

    const [currentAddress] = await window.ethereum.request({ method: "eth_requestAccounts" });

    setAddress(currentAddress);

    // We reinitialize it whenever the user changes their account.
    window.ethereum.on("accountsChanged", ([currentAddress]) => {
      setAddress(currentAddress);
    });

    // // We reset the dapp state if the network is changed
    // window.ethereum.on("networkChanged", ([networkId]) => {
    //   resetState();
    // });
  }

  function setAddress(currentAddress: string) {
    store.update((u) => ({ ...u, currentAddress }));

    window.zombieOwnership = new ethers.Contract(
      import.meta.env.VITE_ZOMBIE_OWNERSHIP_ADDRESS,
      ZombieOwnershipArtifact.abi,
      provider.getSigner(0),
    ) as ZombieOwnership;
  }
</script>

<p>Please connect to your wallet.</p>
<button type="button" on:click={connectWallet}>Connect Wallet</button>
