interface SportPositions {
  [key: string]: string[];
}

const sportPositions: SportPositions = {
  baseball: ['Pitcher', 'Fielder'],
  basketball: ['Guard', 'Forward', 'Center'],
  football: ['Offense', 'Defense'],
  hockey: ['Goalie', 'Skater'],
};
export default sportPositions;
