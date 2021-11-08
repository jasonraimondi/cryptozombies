//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./zombiehelper.sol";
import "./safemath.sol";
import "hardhat/console.sol";

contract ZombieAttack is ZombieHelper {

  using SafeMath for uint256;
  using SafeMath32 for uint32;
  using SafeMath16 for uint16;

  uint256 randNonce = 0;
  uint attackVictoryProbability = 70;

  event BattleLoss(uint zombieId, uint lossCount);
  event BattleWin(uint zombieId, uint winCount);

  function randMod(uint _modulus) internal returns (uint) {
    randNonce = randNonce.add(1);
    return uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, randNonce))) % _modulus;
  }

  function attack(uint _zombieId, uint _targetId) external onlyOwnerOf(_zombieId) {
    Zombie storage myZombie = zombies[_zombieId];
    Zombie storage targetZombie = zombies[_targetId];
    uint rand = randMod(100);
    if (rand <= attackVictoryProbability) {
      console.log("you won!! %s", rand);
      myZombie.winCount = myZombie.winCount.add(1);
      myZombie.level = myZombie.level.add(1);
      targetZombie.lossCount = targetZombie.lossCount.add(1);
      emit BattleWin(_zombieId, myZombie.lossCount);
      emit BattleLoss(_targetId, targetZombie.winCount);
      (_zombieId, targetZombie.dna, "zombie");
    } else {
      console.log("you lost!! %s", rand);

      myZombie.lossCount = myZombie.lossCount.add(1);
      targetZombie.winCount = targetZombie.winCount.add(1);
      _triggerCooldown(myZombie);
      emit BattleLoss(_zombieId, myZombie.lossCount);
      emit BattleWin(_targetId, targetZombie.winCount);
    }
  }
}
