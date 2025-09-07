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
import { auth, db, storage } from '../firebaseConfig';
import {
  doc,
  collection,
  getDoc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface Props
  extends NativeStackScreenProps<RootStackParamList, 'TeamInfo'> {}

const { height } = Dimensions.get('window');

//? Functional Component
const TeamInfoPage = ({ navigation, route }: Props) => {
  const { sport } = route.params;

  //? Use State
  const [teamType, setTeamType] = useState<
    'Travel/Club' | 'Rec/Park' | 'School' | ''
  >('');
  const [teamName, setTeamName] = useState<string>('');
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

  const teamTypeHandler = (
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

  // Uploads a local file URI to Storage, returns the downloadURL and storage path
  const uploadLogoAsync = async (localUri: string, storagePath: string) => {
    // fetch the file and turn it into a blob
    const res = await fetch(localUri);
    const blob = await res.blob();

    const fileRef = ref(storage, storagePath);
    await uploadBytes(fileRef, blob);
    const downloadURL = await getDownloadURL(fileRef);
    return { downloadURL, path: storagePath };
  };

  const buttonHandler = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.log('No authenticated user – please log in first.');
        navigation.navigate('Login');
        return;
      }
      const uid = user.uid;

      // make a new doc ref with an auto id
      const teamRef = doc(collection(db, 'teams'));
      console.log('uid:', uid);
      console.log('team id:', teamRef.id);
      console.log('team path:', teamRef.path);

      // optional logo upload
      let logoUrl: string | null = null;
      let logoStoragePath: string | null = null;
      if (logoUri) {
        try {
          const res = await fetch(logoUri);
          const blob = await res.blob();
          const path = `teamLogos/${uid}/${teamRef.id}.jpg`;
          const fileRef = ref(storage, path);
          await uploadBytes(fileRef, blob);
          logoUrl = await getDownloadURL(fileRef);
          logoStoragePath = path;
          console.log('Logo uploaded OK:', logoUrl);
        } catch (uploadErr: any) {
          console.log(
            'Logo upload failed:',
            uploadErr?.code,
            uploadErr?.message ?? uploadErr
          );
          // continue without logo
        }
      }

      const payload = {
        id: teamRef.id,
        createdBy: uid,
        sport, // from route.params
        teamType, // Travel/Club | Rec/Park | School
        teamName: (teamName ?? '').trim(),
        teamNameLower: (teamName ?? '').trim().toLowerCase(),
        logoUrl, // can be null
        logoStoragePath, // can be null
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      console.log('Writing payload:', payload);
      await setDoc(teamRef, payload, { merge: true });
      console.log('setDoc OK');

      // read it back to prove it exists
      const snap = await getDoc(teamRef);
      console.log('Successful creation of Team Information', snap.exists());
      if (snap.exists()) console.log('[saveTeam] data:', snap.data());

      // e.g. navigate to next step with teamId
      // navigation.navigate('TeamDashboard', { teamId: teamRef.id });
    } catch (e: any) {
      console.log('Firestore write FAILED:', e?.code, e?.message ?? e);
    } finally {
      navigation.navigate('AdditionalTeamInfo', {
        sport,
        teamName,
        teamType,
      });
    }
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
              buttonFunctionOnPress={() => teamTypeHandler('Travel/Club')}
            />
            <CustomButton
              text={'Rec/Park'}
              buttonBackgroundColor={
                teamType === 'Rec/Park'
                  ? colors.globalBackgroundColor
                  : colors.globalGray
              }
              buttonAdditionalStyleProps={{ width: '27.5%' }}
              buttonFunctionOnPress={() => teamTypeHandler('Rec/Park')}
            />
            <CustomButton
              text={'School'}
              buttonBackgroundColor={
                teamType === 'School'
                  ? colors.globalBackgroundColor
                  : colors.globalGray
              }
              buttonAdditionalStyleProps={{ width: '27.5%' }}
              buttonFunctionOnPress={() => teamTypeHandler('School')}
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
          buttonFunctionOnPress={buttonHandler}
          isDisabled={!isCompleted}
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
