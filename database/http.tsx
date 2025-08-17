import { useUserContext } from '../store/context/userContext';
import axios from 'axios';
import Constants from 'expo-constants';

// Pull your Firebase URL from expoConfig.extra
const { FIREBASE_URL } = Constants.expoConfig?.extra || {};

const useHttp = () => {
  const { user } = useUserContext(); // Uses `useUserContext` to get the user

  const postData = async () => {
    if (!user) return console.warn('User is not logged in'); // Ensures user exists before making the request

    try {
      const response = await axios.post(
        `${FIREBASE_URL}/sports.json?auth=${user.idToken}`, // Uses user's token
        {
          sports3: ['test1', 'test2', 'football', 'hockey'],
        }
      );
      console.log('Data posted successfully:', response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          'Error posting data:',
          error.response ? error.response.data : error.message
        );
      } else {
        console.error('Error posting data:', (error as Error).message);
      }
    }
  };

  const savePlayerAccountData = async (playerData: object) => {
    try {
      const response = await axios.post(
        `${FIREBASE_URL}/users.json?auth=${user.idToken}`,
        playerData
      );
      await console.log(response);
    } catch (error) {
      console.error('Unexpected error');
    }
  };

  return { postData, savePlayerAccountData }; // Returns `postData` so it can be called in any component
};

export default useHttp;
