import { ethers } from "ethers";
import type { Web3Provider } from "@ethersproject/providers";

import { walletMachine } from "$lib/services/wallet_machine";
import { currentAddress } from "$lib/store";

export let provider: Web3Provider;

export function initializeEthereum() {
  if (window.ethereum?.isMetaMask) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    walletMachine.send("ETHEREUM_FOUND");
  } else {
    walletMachine.send("ETHEREUM_NOT_FOUND");
  }
}

export async function initializeWallet() {
  await setWallet();

  window.ethereum.on("accountsChanged", async ([currentAddress]) => {
    await setWallet(currentAddress);
  });

  window.ethereum.on("chainChanged", async () => {
    await setWallet();
  });
}

export async function setWallet(address?: string) {
  if (!address) [address] = await window.ethereum.request({ method: "eth_requestAccounts" });

  if (typeof address === "string") {
    currentAddress.set(address);
    walletMachine.send("WALLET_CONNECTED");
  } else {
    currentAddress.set(undefined);
    walletMachine.send("WALLET_ADDRESS_NOT_FOUND");
  }
}
