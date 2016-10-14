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
    Navigator,
    TouchableHighlight,
    ListView,
    Image,
    Dimensions,
    RefreshControl,
    ActivityIndicatorIOS,
    AlertIOS,
    AsyncStorage,
    Modal,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import Button from 'react-native-button';
import Swiper from 'react-native-swiper';

var width = Dimensions.get('window').width
var height = Dimensions.get('window').height
class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loop: false,
      banners: [
        require('../assets/images/s1.jpg'),
        require('../assets/images/s2.jpg'),
        require('../assets/images/s3.jpg')
      ]
    };
  }
  _enter=()=> {
    this.props.enterSlide()
  }

  render() {
    return (
       <Swiper
        style={styles.container}
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}
        paginationStyle={styles.pagination}
        loop={this.state.loop}>
        <View style={styles.slide}>
          <Image style={styles.image} source={this.state.banners[0]} />
        </View>
        <View style={styles.slide}>
          <Image style={styles.image} source={this.state.banners[1]} />
        </View>
        <View style={styles.slide}>
          <Image style={styles.image} source={this.state.banners[2]} />
          <Text
            style={styles.btn}
            onPress={this._enter}>马上体验</Text>
        </View>
      </Swiper>
    )
  }
}
var styles = StyleSheet.create({
  container: {
    
  },

  slide: {
    flex: 1
  },

  image: {
    height:height,
    width: width
  },

  dot: {
    width: 14,
    height: 14,
    backgroundColor: 'transparent',
    borderColor: '#ff6600',
    borderRadius: 7,
    borderWidth: 1,
    marginLeft: 12,
    marginRight: 12
  },

  activeDot: {
    width: 14,
    height: 14,
    borderWidth: 1,
    marginLeft: 12,
    marginRight: 12,
    borderRadius: 7,
    borderColor: '#ee735c',
    backgroundColor: '#ee735c',
  },

  pagination: {
    bottom: 30
  },

  btn: {
    position: 'absolute',
    width: width - 20,
    left: 10,
    bottom: 60,
    height: 50,
    padding: 10,
    backgroundColor: '#ee735c',
    borderColor: '#ee735c',
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 18,
    borderRadius: 3,
    color: '#fff'
  }
})
export {Slider}