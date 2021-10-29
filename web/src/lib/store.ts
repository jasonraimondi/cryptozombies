import { writable } from "svelte/store";

type State = {
  isWeb3?: boolean;
  currentAddress?: string;
}

const INITIAL_STATE: State = {};

export const store = writable<State>(INITIAL_STATE);
