import React, { Component, useState } from "react";
import { 
  StyleSheet,
  Text,
  View,
  Button
} from "react-native";

import Heading from '../components/Heading';
import Input from '../components/Input';
import FilledButton from "../components/FilledButton";
import Error from '../components/Error';
import '../Global';
import { searchNode } from '../services/searchNode';

export default function HomeScreen({navigation}) {

  const [node_name, setNodeName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    var url = global.base_url;
    await searchNode(url, node_name);
    if(global.fetch_error == true) {
      setError('Fetch Error. Please Login again to refresh.');
      global.fetch_error = false;
    }else{
      setError("");
    }
    navigation.navigate('NodeList');
  }

  return(
    <View style={styles.container}>
      <Heading style={styles.title} >Hello, {global.username}</Heading>
      <Error error={error} />
      <Input style={styles.input} placeholder={"Query"} 
      onChangeText={name => setNodeName(name)} />
      <FilledButton title={'View Nodes'} style={styles.loginButton} 
      onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 120,
  },
  title: {
      marginBottom: 48,
  },
  input: {
      marginVertical: 8,
  },
  loginButton: {
      marginVertical: 20,
  },
})   