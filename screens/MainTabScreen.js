import React from "react";
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import HomeScreen from './HomeScreen';
import NodeListScreen from './NodeListScreen';
import PropertyListScreen from './PropertyListScreen';
import SettingsScreen from './SettingsScreen';
import AboutScreen from './AboutScreen';

const HomeStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
    <Tab.Navigator initialRouteName='Home' activeColor='#fff'
    barStyle={{backgroundColor: '#c42c2c'}}>
        <Tab.Screen name='Home' component={HomeStackScreen}
        options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color}) => (
                <Icon name='ios-home' size={26} color={color} />
            ),
        }}></Tab.Screen>
        <Tab.Screen name='Settings' component={SettingsStackScreen}
        options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({color}) => (
                <Icon name='ios-settings' size={26} color={color} />
            ),
        }}></Tab.Screen>
    </Tab.Navigator>
);

const HomeStackScreen = ({navigation}) => (
    <HomeStack.Navigator screenOptions={{
                    headerStyle: {
                      backgroundColor: '#c42c2c'
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'normal',
                      alignSelf: 'center'
                    }
        }}>
          <HomeStack.Screen name='Home' component={HomeScreen} options={{
            title: 'Search',
            headerLeft: () => (
              <Icon.Button name="ios-menu" size={25}
              backgroundColor="#c42c2c"
              onPress={() => {navigation.openDrawer()}}></Icon.Button>
            )
          }} />
          <HomeStack.Screen name='NodeList' component={NodeListScreen} options={{
            title: 'Node Result',
          }} />
          <HomeStack.Screen name='PropertyList' component={PropertyListScreen} options={{
            title: 'Property Result',
          }} />
    </HomeStack.Navigator>
  );
  
  const SettingsStackScreen = ({navigation}) => (
    <SettingsStack.Navigator screenOptions={{
                    headerStyle: {
                      backgroundColor: '#c42c2c'
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'normal',
                      alignSelf: 'center'
                    }
        }}>
          <SettingsStack.Screen name='Settings' component={SettingsScreen} 
           options={{
            headerLeft: () => (
              <Icon.Button name="ios-menu" size={25}
              backgroundColor="#c42c2c"
              onPress={() => {navigation.openDrawer()}}></Icon.Button>
            )
           }} />
    </SettingsStack.Navigator>
  );

  export default MainTabScreen;