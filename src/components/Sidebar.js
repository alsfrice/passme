import React from 'react';

import { StyleSheet, StatusBar, ScrollView, View, Text } from 'react-native';

import { List } from '@ant-design/react-native';
const Item = List.Item;

export default class Sidebar extends React.Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.header} />
        <View>
          <List>
            <Item extra="没有箭头" arrow="empty">
              标题文字
            </Item>
          </List>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#F87299',
    paddingTop: StatusBar.currentHeight,
    height: 150
  }
});
