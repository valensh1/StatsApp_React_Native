import React from 'react';
import { View, Text, Dimensions, Button, StyleSheet } from 'react-native';
import Logo from '../components/Logo';
import CustomButton from '../components/CustomButton';
import Colors from '../styles/colors_app';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation'; // import the type

interface Props extends NativeStackScreenProps<RootStackParamList, 'Home'> {}
const { height } = Dimensions.get('window');

const Home: React.FC<Props> = ({ navigation }) => {
  const createTeamHandler = (action: string) => {
    if (action === 'sport') {
      console.log('Sport was selected');
      navigation.navigate('ChooseSport');
    }
  };

  return (
    <View>
      <Logo height={height * 0.2} marginTop={height * 0.025} />
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
});
