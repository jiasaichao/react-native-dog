/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  AsyncStorage,
  Navigator
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import { List } from './app/containers/list';
import { Account } from './app/containers/account';
import { Edit } from './app/containers/edit';
import { Login } from './app/containers/login';
import { Slider } from './app/containers/slider';

class jscapp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      selectedTab: 'list',
      /**第一次进入显示轮播图 */
      entered: false,
      /**数据加载完成，就是读取数据时的一个滚动 */
      booted: false,
      /**是否登录 */
      logined: false
    };
  }
  componentDidMount = () => {
    this._asyncAppStatus();
  }
  _logout = () => {
    AsyncStorage.removeItem('user');
    this.setState({
      logined: false,
      user: null
    });

  }
  _asyncAppStatus = () => {
    
    AsyncStorage.multiGet(['user', 'entered'])
      .then((data) => {
        let userData = data[0][1];
        let entered = data[1][1];
        let user;
        let newState = {
          booted: true
        };
        if (userData) {
          user = JSON.parse(userData);
        }
        if (user && user.accessToken) {
          newState.user = user;
          newState.logined = true;
        }
        else {
          newState.logined = false;
        }
        if (entered === 'yes') {
          newState.entered = true;
        }
        this.setState(newState);
      })
  }
  _afterLogin = (user) => {
    var that = this;
    user = JSON.stringify(user);
    AsyncStorage.setItem('user', user)
      .then(() => {
        that.setState({
          user: user,
          logined: true
        });
      });
  }
  _enterSlide = () => {
    this.setState({ entered: true }, () => {
      AsyncStorage.setItem('entered', 'yes');
    });
  }
  render() {
    if (!this.state.entered) {
      return <Slider enterSlide={this._enterSlide} />
    }
    if (!this.state.logined) {
      return <Login afterLogin={this._afterLogin} />
    }
    return (
      <TabBarIOS tintColor="#ee735c">
        <Icon.TabBarItem
          iconName='ios-videocam-outline'
          selectedIconName='ios-videocam'
          selected={this.state.selectedTab === 'list'}
          onPress={() => {
            this.setState({
              selectedTab: 'list',
            })
          } }>
          <Navigator
            initialRoute={{
              name: 'list',
              component: List
            }}
            configureScene={(route) => {
              return Navigator.SceneConfigs.FloatFromRight
            } }
            renderScene={(route, navigator) => {
              var Component = route.component

              return <Component {...route.params} navigator={navigator} />
            } } />
        </Icon.TabBarItem>
        <Icon.TabBarItem
          iconName='ios-recording-outline'
          selectedIconName='ios-recording'
          selected={this.state.selectedTab === 'edit'}
          onPress={() => {
            this.setState({
              selectedTab: 'edit'
            })
          } }>
          <Edit />
        </Icon.TabBarItem>
        <Icon.TabBarItem
          iconName='ios-more-outline'
          selectedIconName='ios-more'
          selected={this.state.selectedTab === 'account'}
          onPress={() => {
            this.setState({
              selectedTab: 'account'
            })
          } }>
          <Account user={this.state.user} logout={this._logout} />
        </Icon.TabBarItem>
      </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


AppRegistry.registerComponent('jscapp', () => jscapp);
