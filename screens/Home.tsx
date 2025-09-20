import { View, Text, Dimensions, Button, StyleSheet } from 'react-native';
import Logo from '../components/Logo';
import CustomButton from '../components/CustomButton';
import Colors from '../styles/colors_app';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation'; // import the type
import { auth } from '../firebaseConfig';

interface Props extends NativeStackScreenProps<RootStackParamList, 'Home'> {}
const { height } = Dimensions.get('window');

const Home = ({ navigation }: Props) => {
  //? Variables
  const userName =
    auth.currentUser?.displayName === null ? '' : auth.currentUser?.displayName;

  //? Functions
  const createTeamHandler = (action: string) => {
    if (action === 'sport') {
      console.log('Sport was selected');
      navigation.navigate('ChooseSport');
    }
  };

  return (
    <View>
      <Logo height={height * 0.15} marginTop={height * 0.02} />
      <View style={styles.textContainer}>
        <Text style={[styles.text, styles.welcomeText]}>
          {userName ? `Welcome ${userName}!` : 'Welcome!'}
        </Text>
        <Text
          style={[
            styles.text,
            styles.questionText,
          ]}>{`What would you like to do?`}</Text>
      </View>
      <View style={styles.overallContainer}>
        <CustomButton
          text="Create Team"
          buttonBackgroundColor={Colors.globalBackgroundColor}
          buttonTextColor="white"
          buttonAdditionalStyleProps={{ width: '85%', alignSelf: 'center' }}
          navigation={'ChooseSport'}
          buttonFunctionOnPress={() => createTeamHandler('sport')}
        />
        <CustomButton
          text="Update Team"
          buttonBackgroundColor={Colors.globalBackgroundColor}
          buttonTextColor="white"
          buttonAdditionalStyleProps={{ width: '85%', alignSelf: 'center' }}
        />
        <CustomButton
          text="Create Game Schedule"
          buttonBackgroundColor={Colors.globalBackgroundColor}
          buttonTextColor="white"
          buttonAdditionalStyleProps={{ width: '85%', alignSelf: 'center' }}
        />
        <CustomButton
          text="Track Stats"
          buttonBackgroundColor={Colors.globalBackgroundColor}
          buttonTextColor="white"
          buttonAdditionalStyleProps={{ width: '85%', alignSelf: 'center' }}
        />
      </View>
    </View>
  );
};
export default Home;
const styles = StyleSheet.create({
  overallContainer: {
    marginTop: '2.5%',
  },
  textContainer: {
    alignItems: 'center',
  },
  text: {
    marginTop: '5%',
    color: Colors.globalBackgroundColor,
  },
  welcomeText: {
    fontSize: 25,
  },
  questionText: {
    fontSize: 18,
  },
});
