import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const Book = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [photo, setPhoto] = useState();

  useEffect(() => {
    AsyncStorage.getItem('book').then((data) => {
      const book = JSON.parse(data);
      setBooks(book);
    });
  }, []);

  // 1. capturar os dados [OK]
  // 2. validar [OK]
  // 3. salvar no banco de dados (AsyncStore) [OK]

  const isValid = () => {
    if (title !== undefined && title !== '') {
      return true;
    }

    return false;
  };

  const onSave = async () => {
    console.log(`Title ${title}`);
    console.log(`Description ${description}`);

    if (isValid()) {
      console.log('Válido!');

      const id = Math.random(5000).toString();
      const data = {
        id,
        title,
        description,
        photo,
      };

      books.push(data);

      console.log(JSON.stringify(data));
      await AsyncStorage.setItem('book', JSON.stringify(data));
      navigation.goback();
    } else {
      console.log('Inválido!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pagetitle}>Inclua seu novo livro...</Text>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={(text) => {
          setTitle(text);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        multiline={true}
        numberOfLines={4}
        value={description}
        onChangeText={(text) => {
          setDescription(text);
        }}
      />

      <TouchableOpacity style={styles.cam}>
        <Icon name="camera-outline" size={18} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.saveButton, !isValid() ? styles.saveButtonInvalid : '']}
        onPress={onSave}>
        <Text style={styles.saveButtonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => {
          navigation.goBack();
        }}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = (StyleSheet.create = {
  container: {
    flex: 1,
    padding: 10,
  },

  pagetitle: {
    textAlign: 'center',
    fontSize: 16,
    marginBotton: 20,
  },

  input: {
    fontSize: 16,
    borderBottomColor: '#f39c12',
    borderBottomWidth: 1,
    marginBottom: 10,
  },

  cam: {
    backgroundColor: '#f39c12',
    borderRadius: 50,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },

  saveButton: {
    backgroundColor: '#f39c12',
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
  },

  saveButtonInvalid: {
    opacity: 0.5,
  },

  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  cancelButton: {
    alignSelf: 'center',
  },

  cancelButtonText: {
    color: '#95a5a6',
  },
});

export default Book;
