import { createMachine, interpret } from "xstate";

const walletMachine = createMachine({
  id: "wallet",
  initial: "init",
  states: {
    init: {
      on: {
        ETHEREUM_NOT_FOUND: "no_ethereum",
        ETHEREUM_FOUND: "ethereum",
      },
    },
    ethereum: {
      on: {
        WALLET_CONNECTED: "with_wallet",
        WALLET_ADDRESS_NOT_FOUND: "no_wallet",
      },
    },
    no_ethereum: {
      type: "final",
    },
    no_wallet: {
      type: "final",
    },
    with_wallet: {
      type: "final",
    },
  },
});

export const walletService = interpret(walletMachine).start();
