/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import i18n from './src/i18n';
import Navigator from "./src/navigation/Navigator";
import {StatusBar,Platform} from 'react-native';
// import Orientation, { orientation } from "react-native-orientation";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import allReducers from './src/reducers';

const store = createStore(allReducers);

export default class App extends React.Component{
  componentDidMount = async () => {
    await StatusBar.setBarStyle( 'light-content',true);
    if(Platform.OS === 'android'){
      await StatusBar.setBackgroundColor("#034d7e");
    }
    // Orientation.lockToPortrait();
  };

  render() {
    return (
    	<Provider store={store}>
    		<Navigator />
    	</Provider>
    );
  }
}