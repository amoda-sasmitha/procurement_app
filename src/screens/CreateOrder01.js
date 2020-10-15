import React from "react";
import { Container , Content, StyleProvider , Form,Item as FormItem,Input,Label, 
  Title,Picker,DatePicker, Icon ,TabHeading , Button} from "native-base";
import MainHeader from '../components/MainHeader';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import { View, Text, StyleSheet , Image } from "react-native";
import CommonStyles from '../util/CommonStyle'
import Card from '../components/Card';
import moment from 'moment'
import axios from 'axios'
import env from '../util/env'
import { colors } from "../util/colors";

export default class CreateOrder01 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sites : [],
      suppliers : [], 
      site : '',
      supplier : '' ,
      date : ''
    }
  }

  componentDidMount(){
    this.getData();
  }

  getData = () => {
    axios.get(`${env.API_URL}/api/sites/get_all`)
    .then( result => {
      this.setState({ sites : result.data.data })
      return axios.get(`${env.API_URL}/api/suppliers/get`)
    })
    .then( result => {
      this.setState({ suppliers : result.data.data })
    })
    .catch( err => {
      console.log(err);
    })
   
  }

  next = () => {
    const {site , supplier , date , suppliers , sites }= this.state;
    const data = {
      supplier : suppliers.find( i => i._id == supplier) ,
      site : sites.find( i => i._id == site) ,
      date : date
    }
    this.props.navigation.navigate({ name : 'Create02' , params : data })
  }

    render(){
      const { sites ,site , supplier , suppliers , date }= this.state;
        return (
          <StyleProvider style={getTheme(material)}>
            <Container>
              <MainHeader navigation={this.props.navigation} title="Place Order"/>
               <Content>
               
                <Form>
                <Text style={[CommonStyles.h5dark, {paddingHorizontal : 12 , marginTop : 18 , fontWeight : 'bold'}]}>
                  Construction Site
                </Text>
                <FormItem regular  style={CommonStyles.default_input}>
                  
                    <Picker
                    mode="dropdown"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    selectedValue={site}
                    onValueChange={(value) => this.setState({site : value})}
                  >
                    <Picker.Item label="Select Site Address" value="" />
                    {
                      sites.map((item,i) => (
                        <Picker.Item  key={i} label={`${item.site_code} - ${item.address}`} value={item._id} />
                      ))
                    }
                  </Picker>
                </FormItem>

                <Text style={[CommonStyles.h5dark, {paddingHorizontal : 12 , marginTop : 18 , fontWeight : 'bold'}]}>
                  Provide Supplier 
                </Text>
                <FormItem  regular  style={CommonStyles.default_input} >
                    <Picker
                    mode="dropdown"
                   
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    selectedValue={supplier}
                    onValueChange={(value) => this.setState({supplier : value})}
                  >
                    <Picker.Item label="Select Supplier" value="" />
                    {
                      suppliers.map((item,i) => (
                        <Picker.Item  key={i} label={`${item.name}`} value={item._id} />
                      ))
                    }
                  </Picker>
                </FormItem>

                <Text style={[CommonStyles.h5dark, {paddingHorizontal : 12 , marginTop : 18 , fontWeight : 'bold'}]}>
                    Delivery Date {JSON.stringify(!(site.length > 0  && supplier.length > 0 && date.length > 0) )}
                </Text>
                <FormItem  regular  style={[CommonStyles.default_input, {paddingVertical : 5 }]} >
                
                <DatePicker
                  defaultDate={new Date()}
                  minimumDate={new Date()}
                  locale={"en"}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={"fade"}
                  androidMode={"default"}
                  placeHolderText="Select Date"
                  textStyle={{ color: colors.PrimaryDark }}
                  placeHolderTextStyle={{ color: colors.PrimaryDark }}
                  onDateChange={(date)=> this.setState({date : moment(date).format('YYYY-MM-DD')})}
                  disabled={false}
                  />
                </FormItem>

                <Button full 
                    disabled={!(site.length > 0  && supplier.length > 0 && date.length > 0) } 
                    style={CommonStyles.sample_btn} 
                    onPress={this.next}
                    
                    >
                    <Text style={{fontWeight : '700', color : colors.White ,paddingVertical : 12 }} >Next Step</Text>
                </Button>
                </Form>
               </Content>
            </Container>
          </StyleProvider>
        );
    }
}

