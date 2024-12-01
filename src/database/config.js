import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBtqJ15nxtdm1C6oP9KQYI_AV4YV_2-Kkg",
    authDomain: "eventorganizer-4c202.firebaseapp.com",
    projectId: "eventorganizer-4c202",
    storageBucket: "eventorganizer-4c202.firebasestorage.app",
    messagingSenderId: "169133763326",
    appId: "1:169133763326:web:e985d693f1e5d7e0fa53af"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
  export const firestore = getFirestore(app);