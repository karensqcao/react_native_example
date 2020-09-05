import React, { useEffect } from "react";
import { View, ActivityIndicator, AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { AuthContext } from './components/Context';
import { getDateTime } from "./services/getDateTime";
import { getToken } from './services/token';

import AboutScreen from './screens/AboutScreen';
import MainTabScreen from './screens/MainTabScreen';
import DrawerContent from './screens/DrawerContent';

import RootStackScreen from "./screens/RootStackScreen";

const Drawer = createDrawerNavigator();

export default function() {

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);
  
  const authContext = React.useMemo(() => ({
    signIn: async(url, userName, password) => {
      global.base_url = url;
      var userToken;
      var last_server_handshake_time;
      userToken = null;
      try{
        // set usertoken
        await getToken(url, userName, password);
        await getDateTime();
        userToken = global.bearer_token;
        last_server_handshake_time = global.last_handshake_date_time;
        await AsyncStorage.setItem('userToken', userToken);
        await AsyncStorage.setItem('baseUrl', url);
        await AsyncStorage.setItem('lastHandshake', last_server_handshake_time);
      } catch (e){
        console.log(e);
      }
      dispatch({type: 'LOGIN', id: userName, token: userToken });
    },
    signOut: async() => {
      try{
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('baseUrl');
        await AsyncStorage.removeItem('lastHandshake');
      }catch(e){
        console.log(e);
      }
      dispatch({type: 'LOGOUT' });
    },
  }), []);

  useEffect(() => {
    setTimeout(async() => {
      let userToken;
      userToken = null;
      try{
        userToken = await AsyncStorage.getItem('userToken');
      } catch(e) {
        console.log(e);
      }
      dispatch({type: 'LOGIN', token: userToken });
    }, 1000);
  }, []);

  if( loginState.isLoading ) {
    return(
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        { loginState.userToken !== null ? (
          <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name='HomeDrawer' component={MainTabScreen} />
            <Drawer.Screen name='AboutScreen' component={AboutScreen} 
            options={{
              headerLeft: () => (
                <Icon.Button name="ios-menu" size={25}
                backgroundColor="#c42c2c"
                onPress={() => {props.navigation.navigate('Home')}}>
                </Icon.Button>
              )
            }}/>
          </Drawer.Navigator>
        )
      :
        <RootStackScreen />
      }
      </NavigationContainer>
    </AuthContext.Provider>
  );
}