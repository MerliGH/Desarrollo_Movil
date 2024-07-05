//Higuera Sanchez Dulce Mariela
//0322103734
//Examen parcial 2 - Firebase authentication

import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button, ScrollView } from 'react-native';
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "@firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCx51U_NQQFTAzOe_ky5VSZvfLpzNw3aTs",
  authDomain: "login-autentication-a3ea3.firebaseapp.com",
  projectId: "login-autentication-a3ea3",
  storageBucket: "login-autentication-a3ea3.appspot.com",
  messagingSenderId: "474379409589",
  appId: "1:474379409589:web:97d86091fcaef7b263c6fc",
  measurementId: "G-6KWQ134NWX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const AuthScreen = ({email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication}) => {
  return(
    <View style={styles.authContainer}>
      <Text style={styles.title}>{isLogin ? 'Sign In': 'Sign Up'}</Text>
      <TextInput 
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput 
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />

      <View style={styles.buttonContainer}>
        <Button 
          title={isLogin ? 'Sign In': 'Sign Up'} 
          color={isLogin ? '#af7ac5' : '#3498db'} // Light purple for Sign In, Blue for Sign Up
          onPress={handleAuthentication} 
        />
      </View>

      <View style={styles.buttonContainer}>
        <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need an account? Sign Up': 'Already have an account? Sign In'}
        </Text>
      </View>

    </View>
  );
}

const AuthenticatedScreen = ({user, handleAuthentication}) =>{
  return(
    <View style={styles.authContainer}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.emailText}>{user.email}</Text>
      <Button title="LogOut" onPress={handleAuthentication} color="#e74c3c"></Button>
    </View>
  );
}

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  const auth = getAuth(app);
  useEffect(() =>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleAuthentication = async () => {
    try {
      if (user) {
        console.log('User logged');
        await signOut(auth);
      } else {
        if (isLogin) {
          await signInWithEmailAndPassword(auth, email, password);
          console.log('User Signed successfully');
        } else {
          await createUserWithEmailAndPassword(auth, email, password);
          console.log('User created successfully');
        }
      }
    } catch (error) {
      console.error('Authentication error: ', error.message);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {user ? (
        <AuthenticatedScreen user={user} handleAuthentication={handleAuthentication} />
      ) : (
        <AuthScreen
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          handleAuthentication={handleAuthentication}
        />
      )}
      <StatusBar style='auto' />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  toggleText: {
    color: '#3498db',
    textAlign: 'center',
  },
  bottomContainer: {
    marginTop: 20,
  },
  emailText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});

