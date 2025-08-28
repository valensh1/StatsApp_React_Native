import {
  View,
  TextInput,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useState, useCallback, useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation'; // import the type
import { Platform } from 'react-native';
import CustomButton from '../components/CustomButton';
import colors from '../styles/colors_app';
import APIUtils from '../utils/APIUtilis';
import AppConstants from '../constants/constants';
import ReactNativeModal from '../components/ReactNativeModal';
import Logo from '../components/Logo';
import Dropdown from '../components/Dropdown';
import constants from '../constants/constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { height } = Dimensions.get('window');
const inputBoxHeight = 40;
const halfOfInputBoxHeight = inputBoxHeight / 2;
const passwordIconHeight = 24;

interface SignupCredentials {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  confirmPassword: string;
  role: string;
}

interface Props extends NativeStackScreenProps<RootStackParamList, 'Signup'> {}

const defaultSignupCredentials = {
  firstName: '',
  lastName: '',
  emailAddress: '',
  password: '',
  confirmPassword: '',
  role: '',
};

const Signup: React.FC<Props> = ({ navigation }) => {
  //? USE STATE
  const [credentials, setCredentials] = useState<SignupCredentials>(
    defaultSignupCredentials
  );
  const [isInputFieldsEmpty, setIsInputFieldsEmpty] = useState<boolean>(true);
  const [isPasswordCriteriaMet, setIsPasswordCriteriaMet] =
    useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<{
    password: boolean;
    confirmPassword: boolean;
  }>({
    password: false,
    confirmPassword: false,
  });

  //? HOOKS
  useEffect(() => {
    setIsInputFieldsEmpty(
      credentials.emailAddress &&
        credentials.password.length >= AppConstants.minimumPasswordCharacters &&
        credentials.confirmPassword.length >=
          AppConstants.minimumPasswordCharacters
        ? false
        : true
    );
  }, [credentials]);

  //? FUNCTIONS
  const signUpCredentialHandler = useCallback(
    (field: keyof SignupCredentials, text: string): void => {
      setCredentials((prev) => ({
        ...prev,
        [field]: text,
      }));
    },
    [credentials] // Empty array will not re-create function on every render
  );

  const showPasswordHandler = (field: 'password' | 'confirmPassword') => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const buttonFunctionOnPress = async () => {
    if (credentials.password !== credentials.confirmPassword) {
      setIsPasswordCriteriaMet(false);
      setErrorMessage('Passwords do NOT match...please try again!');
    } else if (
      credentials.password.length < AppConstants.minimumPasswordCharacters
    ) {
      setIsPasswordCriteriaMet(false);
      setErrorMessage(
        'Passwords need to have at least 7 characters...please try again!'
      );
    } else {
      setIsPasswordCriteriaMet(true);
      const user = await APIUtils.createUser(
        'signUp',
        credentials.firstName,
        credentials.lastName,
        credentials.emailAddress,
        credentials.password,
        credentials.role
      );
      console.log('This is the user from Signup being logged', user);
      setShowModal(true);
      setTimeout(() => {
        console.log('Timer started');
        setShowModal(false);
        navigation.navigate('Login');
      }, 3000);
    }
  };

  //? JSX
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View>
        <Logo height={height * 0.125} marginTop={height * 0.025} />
        <Text style={styles.title}>Create Account</Text>
        <View
          style={[
            styles.overallContainer,
            showModal && styles.modalMessageStyling,
          ]}>
          <View style={styles.signInTextInputContainer}>
            <View>
              <TextInput
                style={styles.textInput}
                placeholder="First Name"
                autoCapitalize="none"
                onChangeText={(text) =>
                  signUpCredentialHandler('firstName', text)
                }></TextInput>
              <TextInput
                style={styles.textInput}
                placeholder="Last Name"
                autoCapitalize="none"
                onChangeText={(text) =>
                  signUpCredentialHandler('lastName', text)
                }></TextInput>
              <TextInput
                style={styles.textInput}
                placeholder="Email"
                autoCapitalize="none"
                onChangeText={(text) =>
                  signUpCredentialHandler('emailAddress', text)
                }></TextInput>
            </View>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.textInput, styles.passwordInput]}
                placeholder="Password"
                autoCapitalize="none"
                secureTextEntry={!showPassword.password}
                onChangeText={(text) =>
                  signUpCredentialHandler('password', text)
                }></TextInput>
              <TouchableOpacity
                onPress={() => showPasswordHandler('password')}
                style={styles.passwordIconContainer}>
                <Icon
                  name={showPassword.password ? 'eye-off' : 'eye'}
                  size={passwordIconHeight}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.textInput, styles.passwordInput]}
                placeholder="Confirm Password"
                autoCapitalize="none"
                secureTextEntry={!showPassword.confirmPassword}
                onChangeText={(text) =>
                  signUpCredentialHandler('confirmPassword', text)
                }></TextInput>
              <TouchableOpacity
                onPress={() => showPasswordHandler('confirmPassword')}
                style={styles.passwordIconContainer}>
                <Icon
                  name={showPassword.confirmPassword ? 'eye-off' : 'eye'}
                  size={passwordIconHeight}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            <Dropdown
              data={constants.signupRoles}
              onSelect={(selectedRole: string) =>
                signUpCredentialHandler('role', selectedRole)
              }
            />
            <View>
              <Text style={styles.errorMessageContainer}>
                {!isPasswordCriteriaMet && errorMessage}
              </Text>
            </View>
          </View>
          <View style={styles.button}>
            <CustomButton
              text={'Sign Up'}
              buttonBackgroundColor={
                isInputFieldsEmpty
                  ? colors.globalGray
                  : colors.globalBackgroundColor
              }
              buttonTextColor={colors.globalWhiteText}
              buttonFunctionOnPress={buttonFunctionOnPress}
            />
          </View>
        </View>
        {showModal && (
          <ReactNativeModal
            message={'Account successfully created. Please log into account.'}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  overallContainer: {
    position: 'relative',
    width: '100%',
  },
  title: {
    textAlign: 'center',
    marginTop: '5%',
    fontWeight: 600,
    fontSize: 35,
  },
  signInTextInputContainer: {
    height: height * 0.57,
    width: '85%',
    borderRadius: 15,
    justifyContent: 'flex-start',
    marginLeft: '7.5%',
  },
  textInput: {
    borderColor: colors.globalGray,
    borderWidth: 1,
    borderRadius: 7,
    height: inputBoxHeight,
    paddingLeft: '2%',
    marginTop: '5%',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    verticalAlign: 'middle',
    width: '100%',
  },
  passwordInput: {
    flex: 1,
  },
  button: {
    width: '60%',
    alignSelf: 'center',
    marginTop: Platform.select({
      ios: '-32%',
      android: '-18%',
    }),
  },
  errorMessageContainer: {
    color: 'red',
    fontWeight: 600,
    width: '100%',
    textAlign: 'center',
    marginTop: '5%',
  },
  modalMessageStyling: {},
  passwordIconContainer: {
    position: 'absolute',
    right: '2.5%', // distance from right edge
    top: 24, // vertical center
  },
});
export default Signup;
