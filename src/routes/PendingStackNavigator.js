import React from "react";
import { createStackNavigator , CardStyleInterpolators} from "@react-navigation/stack";


import PendingOrders from "../screens/PendingOrders";
import SingleOrder from "../screens/SingleOrder";


const Stack = createStackNavigator();


const PendingStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={"Pending"}>
      <Stack.Screen name="Pending" component={PendingOrders}   
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS 
        }}
      />
      <Stack.Screen name="SOPending" component={SingleOrder}   
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS 
        }}
      />
     
  </Stack.Navigator>
  );
}

export default PendingStackNavigator ;