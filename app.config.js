import 'dotenv/config';

export default {
  expo: {
    name: 'StatsApp_React_Native',
    slug: 'mystatsapp',
    version: '1.0.0',
    extra: {
      FIREBASE_URL: process.env.FIREBASE_URL,
      FIREBASE_WEB_API_KEY: process.env.FIREBASE_WEB_API_KEY,
    },
  },
};
