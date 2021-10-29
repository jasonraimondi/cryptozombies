import { writable } from "svelte/store";

const INITIAL_STATE = [];

export const store = writable<string[]>(INITIAL_STATE);
