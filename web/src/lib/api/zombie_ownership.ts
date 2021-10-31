import type { BigNumber } from "ethers";
import ZombieOwnershipArtifact from "@jmondi/cryptozombies/artifacts/contracts/zombieownership.sol/ZombieOwnership.json";

import { zombieOwnership } from "$lib/ethereum";
import { zombies } from "$lib/store";

export { ZombieOwnershipArtifact };

export async function getAllZombiesForAddress(address: string) {
  const result: Record<string, any> = {};

  const zombieIds = (await getZombies(address)) ?? [];

  for (const id of zombieIds) {
    result[id.toHexString()] = await getZombie(id);
  }

  console.log(result);

  // zombies.set(result);
}

export async function getZombies(address: string): Promise<BigNumber[]> {
  return tryIt(zombieOwnership.getZombiesByOwner(address));
}

export async function getZombie(zombieId: string | BigNumber) {
  zombieId = typeof zombieId === "string" ? zombieId : zombieId.toString();
  const zombie = await tryIt(zombieOwnership.zombies(zombieId));
  return { id: zombieId, ...zombie };
}

export async function createZombie(name: string) {
  await tryIt(zombieOwnership.createRandomZombie(name));
}

async function tryIt<T = any>(attempt: Readonly<Promise<T>>) {
  const callable = () => attempt;
  try {
    return await callable();
  } catch (e) {
    if (e.data.message) {
      const contractErrorMessage = e.data.message.split("'")[1];
      console.log(contractErrorMessage);
    } else if (e.code === 4001) {
      console.log("User cancelled the transaction");
    } else {
      console.log(JSON.stringify(e));
    }
  }
}
