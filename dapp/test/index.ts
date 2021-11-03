import { expect } from "chai";
import { ethers } from "hardhat";

import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import type { Contract } from "ethers";

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
    const createZombie1 = await zombies.connect(addr1).createRandomZombie("Ruby");
    await createZombie1.wait();
    const createZombie2 = await zombies.connect(addr2).createRandomZombie("Dooby");
    await createZombie2.wait();

    const [zombie1Id, ...extras] = await zombies.getZombiesByOwner(addr1.address);
    const zombie = await zombies.zombies(zombie1Id);

    // const [zombie2Id] = await zombies.getZombiesByOwner(addr1.address);
    // const zombie2 = await zombies.zombies(zombie2Id);
    // const attack = await zombies.connect(addr1).attack(zombie1Id, zombie2Id);
    // await attack.wait();

    expect(extras).to.have.length(0);
    expect(zombie.name).to.equal("Fred Zombie");
    expect(zombie.level).to.equal(1);
    expect(zombie.winCount).to.equal(0);
    expect(zombie.lossCount).to.equal(0);
    expect(await zombies.zombieToOwner(zombie1Id)).to.equal(addr1.address);
  });
});
