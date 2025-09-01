import 'dotenv/config';

export default {
  expo: {
    name: 'StatsApp_React_Native',
    slug: 'mystatsapp',
    version: '1.0.0',
    extra: {
      FIREBASE_URL: process.env.FIREBASE_URL,
      FIREBASE_WEB_API_KEY: process.env.FIREBASE_WEB_API_KEY,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    },
  },
};
