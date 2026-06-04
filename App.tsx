import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { GoalsProvider } from './src/context/GoalsContext';
import BoardScreen from './src/screens/BoardScreen';

const Tab = createBottomTabNavigator();

const TAB_BG = '#0F0F1E';
const TAB_BORDER = '#1A1A2E';

export default function App() {
  return (
    <GoalsProvider>
      <StatusBar style="light" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#fff',
            tabBarInactiveTintColor: '#444',
            tabBarStyle: {
              backgroundColor: TAB_BG,
              borderTopColor: TAB_BORDER,
              borderTopWidth: 1,
              height: 80,
              paddingBottom: 16,
              paddingTop: 10,
            },
            tabBarLabelStyle: {
              fontSize: 11,
              fontWeight: '600',
            },
          }}
        >
          <Tab.Screen
            name="Week"
            options={{
              title: 'Week',
              tabBarActiveTintColor: '#FF6B6B',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="today-outline" size={size} color={color} />
              ),
            }}
          >
            {() => <BoardScreen board="week" accentColor="#FF6B6B" />}
          </Tab.Screen>

          <Tab.Screen
            name="Month"
            options={{
              title: 'Month',
              tabBarActiveTintColor: '#4ECDC4',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="calendar-outline" size={size} color={color} />
              ),
            }}
          >
            {() => <BoardScreen board="month" accentColor="#4ECDC4" />}
          </Tab.Screen>

          <Tab.Screen
            name="Year"
            options={{
              title: 'Year',
              tabBarActiveTintColor: '#A78BFA',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="star-outline" size={size} color={color} />
              ),
            }}
          >
            {() => <BoardScreen board="year" accentColor="#A78BFA" />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </GoalsProvider>
  );
}
