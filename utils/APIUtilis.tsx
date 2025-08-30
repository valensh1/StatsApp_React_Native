import axios from 'axios';
import Constants from 'expo-constants';
import { Alert } from 'react-native';
import { G } from 'react-native-svg';

// Define your Firebase Web API Key here or import it from a config file
const { FIREBASE_WEB_API_KEY, FIREBASE_URL } =
  Constants.expoConfig?.extra || {};

class APIUtils {
  public static async createUser(
    mode: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: string
  ) {
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${FIREBASE_WEB_API_KEY}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      );
      const { localId, idToken } = response.data;
      console.log(`This is the create user response ${response.data}`);

      // Creating an entry in the Firebase database for users
      const response2 = await axios.post(
        `${FIREBASE_URL}/users.json?auth=${idToken}`, // Uses user's token,
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          role: role,
        }
      );
      console.log(`This is the response 2 ${response2.data}`);
      return { auth: response.data, userCreation: response2.data };
    } catch (error: any) {
      console.error(`Signup error`, error.response.data);
      Alert.alert(
        'Sign Up Failed',
        'There was an error creating your user account. Please try again!'
      );
    }
  }

  public static async loginUser(mode: string, email: string, password: string) {
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${FIREBASE_WEB_API_KEY}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      );
      console.log(`This is the response from the database`, response);
      return [response.status, response.data];
    } catch (error) {
      Alert.alert(
        'Authentication Failed',
        'Could not log you in. Please check your credentials and try again!'
      );
    }
  }
}
export default APIUtils;
