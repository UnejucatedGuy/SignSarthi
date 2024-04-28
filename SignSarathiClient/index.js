/**
 * @format
 */

import {AppRegistry} from 'react-native';
import TextToSignScreen from './android/screens/TextToSignScreen';
import SignToTextScreen from './android/screens/SignToTextScreen';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
