import React from "react";
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from "../components/DrawerContent";
import { StyleSheet , Text} from "react-native";


import Home from "../screens/Home";
import PendingOrders from "../screens/PendingOrders";
import CompletedOrders from "../screens/CompletedOrders";
import CreateOrder from "../screens/CreateOrder";

import MainStackNavigator from "./MainStackNavigator";


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator 
        drawerContent={ props => <DrawerContent {...props}/>}  
        drawerType="slide"
        initialRouteName={'Dashboard'}
        >
      <Drawer.Screen name="Dashboard" component={MainStackNavigator}  options={{
           title : "Dashboard",
          drawerIcon :  ({ color }) => <Icon name="rocket" style={[styles.item_icon,{backgroundColor : color  }]}  size={15} color="#ffffff" /> 
      }} />
       <Drawer.Screen name="Pending" component={PendingOrders} options={{
          title : "Pending Orders",
          drawerIcon :  ({ color }) => <Icon name="file" style={[styles.item_icon,{backgroundColor : color  }]}  size={15} color="#ffffff" /> 
      }} />
       <Drawer.Screen name="Completed" component={CompletedOrders} options={{
          title : "Completed Orders",
          drawerIcon :  ({ color }) => <Icon name="archive" style={[styles.item_icon,{backgroundColor : color  }]}  size={15} color="#ffffff" /> 
      }} />
       <Drawer.Screen name="Create" component={CreateOrder} options={{
          title : "Create Order",
          drawerIcon :  ({ color }) => <Icon name="inbox" style={[styles.item_icon,{backgroundColor : color  }]}  size={15} color="#ffffff" /> 
      }} />
      {/* <Drawer.Screen name="Deliveries" component={Home} options={{
          title : "Deliveries",
          drawerIcon :  ({ color }) => <Icon name="qrcode" style={[styles.item_icon,{backgroundColor : color  }]}  size={15} color="#ffffff" /> 
      }} /> */}
     
    </Drawer.Navigator>
  );
}

export { DrawerNavigator };


const styles = StyleSheet.create({
   
    item_icon : {
        alignSelf : 'center', 
        padding : 5,
       marginLeft : 5,
        borderRadius : 4,
    },
    item_text:{
        fontWeight : '700',
        fontSize : 14.5 ,
    },
  });
  