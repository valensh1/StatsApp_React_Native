import { useState, useCallback, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation'; // import the type
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import colors from '../styles/colors_app';
import AppConstants from '../constants/constants';
import { useUserContext } from '../store/context/userContext';
import Logo from '../components/Logo';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

interface Credentials {
  emailAddress: string;
  password: string;
}

interface Props extends NativeStackScreenProps<RootStackParamList, 'Login'> {}

const { height } = Dimensions.get('window');

const defaultCredentials: Credentials = {
  emailAddress: '',
  password: '',
};

const Login: React.FC<Props> = ({ navigation }) => {
  const { user, setUser } = useUserContext();

  //? Use State
  const [credentials, setCredentials] =
    useState<Credentials>(defaultCredentials);
  const [isFocused, setIsFocused] = useState<{
    email: boolean;
    password: boolean;
  }>({
    email: false,
    password: false,
  });
  const [isInputFieldsEmpty, setIsInputFieldsEmpty] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState(false);

  const isScreenFocused = useIsFocused();

  //? HOOKS
  useEffect(() => {
    if (isScreenFocused) {
      setCredentials(defaultCredentials); // Reset input fields when navigating back
    }
  }, [isScreenFocused]);

  //? FUNCTIONS
  const credentialHandler = (text: string, fieldName: keyof Credentials) => {
    const updatedCredentials = { ...credentials, [fieldName]: text };
    setCredentials(updatedCredentials);
    updatedCredentials.emailAddress && updatedCredentials.password.length >= 7
      ? setIsInputFieldsEmpty(false)
      : setIsInputFieldsEmpty(true);
  };

  const navigateToSignInPage = () => {
    navigation.navigate('Signup');
  };

  const loginButtonHandler = async () => {
    if (credentials.password.length < AppConstants.minimumPasswordCharacters) {
      Alert.alert(
        `Login Error','Passwords must be at least ${AppConstants.minimumPasswordCharacters} characters`
      );
      return;
    }

    try {
      setSubmitting(true);
      //Firebase method that comes with importing firebase SDK (firebaseConfig.ts allows us to call this method)
      const firebaseCredentials = await signInWithEmailAndPassword(
        auth,
        credentials.emailAddress.trim(),
        credentials.password
      );
      // fetch a fresh ID token (optional; useful if you store it in context)
      const idToken = await firebaseCredentials.user.getIdToken();
      setUser({
        idToken,
        email: firebaseCredentials.user.email ?? '',
        displayName: firebaseCredentials.user.displayName ?? '',
      });
      navigation.navigate('Home');
    } catch (e: any) {
      console.log('Auth error:', e?.code, e?.message);
      // Map a few common codes to friendly messages
      let msg = '';
      if (
        e?.code === 'auth/invalid-credential' ||
        e?.code === 'auth/wrong-password' ||
        e?.code === 'auth/user-not-found'
      ) {
        msg = 'Email or password is incorrect.';
      } else if (e?.code === 'auth/too-many-requests') {
        msg = 'Too many attempts. Please try again later.';
      }
      Alert.alert('Authentication Failed', msg);
    } finally {
      setSubmitting(false);
    }
  };

  //? JSX
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.overallContainer}>
        <Logo height={height * 0.3} marginTop={height * 0.025} />
        <View style={styles.loginContainer}>
          <Text style={styles.slogan}>
            Track your stats. Build your future.
          </Text>
          <View style={styles.singleFieldContainer}>
            <TextInput
              placeholder="Email"
              placeholderTextColor={'#B0B0B0'}
              onChangeText={(text) => credentialHandler(text, 'emailAddress')}
              value={credentials.emailAddress}
              style={[styles.textInput, isFocused.email && styles.focusedState]}
              onFocus={() => setIsFocused({ email: true, password: false })}
              onBlur={() => setIsFocused({ ...isFocused, email: false })}
              autoCapitalize="none"></TextInput>
          </View>
          <View style={styles.singleFieldContainer}>
            <TextInput
              placeholder="Password"
              placeholderTextColor={'#B0B0B0'}
              onChangeText={(text) => credentialHandler(text, 'password')}
              value={credentials.password}
              style={[
                styles.textInput,
                isFocused.password && styles.focusedState,
              ]}
              onFocus={() => setIsFocused({ password: true, email: false })}
              onBlur={() => setIsFocused({ ...isFocused, password: false })}
              autoCapitalize="none"
              secureTextEntry={true}></TextInput>
          </View>
        </View>
        <View style={styles.loginButton}>
          <CustomButton
            text={'Log In'}
            buttonBackgroundColor={
              isInputFieldsEmpty
                ? colors.globalGray
                : colors.globalBackgroundColor
            }
            buttonTextColor={colors.globalWhiteText}
            buttonFunctionOnPress={loginButtonHandler}
          />
        </View>
        <TouchableOpacity
          style={styles.newUserButtonContainer}
          onPress={navigateToSignInPage}>
          <Text style={styles.newUserButtonText}>Create a new user</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  overallContainer: {
    width: '100%',
    height: height * 1,
    // backgroundColor: '',
  },
  logo: {
    height: height * 0.35, // Takes screen height calculated by dimensions from React Native and makes the height 35% of that calculated screen height amount. Keeps dynamic.
    alignSelf: 'center',
    marginTop: '5%',
  },
  loginContainer: {
    width: '85%',
    height: height * 0.23,
    borderRadius: 15,
    borderColor: '#1E3A8A',
    borderWidth: 2,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: '5%',
  },
  slogan: {
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: 800,
    fontSize: 15,
  },
  singleFieldContainer: {
    marginHorizontal: '2%',
    marginVertical: '5%',
    borderWidth: 0,
    borderColor: colors.globalGray,
  },
  textInput: {
    borderColor: colors.globalGray,
    borderWidth: 1,
    borderRadius: 7,
    height: 40,
    paddingLeft: '2%',
  },
  focusedState: {
    fontWeight: 600,
  },
  loginButton: {
    width: '50%',
    alignSelf: 'center',
  },
  newUserButtonContainer: {
    marginTop: height * 0.015,
  },
  newUserButtonText: {
    fontSize: 15,
    color: colors.globalAlternateColor,
    fontWeight: 600,
    alignSelf: 'center',
  },
});

export default Login;
