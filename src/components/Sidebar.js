import React from 'react';
import { Navigation } from 'react-native-navigation';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { List, Button } from '@ant-design/react-native';
const Item = List.Item;
import { getData, setData } from '../utils/storage';

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };
  }

  componentDidMount() {
    this.handleUpdate();
  }

  handleLogin = () => {
    Navigation.showModal({
      stack: {
        children: [{
          component: {
            name: 'navigation.playground.LoginScreen',
            passProps: {
              sidebar: this
            }
          }
        }]
      }
    });
  }

  handleRegist = () => {
    Navigation.showModal({
      stack: {
        children: [{
          component: {
            name: 'navigation.playground.RegistScreen'
          }
        }]
      }
    });
  }

  handleLogout = () => {
    Alert.alert('','乃确定不是手滑了么？', [
      {
        text: '我手滑了',
      },
      {
        text: '退出',
        onPress: () => {
          this.setState({username: ''});
          setData('username', '');
        }
      }
    ]);
  }

  handleUpdate = () => {
    getData('username').then(val => {
      val ? this.setState({username: val}) : '';
    });
  }

  render() {
    return (
      <View style={styles.sidebar}>
        <View style={styles.header}>
          {this.state.username ? (
            <View style={styles.userBox}>
              <View style={styles.left}>
                <Image
                  source={require('../assets/avatar.jpg')}
                  style={styles.avatar}
                />
                <Text style={styles.username}>{this.state.username}</Text>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.logoutBtn}
                  onPress={this.handleLogout}
                >
                  <Image
                    style={styles.logoutImg}
                    source={require('../assets/logout.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View>
              <Text style={styles.tips}>请先登录或注册</Text>
              <View style={styles.btnGroup}>
                <Button
                  style={[styles.button, styles.regBtn]}
                  onPress ={this.handleRegist}
                >
                  <Text style={styles.regText}>注册</Text>
                </Button>
                <Button
                  activeStyle={styles.loginBtn_active}
                  style={[styles.button, styles.loginBtn]}
                  onPress={this.handleLogin}
                >
                  <Text style={styles.loginText}>登录</Text>
                </Button>
              </View>
            </View>
            )}
        </View>
        <View>
          <List>
            {/* <Item extra="没有箭头" arrow="empty">
              标题文字
            </Item> */}
          </List>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sidebar: {
    height: '100%',
    backgroundColor: '#FFF'
  },
  header: {
    backgroundColor: '#F87299',
    height: 120,
    justifyContent: 'center'
  },
  userBox: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  left: {
    alignItems: 'center',
    marginLeft: 15
  },
  username: {
    fontSize: 18,
    color: '#FFF',
    marginTop: 10
  },
  avatar: {
    height: 55,
    width: 55,
    borderRadius: 100,
    borderColor: '#FFF',
    borderWidth: 2,
  },
  logoutBtn: {
    borderColor: '#FFF',
    borderWidth: 1,
    borderRadius: 50,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20
  },
  logoutImg: {
    height: 25,
    width: 25
  },
  tips: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 18,
    marginLeft: 10,
    marginBottom: 10,
  },
  btnGroup: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button: {
    width: '45%',
    height: 35,
    borderWidth: 0
  },
  regBtn: {
    backgroundColor: '#F4F4F4',
  },
  loginBtn: {
    backgroundColor: '#F78FAC',
  },
  loginBtn_active: {
    backgroundColor: '#F484A2'
  },
  regText: {
    fontSize: 15,
    color: '#B0B0B0'
  },
  loginText: {
    fontSize: 15,
    color: '#FFF'
  }
});
