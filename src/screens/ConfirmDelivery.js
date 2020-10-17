import React from "react";
import MainHeader from '../components/MainHeader';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import { View, Text , Image , TouchableOpacity, Alert } from "react-native";
import { colors } from '../util/colors'
import CommonStyles from '../util/CommonStyle'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { Container ,StyleProvider ,Content , ListItem  ,Toast
  , Left , Right, List , Input ,Spinner} from "native-base";
import moment from 'moment'
import { numberWithCommas , state_color , current_state } from '../util/Size'
import axios from 'axios'
import env from '../util/env'

export default class ConfirmDelivery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes : '',
      main_loading : false
    }
  }

  confirm = () => {
    const {notes} = this.state;
    this.setState({main_loading : true})
    const data = {
      id : this.props.route.params._id ,
      state : {
          state : 5,
          comment : 'Delivered' ,
          date : new Date(),
          note : notes
      }}

    axios.patch(`${env.API_URL}/api/orders/update_state` , data )
    .then( result => {
      
      Toast.show({
        text: 'Order Updated Successfully !',
        type: 'success',
        buttonText: 'Okay'
      })
      this.setState({main_loading : false})
      this.props.navigation.navigate('Completed')
    })
    .catch( err => {
      Alert.alert(JSON.stringify(err))
      this.setState({main_loading : false})
      Toast.show({
        text: 'Order Failed !',
        type: 'danger',
        buttonText: 'Okay'
      })
    })
 
  }

    render(){
      const order = this.props.route.params;
        return (
          <StyleProvider style={getTheme(material)}>
            <Container>
              <MainHeader navigation={this.props.navigation} title="Delivery Confirm" back={true}/>
              {!this.state.main_loading && <Content>
                {/* Order Items*/}
                <View style={[CommonStyles.card , {marginTop : 15}]}>
                  <View style={[CommonStyles.cardheder , {flexDirection : 'row'}]}>
                  <Text style={[CommonStyles.h3 , {fontWeight : 'bold'} ]}>Delivery Status</Text>
                  </View>
                      <Text style={[CommonStyles.h5, {paddingVertical : 10 , paddingHorizontal : 15 }]}>
                        Your approval need to complete the delivery.Adding a comment is optional
                      </Text>
                      <View style={{borderColor : colors.LightGray , borderWidth : 0.4 , marginHorizontal : 15 ,marginBottom : 10 ,borderRadius : 6 ,}} >
                        <Input 
                        placeholder={'Enter Comments'}
                        placeholderTextColor={colors.LightGray}
                        style={{textAlignVertical : 'top',fontSize: 14 ,padding : 10 }}
                        multiline={true}
                        numberOfLines={3}
                        value={this.state.notes}
                        onChangeText={val => this.setState({ notes: val })}
                        />
                        </View>

                        <TouchableOpacity 
                        activeOpacity={0.5}
                        onPress={this.confirm}
                        style={{  width : 120 , paddingVertical : 5 , marginHorizontal : 15 , marginBottom : 15
                          , backgroundColor : '#2ecc71' , 
                        borderRadius : 6  , justifyContent : 'center'}}>
                      <Text style={{fontWeight : '700', color : colors.White , textAlign :
                      'center' , fontSize : 13}} >Cofirm Delivery</Text>
                      </TouchableOpacity>
                                    
                </View>
                {/* Order Items*/}
                <View style={[CommonStyles.card ]}>
                <View style={[CommonStyles.cardheder , {flexDirection : 'row'}]}>
                    <Text style={[CommonStyles.h3 , {fontWeight : 'bold'} ]}>Order Items</Text>
                </View>
                <List>
                    {order.items.map( (item,index , array) => (
                    <ListItem noIndent key={index} 
                      style={{borderBottomWidth : 1/3 }}>
                      <Left>
                        <Content>
                          <View style={{flexDirection : 'row' , paddingVertical : 4}}>
                            <View style={{flex : 2 , justifyContent : 'center' }}>
                            <Image
                                style={{width : 42 , height : 42  }}
                                source={require('../../assets/images/box-closed.png')}
                            />
                            </View>
                            <View style={{flex : 6 }}>
                              <Text style={[CommonStyles.h4 , {fontWeight :'700'}]} >{`${item.quantity} X LKR ${item.item && item.item.price}.00`}</Text>
                              <Text style={CommonStyles.h5} >{item.item && item.item.name}</Text>
                            </View>
                          </View>
                        </Content>
                      </Left>
          
                    </ListItem>
                    ))
                  }

                  <ListItem noIndent
                    style={{borderBottomWidth : 0 }}>
                      <View style={{flexDirection : 'row', paddingVertical : 5}}>
                      <Text style={[CommonStyles.h4 , {fontWeight :'700' , color : colors.LightGray}]} >{`TOTAL `}</Text>
                      <Text style={[CommonStyles.h4 , {fontWeight :'700'}]} >{` LKR ${numberWithCommas(this.gettotal(order.items))}.00`}</Text>
                       </View>
                  </ListItem>
                </List>
                </View>  
                </Content> }

                { this.state.main_loading && <Content><Spinner color={colors.LightGray}></Spinner></Content>}
            </Container>
          </StyleProvider>
        );
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



