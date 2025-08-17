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
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import colors from '../styles/colors_app';
import APIUtils from '../utils/APIUtilis';
import AppConstants from '../constants/constants';
import ReactNativeModal from '../components/ReactNativeModal';

const { height } = Dimensions.get('window');

interface SignupCredentials {
  emailAddress: string;
  password: string;
  confirmPassword: string;
}

interface Props extends NativeStackScreenProps<RootStackParamList, 'Signup'> {}

const defaultSignupCredentials = {
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
        credentials.emailAddress,
        credentials.password
      );
      console.log(user);
      setShowModal(true);
      setTimeout(() => {
        console.log('Timer started');
        setShowModal(false);
        navigation.navigate('Home');
      }, 3000);
    }
  };

  //? JSX
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View>
        <View
          style={[
            styles.overallContainer,
            showModal && styles.modalMessageStyling,
          ]}>
          <View style={styles.signInTextInputContainer}>
            <View>
              <InputField
                label={'Email Address'}
                onChangeText={(text) =>
                  signUpCredentialHandler('emailAddress', text)
                }
              />
            </View>
            <View>
              <InputField
                label={'Password'}
                onChangeText={(text) =>
                  signUpCredentialHandler('password', text)
                }
                secureTextEntry={true}
              />
            </View>
            <View>
              <InputField
                label={'Confirm Password'}
                onChangeText={(text) =>
                  signUpCredentialHandler('confirmPassword', text)
                }
                secureTextEntry={true}
              />
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
                  ? colors.globalBackgroundColor
                  : colors.globalSecondaryColor
              }
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
    height: height * 0.9,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInTextInputContainer: {
    height: height * 0.4,
    width: '85%',
    backgroundColor: colors.globalAlternateColor,
    borderRadius: 15,
    justifyContent: 'space-evenly',
  },
  button: {
    width: '60%',
  },
  errorMessageContainer: {
    color: 'red',
    fontWeight: 600,
    width: '100%',
    textAlign: 'center',
  },
  modalMessageStyling: {
    //   opacity: 0.1,
  },
});
export default Signup;
