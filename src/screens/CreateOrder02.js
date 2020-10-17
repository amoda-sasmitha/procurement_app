import React from "react";
import {Keyboard} from 'react-native'
import MainHeader from '../components/MainHeader';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import { View, Text , Image , TouchableOpacity } from "react-native";
import { colors } from '../util/colors'
import CommonStyles from '../util/CommonStyle'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { Container ,StyleProvider ,Content , Spinner ,Toast ,
   ListItem  , Left , Right, List, Input,Picker, Button } from "native-base";
import moment from 'moment'
import axios from 'axios'
import env from '../util/env'
import {connect }from 'react-redux'

 class CreateOrder01 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : true ,
      items : [],
      selected : [],
      main_loading : false ,
      item_selected  : '',
      qty : '' ,
      supplier : props.route.params.supplier ,
      site : props.route.params.site,
      date : props.route.params.date,
    }
  }

  componentDidMount(){
    this.getData();
  }

  getData = () => {
    axios.get(`${env.API_URL}/api/items/get_all`)
    .then( result => {
      this.setState({ items : result.data.data , loading : false })
    })
    .catch( err => {
      console.log(err);
    })
   
  }

  additem = () => {
    const { items , item_selected , qty} = this.state;
    let selected = this.state.selected;

     if(qty.length > 0 && item_selected.length > 0 ){

        let sm = items.find(i => i._id == item_selected);
        let is_in = selected.findIndex(i => i.item.id == item_selected);
        if(is_in < 0 ){
            this.setState({selected : [...selected , {
              item : {
                id : sm._id,
                name : sm.item_name,
                price : sm.price
              },
              quantity : parseInt(qty)
            }]})
        }else{
          selected = selected.map( item => {
            if(item.item.id == sm._id){
              return {
                item : item.item,
                quantity : item.quantity + parseInt(qty)
              }
            }else{
              return item;
            }
          })
          Keyboard.dismiss()
          this.setState({selected : selected})
        }

     }
  }

  addorder = () => {
   const {selected ,supplier , site , date } = this.state;
   const data = {
    items : selected , 
    supplier : supplier._id ,
    employee : this.props.Auth.userDetails.id,
    date : date ,
    site : site._id,
    total : this.gettotal(selected),
    state : [{ state : 1 , comment : 'Order Placed' , date : new Date() }]
   }
   this.setState({main_loading : true})
   axios.post(`${env.API_URL}/api/orders/create` , data )
   .then( result => {
    this.setState({main_loading : true})
    Toast.show({
      text: 'Order Added Successfully !',
      type: 'success',
      buttonText: 'Okay'
    })
    this.setState({main_loading : false})
    this.props.navigation.navigate('Pending')
   })
   .catch( err => {
    this.setState({main_loading : false})
    Toast.show({
      text: 'Order Failed !',
      type: 'danger',
      buttonText: 'Okay'
    })
   })
  
  }

    render(){
      const { date , supplier , site , qty , items , loading ,main_loading 
         ,selected , item_selected} = this.state
        return (
          <StyleProvider style={getTheme(material)}>
            <Container>
              <MainHeader navigation={this.props.navigation} title="Place Order"/>
              {!main_loading && <Content>
            
                { !loading && <>
                <View style={[CommonStyles.card, { paddingBottom : 15 }]}>
                <View style={[CommonStyles.cardheder , {flexDirection : 'row'}]}>
                    <Text style={[CommonStyles.h3 , {fontWeight : 'bold'} ]}>Select Items</Text>
                </View>
                <View style={CommonStyles.default_input} >
          

                  <View style={{flexDirection : 'row' , paddingTop : 5}}>
                    <View style={{ flex : 4 , borderRadius : 6, borderWidth : 0.25 , borderColor : colors.LightGray, marginRight : 5 }}>
                    <Picker
                      mode="dropdown"
                      placeholderStyle={{ color: "#bfc6ea" }}
                      placeholderIconColor="#007aff"
                      selectedValue={item_selected}
                      onValueChange={(value) => this.setState({item_selected : value})}
                    >
                    <Picker.Item label="Select Item" value="" />
                      {
                        items.map((item,i) => (
                          <Picker.Item  key={i} label={`${item.item_name} - LKR ${item.price}.00`} value={item._id} />
                        ))
                      }
                    </Picker>
                    </View>
                    <Input 
                     keyboardType={'number-pad'}
                      textAlign={'center'} 
                      placeholder={'Qty'}
                      placeholderTextColor={'#666666'}
                      style={CommonStyles.quantity} 
                      value={qty}
                      onChangeText={val => this.setState({ qty: val })}
                      />
                  </View>
                    <TouchableOpacity 
                      activeOpacity={0.5}
                      onPress={this.additem}
                      style={{ marginTop : 10 , width : 100 , paddingVertical : 5
                        , backgroundColor : colors.PrimaryBlue , 
                      borderRadius : 6  , justifyContent : 'center'}}>
                    <Text style={{fontWeight : '700', color : colors.White , textAlign :
                     'center' , fontSize : 15}} >Add Item</Text>
                    </TouchableOpacity>
                
                </View>
                </View>
                { selected.length > 0 &&
                <View style={[CommonStyles.card]}>
                <View style={[CommonStyles.cardheder , {flexDirection : 'row'}]}>
                    <Text style={[CommonStyles.h3 , {fontWeight : 'bold'} ]}>Selected Items</Text>
                </View>
                <List>
                    {selected.map( (item,index , array) => (
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
                      <View style={{flexDirection : 'row', paddingVertical : 5 , justifyContent : 'space-around' , alignContent : 'center'}}>
                      <Text style={[CommonStyles.h4 , {fontWeight :'700' , color : colors.LightGray , flex : 1}]} >{`TOTAL `}</Text>
                      <Text style={[CommonStyles.h4 , {fontWeight :'700', flex : 2}]} >{` LKR ${this.gettotal(selected)}.00`}</Text>

                      <TouchableOpacity
                        onPress={this.addorder}
                        style={{flex : 2 , justifyContent : 'center' , flexDirection : 'row'}}>
                        <Text style={{backgroundColor : colors.PrimaryDark , 
                          color : colors.White , fontWeight : 'bold' , 
                          borderRadius : 6 , paddingHorizontal : 10 ,
                          paddingVertical : 5 , textAlign : 'center' }}>Place Order</Text>
                       
                      </TouchableOpacity>
                       </View>
                  </ListItem>
                </List>
                </View> }
                </>
                }
                  <View style={[CommonStyles.card , {marginTop : 15}]}>
                  <List>
                  <ListItem
                      style={{borderBottomWidth : 1/3 }}>
                        <Content>
                          <View style={{flexDirection : 'row'}}>
                            <View style={{flex : 1 }}>
                              <Text style={[CommonStyles.h4 , {fontWeight :'700'}]} >{`Site Name`}</Text>
                              <Text style={CommonStyles.h5} >{site.site_code}</Text>
                            </View>
                            <View style={{flex : 1 }}>
                              <Text style={[CommonStyles.h4 , {fontWeight :'700'}]} >{`Site Address`}</Text>
                               <Text style={CommonStyles.h5} >{site.address}</Text>
                            </View>
                          </View>
                        </Content>
                     
                    </ListItem>
                  <ListItem
                      style={{borderBottomWidth : 1/3 }}>
                        <Content>
                          <View style={{flexDirection : 'row'}}>
                            <View style={{flex : 1 }}>
                              <Text style={[CommonStyles.h4 , {fontWeight :'700'}]} >{`Delivery Date`}</Text>
                               <Text style={CommonStyles.h5} >{moment(date, 'YYYY-MM-DD').format('LL')}</Text>
                            </View>
                            <View style={{flex : 1 }}>
                              <Text style={[CommonStyles.h4 , {fontWeight :'700'}]} >{`Supplier`}</Text>
                               <Text style={CommonStyles.h5} >{supplier.name}</Text>
                            </View>
                          </View>
                        </Content>
                     
                    </ListItem>
                  </List>
                </View>
                { loading && <Spinner color={colors.LightGray}></Spinner>}
                
            
              </Content>}

              { main_loading && <Content><Spinner color={colors.LightGray}></Spinner></Content>}
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



const mapStateToProps = state => ({
  Auth : state.Auth || {} ,
});

export default connect( mapStateToProps  )(CreateOrder01);


