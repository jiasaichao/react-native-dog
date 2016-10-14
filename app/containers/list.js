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
  ActivityIndicator,
  AlertIOS,
  AsyncStorage,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import { request } from '../common/request';
import { config } from '../common/config';
import util from '../common/util';
import Mock from 'mockjs';

import {Detail} from './detail'


var width = Dimensions.get('window').width

var cachedResults = {
  nextPage: 1,
  items: [],
  total: 0
}

class Item extends Component {
  constructor(props) {
    super(props);
    let row = this.props.row
    this.state = {
      up: row.voted,
      row: row
    };
  }
  _up = () => {
    var that = this
    var up = !this.state.up
    var row = this.state.row
    var url = config.api.base + config.api.up

    var body = {
      id: row._id,
      up: up ? 'yes' : 'no',
      accessToken: this.props.user.accessToken
    }

    // request.post(url, body)
    //   .then(function (data) {
    //     if (data && data.success) {
    //       that.setState({
    //         up: up
    //       })
    //     }
    //     else {
    //       AlertIOS.alert('点赞失败，稍后重试')
    //     }
    //   })
    //   .catch(function (err) {
    //     console.log(err)

    //     AlertIOS.alert('点赞失败，稍后重试')
    //   })
  }

  render() {
    var row = this.state.row

    return (
      <TouchableHighlight onPress={this.props.onSelect}>
        <View style={styles.item}>
          <Text style={styles.title}>{row.title}</Text>
          <Image
            source={{ uri: row.thumb }}
            style={styles.thumb}
            >
            <Icon
              name='ios-play'
              size={28}
              style={styles.play} />
          </Image>
          <View style={styles.itemFooter}>
            <View style={styles.handleBox}>
              <Icon
                name={this.state.up ? 'ios-heart' : 'ios-heart-outline'}
                size={28}
                onPress={this._up}
                style={[styles.up, this.state.up ? null : styles.down]} />
              <Text style={styles.handleText} >喜欢</Text>
            </View>
            <View style={styles.handleBox}>
              <Icon
                name='ios-chatboxes-outline'
                size={28}
                style={styles.commentIcon} />
              <Text style={styles.handleText}>评论</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

class List extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    this.state = {
      isRefreshing: false,
      isLoadingTail: false,
      dataSource: ds.cloneWithRows([]),
    };
  }
  _renderRow = (row) => {
    return <Item
      key={row._id}
      user={this.state.user}
      onSelect={() => this._loadPage(row)}
      row={row} />
  }
  componentDidMount = () => {
    var that = this

    // AsyncStorage.getItem('user')
    //   .then((data) => {
    //     var user

    //     if (data) {
    //       user = JSON.parse(data)
    //     }
    //     if (user && user.accessToken) {
    //       that.setState({
    //         user: user
    //       }, function () {

    //         that._fetchData(1)
    //       })
    //     }
    //   });

    that._fetchData(0)
  }

  _fetchData = (page) => {
    var that = this

    if (page !== 0) {
      this.setState({
        isLoadingTail: true
      })
    }
    else {
      this.setState({
        isRefreshing: true
      })
    }

    var user = this.state.user
  
    
    that.setState({
                isRefreshing: false,
                dataSource: that.state.dataSource.cloneWithRows( [
        {
            "id": "640000199409145329",
            "thumb": "http://dummyimage.com/1280x720/49e522)",
            "title": "几土位效近议光书机办术别片般。引业知术说文厂复六门太标。用条们走长论统龙确保他布清解己音",
            "video": "''"
        },
        {
            "id": "520000199806149975",
            "thumb": "http://dummyimage.com/1280x720/31b57b)",
            "title": "南作有层消场听论百公更金。去设元革适水市社了展更油族结示党。感建周过者才到算大四因放本小。",
            "video": "''"
        },
        {
            "id": "130000201210233663",
            "thumb": "http://dummyimage.com/1280x720/910025)",
            "title": "次该叫文果省至口毛到值难响作值计增八。形运满过受学非王越保将进教面。",
            "video": "''"
        },
        {
            "id": "530000198711055770",
            "thumb": "http://dummyimage.com/1280x720/111bbd)",
            "title": "几土位效近议光书机办术别片般。引业知术说文厂复六门太标。用条们走长论统龙确保他布清解己音",
            "video": "''"
        },
        {
            "id": "710000197806241380",
            "thumb": "http://dummyimage.com/1280x720/dbc035)",
            "title": "南作有层消场听论百公更金。去设元革适水市社了展更油族结示党。感建周过者才到算大四因放本小。",
            "video": "''"
        },
        {
            "id": "210000199602175394",
            "thumb": "http://dummyimage.com/1280x720/827ce0)",
            "title": "次该叫文果省至口毛到值难响作值计增八。形运满过受学非王越保将进教面。",
            "video": "''"
        },
        {
            "id": "310000200612026818",
            "thumb": "http://dummyimage.com/1280x720/018e3a)",
            "title": "几土位效近议光书机办术别片般。引业知术说文厂复六门太标。用条们走长论统龙确保他布清解己音",
            "video": "''"
        },
        {
            "id": "500000198012307654",
            "thumb": "http://dummyimage.com/1280x720/c8d004)",
            "title": "南作有层消场听论百公更金。去设元革适水市社了展更油族结示党。感建周过者才到算大四因放本小。",
            "video": "''"
        },
        {
            "id": "210000197803303306",
            "thumb": "http://dummyimage.com/1280x720/d96305)",
            "title": "次该叫文果省至口毛到值难响作值计增八。形运满过受学非王越保将进教面。",
            "video": "''"
        },
        {
            "id": "33000019800607993X",
            "thumb": "http://dummyimage.com/1280x720/ae4eec)",
            "title": "几土位效近议光书机办术别片般。引业知术说文厂复六门太标。用条们走长论统龙确保他布清解己音",
            "video": "''"
        }
    ])
              })
  }

  _hasMore = () => {
    return cachedResults.items.length !== cachedResults.total
  }

  _fetchMoreData = () => {
    if (!this._hasMore() || this.state.isLoadingTail) {

      this.setState({
        isLoadingTail: false
      })

      return
    }

    var page = cachedResults.nextPage

    this._fetchData(page)
  }

  _onRefresh = () => {
    if (!this._hasMore() || this.state.isRefreshing) {
      return
    }

    this._fetchData(0)
  }

  _renderFooter = () => {
    if (!this._hasMore() && cachedResults.total !== 0) {
      return (
        <View style={styles.loadingMore}>
          <Text style={styles.loadingText}>没有更多了</Text>
        </View>
      )
    }

    if (!this.state.isLoadingTail) {
      return <View style={styles.loadingMore} />
    }

    return <ActivityIndicator style={styles.loadingMore} />
  }

  _loadPage = (row) => {
    console.log('将要跳转路由',this.props.navigator);
    this.props.navigator.push({
      name: 'detail',
      component: Detail,
      params: {
        data: row
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>列表页面</Text>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderFooter={this._renderFooter}
          onEndReached={this._fetchMoreData}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh}
              tintColor='#ff6600'
              title='拼命加载中...'
              />
          }
          onEndReachedThreshold={20}
          enableEmptySections={true}
          showsVerticalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
          />
      </View>
    )
  }
}


var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },

  header: {
    paddingTop: 25,
    paddingBottom: 12,
    backgroundColor: '#ee735c'
  },

  headerTitle: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600'
  },

  item: {
    width: width,
    marginBottom: 10,
    backgroundColor: '#fff'
  },

  thumb: {
    width: width,
    height: width * 0.56,
    resizeMode: 'cover'
  },

  title: {
    padding: 10,
    fontSize: 18,
    color: '#333'
  },

  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#eee'
  },

  handleBox: {
    padding: 10,
    flexDirection: 'row',
    width: width / 2 - 0.5,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },

  play: {
    position: 'absolute',
    bottom: 14,
    right: 14,
    width: 46,
    height: 46,
    paddingTop: 9,
    paddingLeft: 18,
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 23,
    color: '#ed7b66'
  },

  handleText: {
    paddingLeft: 12,
    fontSize: 18,
    color: '#333'
  },

  down: {
    fontSize: 22,
    color: '#333'
  },

  up: {
    fontSize: 22,
    color: '#ed7b66'
  },

  commentIcon: {
    fontSize: 22,
    color: '#333'
  },

  loadingMore: {
    marginVertical: 20
  },

  loadingText: {
    color: '#777',
    textAlign: 'center'
  }
})

export { List }
