import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAbS93LYQxVGKhK9zB_TJ5KOPDdRadKmek",
  authDomain: "realtime-db-mw.firebaseapp.com",
  databaseURL: "https://realtime-db-mw-default-rtdb.firebaseio.com/",
  projectId: "realtime-db-mw",
  storageBucket: "realtime-db-mw.appspot.com",
  messagingSenderId: "1047459101417",
  appId: "1:1047459101417:web:291060ed7afe7c34194e78",
  measurementId: "G-55DNT5HBCJ"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const database = firebase.database();

export { database };
