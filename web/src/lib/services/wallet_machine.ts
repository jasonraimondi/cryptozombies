import { createMachine, interpret } from "@xstate/fsm";

const machine = createMachine({
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
    no_ethereum: {},
    no_wallet: {},
    with_wallet: {},
  },
});

export const walletMachine = interpret(machine).start();
