import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import statCategories from '../database/statCategories';
import AntDesign from '@expo/vector-icons/AntDesign';
import StatCalcs from '../database/statCalcs';
import HelperFunctions from '../utils/HelperFunctions';
import ConfirmModal from '../components/ConfirmModal';
import ModalMessages from '../database/modalMessages';
import colors from '../styles/colors_app';

interface Props
  extends NativeStackScreenProps<RootStackParamList, 'StatCounter'> {}

const StatCounterPage: React.FC<Props> = ({ navigation, route }) => {
  //? Variables
  // Retrieves and destructures sport and position from the URL
  let { sport, position } = route.params;
  sport = sport.toLowerCase();
  position = position.toLowerCase();
  console.log(
    `This is the sport -> ${sport} and this is the position ${position}`
  );

  //? UseRef
  let resetAllStats = useRef<{ [key: string]: number }>({});

  //? UseState
  const [stats, setStats] = useState<{ [key: string]: number }>({});
  const [calculatedStats, setCalculatedStats] = useState<{
    [key: string]: number | string;
  }>({});
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  //? UseEffect
  // Initial Loading of Stat Counter page code
  useEffect(() => {
    navigation.setOptions({
      headerTitle: `${HelperFunctions.capitalizeFirstLetter(position)} Stats`,
    });
    const obj: { [key: string]: number } = {};
    const categories = statCategories[sport][position];
    for (let category of categories) {
      obj[category.toLowerCase()] = 0;
    }
    console.log(obj);
    resetAllStats.current = { ...obj }; // Sets useRef with all stats at 0 when clear button is pressed
    setStats(obj); // Sets all the stats related to sport at 0

    const calculatedStatsObj: { [key: string]: number } = {};
    const statsToCalc = statCategories[sport][`${position}Calcs`];
    statsToCalc.forEach((stat) => {
      console.log(`This is each STAT -> ${stat}`);
      calculatedStatsObj[stat.toLowerCase()] = 0;
    });
    setCalculatedStats(calculatedStatsObj);
  }, []);

  useEffect(() => {
    const statCalcs = new StatCalcs();
    switch (sport) {
      case 'hockey': {
        if (position === 'goalie') {
          const shotsOnGoal = statCalcs.hockey.goalie.shotsOnGoal(
            stats.goals,
            stats.saves
          );
          console.log(`This is the shots on goal ${shotsOnGoal}`);

          const savePercentage = statCalcs.hockey.goalie.savePercentage(
            stats.saves,
            shotsOnGoal
          );
          console.log(`This is the save % ${savePercentage}`);
          setCalculatedStats({
            ...calculatedStats,
            sog: shotsOnGoal,
            ['save %']: savePercentage,
          });
        } else if (position === 'skater') {
          const points = statCalcs.hockey.skater.hockeyPoints(
            stats.goals,
            stats.assists
          );
          setCalculatedStats({ ...calculatedStats, points });
        } else {
          console.log(`NO POSITION WITH CALCULATED STATS FOUND!!!`);
        }
        break;
      }
      case 'basketball': {
        setCalculatedStats({
          ...calculatedStats,
          PTS: statCalcs.basketballPoints(stats.fg, stats['3pt'], stats.ft),
          AST: stats.assists,
          REB: stats.rebounds,
          STL: stats.steals,
          BLK: stats.blocks,
        });
        break;
      }
      default:
        console.log(`No sport of ${sport} found!!!`);
    }
  }, [stats]);

  //? Functions
  const statHandler = (stat: string, direction: string): void => {
    const increment = (stat: string) => {
      return { [stat]: stats[stat] + 1 };
    };

    const decrement = (stat: string) => {
      if (stats[stat]) {
        return { [stat]: stats[stat] - 1 };
      }
    };

    const updatedStat =
      direction === 'plus' ? increment(stat) : decrement(stat);

    setStats({ ...stats, ...updatedStat });
  };

  const clearSingleStat = (stat: string): void => {
    setStats({ ...stats, [stat]: 0 });
  };

  const clearAllStats = (): void => {
    setStats(resetAllStats.current);
  };

  // When OK button is tapped on to end game
  const gameOverConfirm = (): void => {
    // router.push(`sportPositions/basketball/historical_stats`);
    navigation.navigate('HistoricalStatsPage', {
      // Passing of stats and calculated stats to historical_stats page; params only allows strings to be passed so need to stringify then convert to object in imported file
      stats: JSON.stringify(stats),
      calculatedStats: JSON.stringify(calculatedStats),
    });
  };

  //? JSX
  return (
    <View style={styles.overallContainer}>
      {/* CALCULATION SECTION */}
      <View style={styles.statsCalcs}>
        {Object.keys(calculatedStats).map((stat) => {
          return (
            <View key={stat}>
              <Text key={stat} style={styles.calculatedStatCategoryText}>
                {stat.toUpperCase()}
              </Text>
              <Text key={`${stat}2`} style={styles.calculatedStatText}>
                {calculatedStats[stat]}
              </Text>
            </View>
          );
        })}
      </View>
      <View style={styles.gameControls}>
        <Pressable>
          <Text style={styles.gameControlButton} onPress={clearAllStats}>
            CLEAR ALL
          </Text>
        </Pressable>
        <ConfirmModal
          buttonText="GAME OVER"
          modalMessage={ModalMessages.endGame}
          onConfirm={gameOverConfirm}
          sport={sport}
        />
      </View>
      <ScrollView style={styles.statsContainerScrollContainer}>
        {/* STATS SECTION */}
        {Object.keys(stats).map((stat) => {
          return (
            <View style={styles.statCountersContainer} key={stat}>
              <View style={styles.singleStatContainer}>
                <Text style={styles.statCategoryText}>
                  {stat.toUpperCase()}
                </Text>
                <Text style={styles.statText}>{stats[stat]}</Text>
              </View>
              <View style={styles.incrementIconContainer}>
                <Pressable>
                  <AntDesign
                    name="minussquare"
                    size={35}
                    style={[styles.minusPlusButtons]}
                    onPress={() => statHandler(stat, 'minus')}
                  />
                </Pressable>
                <Pressable>
                  <AntDesign
                    name="plussquare"
                    size={35}
                    style={[styles.minusPlusButtons]}
                    onPress={() => statHandler(stat, 'plus')}
                  />
                </Pressable>
                <Pressable
                  style={styles.clearButton}
                  onPress={() => clearSingleStat(stat)}>
                  <Text style={styles.clearButtonText}>Clear</Text>
                </Pressable>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

//? CSS Styling
const styles = StyleSheet.create({
  overallContainer: {
    flex: 1,
  },
  statsCalcs: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: '3%',
    backgroundColor: colors.globalAlternateColor,
    marginTop: 60,
    padding: 7,
  },
  calculatedStatCategoryText: {
    fontSize: 20,
    fontWeight: 600,
    color: colors.globalSecondaryColor,
  },
  calculatedStatText: {
    fontSize: 20,
    fontWeight: 600,
    color: colors.globalSecondaryColor,
    textAlign: 'center',
  },
  gameControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  gameControlButton: {
    backgroundColor: colors.globalAlternateColor,
    borderColor: colors.globalSecondaryColor,
    color: 'red',
    fontWeight: 600,
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 15,
  },
  statsContainerScrollContainer: {
    flexGrow: 1,
  },
  statCountersContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 15,
  },
  singleStatContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  incrementIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
  },
  minusPlusButtons: {
    backgroundColor: colors.globalAlternateColor,
    color: colors.globalSecondaryColor,
    shadowColor: 'black',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 15,
  },
  clearButton: {
    backgroundColor: colors.globalAlternateColor,
    borderColor: colors.globalAlternateColor,
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 15,
  },
  clearButtonText: {
    fontWeight: '700',
    fontSize: 12,
    color: colors.globalSecondaryColor,
  },
  statCategoryText: {
    fontSize: 18,
    fontWeight: '700',
  },
  statText: {
    fontSize: 18,
    fontWeight: '500',
  },
});
export default StatCounterPage;
