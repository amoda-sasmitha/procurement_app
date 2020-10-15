import React from "react";
import { StyleSheet , Image } from "react-native";
import { Container, Header, Button, Text,StyleProvider ,Body,Form,Item as FormItem,Input,Label,Title, Content, 
    Spinner , Toast} from "native-base";
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';
import { colors } from '../../util/colors'
import { color } from "react-native-reanimated";
import {connect } from 'react-redux'
import { login } from '../../actions/Auth'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        username : '',
        password : '',
        loading : false
    }
    console.log(props);
  }

  login = () => {
      const {username , password} = this.state;
      this.setState({loading : true});
      this.props.login(username, password)
        .then( result => {
           if(result.type == 'success'){
           }else{
            this.setState({loading : false});
            Toast.show({
                text: 'Username or Password Wrong!',
                type: 'danger',
                buttonText: 'Okay'
            })
           }
           
        })
        .catch( err => {
            console.log(err);
            this.setState({loading : false});
            Toast.show({
                text: 'Something Wrong Happend!',
                buttonText: 'Okay'
            })
        })
  }

    render(){
        const {username, password , loading } = this.state; 
        return (
          <StyleProvider style={getTheme(material)}>
             <Container>
                <Content style={{ paddingHorizontal : 15}} contentContainerStyle={{flex: 1 , justifyContent: 'center'}} >
                <Image
                    style={styles.logo}
                    source={require('../../../assets/images/logo.jpg')}
                />
                <Title style={styles.title}>Procurement COP.</Title>
                <Form>
                <FormItem regular  style={styles.forminput} last>
                    <Input 
                     placeholder={'Email'}
                     placeholderTextColor={'#666666'}
                     style={{ fontSize: 16 }} 
                     value={username}
                     onChangeText={val => this.setState({ username: val })}
                    />
                </FormItem>
                <FormItem regular style={styles.forminput} last >
                    <Input secureTextEntry={true}
                      placeholder={'Password'}
                      placeholderTextColor={'#666666'}
                      style={{ fontSize: 16 }} 
                      value={password}
                      onChangeText={val => this.setState({ password: val })}
                    />
                </FormItem>

                <Button full 
                    
                    style={styles.loginbtn} 
                    onPress={this.login}
                    // disabled={this.validate()}
                    >
                    { loading && <Spinner color={colors.White} size={22}/> }
                    <Text style={{fontWeight : '700'}} > { loading ? 'Login In..' : 'LOGIN'} </Text>
                </Button>
                <Title style={styles.subtitle}>Reset Your Account?</Title>
                </Form>
                </Content>
            </Container>
          </StyleProvider>
        );
    }

    validate = () => {
        const {username , password} = this.state;
        return username.length < 3 || password.length < 3
    }
}

const mapDispatchToProps = {
    login :login
};

const mapStateToProps = state => ({
    Auth : state.Auth || {} ,
});

export default connect( mapStateToProps ,
    mapDispatchToProps  )(Login);
  
  

const styles = StyleSheet.create({
    title: {
     color : '#212121' , 
     fontWeight : 'bold' ,
     fontSize : 18 ,
     letterSpacing : 2,
     opacity : 0.85,
    textAlign : 'center', 
    marginBottom : 15
    },
    subtitle: {
     color : colors.PrimaryDark , 
     fontWeight : '500' ,
     fontSize : 15 ,
     marginTop : 10 ,
    textAlign : 'center', 
    },
    logo : {
        width: 100,
        height: 100, 
        opacity : 0.5,
        alignSelf : 'center',
        marginTop : 0, 
        marginBottom : 5
    },
    forminput : {
        marginTop : 15 , 
        borderRadius : 10,
    },
    loginbtn : {
        marginTop: 15 , 
        backgroundColor : colors.PrimaryBlue , 
        borderRadius : 8 
    }
});
