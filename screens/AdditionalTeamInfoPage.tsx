import React from 'react';
import { View, Text, Dimensions, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation'; // import the type
import Logo from '../components/Logo';
import colors from '../styles/colors_app';
import CustomButton from '../components/CustomButton';
import axios from 'axios';

interface Props
  extends NativeStackScreenProps<RootStackParamList, 'AdditionalTeamInfo'> {}

const { height } = Dimensions.get('window');

const AdditionalTeamInfoPage = ({ navigation, route }: Props) => {
  //? Use State
  const [zipCode, setZipCode] = useState<string>('');

  const { sport, teamName, teamType } = route.params;
  console.log(
    'This is the additional team information',
    sport,
    teamName,
    teamType
  );

  const inputHandler = (text: string) => {
    console.log('This is the text entered', text);
    setZipCode(text);
  };

  const buttonHandler = async () => {
    try {
      // Zip Code API
      const response = await axios.get(
        `http://api.zippopotam.us/us/${zipCode}`
      );
      console.log('This is the full API response');
      console.log(
        `This is the response`,
        response.data.places[0]['place name']
      );
    } catch (error: any) {
      console.log('Not a valid zip code');
    }
  };

  return (
    <View style={styles.overallContainer}>
      <Logo height={height * 0.15} marginTop={0} />
      <Text style={styles.title}>
        Continue your {sport.toLowerCase()} team setup
      </Text>
      <View style={styles.contentContainer}>
        <View style={styles.textInputContainer}>
          <Text style={styles.labels}>
            What city is your {sport} team based in?
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="city / zip code"
            onChangeText={inputHandler}
            // value={zipCode}
          />
        </View>
        <View style={styles.textInputContainer}>
          <Text style={styles.labels}>
            What venue will your {sport} team play at?
          </Text>
          <TextInput style={styles.textInput} />
        </View>
        <View style={styles.textInputContainer}>
          <Text style={styles.labels}>
            What age group is your {sport} team?
          </Text>
          <TextInput style={styles.textInput} />
        </View>
      </View>
      <CustomButton
        text={'Next'}
        buttonAdditionalStyleProps={{ marginTop: '25%' }}
        buttonFunctionOnPress={buttonHandler}
      />
    </View>
  );
};
export default AdditionalTeamInfoPage;

const styles = StyleSheet.create({
  overallContainer: {
    height: '90%',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 30,
    fontWeight: 600,
    width: '80%',
    alignSelf: 'center',
  },
  contentContainer: {
    width: '90%',
    marginLeft: '5%',
  },
  textInputContainer: {
    marginTop: '10%',
  },
  labels: {
    fontSize: 18,
  },
  textInput: {
    borderColor: colors.globalGray,
    borderWidth: 1,
    borderRadius: 7,
    height: 40,
    paddingLeft: '2%',
    fontSize: 15,
  },
});
