import React from 'react';

import {
  StyleSheet,
  Modal,
  View,
  TouchableOpacity,
  TextInput,
  Text,
  Alert
} from 'react-native';

import { Button } from '@ant-design/react-native';

export default class Prompt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      account: null,
      action: ''
    };
  }

  _onChangeText(val, title) {
    const account = { ...this.state.account };
    account[title] = val;
    // console.log(this.acc);
    this.setState({ account });
  }

  showModal = acc => {
    if (acc.action === '添加') {
      this.setState({
        action: '添加',
        isVisible: true
      });
    } else {
      const account = { ...acc };
      this.setState({
        action: '更新',
        account,
        isVisible: true
      });
    }
  };

  closeModal = event => {
    this.setState({
      isVisible: false,
      account: null,
      action: ''
    });
  };

  handleUpdate = () => {
    this.props.changeItemText(this.state.account);
    this.closeModal();
  };

  handleCreate = () => {
    this.props.addItemText(this.state.account);
    this.closeModal();
  };

  handleRemove = () => {
    this.props.removeItemText(this.state.account);
    this.closeModal();
  }

  beforeRemove = () => {
    Alert.alert(
      '',
      '确认要删除该账号吗？',
      [
        { text: '取消' },
        { text: '确认', onPress: () => this.handleRemove()}
      ]);
  }

  render() {
    return (
      <Modal visible={this.state.isVisible} transparent={true}>
        <TouchableOpacity style={styles.container} onPress={this.closeModal}>
          <View style={styles.form}>
            <Text style={styles.title}>{this.state.action}账号</Text>
            <View style={styles.formItem}>
              <TextInput
                style={styles.input}
                placeholder="请输入网站名称"
                defaultValue={
                  this.state.action === '添加'
                    ? ''
                    : this.state.account && this.state.account.title
                }
                underlineColorAndroid="#F87299"
                onChangeText={val => this._onChangeText(val, 'title')}
              />
              <TextInput
                style={styles.input}
                placeholder="请输入账号"
                defaultValue={
                  this.state.action === '添加'
                    ? ''
                    : this.state.account && this.state.account.username
                }
                underlineColorAndroid="#F87299"
                onChangeText={val => this._onChangeText(val, 'username')}
              />
              <TextInput
                style={styles.input}
                placeholder="请输入密码"
                defaultValue={
                  this.state.action === '添加'
                    ? ''
                    : this.state.account && this.state.account.password
                }
                underlineColorAndroid="#F87299"
                onChangeText={val => this._onChangeText(val, 'password')}
              />
              <TextInput
                style={styles.input}
                placeholder="请输入域名"
                defaultValue={
                  this.state.action === '添加'
                    ? ''
                    : this.state.account && this.state.account.domain
                }
                underlineColorAndroid="#F87299"
                onChangeText={val => this._onChangeText(val, 'domain')}
              />
              <TextInput
                style={styles.input}
                placeholder="备注"
                defaultValue={
                  this.state.action === '添加'
                    ? ''
                    : this.state.account && this.state.account.comment
                }
                underlineColorAndroid="#F87299"
                onChangeText={val => this._onChangeText(val, 'comment')}
              />
            </View>
            <View style={styles.btnGroup}>
              {this.state.action !== '添加' && (
                <Button style={[styles.button, styles.leftBtn]} type="ghost" onPress={this.beforeRemove}>
                  <Text style={styles.btnText}>删除本号</Text>
                </Button>
              )}
              <Button
                style={[styles.button, styles.rightBtn1]}
                type="ghost"
                onPress={this.closeModal}
              >
                <Text style={styles.btnText}>取消</Text>
              </Button>
              <Button
                style={[styles.button, styles.rightBtn2]}
                type="ghost"
                onPress={
                  this.state.action === '添加'
                    ? this.handleCreate
                    : this.handleUpdate
                }
              >
                <Text style={styles.btnText}>确认</Text>
              </Button>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
    marginLeft: 30,
    marginTop: 10,
    marginBottom: 5,
    alignSelf: 'flex-start'
  },
  form: {
    width: 300,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  formItem: {
    width: '95%'
  },
  input: {
    fontSize: 17
  },
  btnGroup: {
    width: 300,
    height: 30,
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    position: 'relative'
  },
  button: {
    height: 30,
    borderWidth: 0
  },
  btnText: {
    color: '#F87299',
    fontSize: 15,
    fontWeight: 'bold'
  },
  leftBtn: {
    left: 0,
    position: 'absolute'
  },
  rightBtn1: {
    right: 80,
    position: 'absolute'
  },
  rightBtn2: {
    right: 0,
    position: 'absolute'
  }
});
