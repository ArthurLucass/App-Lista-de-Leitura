import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const Main = ({ navigation }) => {
  const [books, setBooks] = useState([ ]);

  useEffect(() => {
    AsyncStorage.getItem('books').then((data) => {
      const books = JSON.parse(data);
      setBooks(books);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.toolBox}>
        <Text style={styles.title}>Lista de Leitura</Text>

        <TouchableOpacity
          style={styles.toolBoxButton}
          onPress={() => {
            navigation.navigate('Book');
          }}>
          <Icon name="add" size={18} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemButton}>
            <Text style={styles.itemText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = (StyleSheet.create = {
  container: {
    flex: 1,
    padding: 5,
  },

  toolBox: {
    flexDirection: 'row',
    marginBottom: 5,
  },

  title: {
    flex: 1,
    fontSize: 16,
    color: '#3498db',
  },

  toolBoxButton: {
    backgroundColor: '#3498db',
    borderRadius: 50,
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Main;
