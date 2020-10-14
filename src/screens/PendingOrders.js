import React from "react";
import { Container , StyleProvider } from "native-base";
import MainHeader from '../components/MainHeader';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';


export default class PendingOrders extends React.Component {
  constructor(props) {
    super(props);
    
  }

  componentDidMount(){
  }

    render(){
        return (
          <StyleProvider style={getTheme(material)}>
            <Container>
              <MainHeader navigation={this.props.navigation} title="Pending Orders"/>
            </Container>
          </StyleProvider>
        );
    }
}

