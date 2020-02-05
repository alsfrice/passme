import React from 'react';
import { StyleSheet, View, Text, TextInput, Alert } from 'react-native';
import { Button } from '@ant-design/react-native';
import { regist } from '../api/user';
import { Navigation } from 'react-native-navigation';

export default class Regist extends React.Component {
  static options(passProps) {
    return {
      topBar: {
        height: 50,
        title: {
          text: '注册',
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

  beforeRegist = () => {
    const { username, password } = this.state;
    username && password ? this.setState({disabled: false}) : this.setState({disabled: true});
  }

  handleRegist = async () => {
    const { username, password } = this.state;
    try {
      await regist({ username, password });
      Alert.alert('注册成功', '', [{
        text: 'OK', onPress: () => {
          Navigation.dismissModal(this.props.componentId);
        }
      }]);
    } catch (err) {
      const res = err.response;
      Alert.alert('注册失败', res.data);
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
              this.beforeRegist();
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
              this.beforeRegist();
            }}
            style={styles.input}
          />
        </View>
        <Button
          type={'primary'}
          activeStyle={styles.registBtn_active}
          style={styles.registBtn}
          disabled={this.state.disabled}
          onPress={this.handleRegist}
        >
          <Text style={styles.registText}>注册</Text>
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
  registBtn: {
    marginTop: 10,
    backgroundColor: '#F78FAC',
    margin: 10,
    borderWidth: 0
  },
  registBtn_active: {
    backgroundColor: '#F484A2'
  },
  registText: {
    color: '#FFF'
  }
});
