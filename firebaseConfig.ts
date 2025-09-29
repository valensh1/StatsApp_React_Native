import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra ?? {};

const firebaseConfig = {
  apiKey: extra.FIREBASE_WEB_API_KEY,
  projectId: extra.FIREBASE_PROJECT_ID,
  appId: extra.FIREBASE_APP_ID,
  messagingSenderId: extra.FIREBASE_MESSAGING_SENDER_ID,
  authDomain: extra.FIREBASE_AUTH_DOMAIN,
  storageBucket: extra.FIREBASE_STORAGE_BUCKET,
  measurementId: extra.FIREBASE_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);

export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true, // detects RN env automatically
  // experimentalForceLongPolling: true, // fallback if above still gives warnings
});
export const auth = getAuth(app);
export const storage = getStorage(app);
