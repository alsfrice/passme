import React from 'react';
import { StyleSheet, View, Text, TextInput, Alert } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Button } from '@ant-design/react-native';
import { login } from '../api/user';
import { setData } from '../utils/storage';

export default class Login extends React.Component {
  static options(passProps) {
    return {
      topBar: {
        height: 50,
        title: {
          text: '登录',
          color: '#FFF',
          fontSize: 20,
          fontWeight: '600'
        },
        leftButtonColor: '#FFF',
        leftButtons: [
          {
            id: 'back',
            icon: require('../assets/back.png')
          }
        ],
        background: {
          color: '#F87299'
        }
      }
    };
  }

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
    this.state = {
      username: '',
      password: '',
      disabled: true
    };
  }

  navigationButtonPressed({ buttonId }) {
    buttonId === 'back' ? Navigation.dismissModal(this.props.componentId) : null;
  }

  beforeLogin = () => {
    const { username, password } = this.state;
    username && password ? this.setState({disabled: false}) : this.setState({disabled: true});
  }

  handleLogin = async () => {
    const { username, password } = this.state;
    try {
      const res = await login({ username, password });
      const username_s = res.data && res.data.username;
      const password_s = res.data && res.data.password;
      const { token, data } = res.data;
      setData('username', username_s);
      setData('password', password_s);
      setData('token', token);
      setData('data', JSON.stringify(data));
      Alert.alert('登录成功', `登录成功，欢迎 ${username_s}`, [{
        text: 'OK', onPress: () => {
          this.props.sidebar.handleUpdate();
          Navigation.dismissModal(this.props.componentId);
        }
      }]);
    } catch (err) {
      const res = err.response;
      Alert.alert('登录失败', res.data);
    }
  }

  render() {
    return (
      <View>
        <View style={styles.inputBox}>
          <Text style={styles.label}>用户名</Text>
          <TextInput
            placeholder={'请输入用户名'}
            onChangeText={async text => {
              await this.setState({username: text});
              this.beforeLogin();
            }}
            style={styles.input}
          />
        </View>
        <View style={styles.inputBox}>
          <Text style={[styles.label, {opacity: 0}]}>用户名</Text>
          <Text style={[styles.label, {position: 'absolute'}]}>密码</Text>
          <TextInput
            placeholder={'请输入密码'}
            secureTextEntry={true}
            onChangeText={async text => {
              await this.setState({password: text});
              this.beforeLogin();
            }}
            style={styles.input}
          />
        </View>
        <Button
          type={'primary'}
          activeStyle={styles.loginBtn_active}
          style={styles.loginBtn}
          disabled={this.state.disabled}
          onPress={this.handleLogin}
        >
          <Text style={styles.loginText}>登录</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#EFEFEF',
    borderBottomWidth: 1,
    backgroundColor: '#FFF'
  },
  input: {
    width: '100%',
    marginLeft: 30
  },
  label: {
    color: '#000',
    marginLeft: 10
  },
  hidden: {
    backfaceVisibility: 'visible'
  },
  loginBtn: {
    marginTop: 10,
    backgroundColor: '#F78FAC',
    margin: 10,
    borderWidth: 0
  },
  loginBtn_active: {
    backgroundColor: '#F484A2'
  },
  loginText: {
    color: '#FFF'
  }
});
