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
  Modal,
  TextInput,
  TouchableOpacity,
  ProgressViewIOS,
} from 'react-native';


import Icon from 'react-native-vector-icons/Ionicons';

import Video from 'react-native-video';

import { request } from '../common/request';
import { config } from '../common/config';
import { util } from '../common/util';
import Button from 'react-native-button';



var width = Dimensions.get('window').width

var cachedResults = {
  nextPage: 1,
  items: [],
  total: 0
}
class Detail extends Component {
  constructor(props) {
    super(props);
    this.video={videoTotal:0,currentTime:0}
    var data = this.props.data
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    this.state = {
      data: data,

      // comments
      dataSource: ds.cloneWithRows([]),

      // video loads
      videoOk: true,
      videoLoaded: true,
      playing: false,
      paused: true,
      videoProgress: 0.01,
      videoTotal: 0,
      currentTime: 0,

      // modal
      content: '',
      animationType: 'none',
      modalVisible: false,
      isSending: false,

      // video player
      rate: 1,
      muted: false,
      resizeMode: 'contain',
      repeat: false
    };
  }
  _pop = () => {
    this.props.navigator.pop()
  }

  _onLoadStart = () => {
  }

  _onLoad = () => {
  }

  // _onProgress = (data) => {
  //   if (!this.state.videoLoaded) {
  //     this.setState({
  //       videoLoaded: true
  //     })
  //   }

  //   var duration = data.playableDuration
  //   var currentTime = data.currentTime
  //   var percent = Number((currentTime / duration).toFixed(2))
  //   var newState = {
  //     videoTotal: duration,
  //     currentTime: Number(data.currentTime.toFixed(2)),
  //     videoProgress: percent
  //   }

  //   if (!this.state.videoLoaded) {
  //     newState.videoLoaded = true
  //   }
  //   if (!this.state.playing) {
  //     newState.playing = true
  //   }

  //   this.setState(newState)
  // }

  // _onEnd = () => {
  //   this.setState({
  //     videoProgress: 1,
  //     playing: false
  //   })
  // }
  /**暂停开始 */
    _preview = () => {
        this.setState({ paused: !this.state.paused });
    }
    _onProgress = (data) => {
        this.video.videoTotal = data.playableDuration;
        this.video.currentTime = data.currentTime;
    }
    /**播放完成 */
    _onEnd = () => {
        this.refs.videoPlayer.seek(0)
        this.setState({ paused: true });
    }

  _onError = (e) => {
    this.setState({
      videoOk: false
    })
  }

  _rePlay = () => {
    this.refs.videoPlayer.seek(0)
  }

  _pause = () => {
    if (!this.state.paused) {
      this.setState({
        paused: true
      })
    }
  }

  _resume = () => {
    if (this.state.paused) {
      this.setState({
        paused: false
      })
    }
  }

  componentDidMount() {
    var that = this
    // AsyncStorage.getItem('list').then((data) => {
    //   let list = [];
    //   if (data) {
    //     list = JSON.parse(data);

    //   }
    // });
    AsyncStorage.getItem('user')
      .then((data) => {
        var user

        if (data) {
          user = JSON.parse(data)
        }

        if (user && user.accessToken) {
          that.setState({
            user: user
          }, function () {
            that._fetchData()
          })
        }
      })
  }

  _fetchData = (page) => {
    var that = this

    this.setState({
      isLoadingTail: true
    })

    // request.get(config.api.base + config.api.comment, {
    //   accessToken: this.state.user.accessToken,
    //   creation: this.state.data._id,
    //   page: page
    // })
    //   .then((data) => {
    //     if (data && data.success) {
    //       if (data.data.length > 0) {
    //         var items = cachedResults.items.slice()

    //         items = items.concat(data.data)
    //         cachedResults.nextPage += 1
    //         cachedResults.items = items
    //         cachedResults.total = data.total

    //         that.setState({
    //           isLoadingTail: false,
    //           dataSource: that.state.dataSource.cloneWithRows(cachedResults.items)
    //         })
    //       }
    //     }
    //     else {
    //       that.setState({
    //         isLoadingTail: false
    //       })
    //     }
    //   })
    //   .catch((error) => {
    //     this.setState({
    //       isLoadingTail: false
    //     })
    //   })
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

  _renderRow = (row) => {
    return (
      <View key={row._id} style={styles.replyBox}>
        <Image style={styles.replyAvatar} source={{ uri: 'http://dummyimage.com/1280x720/49e522)' }} />
        <View style={styles.reply}>
          <Text style={styles.replyNickname}>标题说明</Text>
          <Text style={styles.replyContent}>内容说明</Text>
        </View>
      </View>
    )
  }

  _focus = () => {
    this._setModalVisible(true)
  }

  _blur = () => {

  }

  _closeModal = () => {
    this._setModalVisible(false)
  }

  _setModalVisible = (isVisible) => {
    this.setState({
      modalVisible: isVisible
    })
  }

  _renderHeader = () => {
    var data = this.state.data

    return (
      <View style={styles.listHeader}>
        <View style={styles.infoBox}>
          <Image style={styles.avatar} source={{ uri: 'http://dummyimage.com/1280x720/49e522)' }} />
          <View style={styles.descBox}>
            <Text style={styles.nickname}>标题撒旦法</Text>
            <Text style={styles.title}>内容是打发健康了</Text>
          </View>
        </View>
        <View style={styles.commentBox}>
          <View style={styles.comment}>
            <TextInput
              placeholder='敢不敢评论一个...'
              style={styles.content}
              multiline={true}
              onFocus={this._focus}
              />
          </View>
        </View>

        <View style={styles.commentArea}>
          <Text style={styles.commentTitle}>精彩评论</Text>
        </View>
      </View>
    )
  }

  _submit = () => {
    var that = this

    if (!this.state.content) {
      return AlertIOS.alert('留言不能为空！')
    }

    if (this.state.isSending) {
      return AlertIOS.alert('正在评论中！')
    }

    this.setState({
      isSending: true
    }, function () {
      var body = {
        accessToken: this.state.user.accessToken,
        comment: {
          creation: this.state.data._id,
          content: this.state.content
        }
      }

      var url = config.api.base + config.api.comment

      // request.post(url, body)
      //   .then(function(data) {
      //     if (data && data.success) {
      //       var items = cachedResults.items.slice()
      //       var content = that.state.content

      //       items = data.data.concat(items)
      //       cachedResults.items = items
      //       cachedResults.total = cachedResults.total + 1

      //       that.setState({
      //         content: '',
      //         isSending: false,
      //         dataSource: that.state.dataSource.cloneWithRows(cachedResults.items)
      //       })

      //       that._setModalVisible(false)
      //     }
      //   })
      //   .catch((err) => {
      //     that.setState({
      //       isSending: false
      //     })
      //     that._setModalVisible(false)
      //     AlertIOS.alert('留言失败，稍后重试！')
      //   })
    })
  }

  render() {
    var data = this.props.data

    return (
      <View style={styles.container}>
        <View style={styles.videoBox}>
        <Video
                        ref='videoPlayer'
                        source={{ uri: this.state.data.video }}
                        paused={this.state.paused}
                        style={styles.video}
                        onProgress={this._onProgress}
                        onEnd={this._onEnd}
                        />
      {/** 
      <Video
            ref='videoPlayer'
            source={{ uri: 'https://ob0h37q93.qnssl.com/waiting.mp4' }}
            style={styles.video}
            volume={5}
            paused={this.state.paused}
            rate={this.state.rate}
            muted={this.state.muted}
            resizeMode={this.state.resizeMode}
            repeat={this.state.repeat}

            onLoadStart={this._onLoadStart}
            onLoad={this._onLoad}
            onProgress={this._onProgress}
            onEnd={this._onEnd}
            onError={this._onError} />  
      */}    

          {
            !this.state.videoOk && <Text style={styles.failText}>视频出错了！很抱歉</Text>
          }

          {
            !this.state.videoLoaded && <ActivityIndicator color='#ee735c' style={styles.loading} />
          }

          {
            this.state.paused 
              ? <Icon
                onPress={this._preview}
                name='ios-play'
                size={48}
                style={styles.playIcon} />
              //: <Text></Text>
              : <TouchableOpacity style={styles.playnone} onPress={this._preview}>
          </TouchableOpacity>
          }

          {
            this.state.videoLoaded && this.state.playing
              ? <TouchableOpacity onPress={this._pause} style={styles.pauseBtn}>
                {
                  this.state.paused
                    ? <Icon onPress={this._preview} size={48} name='ios-play' style={styles.resumeIcon} />
                    : null
                }
              </TouchableOpacity>
              : null
          }

          <View style={styles.progressBox}>
            <View style={[styles.progressBar, { width: width * this.state.videoProgress }]}></View>
          </View>
        </View>

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderHeader={this._renderHeader}
          renderFooter={this._renderFooter}
          onEndReached={this._fetchMoreData}
          onEndReachedThreshold={20}
          enableEmptySections={true}
          showsVerticalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
          />

        <Modal
          visible={this.state.modalVisible}>
          <View style={styles.modalContainer}>
            <Icon
              onPress={this._closeModal}
              name='ios-close-outline'
              style={styles.closeIcon} />

            <View style={styles.commentBox}>
              <View style={styles.comment}>
                <TextInput
                  placeholder='敢不敢评论一个...'
                  style={styles.content}
                  multiline={true}
                  defaultValue={this.state.content}
                  onChangeText={(text) => {
                    this.setState({
                      content: text
                    })
                  } }
                  />
              </View>
            </View>

            <Button style={styles.submitBtn} onPress={this._submit}>评论</Button>
          </View>
        </Modal>
      </View>
    )
  }
}


var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },

  modalContainer: {
    flex: 1,
    paddingTop: 45,
    backgroundColor: '#fff'
  },

  closeIcon: {
    alignSelf: 'center',
    fontSize: 30,
    color: '#ee753c'
  },

  submitBtn: {
    width: width - 20,
    padding: 16,
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ee753c',
    alignSelf: 'center',
    borderRadius: 4,
    fontSize: 18,
    color: '#ee753c'
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: 64,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    backgroundColor: '#fff'
  },

  backBox: {
    position: 'absolute',
    left: 12,
    top: 32,
    width: 50,
    flexDirection: 'row',
    alignItems: 'center'
  },

  headerTitle: {
    width: width - 120,
    textAlign: 'center'
  },

  backIcon: {
    color: '#999',
    fontSize: 20,
    marginRight: 5
  },

  backText: {
    color: '#999'
  },

  videoBox: {
    width: width,
    height: width * 0.56,
    backgroundColor: '#fff'
  },

  video: {
    width: width,
    height: width * 0.56,
    backgroundColor: '#fff'
  },

  failText: {
    position: 'absolute',
    left: 0,
    top: 90,
    width: width,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'transparent'
  },

  loading: {
    position: 'absolute',
    left: 0,
    top: 80,
    width: width,
    alignSelf: 'center',
    backgroundColor: 'transparent'
  },

  progressBox: {
    width: width,
    height: 2,
    backgroundColor: '#ccc'
  },

  progressBar: {
    width: 1,
    height: 2,
    backgroundColor: '#ff6600'
  },

  playIcon: {
    position: 'absolute',
    top: 90,
    left: width / 2 - 30,
    width: 60,
    height: 60,
    paddingTop: 8,
    paddingLeft: 22,
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 30,
    color: '#ed7b66'
  },
  playnone: {
    position: 'absolute',
    top: 0,
    left: 0,
    right:0,
    bottom:0,
    backgroundColor: 'transparent',
  },

  pauseBtn: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: width,
    height: width * 0.56
  },

  resumeIcon: {
    position: 'absolute',
    top: 80,
    left: width / 2 - 30,
    width: 60,
    height: 60,
    paddingTop: 8,
    paddingLeft: 22,
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 30,
    color: '#ed7b66'
  },

  infoBox: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10
  },

  avatar: {
    width: 60,
    height: 60,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 30
  },

  descBox: {
    flex: 1
  },

  nickname: {
    fontSize: 18
  },

  title: {
    marginTop: 8,
    fontSize: 16,
    color: '#666'
  },

  replyBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10
  },

  replyAvatar: {
    width: 40,
    height: 40,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 20
  },

  replyNickname: {
    color: '#666'
  },

  replyContent: {
    marginTop: 4,
    color: '#666'
  },

  reply: {
    flex: 1
  },

  loadingMore: {
    marginVertical: 20
  },

  loadingText: {
    color: '#777',
    textAlign: 'center'
  },

  listHeader: {
    width: width,
    marginTop: 10
  },

  commentBox: {
    marginTop: 10,
    marginBottom: 10,
    padding: 8,
    width: width
  },

  content: {
    paddingLeft: 2,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    fontSize: 14,
    height: 80
  },

  commentArea: {
    width: width,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  }
})
export { Detail }
