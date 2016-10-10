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
  TabBarIOS
} from 'react-native';

class jscapp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'list'
    };
  }
  render() {
    return (
      <TabBarIOS tintColor="#ee735c">
        <TabBarIOS.Item  systemIcon="history"
          onPress={() => {
            this.setState({
              selectedTab: 'list'
            });
          } }
          selected={this.state.selectedTab === 'list'}
          >
          <Text>11111</Text> 
        </TabBarIOS.Item>
        <TabBarIOS.Item  systemIcon="favorites"
          onPress={() => {
            this.setState({
              selectedTab: 'account'
            });
          } }
          selected={this.state.selectedTab === 'account'}
          >
          <Text>2222</Text> 
        </TabBarIOS.Item>
        <TabBarIOS.Item  systemIcon="contacts"
          onPress={() => {
            this.setState({
              selectedTab: 'edit'
            });
          } }
          selected={this.state.selectedTab === 'edit'}
          >
          <Text>3333</Text> 
        </TabBarIOS.Item>
        
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
