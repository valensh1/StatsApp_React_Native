import {
  View,
  Text,
  TextInput,
  Dimensions,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
  Image,
  Button,
} from 'react-native';
import { useState, useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation'; // import the type
import colors from '../styles/colors_app';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Logo from '../components/Logo';
import CustomButton from '../components/CustomButton';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

interface Props
  extends NativeStackScreenProps<RootStackParamList, 'TeamInfo'> {}

const { height } = Dimensions.get('window');

const TeamInfoPage = ({ navigation, route }: Props) => {
  const { sport } = route.params;

  //? Use State
  const [teamType, setTeamType] = useState<
    'Travel/Club' | 'Rec/Park' | 'School' | ''
  >('');
  const [teamName, setTeamName] = useState<string | null>(null);
  const [logoUri, setLogoUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  //? useEffect
  useEffect(() => {
    if (teamType && teamName && logoUri) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  }, [teamType, teamName, logoUri]);

  const buttonPressHandler = (
    type: 'Travel/Club' | 'Rec/Park' | 'School'
  ): void => {
    setTeamType(type);
  };

  const inputHandler = (name: string) => {
    setTeamName(name);
    console.log(`Team name is ${name}`);
  };

  const pickTeamLogo = async () => {
    // Open photo library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1], // square crop (great for logos)
      quality: 0.9,
    });

    if (!result.canceled) {
      const pickedUri = result.assets[0].uri;

      try {
        const manipulated = await ImageManipulator.manipulateAsync(
          pickedUri,
          [{ resize: { width: 600 } }],
          {
            compress: 0.8,
            format: ImageManipulator.SaveFormat.JPEG,
          }
        );

        console.log(manipulated.uri);
        setLogoUri(manipulated.uri);
      } catch (err) {
        console.error('Image manipulation failed', err);
        // fallback to original picked image
        setLogoUri(pickedUri);
      }
    }
  };

  const deleteImage = () => {
    setLogoUri(null);
    console.log('Deleted the image');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.overallContainer}>
        <Logo height={height * 0.1} marginTop={height * 0.025} />

        <View style={styles.teamTypeContainer}>
          <Text
            style={
              styles.questionText
            }>{`What type of ${sport.toLowerCase()} team are you creating?`}</Text>
          <View style={styles.teamTypeButtonContainer}>
            <CustomButton
              text={'Travel/Club'}
              buttonBackgroundColor={
                teamType === 'Travel/Club'
                  ? colors.globalBackgroundColor
                  : colors.globalGray
              }
              buttonAdditionalStyleProps={{
                width: '27.5%',
              }}
              buttonFunctionOnPress={() => buttonPressHandler('Travel/Club')}
            />
            <CustomButton
              text={'Rec/Park'}
              buttonBackgroundColor={
                teamType === 'Rec/Park'
                  ? colors.globalBackgroundColor
                  : colors.globalGray
              }
              buttonAdditionalStyleProps={{ width: '27.5%' }}
              buttonFunctionOnPress={() => buttonPressHandler('Rec/Park')}
            />
            <CustomButton
              text={'School'}
              buttonBackgroundColor={
                teamType === 'School'
                  ? colors.globalBackgroundColor
                  : colors.globalGray
              }
              buttonAdditionalStyleProps={{ width: '27.5%' }}
              buttonFunctionOnPress={() => buttonPressHandler('School')}
            />
          </View>
        </View>

        <View style={styles.teamNameInputContainer}>
          <Text
            style={
              styles.questionText
            }>{`What is your ${sport.toLowerCase()} team's name?`}</Text>
          <TextInput
            style={styles.teamNameInput}
            autoCapitalize={'words'}
            onChangeText={(team) => inputHandler(team)}
          />
        </View>

        <View style={styles.teamLogoOverallContainer}>
          <Text style={styles.questionText}>
            Upload your team logo (optional)
          </Text>

          <Pressable
            onPress={pickTeamLogo}
            style={{ alignSelf: 'center', marginTop: 12 }}>
            {logoUri ? (
              <Image
                source={{ uri: logoUri }}
                style={{ width: 120, height: 120, borderRadius: 12 }}
              />
            ) : (
              <FontAwesome6
                name="image"
                size={100}
                color={colors.globalBackgroundColor}
                style={styles.imageIcon}
              />
            )}
          </Pressable>
          {logoUri && <Button title={'Delete Image'} onPress={deleteImage} />}
        </View>

        <CustomButton
          text={'Next'}
          buttonAdditionalStyleProps={{ marginTop: '15%' }}
          buttonBackgroundColor={
            isCompleted ? colors.globalBackgroundColor : colors.globalGray
          }
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
export default TeamInfoPage;

const styles = StyleSheet.create({
  overallContainer: {},
  teamTypeContainer: {
    marginTop: '7.5%',
    alignSelf: 'center',
    width: '90%',
  },
  questionText: {
    fontSize: 20,
  },
  teamTypeButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  teamNameInputContainer: {
    marginTop: '15%',
    width: '90%',
    alignSelf: 'center',
  },
  teamNameInput: {
    borderColor: colors.globalGray,
    borderWidth: 1,
    borderRadius: 7,
    height: 40,
    paddingLeft: '2%',
    marginTop: '5%',
    fontSize: 18,
  },
  teamLogoOverallContainer: {
    position: 'relative',
    marginTop: '15%',
    width: '90%',
    alignSelf: 'center',
  },
  imageIcon: {
    alignSelf: 'center',
  },
});
