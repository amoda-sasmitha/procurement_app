import React from "react";
import { Container , StyleProvider , Content } from "native-base";
import MainHeader from '../components/MainHeader';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import OrdersList from '../components/OrdersList';
import CommonStyles from '../util/CommonStyle'
import moment from 'moment'
import axios from 'axios'
import { View, Text, StyleSheet , Image } from "react-native";
import env from '../util/env'

export default class PendingOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pending : [],
      sites : [],
      loading : true
    }
  }

  componentDidMount(){
    this.getData();
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
        pending : result.data.data.filter( (item,i) => item.current_state == 1 ) ,
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
            <Container>
              <MainHeader navigation={this.props.navigation} title="Pending Orders"/>
              <Content>
              <View style={[CommonStyles.card, {marginTop : 10 }]}>
                  <OrdersList 
                    redirect={'SOPending'}
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
      const {pending , sites } = this.state;
      return pending.map( item => {
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

}

