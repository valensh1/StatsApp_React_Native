import { View, Text, TextInput, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useEffect, useState } from 'react';
import DropdownComponent from '../components/Dropdown';
import colors from '../styles/colors_app';
import { useUserContext } from '../store/context/userContext';
import useHttp from '../database/http';

interface Props
  extends NativeStackScreenProps<RootStackParamList, 'HistoricalStats'> {}

const HistoricalPlayerStats: React.FC<Props> = ({ navigation, route }) => {
  const placeholderText = '#FFD700';
  let { stats, calculatedStats } = route.params;
  console.log(`These are the stats that are being passed in ${stats}`);
  console.log(
    `These are the calculated stats that are being passed in ${calculatedStats}`
  );
  const { postData } = useHttp();

  //? USE STATE
  const [gameStats, setGameStats] = useState<{
    [key: string]: string | number;
  }>({});
  const [isFocused, setIsFocused] = useState(false);

  //? USE EFFECT
  // Set state upon loading of page to the stats being pushed through expo router to this page from the stat counter page; Need to convert from string back to object and set state accordingly
  useEffect(() => {
    postData(); // THIS MAKES A POST REQUEST TO THE FIREBASE DATABASE
    if (typeof stats === 'string' && typeof calculatedStats === 'string') {
      setGameStats({ ...JSON.parse(stats), ...JSON.parse(calculatedStats) });
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabels}>Team Name</Text>
        <TextInput
          style={[styles.textInput, isFocused && styles.focusedState]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}></TextInput>
      </View>
      <DropdownComponent />
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabels}>Game Date</Text>
        <TextInput style={styles.textInput}></TextInput>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabels}>Home Team Final Score</Text>
        <TextInput
          placeholderTextColor={placeholderText}
          style={styles.numberInput}></TextInput>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabels}>Visiting Team Final Score</Text>
        <TextInput
          placeholderTextColor={placeholderText}
          style={styles.numberInput}></TextInput>
      </View>
      {/* <Text>{gameStats.ft}</Text> */}
      {Object.entries(gameStats).map(([key, value]) => {
        return (
          <View key={Math.random() * 10}>
            <Text>{key}</Text>
            <Text>{value}</Text>
          </View>
        );
      })}
      ;
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0080C6',
    height: '100%',
  },
  inputContainer: {
    margin: 10,
    marginHorizontal: 15,
    width: '90%',
  },
  inputLabels: {
    color: 'dark blue',
    position: 'relative',
    fontWeight: '500',
    marginBottom: 5,
    fontSize: 15,
  },
  focusedState: {
    backgroundColor: colors.globalSecondaryColor,
    color: colors.globalAlternateColor,
    fontWeight: 600,
  },
  textInput: {
    color: colors.globalSecondaryColor,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: 600,
    borderRadius: 10,
    borderColor: colors.globalSecondaryColor,
    borderWidth: 2,
  },
  numberInput: {
    backgroundColor: '#0080C6',
    color: '#FFD700',
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    borderRadius: 10,
    borderColor: '#FFD700',
    borderWidth: 2,
    width: '15%',
  },
});
export default HistoricalPlayerStats;
