import React from "react";
import MainHeader from '../components/MainHeader';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import { View, Text , Image } from "react-native";
import { colors } from '../util/colors'
import CommonStyles from '../util/CommonStyle'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { Container ,StyleProvider ,Content , ListItem  , Left , Right, List } from "native-base";
import moment from 'moment'
import { numberWithCommas , state_color , current_state } from '../util/Size'

export default class SingleOrder extends React.Component {
  constructor(props) {
    super(props);
  
  }

  componentDidMount(){
    console.log(this.props)
  }

    render(){
      const order = this.props.route.params;
        return (
          <StyleProvider style={getTheme(material)}>
            <Container>
              <MainHeader navigation={this.props.navigation} title="Order Details" back={true}/>
              <Content>

                {/* Order Items*/}
                <View style={[CommonStyles.card , {marginTop : 15}]}>
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

                 {/* Order Items*/}
                 <View style={[CommonStyles.card , {marginTop : 5}]}>
                <View style={[CommonStyles.cardheder , {flexDirection : 'row'}]}>
                    <Text style={[CommonStyles.h3 , {fontWeight : 'bold'} ]}>Order Status</Text>
                </View>
                <List>
                    {order.state.map( (item,index , array) => (
                    <ListItem noIndent key={index} 
                      style={{borderBottomWidth : 1/3 }}>
                     
                        <Content>
                          <View style={{flexDirection : 'row'}}>
                            <View style={{flex : 2 , justifyContent : 'center' }}>
                                <View style={{width : 48 }}>
                                {this.status(item.state)}
                                </View>
                            </View>
                            <View style={{flex : 7 }}>
                              <Text style={[CommonStyles.h4 , {fontWeight :'700'}]} >{`${item.comment}`}</Text>
                               {item.note != undefined && item.note.length > 0 && <Text style={[CommonStyles.h6,{ fontWeight : '700',paddingVertical : 5}]} >{item.note}</Text>}
                               {item.date != undefined && <Text style={CommonStyles.h6} >{moment(item.date).calendar()}</Text>}
                            </View>
                          </View>
                        </Content>
                     
                    </ListItem>
                    ))
                  }

                  <ListItem noIndent
                    style={{borderBottomWidth : 0 }}>
                      <View style={{flexDirection : 'row', paddingVertical : 5 }}>
                      <Text style={[CommonStyles.h4 , {fontWeight :'700' , color : colors.LightGray}]} >{`STATUS `}</Text>
                     
                      <Text style={[{ fontSize : 13 , paddingVertical : 3, fontWeight : 'bold' , paddingHorizontal : 8 , marginLeft : 5 , borderRadius : 3}
                       ,state_color(order.current_state)]} >{current_state(order.current_state)}</Text>
                     
                       </View>
                  </ListItem>
                </List>
                </View>
                   
              </Content>
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

    status = (status) => {
      switch(parseInt(status)){
        case 1 : return  <Icon name="archive" style={[ CommonStyles.status_icon ,{backgroundColor : '#007bff' }]}  size={16} color="#ffffff" />
        case 2 : return  <Icon name="check" style={[ CommonStyles.status_icon ,{backgroundColor : "#5F61BD" }]}  size={16} color="#ffffff" />
        case 3 : return  <Icon name="check" style={[ CommonStyles.status_icon ,{backgroundColor : "#F3661E" }]}  size={16} color="#ffffff" />
        case 4 : return  <Icon name="check" style={[ CommonStyles.status_icon ,{backgroundColor : "#3CC49F" }]}  size={16} color="#ffffff" />
        case 0 : return  <Icon name="archive" style={[ CommonStyles.status_icon ,{backgroundColor : '#bd2130' }]}  size={16} color="#ffffff" />
        case 5 : return  <Icon name="check" style={[ CommonStyles.status_icon ,{backgroundColor : '#1e7e34' }]}  size={16} color="#ffffff" />
      }
    }

   


}



