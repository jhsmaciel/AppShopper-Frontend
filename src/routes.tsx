import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FlashMessage from 'react-native-flash-message';
import OctiIcons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useAuthentication } from './context/LoginContext';
import Login from './screen/login';
import Dashboard from './screen/dashboard';
import { colors } from './config';
import { FavoritesProvider } from './context/FavoritesContext';
import Favorites from './screen/favorites';
import Settings from './screen/settings';
import CreateUser from './screen/login/createuser';

const AppStack = createStackNavigator();

const Tab = createBottomTabNavigator();

const Routes: React.FC = () => {
    const { signed } = useAuthentication();

    const TabNav = () => (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: colors.primary,
                labelStyle: {
                    fontFamily: 'Exo-Regular',
                }
            }}
        >
            <Tab.Screen 
                name="Dashboard"
                component={Dashboard}
                options={{
                    tabBarLabel: "Repositórios",
                    tabBarIcon: ({color, size}) => <OctiIcons name="repo" color={color} size={size} />
                }}
            />
            <Tab.Screen 
                name="Favorites"
                component={Favorites}
                options={{
                    tabBarLabel: "Favoritos",
                    tabBarIcon: ({color, size}) => <MaterialIcons name="favorite" color={color} size={size} />
                }}
            />
        </Tab.Navigator>
    );

    return (
        <>
            <StatusBar backgroundColor={colors.primary} barStyle="light-content"/>
            <NavigationContainer>
                {
                    signed ?
                    (
                        <FavoritesProvider>
                            <AppStack.Navigator 
                                headerMode="none"
                            >
                                <AppStack.Screen 
                                    name="TabsRepository"
                                    component={TabNav}
                                />
                                <AppStack.Screen
                                    name="Settings"
                                    component={Settings}
                                />
                            </AppStack.Navigator>
                        </FavoritesProvider>
                    )
                        :
                    (
                        <AppStack.Navigator 
                            headerMode="none"
                        >
                            <AppStack.Screen name="Login" component={Login}/>
                            <AppStack.Screen name="CreateUser" component={CreateUser}/>
                        </AppStack.Navigator>
                    )
                }
            <FlashMessage position="bottom" />
            </NavigationContainer>
        </>
    );
}

export default Routes;