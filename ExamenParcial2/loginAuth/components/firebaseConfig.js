
import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCx51U_NQQFTAzOe_ky5VSZvfLpzNw3aTs",
  authDomain: "login-autentication-a3ea3.firebaseapp.com",
  projectId: "login-autentication-a3ea3",
  storageBucket: "login-autentication-a3ea3.appspot.com",
  messagingSenderId: "474379409589",
  appId: "1:474379409589:web:97d86091fcaef7b263c6fc",
  measurementId: "G-6KWQ134NWX"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };