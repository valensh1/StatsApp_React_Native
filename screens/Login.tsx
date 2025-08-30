import { useState, useCallback, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation'; // import the type
import { LinearGradient } from 'expo-linear-gradient';
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
import APIUtils from '../utils/APIUtilis';
import AppConstants from '../constants/constants';
import { useUserContext } from '../store/context/userContext';
import Logo from '../components/Logo';

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

  //? HOOKS
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

  const isScreenFocused = useIsFocused();

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
    if (credentials.password.length >= AppConstants.minimumPasswordCharacters) {
      try {
        const loggedInUser = await APIUtils.loginUser(
          'signInWithPassword',
          credentials.emailAddress,
          credentials.password
        );
        console.log('This is the logged in user', loggedInUser);
        if (loggedInUser && loggedInUser[0] === 200) {
          setUser({
            idToken: loggedInUser[1].idToken,
            email: loggedInUser[1].email,
            displayName: loggedInUser[1].displayName,
          });
          navigation.navigate('Home');
        }
      } catch (error) {}
    } else {
      Alert.alert(
        'Log in error',
        'Passwords must be at least 7 characters in length. Check your credentials and try again!'
      );
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
