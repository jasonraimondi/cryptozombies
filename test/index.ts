import { expect } from "chai";
import { ethers } from "hardhat";

describe("ZombieFactory", function () {
  it("should allow a user to create 1 zombie", async function () {
    const [owner, addr1] = await ethers.getSigners();

    // const ZombieFactory = await ethers.getContractFactory("ZombieFactory");
    // const factory = await ZombieFactory.deploy();
    // await factory.deployed();

    const ZombieHelper = await ethers.getContractFactory("ZombieHelper");
    const helper = await ZombieHelper.deploy();
    await helper.deployed();

    console.log("this is NOT IT", owner.address);
    console.log("this is the owner", addr1.address);

    const createZombie = await helper
      .connect(addr1)
      .createRandomZombie("Fred Zombie");
    await createZombie.wait();

    const result = await helper.getZombiesByOwner(addr1.address);

    expect(result).to.have.length(1);
  });
});
