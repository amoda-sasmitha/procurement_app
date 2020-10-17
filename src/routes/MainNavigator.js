import React from "react";
import { createStackNavigator , CardStyleInterpolators} from "@react-navigation/stack";


import {DrawerNavigator} from "./DrawerNavigator";
import SingleOrder from "../screens/SingleOrder";


const Stack = createStackNavigator();


const MainNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={"Main"}>
      <Stack.Screen name="Main" component={DrawerNavigator}   
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS 
        }}
      />
      <Stack.Screen name="Order" component={SingleOrder}   
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS 
        }}
      />
     
  </Stack.Navigator>
  );
}

export default MainNavigator ;