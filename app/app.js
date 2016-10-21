
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { registerScreens } from './containers';
registerScreens();

var settingsIcon;
var settingsOutlineIcon;
var peopleIcon;
var iosNavigateOutline;
var iosNavigate;

export default class App {
  constructor() {
    this.ios_videocam_outline;
    this.ios_videocam;
    this.ios_recording_outline;
    this.ios_recording;
    this.ios_more_outline;
    this.ios_more;
    this._populateIcons().then(() => {
      //console.log(this.ios_more);
      // 加载所有图片启动程序
      this.startApp();
    }).catch((error) => {
      //console.error(error);
    });
  }

  _populateIcons = () => {
    return new Promise((resolve, reject) => {

      Promise.all(
        [
          Icon.getImageSource('ios-videocam-outline', 30),
          Icon.getImageSource('ios-videocam', 30),
          Icon.getImageSource('ios-recording-outline', 30),
          Icon.getImageSource('ios-recording', 30),
          Icon.getImageSource('ios-more-outline', 30),
          Icon.getImageSource('ios-more', 30)
        ]
      ).then((values) => {
        this.ios_videocam_outline = values[0];
        this.ios_videocam = values[1];
        this.ios_recording_outline = values[2];
        this.ios_recording = values[3];
        this.ios_more_outline = values[4];
        this.ios_more = values[5];
        resolve(true);
      }).catch((error) => {
        reject(error);
      }).done();
    });
  }

  startApp() {
    let styles = {
      navigatorStyle: {
        navBarBackgroundColor: '#ee735c',
        navBarTextColor: '#fff',
      }
    }
    // this will start our app
    Navigation.startTabBasedApp({
      tabs: [
        {
          label: '',
          screen: 'list',
          icon: this.ios_videocam_outline,
          selectedIcon: this.ios_videocam,
          title: '列表页面',
          navigatorStyle: styles.navigatorStyle,
        },
        {
          label: '',
          screen: 'edit',
          icon: this.ios_recording_outline,
          selectedIcon: this.ios_recording,
          title: '理解狗狗，从配音开始',
          navigatorStyle: styles.navigatorStyle,
        },
        {
          label: '',
          screen: 'account',
          icon: this.ios_more_outline,
          selectedIcon: this.ios_more,
          title: '狗狗账户',
          navigatorStyle: styles.navigatorStyle,
        }
      ]
    });
  }
}

// import {Navigation} from 'react-native-navigation';
// import Icon from 'react-native-vector-icons/Ionicons';
// // screen related book keeping
// import {registerScreens} from './screens';
// registerScreens();

// // this will start our app
// Navigation.startTabBasedApp({
//   tabs: [
//     {
//       label: 'One',
//       screen: 'example.FirstTabScreen',
//       icon: require('./assets/img/one.png'),
//       selectedIcon: require('./assets/img/one_selected.png'),
//       title: 'Screen One'
//     },
//     {
//       label: 'Two',
//       screen: 'example.SecondTabScreen',
//       icon: require('./assets/img/two.png'),
//       selectedIcon: require('./assets/img/two_selected.png'),
//       title: 'Screen Two',
//       navigatorStyle: {
//         tabBarBackgroundColor: '#4dbce9',
//       }
//     }
//   ],
//   drawer: {
//     left: {
//       screen: 'example.SideMenu'
//     }
//   },
//   portraitOnlyMode: true
// });
// //Navigation.startSingleScreenApp({
// //  screen: {
// //    screen: 'example.FirstTabScreen',
// //    title: 'Navigation',
// //    navigatorStyle: {
// //      navBarBackgroundColor: '#4dbce9',
// //      navBarTextColor: '#ffff00',
// //      navBarSubtitleTextColor: '#ff0000',
// //      navBarButtonColor: '#ffffff',
// //      statusBarTextColorScheme: 'light'
// //    }
// //  },
// //  drawer: {
// //    left: {
// //      screen: 'example.SideMenu'
// //    }
// //  }
// //});
