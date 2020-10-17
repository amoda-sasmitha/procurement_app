import React from "react";
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from "../components/DrawerContent";
import { StyleSheet , Text} from "react-native";



import CompletedOrders from "../screens/CompletedOrders";
import Home from "../screens/Home";
import PendingOrders from "../screens/PendingOrders";
import RejectedOrders from "../screens/RejectedOrders";
import CreateOrderStack from "./CreateOrderStack";


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator 
      
        drawerContent={ props => <DrawerContent {...props}/>}  
        drawerType="slide"
        initialRouteName={'Dashboard'}
        >
      <Drawer.Screen name="Dashboard"
          
          component={Home}  options={{
           title : "Dashboard",
          drawerIcon :  ({ color }) => <Icon name="rocket" style={[styles.item_icon,{backgroundColor : color  }]}  size={15} color="#ffffff" /> 
      }} />
       <Drawer.Screen name="Pending" component={PendingOrders} options={{
          title : "Pending",
          drawerIcon :  ({ color }) => <Icon name="file" style={[styles.item_icon,{backgroundColor : color  }]}  size={15} color="#ffffff" /> 
      }} />
       <Drawer.Screen name="Completed" component={CompletedOrders} options={{
          title : "Completed",
          drawerIcon :  ({ color }) => <Icon name="archive" style={[styles.item_icon,{backgroundColor : color  }]}  size={15} color="#ffffff" /> 
      }} />
       <Drawer.Screen name="Rejected" component={RejectedOrders} options={{
          title : "Rejected",
          drawerIcon :  ({ color }) => <Icon name="archive" style={[styles.item_icon,{backgroundColor : color  }]}  size={15} color="#ffffff" /> 
      }} />
       <Drawer.Screen name="Create" component={CreateOrderStack} options={{
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
  