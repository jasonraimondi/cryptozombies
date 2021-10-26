import { expect } from "chai";
import { ethers } from "hardhat";

import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import type { Contract } from "ethers";
import { BigNumber } from "ethers";

describe("ZombieOwnership", function () {

  let zombies: Contract;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let addr3: SignerWithAddress;

  beforeEach(async () => {
    [owner, addr1, addr2, addr3] = await ethers.getSigners();
    console.log("contract owner", owner.address);
    console.log("zombie owner", addr1.address);
    const ZombieOwnership = await ethers.getContractFactory("ZombieOwnership");
    zombies = await ZombieOwnership.deploy();
    await zombies.deployed();
  });

  it("allows a user to create 1 zombie", async function () {
    const createZombie = await zombies.connect(addr1).createRandomZombie("Fred Zombie");
    await createZombie.wait();
    const result = await zombies.getZombiesByOwner(addr1.address);
    expect(result).to.have.length(1);
    const foo: BigNumber = result[0];
    console.log(foo.toJSON());
  });
});
