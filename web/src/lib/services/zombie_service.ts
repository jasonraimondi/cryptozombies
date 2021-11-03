import type { BigNumber } from "ethers";
import { ethers } from "ethers";
import type { ZombieOwnership } from "@jmondi/cryptozombies/typechain-types";
import ZombieOwnershipArtifact from "@jmondi/cryptozombies/artifacts/contracts/zombieownership.sol/ZombieOwnership.json";

import { zombies } from "$lib/store";
import { provider } from "$lib/services/ethereum_service";
import { withFancyErrorMessages } from "$lib/utils/fancy_error_messages";
import { Zombie } from "$lib/models/zombie";

export class ZombieService {
  constructor(private readonly contract: ZombieOwnership) {}

  async listZombieIds(address: string): Promise<BigNumber[]> {
    return withFancyErrorMessages(this.contract.getZombiesByOwner(address));
  }

  async getZombie(zombieId: string | BigNumber) {
    zombieId = typeof zombieId === "string" ? zombieId : zombieId.toString();
    const res = await withFancyErrorMessages(this.contract.zombies(zombieId));
    return Zombie.fromContract(zombieId, res);
  }

  async createZombie(name: string) {
    await withFancyErrorMessages(this.contract.createRandomZombie(name));
  }

  async attack(zombieId: string | BigNumber, targetId: string | BigNumber) {
    return withFancyErrorMessages(this.contract.attack(zombieId, targetId));
  }

  async listAllZombies() {
    return withFancyErrorMessages(this.contract.getAllZombies());
  }

  async listZombiesForAddress(address: string): Promise<Zombie[]> {
    const result: Zombie[] = [];
    const zombieIds = (await this.listZombieIds(address)) ?? [];

    for (const id of zombieIds) {
      const zombie = await this.getZombie(id);
      if (zombie) result.push(zombie);
    }

    return result;
  }

  async storeZombies(address: string) {
    const z = await this.listZombiesForAddress(address);
    const result = z.reduce((prev, next) => ({ ...prev, [next.id]: next }), {});
    zombies.set(result);
  }

  async getZombieOwner(zombieId: string | BigNumber) {
    return withFancyErrorMessages(this.contract.zombieToOwner(zombieId));
  }
}

let zombieService: ZombieService;

export function getZombieService() {
  const address = import.meta.env.VITE_ZOMBIE_OWNERSHIP_ADDRESS;

  if (typeof address !== "string") {
    throw new Error("missing zombie ownership contract address");
  }

  if (!zombieService) {
    const contract = new ethers.Contract(
      address,
      ZombieOwnershipArtifact.abi,
      provider.getSigner(0),
    ) as ZombieOwnership;

    zombieService = new ZombieService(contract);
  }

  return zombieService;
}
