import { writable } from "svelte/store";

export const currentAddress = writable<string>();

export const zombies = writable<Record<string, any>>({});
