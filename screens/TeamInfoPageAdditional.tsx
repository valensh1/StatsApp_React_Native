import { View, Text, Dimensions, StyleSheet, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation'; // import the type
import Logo from '../components/Logo';
import colors from '../styles/colors_app';
import CustomButton from '../components/CustomButton';
import API from '../apis/api';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { useMemo } from 'react';
import Dropdown, { DropdownData } from '../components/Dropdown';
import useHttp from '../database/http';

interface Props
  extends NativeStackScreenProps<RootStackParamList, 'AdditionalTeamInfo'> {}

const { height } = Dimensions.get('window');

const AdditionalTeamInfoPage = ({ navigation, route }: Props) => {
  const { pullAgeGroups, patchRecord } = useHttp();

  //? UseEffect
  useEffect(() => {
    const fetchAgeGroups = async () => {
      const groups = await pullAgeGroups('allAgeGroupList', 'age');
      console.log(`This is the groups -> ${JSON.stringify(groups)}`);
      setAgeGroupDropdown(groups);
    };
    fetchAgeGroups();
  }, []);

  //? Use State
  const [userInputCityOrZipCode, setUserInputCityOrZipCode] =
    useState<string>('');
  const [cityFormattedAddress, setCityFormattedAddress] = useState<string>(''); // Need to add this to database
  const [userInputVenue, setUserInputVenue] = useState<string>('');
  const [formattedVenueAddress, setFormattedVenueAddress] =
    useState<string>('');
  const [formattedVenueName, setFormattedVenueName] = useState<string>(''); // Need to add this to database
  const [ageGroupDropdown, setAgeGroupDropdown] = useState<DropdownData[]>([]);
  const [ageGroupSelected, setAgeGroupSelected] = useState<string>(''); // Need to add this to database

  //? Use Memo
  const getFormattedCity = useMemo(
    () =>
      debounce(async (field: string, textEntered: string) => {
        const response:
          | { formattedName: string; formattedAddress: string }
          | undefined = await API.getCityAPI(textEntered);
        if (!response) return;
        const { formattedAddress, formattedName } = response;
        if (field === 'city') {
          setCityFormattedAddress(formattedAddress);
        } else {
          setFormattedVenueName(formattedName);
          setFormattedVenueAddress(formattedAddress);
        }
      }, 800),
    []
  );

  const { sport, teamName, teamType, teamRefId } = route.params;
  console.log(
    'This is the additional team information',
    sport,
    teamName,
    teamType,
    teamRefId
  );

  const inputHandler = (field: string, text: string) => {
    getFormattedCity(field, text);
    if (field === 'city') {
      setUserInputCityOrZipCode(text);
    } else {
      setUserInputVenue(text);
    }
  };

  const buttonHandler = async () => {
    try {
      console.log('Button has been clicked');
      patchRecord(teamRefId, {
        teamCityAddress: cityFormattedAddress,
        teamVenueName: formattedVenueName,
        teamVenueAddress: formattedVenueAddress,
        teamAgeGroup: ageGroupSelected,
      });
    } catch (error: any) {
      console.log('Not a valid zip code');
    }
  };

  const dropdownHandler = (text: string) => {
    setAgeGroupSelected(text);
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
            onChangeText={(text) => inputHandler('city', text)}
            value={userInputCityOrZipCode}
          />
        </View>
        <View style={styles.textInputContainer}>
          <Text style={styles.labels}>
            What venue will your {sport} team play at?
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => inputHandler('venue', text)}
            value={userInputVenue}
          />
        </View>
        <View style={styles.textInputContainer}>
          <Text style={[styles.labels, styles.labelForDropdown]}>
            What age group is your {sport} team?
          </Text>
          <Dropdown
            data={ageGroupDropdown}
            onSelect={(selection) => {
              dropdownHandler(selection);
            }}
          />
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
  labelForDropdown: {
    marginBottom: '-5%',
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
