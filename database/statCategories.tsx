interface SportStatCategories {
  [key: string]: {
    [key: string]: string[];
  };
}

const statCategories: SportStatCategories = {
  hockey: {
    goalie: ['Saves', 'Goals'],
    goalieCalcs: ['SOG', 'Save %'],
    skater: ['Goals', 'Assists'],
    skaterCalcs: ['Points', 'Rebounds'],
  },
  basketball: {
    guard: ['FG', '3PT', 'FT', 'Assists', 'Rebounds', 'Steals', 'Blocks'],
    guardCalcs: ['PTS', 'AST', 'REB', 'STL', 'BLK'],
    forward: ['FG', '3PT', 'FT', 'Assists', 'Rebounds', 'Steals', 'Blocks'],
    forwardCalcs: ['PTS', 'AST', 'REB', 'STL', 'BLK'],
    center: ['FG', '3PT', 'FT', 'Assists', 'Rebounds', 'Steals', 'Blocks'],
    centerCalcs: ['PTS', 'AST', 'REB', 'STL', 'BLK'],
  },
};
export default statCategories;
