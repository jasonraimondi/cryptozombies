import { store } from "$lib/store";

function handleEthereum() {
  const { ethereum } = window;
  if (ethereum && ethereum.isMetaMask) {
    console.log('Ethereum successfully detected!');
    store.update(u => ({ ...u, isWeb3: true }))
  } else {
    console.log('Please install MetaMask!');
    store.update(u => ({ ...u, isWeb3: false }))
  }
}

export function initialize() {
  if (window.ethereum) {
    handleEthereum();
  } else {
    window.addEventListener('ethereum#initialized', handleEthereum, { once: true });
    setTimeout(handleEthereum, 3000);
  }
}
