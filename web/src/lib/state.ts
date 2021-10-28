import { writable } from "svelte/store";

const INITIAL_STATE = {
  // The info of the token (i.e. It's Name and symbol)
  tokenData: undefined,
  // The user's address and balance
  selectedAddress: undefined,
  balance: undefined,
  // The ID about transactions being sent, and any possible error with them
  txBeingSent: undefined,
  transactionError: undefined,
  networkError: undefined,
};

export const state = writable(INITIAL_STATE);

export const resetState = () => state.set(INITIAL_STATE);
