import sportPositions from '../database/positions';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation'; // import the type
import colors from '../styles/colors_app';

interface Props
  extends NativeStackScreenProps<RootStackParamList, 'ChoosePosition'> {}

const ChoosePositionPage = ({ navigation, route }: Props) => {
  const { sport } = route.params; // <-- access your sport param // Retrieves the sport from the URL path
  const positions: string[] = sportPositions[sport.toLowerCase()]; // Retrieves the sport positions

  const choosePositionHandler = (position: string) => {
    console.log(`This is the position that was clicked ${position}`);
    navigation.navigate('StatCounter', { sport, position });
  };

  return (
    <View style={styles.container}>
      <View style={styles.positionButtonContainer}>
        {positions.map((position) => {
          return (
            <Pressable
              style={styles.positionButtons}
              onPress={() => choosePositionHandler(position)}
              key={position}>
              <Text style={styles.buttonText}>{position}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  positionButtonContainer: {
    width: '50%',
    alignItems: 'center',
  },
  positionButtons: {
    backgroundColor: colors.globalSecondaryColor,
    borderWidth: 2,
    boxShadow: '20',
    borderRadius: 3,
    borderColor: colors.globalAlternateColor,
    shadowColor: 'black', // shadow color (black in this case)
    shadowOffset: { width: 5, height: 5 }, // offset of the shadow (vertical shadow here)
    shadowOpacity: 0.8, // opacity of the shadow
    shadowRadius: 10, // blur radius of the shadow

    // Android Elevation
    elevation: 60, // adds a shadow on Android devices
    width: '80%',
    height: '15%',
    marginVertical: 25,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    color: colors.globalAlternateColor,
    fontWeight: 600,
  },
});
export default ChoosePositionPage;
