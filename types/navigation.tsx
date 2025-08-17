// navigation.ts
export interface RootStackParamList {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  ChoosePosition: { sport: string };
  StatCounter: { sport: string; position: string };
  HistoricalStats: { stats: string; calculatedStats: string };

  // This allows any other string keys and satisfies ParamListBase
  [key: string]: undefined | { [key: string]: any };
}
