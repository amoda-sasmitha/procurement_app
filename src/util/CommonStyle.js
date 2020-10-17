import { colors } from './colors'
import {  StyleSheet } from "react-native";

export default  StyleSheet.create({
    normalPage: {
      position: 'relative',
      flex: 1,
      backgroundColor: colors.PrimaryDark,
    },
    card : {
        backgroundColor : '#ffffff' , 
        // paddingVertical : 3 , 
        marginHorizontal : 10,
        marginTop : 5,
        borderRadius : 5,
        elevation: 4,
        marginBottom : 15
    },
    h3 : {
        color: colors.PrimaryDark ,
        fontSize : 16 ,
        // fontWeight : 'bold',
        alignSelf : 'flex-start',
       
    },
    h4 : {
        color: colors.SecondaryDark ,
        fontSize : 14.5 ,
        alignSelf : 'flex-start',
    },
    h5 : {
        color: colors.LightGray ,
        fontSize : 14 ,
        alignSelf : 'flex-start',
    },
    h6 : {
        color: colors.LightGray ,
        fontSize : 12.5 ,
        alignSelf : 'flex-start',
    },
    h5dark : {
        color: colors.PrimaryDark ,
        fontSize : 14 ,
        alignSelf : 'flex-start',
    },
    cardheder : {
        paddingHorizontal : 15 ,
        backgroundColor : '#F5F5F5',
        width : '100%',
        paddingVertical : 8,
        borderColor : '#c9c9c9',
        borderBottomWidth : 0.33
    },
    status_icon : {
            alignSelf : 'center', 
            padding : 5,
            borderRadius : 4,
    },
    default_input : {
        marginTop : 5 ,
        // marginBottom : 10 ,
        marginLeft : 12 ,
        marginRight : 12 ,
        borderWidth : 0,
        borderColor : colors.LightGray ,
        borderRadius : 6,
    },
    sample_btn : {
        marginHorizontal : 12 ,
        marginTop: 18 , 
        paddingVertical : 10,
        backgroundColor : colors.PrimaryBlue , 
        borderRadius : 4 
    },
    quantity : {
        paddingVertical : 0 ,
         fontSize: 16 , 
         borderColor : colors.LightGray , 
        borderWidth : 0.25 , 
        borderRadius : 6 , 
        paddingHorizontal : 12 
    },
    XX01 : {
        backgroundColor : '#007bff'
    },
    XX02 : {
        backgroundColor : '#5F61BD'
    },
    XX03 : {
        backgroundColor : '#F3661E'
    },
    XX04 : {
        backgroundColor : '#3CC49F'
    },
    XX05 : {
        backgroundColor : '#2ecc71'
    },
    XX00 : {
        backgroundColor : '#bd2130'
    },
    bb01 : {
        borderColor : '#007bff',
        borderWidth : 1,
        color : '#007bff',
    },
    bb02 : {
        borderColor : '#5F61BD',
        borderWidth : 1,
        color :'#5F61BD',
    },
    bb03 : {
        borderColor : '#F3661E',
        borderWidth : 1,
        color : '#F3661E',
    },
    bb04 : {
        borderColor : '#3CC49F',
        borderWidth : 1,
        color : '#3CC49F',
    },
    bb05 : {
        borderColor : '#2ecc71',
        borderWidth : 1,
        color : '#2ecc71',
    },
    bb00 : {
        borderColor : '#bd2130',
        borderWidth : 1,
        color :'#bd2130',
    },
    state : {
        marginVertical : 3,
        borderRadius : 3,
        paddingHorizontal : 8,
        paddingVertical : 3,
        fontWeight : '700',
        fontSize : 12,
        alignSelf: 'flex-start'
    }
});