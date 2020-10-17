import React from "react";
import { Container , StyleProvider , Content } from "native-base";
import MainHeader from '../components/MainHeader';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import OrdersList from '../components/OrdersList';
import CommonStyles from '../util/CommonStyle'
import moment from 'moment'
import axios from 'axios'
import { View, Text, StyleSheet , Image  ,ActivityIndicator } from "react-native";
import env from '../util/env'
import _ from 'lodash'
import { colors } from '../util/colors'

export default class Deliveries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pending : [],
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
        pending : result.data.data
        .filter( (item,i) => (item.current_state == 4) ) ,
        loading : false
      })
    })
    .catch( err => {
      this.setState({loading : false})
    })
   
  }


    render(){
        return (
          <StyleProvider style={getTheme(material)}>
            <Container>
              <MainHeader navigation={this.props.navigation} title="Deliveries"/>
              <Content>
              { this.renderDeliveries().map( (row,i) => (
              <View key={i} style={[CommonStyles.card, {marginTop : i== 0 ? 15  : 0 }]}>
              <View style={[CommonStyles.cardheder , {flexDirection : 'row'}]}>
              <Text style={[CommonStyles.h3 , {fontWeight : 'bold'} ]}>Deliveries On {moment(row.date,'YYYY-MM-DD').format('MMM Do')}</Text>
              </View>
                  <OrdersList 
                    redirect={'ConfirmDelivery'}
                    navigation={this.props.navigation}
                    orders={row.orders} 
                    loading={this.state.loading} />
              </View> ))}

                { this.state.loading && <ActivityIndicator color={colors.LightGray} style={{marginTop : 15}}/>}
                { !this.state.loading && this.renderDeliveries().length == 0 && 
                 <View key={i} style={[CommonStyles.card, {marginTop : 10 }]}>
                     <OrdersList 
                      redirect={'ConfirmDelivery'}
                      navigation={this.props.navigation}
                      orders={[]} 
                      loading={false} />
                 </View>
                }

              
              </Content>
            </Container>
          </StyleProvider>
        );
    }

    renderOrders = () => {
      const {pending , sites } = this.state;
      return pending
      .map( item => {
          let site = sites.find(i => i._id == item.site)
          return {
            ...item , site_data : site , total : this.gettotal(item.items)
          }
      })
    }

    renderDeliveries = () => {
      let data = _.groupBy( this.renderOrders() , item => moment(item.date).format('YYYY-MM-DD')  )
      return Object.keys(data).map(key => ({ date : key, orders : data[key] }));
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

}

