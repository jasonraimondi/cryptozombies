import { writable } from "svelte/store";

type State = {
  currentAddress?: string;
}

const INITIAL_STATE: State = {};

export const store = writable<State>(INITIAL_STATE);
