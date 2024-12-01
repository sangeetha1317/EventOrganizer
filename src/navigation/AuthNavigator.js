import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../components/login";
import SignUp from "../components/signUp";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: 'dodgerblue'
                    },
                    headerTintColor: 'white',
                    headerTitleStyle: {
                        fontWeight: 'bold'
                    }
                }}>
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }} />

                    <Stack.Screen
                    name="SignUp"
                    component={SignUp}
                    options={{headerShown: false}} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}