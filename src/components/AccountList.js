import React from 'react';

import { StyleSheet, FlatList, View, ToastAndroid } from 'react-native';

import ListItem from './ListItem.js';

import Prompt from './Prompt.js';

import { getData, setData } from '../utils/storage.js';

export default class AccountList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: []
    };
  }

  componentDidMount() {
    getData('accounts').then(val => {
      let accounts = [];
      accounts = val === null ? [] : JSON.parse(val);
      // console.log(accounts);
      this.setState({ accounts });
    });
    // console.log(this.state.accounts);
  }

  _renderItem = ({ item, index }) => (
    <ListItem
      index={index}
      username={item.username}
      title={item.title}
      onPressItem={this._onPressItem}
    />
  );

  _onPressItem = i => {
    // console.log(this.state.accounts[id]);
    this.prompt.showModal(this.state.accounts[i]);
  };

  _keyExtractor = (item, index) =>
    item.domain + (Math.random() * 1000).toString();

  _changeItemText = acc => {
    // console.log(acc);
    const accounts = this.state.accounts.map(e => {
      if (e.id === acc.id) {
        e = acc;
      }
      return e;
    });
    this.setState({ accounts });
    setData('accounts', JSON.stringify(accounts));
    ToastAndroid.show('修改成功', ToastAndroid.SHORT);
  };

  _addItemText = async acc => {
    console.log(this.state.accounts);
    const accounts = [...this.state.accounts];
    acc.id = accounts.length;
    accounts.push(acc);
    // console.log(accounts);
    this.setState({ accounts });
    setData('accounts', JSON.stringify(accounts));
    ToastAndroid.show('添加成功', ToastAndroid.SHORT);
  };

  _removeItemText = async acc => {
    const accounts = this.state.accounts.filter(e => {
      return e.id !== acc.id;
    });
    this.setState({ accounts });
    setData('accounts', JSON.stringify(accounts));
    ToastAndroid.show('删除成功', ToastAndroid.SHORT);
  };

  addAccount = ({ action }) => {
    this.prompt.showModal({ action });
  };

  handleImport = accounts => {
    this.setState({ accounts });
  }

  render() {
    return (
      <View>
        <FlatList
          style={styles.flatList}
          data={this.state.accounts || []}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
        />
        <Prompt
          ref={el => (this.prompt = el)}
          changeItemText={this._changeItemText}
          addItemText={this._addItemText}
          removeItemText={this._removeItemText}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flatList: {}
});
