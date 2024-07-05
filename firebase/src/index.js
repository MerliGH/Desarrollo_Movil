// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
import { initializeApp } from "https://gstatic.com/firebasejs/9.0.0/firebase-app.js";
//import { getAnalytics } from "firebase/analytics";
//import { getAuth, onAuthStateChanged} from "firebase/auth";
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
//import { getFirestore } from "firebase/firestore";


const firebaseApp = initializeApp({
  apiKey: "AIzaSyCx51U_NQQFTAzOe_ky5VSZvfLpzNw3aTs",
  authDomain: "login-autentication-a3ea3.firebaseapp.com",
  projectId: "login-autentication-a3ea3",
  storageBucket: "login-autentication-a3ea3.appspot.com",
  messagingSenderId: "474379409589",
  appId: "1:474379409589:web:97d86091fcaef7b263c6fc",
  measurementId: "G-6KWQ134NWX"
});

const auth = getAuth(firebaseApp);
//const db = getFirestore(firebaseApp);
//db.collection('todos').getDocs();
//const todosCol = collection(db, 'todos');
//const snapshot = await getDocs(todosCol);

//Detectar estado de autentificacion

onAuthStateChanged(auth, user => {
    if(user != null) {
        console.log ('logged in!');
    } else {
            console.log('no user!');
        }
});