import { expect } from "chai";
import { ethers } from "hardhat";

describe("ZombieFactory", function () {
  it("Should return the new greeting once it's changed", async function () {
    const [userAccount] = await ethers.getSigners();

    const ZombieFactory = await ethers.getContractFactory("ZombieFactory");
    const factory = await ZombieFactory.deploy();
    await factory.deployed();

    const ZombieHelper = await ethers.getContractFactory("ZombieHelper");
    const helper = await ZombieHelper.deploy();
    await helper.deployed();

    const createZombie = await factory.createRandomZombie("Fred Zombie");
    await createZombie.wait();

    const result = await helper.getZombiesByOwner(userAccount.address);

    expect(result).to.have.length(1);
    // if (web3.eth.accounts[0] !== userAccount) {
    //   userAccount = web3.eth.accounts[0];
    //
    //   getZombiesByOwner(userAccount)
    //     .then(displayZombies);
    // }


    // const setGreetingTx = await greeter.setGreeting("Hola, mundo!");
    // wait until the transaction is mined
    // await setGreetingTx.wait();
    // expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
