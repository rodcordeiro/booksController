import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as SecureStorage from 'expo-secure-store'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './pages/Login'
import ListBooks from './pages/ListBooks'

const { Navigator, Screen } = createStackNavigator();

export default function Routes() {
    const [logged, setLogged] = useState<boolean>(false);
    async function getToken(){
        await SecureStorage.getItemAsync('token') ? setLogged(true) : setLogged(false)
    }
    getToken()
    return (
        <NavigationContainer>
            <Navigator screenOptions={{headerShown:false}}>
                {
                    logged ? (
                        <Screen
                            name="Main"
                            component={Login}
                        />
                    ) : (
                        <Screen
                            name="Main"
                            component={ListBooks}
                        />
                    )
                }                
            </Navigator>
            <StatusBar hidden={true} />
        </NavigationContainer>
    );
}
