import React from "react";
import { createStackNavigator , CardStyleInterpolators} from "@react-navigation/stack";

// import SingleOrder from "../screens/SingleOrder";
import Home from "../screens/Home";
import SingleOrder from "../screens/SingleOrder";


const Stack = createStackNavigator();


const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={"Home"}>
      <Stack.Screen name="Home" component={Home}   
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS 
        }}
      />
      <Stack.Screen name="SOMain" component={SingleOrder}   
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS 
        }}
      />
     
  </Stack.Navigator>
  );
}

export default MainStackNavigator ;