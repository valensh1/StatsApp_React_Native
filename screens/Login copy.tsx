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
import APIUtils from '../utils/APIUtilis';
import AppConstants from '../constants/constants';
import { useUserContext } from '../store/context/userContext';

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
        <View style={styles.loginContainer}>
          <View style={styles.singleFieldContainer}>
            <Text style={styles.labels}>Email Address</Text>
            <TextInput
              onChangeText={(text) => credentialHandler(text, 'emailAddress')}
              value={credentials.emailAddress}
              style={[styles.textInput, isFocused.email && styles.focusedState]}
              onFocus={() => setIsFocused({ email: true, password: false })}
              onBlur={() => setIsFocused({ ...isFocused, email: false })}
              autoCapitalize="none"></TextInput>
          </View>
          <View style={styles.singleFieldContainer}>
            <Text style={styles.labels}>Password</Text>
            <TextInput
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
                ? colors.globalBackgroundColor
                : colors.globalSecondaryColor
            }
            buttonTextColor={colors.globalAlternateColor}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    width: '85%',
    height: height * 0.3,
    backgroundColor: colors.globalAlternateColor,
    borderColor: colors.globalAlternateColor,
    borderWidth: 2,
    borderRadius: 15,
    justifyContent: 'center',
  },
  singleFieldContainer: {
    marginHorizontal: '5%',
    marginVertical: '5%',
  },
  labels: {
    color: colors.globalSecondaryColor,
    fontWeight: '500',
    fontSize: 15,
  },
  textInput: {
    borderColor: colors.globalSecondaryColor,
    color: colors.globalSecondaryColor,
    borderWidth: 2,
    borderRadius: 7,
    height: 40,
    paddingHorizontal: '3%',
  },
  focusedState: {
    backgroundColor: colors.globalSecondaryColor,
    color: colors.globalAlternateColor,
    fontWeight: 600,
  },
  loginButton: {
    width: '50%',
  },
  newUserButtonContainer: {
    marginTop: height * 0.015,
  },
  newUserButtonText: {
    fontSize: 15,
    color: colors.globalAlternateColor,
    fontWeight: 600,
  },
});

export default Login;
