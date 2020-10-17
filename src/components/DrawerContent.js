import React, {Component} from 'react';
import { View, Text, StyleSheet , Image , TouchableOpacity , TouchableNativeFeedback} from "react-native";
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList
} from '@react-navigation/drawer'
import {logout} from '../actions/Auth'
import {useDispatch, useSelector  } from 'react-redux'; 
import { color } from 'react-native-reanimated';
import { colors } from '../util/colors';


export const DrawerContent = (props) => {

    const Auth = useSelector(state => state.Auth);
    const dispatch = useDispatch();

    const roletype = (val) => {
        switch(val){
            case 0 : return 'Customer Account';
            case 1 : return 'Site Manager';
            case 2 : return 'Cash Collector';
            case 3 : return 'Merchandiser';
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.topbar}> 
                <View style={{ flexDirection : 'row'}}> 
                    <Icon name="rocket"  style={styles.topbar_icon} size={20} color="#ffffff" />
                    <Text style={styles.header_text}>Procurement COP</Text>
                </View>
            </View>
            <View style={styles.middlebar}> 
                <View style={{ flexDirection : 'row' , paddingLeft : 15 , paddingRight : 10 }}> 
                <Image style={styles.tinyLogo}
                    source={{ uri: 'http://www.ayurvedadept.sp.gov.lk/images/user.jpg' }} />
                    <View style={{paddingTop : 8}}>
                    <Text style={styles.title}>{Auth.userDetails.email}</Text>
                        <Text style={styles.subtitle}>{roletype(Auth.role)}</Text>
                    </View>
                </View>
            </View>
            <DrawerContentScrollView {...props} >
            <View style={styles.bottombar}> 
                <Text style={styles.sub_header}>Navigation</Text>
            </View>
            
            <DrawerItemList {...props}
             activeTintColor={'#1E90FF'}
             inactiveTintColor={'#848e9a'}
            itemStyle={styles.item}
            itemsContainerStyle={{borderRadius:0 ,   marginVertical : 0}}
            iconContainerStyle={{opacity: 1}}
             labelStyle={styles.item_text}/>
            <View style={styles.bottombar}> 
                 <Text style={styles.sub_header}>Extra</Text>
            </View>
            
            <DrawerItem label={'Sign Out'}
                 icon={({ color }) => <Icon name="sign-out" style={[styles.item_icon,{backgroundColor : color  }]}  size={15} color="#ffffff" />}
                 labelStyle={styles.item_text}
                 activeTintColor={'#1E90FF'}
                 inactiveTintColor={'#848e9a'}
                itemStyle={styles.item}
                onPress={() => dispatch(logout()) }
                itemsContainerStyle={{borderRadius:0 ,   marginVertical : 0}}
                iconContainerStyle={{opacity: 1}}

            />
            </DrawerContentScrollView>
        </View>
        
    )
}


export default DrawerContent;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffffff"
    },
    title: {
        color: '#ffffff' ,
        fontWeight : '700',
        fontSize : 15 ,
        alignSelf : 'flex-start',
        paddingLeft : 15 ,
    },
    sub_header: {
        color: '#545d67' ,
        fontWeight : '700',
        fontSize : 15 ,
        alignSelf : 'flex-start',
        paddingLeft : 15 ,
        paddingTop : 10 , 
        width : '100%',
        paddingBottom : 10,
        backgroundColor : '#f5f5f5bf'
    },
    subtitle: {
        color: '#ffffffbf' ,
        fontWeight : '200',
        fontSize : 13 ,
        alignSelf : 'flex-start',
        paddingLeft : 15 ,
    },
    topbar : {
        backgroundColor : '#393f46' , 
        width : '100%' , 
        paddingVertical : 5 ,      
    },
    tinyLogo: {
        width: 55,
        height: 55,
        borderRadius : 50
      },
    middlebar : {
        backgroundColor : '#424951' , 
        width : '100%' , 
        paddingVertical : 25 , 
    },
    bottombar : {
        backgroundColor : '#ffffff' , 
        width : '100%' ,    
    },
    topbar_icon : {
        alignSelf : 'center', 
        paddingLeft : 18 , 
        paddingRight : 10 , 
    },  
    item_icon : {
        alignSelf : 'center', 
        padding : 5,
        borderRadius : 4,
    },  
    header_text:{
        color: '#ffffff' ,
        fontWeight : '700',
        fontSize : 17 ,
        paddingVertical : 10,
    },
    item_text:{
        fontWeight : '600',
        fontSize : 15 ,  
        marginLeft : -10,
       
    },
    item : {
        marginHorizontal : 0,
        marginTop : 0,
        paddingHorizontal : 0 ,
    }
  });
  
