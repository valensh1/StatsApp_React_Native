import { useUserContext } from '../store/context/userContext';
import axios from 'axios';
import Constants from 'expo-constants';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

// Pull your Firebase URL from expoConfig.extra
const { FIREBASE_URL, FIREBASE_PROJECT_ID } = Constants.expoConfig?.extra || {};

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

  const pullAgeGroups = async (document: string, field: string) => {
    const ref = doc(db, 'teamAgeGroups', document); // <- docId
    const snap = await getDoc(ref);

    if (!snap.exists()) return [];

    // ✅ The field inside this doc is called "age"
    const arr: string[] = (snap.get(field) as string[]) ?? [];

    // Format for your dropdown
    return arr.map((v) => ({ label: v, value: v }));
  };

  const patchRecord = async (
    documentId: string,
    fields: { [key: string]: string }
  ): Promise<boolean> => {
    try {
      const ref = doc(db, 'teams', documentId);
      await setDoc(ref, { ...fields }, { merge: true });
      return true;
    } catch (error: any) {
      console.log('Error updating Database', error);
      return false;
    }
  };

  return { postData, savePlayerAccountData, pullAgeGroups, patchRecord }; // Returns functions so it can be called in any component
};

export default useHttp;
