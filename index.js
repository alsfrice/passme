/**
 * @format
 */

import { Navigation } from 'react-native-navigation';
import App from './App';
import Sidebar from './src/components/Sidebar';
import Login from './src/views/Login';
import Regist from './src/views/Regist';

Navigation.registerComponent('navigation.playground.MainScreen', () => App);
Navigation.registerComponent('navigation.playground.SideBar', () => Sidebar);
Navigation.registerComponent('navigation.playground.LoginScreen', () => Login);
Navigation.registerComponent('navigation.playground.RegistScreen', () => Regist);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      sideMenu: {
        left: {
          component: {
            id: 'sideMenu',
            name: 'navigation.playground.SideBar'
          }
        },
        center: {
          component: {
            id: 'main',
            name: 'navigation.playground.MainScreen'
          }
        }
      }
    }
  });
});

Navigation.setDefaultOptions({
  statusBar: {
    visible: true,
    drawBehind: true,
    backgroundColor: '#F87299'
  },
  sideMenu: {
    left: {
      visible: false
    }
  }
});
