// ./screens/Home.js

import React from "react";
import { View, Text, StyleSheet , Image ,TouchableOpacity  } from "react-native";
import { Container ,Badge, StyleProvider, Content , ListItem , Icon , Switch , Left , Right, Button , Body , List} from "native-base";
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import { colors } from '../util/colors'
import MainHeader from '../components/MainHeader';
import Card from '../components/Card';
import OrdersList from '../components/OrdersList';
import CommonStyles from '../util/CommonStyle'
import moment from 'moment'
import axios from 'axios'
import env from '../util/env'

export default class Home extends React.Component {
    
  constructor(props) {
    super(props);
    this.state = {
      recent : [],
      sites : [],
      loading : true
    }
  }

  componentDidMount(){
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getData();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  getData = () => {

    axios.get(`${env.API_URL}/api/sites/get_all`)
    .then( result => {
      this.setState({
        sites : result.data.data
      })

      return axios.get(`${env.API_URL}/api/orders/get_all`)
    })
    .then( result => {
      this.setState({
        recent : result.data.data ,
        loading : false
      })
    })
    .catch( err => {
      console.log(err);
      this.setState({loading : false})
    })
   
  }

  render(){
        return (
          <StyleProvider style={getTheme(material)}>
            <Container style={{backgroundColor : '#f9f9f9'}}>
              <MainHeader navigation={this.props.navigation} title="Dashboard"/>
            <Content>
                
              <View style={{ flexDirection : 'row'}}> 
                <TouchableOpacity  
                    activeOpacity={0.85}
                    onPress={()=>this.props.navigation.navigate('Pending')}
                    style={[styles.middlebar, { marginLeft : 12 , marginRight : 3 , backgroundColor : 'white'}]}> 
                    { !this.state.loading && 
                    <Text style={[styles.num,{ color : colors.PrimaryBlue }]} >{("0" + this.counts()[0]).slice(-2)}</Text>}
                    <Text style={styles.title}>{`Pending${'\n'}Orders`}</Text>
                </TouchableOpacity >
                <TouchableOpacity 
                 activeOpacity={0.85}
                 onPress={()=>this.props.navigation.navigate('Completed')}
                style={[styles.middlebar, { marginLeft : 3 , marginRight : 3 , backgroundColor : 'white'}]}> 
                      { !this.state.loading && 
                      <Text style={[styles.num,{ color : "#3CC49F" }]} >{("0" + this.counts()[1]).slice(-2)}</Text>}
                    <Text style={styles.title}>{`Completed${'\n'}Orders`}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                 activeOpacity={0.85}
                 onPress={()=>this.props.navigation.navigate('Rejected')}
                style={[styles.middlebar, { marginLeft : 3 , marginRight : 12 , backgroundColor : 'white'}]}> 
                { !this.state.loading && 
                <Text style={[styles.num,{ color : "#5F61BD"}]} >{("0" + this.counts()[2]).slice(-2)}</Text>}
                    <Text style={styles.title}>{`Rejected${'\n'}Orders`}</Text>
                </TouchableOpacity>
              
              </View>
                

              {/* Recent Orders */}
                <View style={CommonStyles.card}>
                <View style={[CommonStyles.cardheder , {flexDirection : 'row'}]}>
                <Text style={[CommonStyles.h3 ]}>Recent Orders</Text>
                </View>
                  <OrdersList 
                    redirect={'Order'}
                    navigation={this.props.navigation}
                    orders={this.renderOrders()} 
                    loading={this.state.loading} />
              </View>

            </Content>
            </Container>
        </StyleProvider>
        );
    }

    renderOrders = () => {
      const {recent , sites } = this.state;
      return recent
      .sort((a,b) => new Date(b.created_on).getTime() - new Date(a.created_on).getTime() )
      .filter((row,i) => i < 5)
      .map( item => {
          let site = sites.find(i => i._id == item.site)
          return {
            ...item , site_data : site , total : this.gettotal(item.items)
          }
      })
    }

    gettotal = (items = []) => {
      return items.reduce( (acc,current) => {
        if(current.item && current.item.price && current.quantity){
            return acc + (current.item.price * current.quantity)
        }else{
          return acc
        }
      },0)
    }

    counts = () => {
      const { recent} = this.state;
      let counts = [0,0,0]
      recent.forEach( value => {
        if(value.current_state != 0 && value.current_state != 5){
          counts[0] = counts[0] + 1 
        }else if(value.current_state == 5){
          counts[1] = counts[1] + 1 
        }else if(value.current_state == 0){
          counts[2] = counts[2] + 1 
        }
      })

      return counts;

    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  title: {
      color: colors.SecondaryDark ,
      fontWeight : 'bold',
      fontSize : 13.5 ,
      textAlign : 'center' ,
      alignSelf : 'center',
  },
  blue_badge: {
      color: colors.White ,
      fontWeight : '700',
      fontSize : 13 ,
      backgroundColor : colors.infoBlue,
      alignSelf : 'flex-end',
      paddingHorizontal: 10 ,
      borderRadius : 5 ,
      paddingVertical : 2,
      // marginRight : 5
  },
  num : {
    
      fontWeight : 'bold',
      fontSize : 40 ,
      lineHeight : 42,
      textAlign : 'center',
  },
  white_card : {
      backgroundColor : '#ffffff',
      alignSelf : 'center',
      paddingHorizontal: 15 ,
      borderRadius : 5 ,
      paddingVertical : 5 ,
  },
  
  subtitle: {
      color: '#f5f5f5' ,
      fontWeight : '200',
      fontSize : 13 ,
      alignSelf : 'flex-start',
      paddingLeft : 15 ,
  },
  tinyLogo: {
      width: 55,
      height: 55,
      borderRadius : 50
    },
  middlebar : {
      flex : 1, 
      paddingVertical : 20 , 
      marginTop : 15,
      borderRadius : 12,
      elevation: 3,
      marginBottom : 10 
  }
});



