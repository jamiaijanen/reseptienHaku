import { Alert, StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { useState } from 'react';
import { Button, FlatList, TextInput, StatusBar } from 'react-native';

export default function App() {
  const [hakusana, setHakusana] = useState('');
  const [repo, setRepo] = useState([]);

  const getRepo = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${hakusana}`)
    .then(res => res.json())
    .then(data => setRepo(data.meals))
    .catch(error => {
      Alert.alert('Error', error);
    });
  }

  return (
    <View style={styles.container}>
      <FlatList 
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => 
          <View>
            <Text>{item.strMeal}</Text>
            <Image source = {{uri: item.strMealThumb}} style = {{ width: 200, height: 200 }} />
          </View>}
          data={repo} />
      <TextInput placeholder= 'keyword' onChangeText={ text => setHakusana(text) } />
      <Button title= "Find" onPress= {getRepo} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
