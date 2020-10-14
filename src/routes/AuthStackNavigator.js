import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../screens/Auth/Login";


const Stack = createStackNavigator();


const AuthStackNavigator = () => {
  return (
    <Stack.Navigator>
    <Stack.Screen name="Login" component={Login}   options={{headerShown: false}}/>
  </Stack.Navigator>
  );
}

export { AuthStackNavigator };