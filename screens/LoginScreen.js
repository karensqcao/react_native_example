import React, { Component, useState } from "react";
import { 
  StyleSheet,
  View
} from "react-native";
import Heading from '../components/Heading';
import Input from '../components/Input';
import FilledButton from "../components/FilledButton";
import Error from '../components/Error';
import { AuthContext } from '../components/Context';
import '../Global';

export default function LoginScreen({navigation}) {

  const [server_url, setServer] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { signIn } = React.useContext(AuthContext);

  const loginHandle = (url, username, password) => {
    signIn(url, username, password);
    if(global.wrong_username == true) {
      setError("Wrong username or password, please try again.");
      global.wrong_username = false;
    }
  }

  return(
    <View style={styles.container}>
      <Heading style={styles.title} >LOGIN</Heading>
      <Error error={error} />
      <Input style={styles.input} placeholder={'Server url'}
      defaultValue={''}
      onChangeText={server_url => setServer(server_url)} />
      <Input style={styles.input} placeholder={'Username'}
      keyboardType={'email-address'}
      defaultValue={''}
      onChangeText={username => setUsername(username)} />
      <Input style={styles.input} placeholder={'Password'} secureTextEntry
      defaultValue={''}
      onChangeText={password => setPassword(password)} />
      <FilledButton title={'Login'} style={styles.loginButton} 
      onPress={() => {loginHandle(server_url, username, password)}}/>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 90,
  },
  title: {
      marginBottom: 48,
  },
  input: {
      marginVertical: 8,
  },
  loginButton: {
      marginVertical: 20,
  }
})