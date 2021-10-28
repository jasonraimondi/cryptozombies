// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { artifacts, ethers } from "hardhat";
import { ZombieOwnership } from "../typechain";
import { BaseContract } from "ethers";

async function main() {
  // We get the contract to deploy
  const ZombieOwnership = await ethers.getContractFactory("ZombieOwnership");
  const zombieOwnership = await ZombieOwnership.deploy();

  await zombieOwnership.deployed();

  console.log("Greeter deployed to:", zombieOwnership.address);
  saveFrontendFiles(zombieOwnership);

}


function saveFrontendFiles(contract: ZombieOwnership) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../web/src/lib/contracts";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + "/contract-address.json",
    JSON.stringify({ ZombieOwnership: contract.address }, undefined, 2)
  );

  const ZombieOwnershipArtifact = artifacts.readArtifactSync("ZombieOwnership");

  fs.writeFileSync(
    contractsDir + "/ZombieOwnership.json",
    JSON.stringify(ZombieOwnershipArtifact, null, 2)
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
