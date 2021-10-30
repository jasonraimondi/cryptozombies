import { zombieOwnership } from "$lib/ethereum";
import type { BigNumber } from "ethers";

export async function getZombies(address: string): Promise<BigNumber[]> {
  return tryIt(
    zombieOwnership.getZombiesByOwner(address)
  );
}

export async function getZombie(zombieId: string | BigNumber) {
  zombieId = typeof zombieId === "string" ? zombieId : zombieId.toString();
  const zombie = await tryIt(
    zombieOwnership.zombies(zombieId),
  );
  return { id: zombieId, ...zombie };
}

export async function createZombie() {
  await tryIt(
    zombieOwnership.createRandomZombie("Ruby")
  );
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
