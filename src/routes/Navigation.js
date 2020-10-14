import React, { Component } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import {  View, StyleSheet , Text } from 'react-native';
import { DrawerNavigator  } from "./DrawerNavigator";
import { AuthStackNavigator  } from "./AuthStackNavigator";
import { connect } from 'react-redux';
class Navigation extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      is_vaildated : false
    };
  }

    render(){
        return (
          <NavigationContainer>
            {this.props.Auth.isAuthenticated ? <DrawerNavigator /> : <AuthStackNavigator/>}          
        </NavigationContainer>
        );
    }
}

const mapStateToProps = state => ({
  Auth : state.Auth || {} ,
});


export default connect(mapStateToProps)(Navigation)


