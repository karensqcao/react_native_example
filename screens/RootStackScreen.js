import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator screenOptions={{
        headerShown: false
    }}>
        <RootStack.Screen name='Login' component={LoginScreen}></RootStack.Screen>
    </RootStack.Navigator>
);

export default RootStackScreen;