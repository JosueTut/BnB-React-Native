import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialIcons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

import Login from "../screens/login";
import Insumos from "../screens/Insumos";
import Alojamientos from "../screens/Alojamientos";
import TaskList from "../screens/TaskList";
import Users from "../screens/Users";
import Settings from "../screens/Profile";

const HomeStackNavigator = createNativeStackNavigator();

function MyStack() {
    return (
        <HomeStackNavigator.Navigator initialRouteName="Login">
            <HomeStackNavigator.Screen 
                name='Login'
                component={Login}
                options={{ headerShown: false }}
            />
            <HomeStackNavigator.Screen 
                name="TaskList"
                component={TaskList}
                options={{ headerShown: false }}
            />
            <HomeStackNavigator.Screen 
                name='Insumos'
                component={Insumos}
                options={{ headerShown: false }}
            />
        </HomeStackNavigator.Navigator>
    );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator 
            initialRouteName="Alojamientos"
            screenOptions={{
                tabBarActiveTintColor: '#2B3A67',
                tabBarInactiveTintColor: '#8e8e93',
                tabBarStyle: { backgroundColor: '#f9f9f9' },
                headerShown: false
            }}
        >
            <Tab.Screen 
                name="TaskList" 
                component={TaskList} 
                options={{
                    tabBarLabel: 'TaskList',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="clipboard-text-outline" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen 
                name="Insumos" 
                component={Insumos} 
                options={{
                    tabBarLabel: 'Insumos',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="add-shopping-cart" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen 
                name="Alojamientos" 
                component={Alojamientos} 
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="home" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen 
                name="Users" 
                component={Users} 
                options={{
                    tabBarLabel: 'Users',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="team" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen 
                name="Settings" 
                component={Settings} 
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="setting" size={size} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    );
}

export default function MainStack() {
    return (
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    );
}
