import React, {Component} from 'react';
import {  Header, Title, Button, Icon, Left, Right, Body } from "native-base";

export default class MainHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Header>
            <Left>
              <Button transparent
              onPress={this.props.navigation.openDrawer}
              >
                <Icon name='menu' />
              </Button>
            </Left>
            <Body>
              <Title>{this.props.title}</Title>
            </Body>
            <Right>
              {/* <Button transparent>
                <Icon name='search' />
              </Button>
              <Button transparent>
                <Icon name='cart' />
              </Button> */}
            </Right>
      </Header>
    );
  }

}
