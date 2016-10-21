import {Navigation} from 'react-native-navigation';

import {Account} from './account';
import {Detail} from './detail';
import {Edit} from './edit';
import {List} from './list';
import {Login} from './login';
import {Slider} from './slider';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('account', () => Account);
  Navigation.registerComponent('detail', () => Detail);
  Navigation.registerComponent('edit', () => Edit);
  Navigation.registerComponent('list', () => List);
  Navigation.registerComponent('login', () => Login);
  Navigation.registerComponent('slider', () => Slider);
}
