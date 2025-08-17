class StatCalcs {
  hockey: {
    goalie: {
      shotsOnGoal: (goals: number, shots: number) => number;
      savePercentage: (saves: number, totalShots: number) => string;
    };
    skater: {
      hockeyPoints: (goals: number, assists: number) => number;
    };
  };
  basketball: {
    basketballPoints: (
      twoPointFG: number,
      threePointFG: number,
      freeThrow: number
    ) => number;
  };

  constructor() {
    (this.hockey = {
      goalie: {
        shotsOnGoal: (goal, shots) => this.shotsOnGoal(goal, shots),
        savePercentage: (saves, totalShots) =>
          this.savePercentage(saves, totalShots),
      },
      skater: {
        hockeyPoints: (goals, assists) => this.hockeyPoints(goals, assists),
      },
    }),
      (this.basketball = {
        basketballPoints: (twoPointFG, threePointFG, freeThrow) =>
          this.basketball.basketballPoints(twoPointFG, threePointFG, freeThrow),
      });
  }
  shotsOnGoal(goals: number, saves: number) {
    return goals + saves;
  }

  savePercentage(saves: number, totalShots: number) {
    const result = Number(((saves / totalShots) * 100).toFixed(1));
    return isNaN(result) ? '0.0' : result.toFixed(1);
  }

  hockeyPoints(goals: number, assists: number) {
    return goals + assists;
  }

  basketballPoints(
    twoPointFG: number,
    threePointFG: number,
    freeThrow: number
  ) {
    return twoPointFG * 2 + threePointFG * 3 + freeThrow * 1;
  }
}
export default StatCalcs;
