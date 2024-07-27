import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, push } from 'firebase/database';

//CONFIGURACION
const firebaseConfig = 
{
  apiKey: "AIzaSyAbS93LYQxVGKhK9zB_TJ5KOPDdRadKmek",
  authDomain: "realtime-db-mw.firebaseapp.com",
  projectId: "realtime-db-mw",
  storageBucket: "realtime-db-mw.appspot.com",
  messagingSenderId: "1047459101417",
  appId: "1:1047459101417:web:291060ed7afe7c34194e78",
  measurementId: "G-55DNT5HBCJ"
};

//Inicializcion
initializeApp(firebaseConfig);
const database = getDatabase();

export default function App() 
{
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [usuarios, setUsuarios] = useState([]);

  //obtener datos de la bd
  useEffect(() => {
    const obtenerDatos = () => {
      const usuariosRef = ref(database, 'usuarios/');
      onValue(usuariosRef, (snapshot) => {
        const data = snapshot.val();
        const listaUsuarios = data ? Object.keys(data).map(key => ({ key, ...data[key] })) : [];
        setUsuarios(listaUsuarios);
      });
    };

    obtenerDatos();
  }, []);

  //Escribir datos en la base de datos
  const escribirDatos = () => 
    {
      const usuariosRef = ref(database, 'usuarios/');
      push(usuariosRef, {
                          nombre,
                          edad,
                        }).then(() => 
                        {
                          alert('Datos guardados con éxito');
                          setNombre(''); 
                          setEdad('');   //Limpian los nombres
                        }).catch(error => 
                        {
                            alert('Error al guardar los datos: ' + error.message);
                        });
  };



  return (
    <View style={styles.container}>
      <Text>Nombre:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setNombre}
        value={nombre}
      />
      <Text>Edad:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEdad}
        value={edad}
        keyboardType="numeric"
      />
      <Button
        title="Guardar Datos"
        onPress={escribirDatos}
      />
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Nombre: {item.nombre}</Text>
            <Text>Edad: {item.edad}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});


