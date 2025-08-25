import {
  View,
  TextInput,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useState, useCallback, useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation'; // import the type
import { Platform } from 'react-native';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import colors from '../styles/colors_app';
import APIUtils from '../utils/APIUtilis';
import AppConstants from '../constants/constants';
import ReactNativeModal from '../components/ReactNativeModal';
import Logo from '../components/Logo';
import Dropdown from '../components/Dropdown';
import constants from '../constants/constants';

const { height } = Dimensions.get('window');

interface SignupCredentials {
  fullName: string;
  emailAddress: string;
  password: string;
  confirmPassword: string;
}

interface Props extends NativeStackScreenProps<RootStackParamList, 'Signup'> {}

const defaultSignupCredentials = {
  fullName: '',
  emailAddress: '',
  password: '',
  confirmPassword: '',
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
        credentials.fullName,
        credentials.emailAddress,
        credentials.password
      );
      console.log(user);
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
                placeholder="Full Name"
                autoCapitalize="none"
                onChangeText={(text) =>
                  signUpCredentialHandler('fullName', text)
                }></TextInput>
              <TextInput
                style={styles.textInput}
                placeholder="Email"
                autoCapitalize="none"
                onChangeText={(text) =>
                  signUpCredentialHandler('emailAddress', text)
                }></TextInput>
            </View>
            <View>
              <TextInput
                style={styles.textInput}
                placeholder="Password"
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText={(text) =>
                  signUpCredentialHandler('password', text)
                }></TextInput>
            </View>
            <View>
              <TextInput
                style={styles.textInput}
                placeholder="Confirm Password"
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText={(text) =>
                  signUpCredentialHandler('confirmPassword', text)
                }></TextInput>
              <Dropdown data={constants.signupRoles} />
            </View>
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
    width: '100%',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginTop: '5%',
    fontWeight: 600,
    fontSize: 35,
  },
  signInTextInputContainer: {
    height: height * 0.5,
    width: '85%',
    borderRadius: 15,
    justifyContent: 'flex-start',
  },
  textInput: {
    borderColor: colors.globalGray,
    borderWidth: 1,
    borderRadius: 7,
    height: 40,
    paddingLeft: '2%',
    marginTop: '5%',
  },
  button: {
    width: '60%',
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
});
export default Signup;
