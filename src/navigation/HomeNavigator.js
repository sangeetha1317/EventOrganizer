import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EventList from "../components/eventList";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function HomeNaviagtor() {
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();

  const EventStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name='Events'
          component={EventList}>
        </Stack.Screen>
      </Stack.Navigator>
    )
  };
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#145a32',
        tabBarInactiveTintColor: 'gray',
        headerTitleAlign: 'center',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Event List') {
            iconName = focused ? 'home' : 'home-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        }
      })}>
        <Tab.Screen
          name="Event List"
          component={EventStack}
          options={{ headerShown: false }}
        />

      </Tab.Navigator>
    </NavigationContainer>
  );
}