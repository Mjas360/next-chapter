/**
 * @format
 */

import "react-native-gesture-handler";

import { AppRegistry } from 'react-native';
import { Provider } from "react-redux";
import App from './App';
import { name as appName } from './app.json';
import './src/i18n/i18n';
import { store } from "./src/redux/store";

const Root = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

AppRegistry.registerComponent(appName, () => Root);
