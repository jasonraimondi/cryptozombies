// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { artifacts, ethers } from "hardhat";
import { ZombieOwnership } from "../typechain-types";

async function main() {
  // We get the contract to deploy
  const ZombieOwnership = await ethers.getContractFactory("ZombieOwnership");
  const zombieOwnership = await ZombieOwnership.deploy();

  await zombieOwnership.deployed();

  console.log("ZombieOwnership deployed to:", zombieOwnership.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
