import type { Web3Provider } from "@ethersproject/providers";
import type { ZombieOwnership } from "@jmondi/cryptozombies/typechain";
import { ethers } from "ethers";

import { ZombieOwnershipArtifact } from "$lib/api/zombie_ownership";
import { walletService } from "$lib/machines/wallet";
import { store } from "$lib/store";

export let provider: Web3Provider;
export let zombieOwnership: ZombieOwnership;

export function initEthereum() {
  if (window.ethereum) {
    _load();
  } else {
    window.addEventListener("ethereum#initialized", _load, { once: true });
    setTimeout(_load, 3000);
  }
}

export async function connectWallet() {
  const reconnect = async (currentAddress?: string) => {
    if (!currentAddress) {
      [currentAddress] = await window.ethereum.request({ method: "eth_requestAccounts" });
    }

    store.update(u => ({ ...u, currentAddress }));

    if (typeof currentAddress === "string") {
      walletService.send("WALLET_CONNECTED");
    } else {
      walletService.send("WALLET_ADDRESS_NOT_FOUND");
    }
  };

  await reconnect();

  window.ethereum.on("accountsChanged", ([currentAddress]) => {
    reconnect(currentAddress);
  });

  window.ethereum.on("chainChanged", () => {
    store.update(u => ({ ...u, currentAddress: undefined }));
    reconnect();
  });
}

function _load() {
  if (typeof import.meta.env.VITE_ZOMBIE_OWNERSHIP_ADDRESS !== "string") {
    throw new Error("missing zombie ownership contract address");
  }

  const { ethereum } = window;

  if (ethereum && ethereum.isMetaMask) {
    console.log("Ethereum successfully detected!");

    provider = new ethers.providers.Web3Provider(ethereum);

    zombieOwnership = new ethers.Contract(
      import.meta.env.VITE_ZOMBIE_OWNERSHIP_ADDRESS as string,
      ZombieOwnershipArtifact.abi,
      provider.getSigner(0),
    ) as ZombieOwnership;

    walletService.send("ETHEREUM_FOUND");
  } else {
    console.log("Please install MetaMask!");

    walletService.send("ETHEREUM_NOT_FOUND");
  }
}
