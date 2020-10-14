
import React, {Component} from 'react';
import { View, Text, StyleSheet } from "react-native";
import { colors } from '../util/colors'
import { Icon } from 'native-base'

export default function Card(props){
    return(
        <View style={[styles.card , props.left ? styles.left : styles.right ]}>
            <Icon style={styles.icon} name={props.icon} />
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.subtitle}>{props.subtitle}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        color: colors.SecondaryDark ,
        fontWeight : '700',
        fontSize : 15 ,
        opacity : 0.9,
        alignSelf : 'center',
        paddingTop : 5 ,
    },
    subtitle: {
        color: colors.LightGray ,
        fontWeight : '500',
        fontSize : 15 ,
        alignSelf : 'center',
        paddingBottom : 8 ,
    },
    icon : {
        color: colors.SecondaryDark ,
        fontSize: 40,
        opacity : 0.7,
        alignSelf : 'center',
        paddingTop : 10
    },
    card : {
        backgroundColor : '#ffffff' , 
        flex : 1 , 
        paddingVertical : 8,
        borderRadius : 5,
        elevation: 4,
        marginBottom : 10
    },
    left : {
        marginRight : 5,
        marginLeft : 10
    },
    right : {
        marginLeft : 5,
        marginRight : 10
    }
})