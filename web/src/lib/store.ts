import { writable } from "svelte/store";

type State = {
  currentAddress?: string;
};

export const store = writable<State>({});

export const zombies = writable<Record<string, any>>({});
