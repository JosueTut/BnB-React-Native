import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import Login from "../screens/login.js";
import Insumos from "../screens/Insumos.js";
import Alojamientos from "../screens/Alojamientos.js";
import TaskList from "../screens/TaskList.js";
import Users from "../screens/Users.js";
import Settings from "../screens/Profile.js";

const HomeStackNavigator = createNativeStackNavigator();

function MyStack() {
    return (
        <HomeStackNavigator.Navigator
            initialRouteName="Login"
        >
            <HomeStackNavigator.Screen 
                name='Login'
                component={Login}
            />
            <HomeStackNavigator.Screen 
                name="TaskList"
                component={TaskList}
            />
            <HomeStackNavigator.Screen 
                name='Insumos'
                component={Insumos}
            />
        </HomeStackNavigator.Navigator>
    )
}

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator 
            initialRouteName="Login"
            screenOptions={{
                tabBarActiveTintColor: '#343434'
            }}
        >
            <Tab.Screen 
                name="TaskList" 
                component={TaskList} 
                options={{
                    tabBarLabel: 'TaskList',
                    tabBarIcon: ({ color, size}) => (
                        <MaterialCommunityIcons name="clipboard-text-outline" size={24} color="black" />                    ),
                    tabBarBadge: 1,
                    headerShown: false
                }}
                
            />

            <Tab.Screen 
                name="Insumos" 
                component={Insumos} 
                options={{
                    tabBarLabel: 'Insumos',
                    tabBarIcon: ({ color, size}) => (
                        <MaterialIcons name="add-shopping-cart" size={24} color="black" />
                    ),
                    tabBarBadge: '+9',
                    headerShown: false
                }}
            />
            <Tab.Screen 
                name="Alojamientos" 
                component={Alojamientos} 
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size}) => (
                        <MaterialIcons name="home" size={24} color="black" />
                    ),
                    headerShown: false
                }}
            />
            <Tab.Screen 
                name="Users" 
                component={Users} 
                options={{
                    tabBarLabel: 'Users',
                    tabBarIcon: ({ color, size}) => (                        
                        <AntDesign name="team" size={24} color="black" />                        
                    ),
                    tabBarBadge: 3,
                    headerShown: false
                }}
            />
            <Tab.Screen 
                name="Settings" 
                component={Settings} 
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ color, size}) => (
                        <AntDesign name="setting" size={24} color="black" />            
                    ),
                    headerShown: false
                }}
            />
        </Tab.Navigator>
    )
}

export default function MainStack() {
    return (
        <NavigationContainer>
        <MyTabs />
    </NavigationContainer>
    );
}