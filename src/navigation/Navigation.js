import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PokedexNavigation from './PokedexNAvigation';
import AccountNavigation from './AccountNavigation';
import FavsNavigation from './FavsNavigation';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();

export default function Navigation() {
    return (
        <Tab.Navigator initialRouteName='Pokedex'>
            <Tab.Screen name='Account' component={AccountNavigation}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (<Icon name="user" color={color} size={size} />),
                }}
            />
            <Tab.Screen name='Pokedex' component={PokedexNavigation}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: () => renderPokeBall()
                }} />
            <Tab.Screen name='Favorites' component={FavsNavigation}
                options={{
                    tabBarIcon: ({ color, size }) => (<Icon name="heart" color={color} size={size} />),
                }}
            />

        </Tab.Navigator>
    )
}


function renderPokeBall() {
    return <Image
        source={require("../assets/pokeball.png")}
        style={{ width: 35, height: 35, top: 5, }}
    />
}