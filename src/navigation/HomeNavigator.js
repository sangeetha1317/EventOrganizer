import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EventList from "../components/eventList";
import {  TouchableOpacity, Alert, Text } from "react-native";
import { useAuthentication } from "../hooks/useAuthentication";
import Ionicons from '@expo/vector-icons/Ionicons';
import FavouriteEvent from "../components/favouriteEvent";
import EventForm from "../components/eventForm";
import styles from "../components/eventList/styles";

export default function HomeNaviagtor() {
  const {signout } = useAuthentication(); 
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();

  const handleSignOut = () => {
    Alert.alert(
        "Log Out",
        "Are you sure you want to log out?",
        [
            { text: "Cancel", style: "cancel" },
            { text: "Log Out", onPress: signout },
        ],
        { cancelable: false }
    );
};

  const EventStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name='Events'
          component={EventList}
          options={{
            title: "Event List",
            headerTitleAlign: "flex-start",
            headerRight: () => (
              <TouchableOpacity onPress={handleSignOut} style={styles.logout}>
                <Text style={styles.logoutText}>Sign Out</Text>
                <Ionicons name="log-out-outline" size={24} color="#6200EE" />
              </TouchableOpacity>
            ),
          }} />

        <Stack.Screen
          name='AddEvent'
          component={EventForm}
          options={{ title: 'Add Event' }}>
        </Stack.Screen>

      </Stack.Navigator>
    )
  };
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#4a235a',
        tabBarInactiveTintColor: 'gray',
        headerTitleAlign: 'center',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Event List') {
            iconName = focused ? 'home' : 'home-outline';
          } else {
            iconName = focused ? 'heart-sharp' : 'heart-outline'
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        }
      })}>
        <Tab.Screen
          name="Event List"
          component={EventStack}
          options={{ headerShown: false }}
        />
       <Tab.Screen
          name="Favourites"
          component={FavouriteEvent}
          options={{ headerShown: true }}
        />

      </Tab.Navigator>
    </NavigationContainer>
  );
}