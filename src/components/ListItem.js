import React from 'react';

import { StyleSheet } from 'react-native';

import { List } from '@ant-design/react-native';
const Item = List.Item;

export default class ListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  _onPress = () => {
    this.props.onPressItem(this.props.index);
  };

  render() {
    return (
      <List>
        <Item extra={this.props.title} arrow="empty" onPress={this._onPress}>
          {this.props.username}
        </Item>
      </List>
    );
  }
}
