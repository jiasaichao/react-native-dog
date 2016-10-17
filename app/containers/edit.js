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
    ProgressViewIOS,
    CameraRoll
} from 'react-native';


import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
import Video from 'react-native-video';

import { request } from '../common/request';
import { config } from '../common/config';
import { util } from '../common/util';


import { ImagePickerManager } from 'NativeModules';
var ImagePicker = ImagePickerManager;

import RNAudio from 'react-native-audio';
import Progress from 'react-native-progress';
import Button from 'react-native-button';

var AudioRecorder = RNAudio.AudioRecorder
var AudioUtils = RNAudio.AudioUtils



var width = Dimensions.get('window').width
var height = Dimensions.get('window').height

class Edit extends Component {
    constructor(props) {
        super(props);
        this.item = {
            "id": "710000197806241380",
            "thumb": "http://dummyimage.com/1280x720/dbc035",
            "title": "",
            "video": "''"
        };
        this.video = {
            videoTotal: 0,
            currentTime: 0,
            /**进度,计算属性0-1之间小数 */
            videoProgress() {
                return Number((this.currentTime / this.videoTotal).toFixed(2))
            }
        }
        this.state = {
            /**是否已上传视频 */
            isUpdate: false,
            /**暂停 */
            paused: true
        };
    }
    /**选择视频 */
    _pickVideo = () => {
        let videoOptions = {
            title: '选择视频',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '录制视频',
            chooseFromLibraryButtonTitle: '选择已有视频',
            videoQuality: 'medium',
            mediaType: 'video',
            durationLimit: 1000,
            noData: false,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        }
        ImagePicker.showImagePicker(videoOptions, (res) => {
            if (res.didCancel) {
                return
            }
            if ('error' in res) {
                return;
            }
            this.item.video = res.uri;
            this.setState({ isUpdate: true });
        });
    }
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
    _submit = () => {
        if (this.item.title === '') {
            AlertIOS.alert('请输入标题');
        }
        else {
            AsyncStorage.getItem('list').then((data) => {
                let list = [];
                if (data) {
                    list = JSON.parse(data);
                }
                this.item.id = global.getId();
                list.push(this.item);

                AsyncStorage.setItem('list', JSON.stringify(list))
                    .then(() => {
                        //重置
                        this.setState({
                            isUpdate: false,
                            paused: true
                        });
                        AlertIOS.alert('保存成功');
                    });


            });
        }
    }
    render() {

        let content;
        if (this.state.isUpdate) {
            let playButton;
            if (this.state.paused) {
                playButton = <TouchableOpacity style={styles.previewBox} onPress={this._preview}>
                    <Icon name='ios-play' style={styles.previewIcon} />
                    <Text style={styles.previewText}>
                        播放
                        </Text>
                </TouchableOpacity>
            }
            else {
                playButton = <TouchableOpacity style={styles.previewBox} onPress={this._preview}>
                    <Icon name='ios-pause' style={styles.previewIcon} />
                    <Text style={styles.previewText}>
                        暂停
                        </Text>
                </TouchableOpacity>
            }
            content = <View style={styles.videoContainer}>
                <View style={styles.videoBox}>

                    <View style={styles.video}>
                        <Video
                            ref='videoPlayer'
                            source={{ uri: this.item.video }}
                            paused={this.state.paused}
                            style={styles.video}
                            onProgress={this._onProgress}
                            onEnd={this._onEnd}
                            />
                    </View>
                    {playButton}
                </View>
                <View style={styles.fieldItem}>
                    <Text style={styles.label}>标题</Text>
                    <TextInput
                        placeholder={'输入你的昵称'}
                        style={styles.inputField}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        onChangeText={(text) => {
                            this.item.title = text;
                        } }
                        />
                </View>
                <Button style={styles.btn} onPress={this._submit}>保存资料</Button>
            </View>
        }
        else {
            content = <TouchableOpacity style={styles.uploadContainer} onPress={this._pickVideo}>
                <View style={styles.uploadBox}>
                    <Image source={require('../assets/images/record.png')} style={styles.uploadIcon} />
                    <Text style={styles.uploadTitle}>点我上传视频</Text>
                    <Text style={styles.uploadDesc}>建议时长不超过 20 秒</Text>
                </View>
            </TouchableOpacity>
        }
        return (
            <View style={styles.container}>
                <View style={styles.toolbar}>
                    <Text style={styles.toolbarTitle}>
                        理解狗狗，从配音开始
          </Text>
                </View>

                <View style={styles.page}>
                    {content}
                </View>

            </View>
        )
    }
}


var styles = StyleSheet.create({
    container: {
        flex: 1
    },

    toolbar: {
        flexDirection: 'row',
        paddingTop: 25,
        paddingBottom: 12,
        backgroundColor: '#ee735c'
    },

    toolbarTitle: {
        flex: 1,
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        fontWeight: '600'
    },

    toolbarExtra: {
        position: 'absolute',
        right: 10,
        top: 26,
        color: '#fff',
        textAlign: 'right',
        fontWeight: '600',
        fontSize: 14
    },

    page: {
        flex: 1,
        alignItems: 'center'
    },

    uploadContainer: {
        marginTop: 90,
        width: width - 40,
        paddingBottom: 10,
        borderWidth: 1,
        borderColor: '#ee735c',
        justifyContent: 'center',
        borderRadius: 6,
        backgroundColor: '#fff'
    },

    uploadTitle: {
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 16,
        color: '#000'
    },

    uploadDesc: {
        color: '#999',
        textAlign: 'center',
        fontSize: 12
    },

    uploadIcon: {
        width: 110,
        resizeMode: 'contain'
    },

    uploadBox: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    videoContainer: {
        width: width,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },

    videoBox: {
        width: width,
        height: height * 0.6
    },

    video: {
        width: width,
        height: height * 0.6,
        backgroundColor: '#333'
    },

    progressTipBox: {
        width: width,
        height: 30,
        backgroundColor: 'rgba(244,244,244,0.65)'
    },

    progressTip: {
        color: '#333',
        width: width - 10,
        padding: 5
    },

    progressBar: {
        width: width
    },

    recordBox: {
        width: width,
        height: 60,
        alignItems: 'center'
    },

    recordIconBox: {
        width: 68,
        height: 68,
        marginTop: -30,
        borderRadius: 34,
        backgroundColor: '#ee735c',
        borderWidth: 1,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },

    recordIcon: {
        fontSize: 58,
        backgroundColor: 'transparent',
        color: '#fff'
    },

    countBtn: {
        fontSize: 32,
        fontWeight: '600',
        color: '#fff'
    },

    recordOn: {
        backgroundColor: '#ccc'
    },

    previewBox: {
        width: 80,
        height: 30,
        position: 'absolute',
        right: 10,
        bottom: 10,
        borderWidth: 1,
        borderColor: '#ee735c',
        borderRadius: 3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    previewIcon: {
        marginRight: 5,
        fontSize: 20,
        color: '#ee735c',
        backgroundColor: 'transparent'
    },

    previewText: {
        fontSize: 20,
        color: '#ee735c',
        backgroundColor: 'transparent'
    },

    uploadAudioBox: {
        width: width,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    uploadAudioText: {
        width: width - 20,
        padding: 5,
        borderWidth: 1,
        borderColor: '#ee735c',
        borderRadius: 5,
        textAlign: 'center',
        fontSize: 30,
        color: '#ee735c'
    },

    modalContainer: {
        width: width,
        height: height,
        paddingTop: 50,
        backgroundColor: '#fff'
    },
    label: {
        color: '#ccc',
        marginRight: 10
    },
    closeIcon: {
        position: 'absolute',
        fontSize: 32,
        right: 20,
        top: 30,
        color: '#ee735c'
    },

    loadingBox: {
        width: width,
        height: 50,
        marginTop: 10,
        padding: 15,
        alignItems: 'center'
    },

    loadingText: {
        marginBottom: 10,
        textAlign: 'center',
        color: '#333'
    },

    fieldBox: {
        width: width - 40,
        height: 36,
        marginTop: 30,
        marginLeft: 20,
        marginRight: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eaeaea',
    },
    fieldItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        paddingLeft: 15,
        paddingRight: 15,
        borderColor: '#eee',
        borderBottomWidth: 1
    },
    inputField: {
        flex: 1,
        height: 50,
        color: '#666',
        fontSize: 14
    },

    submitBox: {
        marginTop: 50,
        padding: 15
    },

    btn: {
        width: width - 20,
        marginTop: 25,
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: 'transparent',
        borderColor: '#ee735c',
        borderWidth: 1,
        borderRadius: 4,
        color: '#ee735c'
    }
})

export { Edit }

