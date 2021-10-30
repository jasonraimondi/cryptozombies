/// <reference types="@sveltejs/kit" />
/// <reference types="ethers" />

import type { ZombieOwnership } from "@jmondi/cryptozombies/typechain/ZombieOwnership";

declare global {
  interface Window {
    ethereum: any;
    zombieOwnership: ZombieOwnership;
  }
}
