export class Zombie {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly dna: string,
    public readonly level: number,
    public readonly winCount: number,
    public readonly lossCount: number,
    public readonly readyTime: Date,
  ) {}

  static fromContract(zombieId: string, res: any) {
    const zombie = { ...res };
    return new Zombie(
      zombieId,
      zombie.name,
      zombie.dna.toString(),
      zombie.level,
      zombie.winCount,
      zombie.lossCount,
      new Date(zombie.readyTime * 1000),
    );
  }
}
