
import React, {Component} from 'react';
import {Text , View , ActivityIndicator , Image} from "react-native";
import { colors } from '../util/colors'
import CommonStyles from '../util/CommonStyle'
import { Content , ListItem , Icon , Left , Right, List } from "native-base";
import moment from 'moment'

export default function OrdersList(props){
    return(
        <List>
        {props.orders.map( (item ,index , array) => (
        <ListItem noIndent key={index} 
          onPress={() => props.navigation.navigate({ name : props.redirect , params : item })}
          style={{borderBottomWidth : (array.length == index + 1 ? 0 : 1/3 )}}>
          <Left>
            <Content>
              <View style={{flexDirection : 'row'}}>
                <View style={{flex : 2 , justifyContent : 'center' }}>
                <Image
                    style={{width : 48 , height : 48  }}
                    source={require('../../assets/images/box.png')}
                />
                </View>
                <View style={{flex : 6 }}>
                  <Text style={[CommonStyles.h4 , {fontWeight :'700'}]} >{`LKR ${item.total}.00`}</Text>
                  <Text style={CommonStyles.h5} >Site {item.site_data && item.site_data.site_code}</Text>
                  <Text style={CommonStyles.h5} >{moment(item.date).format('LL')}</Text>
                </View>
              </View>
            </Content>
          </Left>
          <Right>
              <Icon style={{color: colors.LightGray ,fontSize: 20 }} name='chevron-forward-outline' />
          </Right>
        </ListItem>
        ))
      }

      { props.orders && props.orders.length == 0 &&  !props.loading && 
         <ListItem noIndent
         style={{borderBottomWidth : 0 }}>
           <View style={{flexDirection : 'row', paddingVertical : 15}}>
           <Icon style={{color: colors.LightGray ,fontSize: 30 }} name='alert-circle-outline' />
             <Text style={[CommonStyles.h4 , {marginLeft : 5 , marginTop : 6 , color: colors.LightGray}]} >No Recent Orders Found !</Text>
           </View>
       </ListItem>
      }

      { props.loading && 
         <ListItem noIndent
         style={{borderBottomWidth : 0 }}>
           <View style={{flexDirection : 'row' , paddingVertical : 15 }}>
              <ActivityIndicator color={colors.LightGray}/>
             <Text style={[CommonStyles.h4 , {marginLeft : 10 , marginTop : 0 , color: colors.LightGray}]} >Orders Loading..</Text>
           </View>
       </ListItem>
      }


      </List>
    );
}

