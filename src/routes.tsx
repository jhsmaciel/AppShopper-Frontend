import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuthentication } from './context/LoginContext';
import Login from './screen/login';
import Dashboard from './screen/dashboard';
import FlashMessage from 'react-native-flash-message';

const AppStack = createStackNavigator();

const Routes: React.FC = () => {
    const { signed } = useAuthentication();
    return (
        <>
            <StatusBar backgroundColor="#FFF" barStyle="dark-content"/>
            <NavigationContainer>
                {
                    signed ?
                    (
                        <AppStack.Navigator 
                            headerMode="none" 
                        >
                            <AppStack.Screen name="Login" component={Dashboard}/>
                        </AppStack.Navigator>
                    )
                        :
                    (
                        <AppStack.Navigator 
                            headerMode="none"
                        >
                            <AppStack.Screen name="Login" component={Login}/>
                        </AppStack.Navigator>
                    )
                }
            <FlashMessage position="bottom" />
            </NavigationContainer>
        </>
    );
}

export default Routes;