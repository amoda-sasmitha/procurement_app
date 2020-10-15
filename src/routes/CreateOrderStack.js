import React from "react";
import { createStackNavigator , CardStyleInterpolators} from "@react-navigation/stack";


import CreateOrder01 from "../screens/CreateOrder01";
import CreateOrder02 from "../screens/CreateOrder02";


const Stack = createStackNavigator();


const CreateOrderStack = () => {
  return (
    <Stack.Navigator initialRouteName={"Create01"}>
      <Stack.Screen name="Create01" component={CreateOrder01}   
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS 
        }}
      />
      <Stack.Screen name="Create02" component={CreateOrder02}   
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS 
        }}
      />
     
  </Stack.Navigator>
  );
}

export default CreateOrderStack ;