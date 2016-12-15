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
  Image, 
  ListView,
  TouchableHighlight,
  Clipboard,
  Vibration,
  RefreshControl,
  PixelRatio, 
  Dimensions,
  Navigator,
} from 'react-native';

import moment from 'moment';
import SocketIO from 'react-native-socketio';
import {renderListEmptyView} from './common/ViewUtil';
import Main from './Main';
import MyViewPager from './MyViewPager';
import UViewPager from './UViewPager';
import Recommends from './Recommends';


export default class demo extends Component {
  constructor(props){
    super(props);
    this.configureScene=this.configureScene.bind(this);
    this.renderScene=this.renderScene.bind(this);
  }

  render() {
    return (
      <Navigator
        style={{flex:1}}
        initialRoute={{component: MyViewPager}}
        configureScene={this.configureScene}
        renderScene={this.renderScene}/>
    );
  }

  renderScene(route, navigator) {
    return <route.component navigator={navigator}  {...route.passProps} />;
  }

  configureScene(route, routeStack) {
    if (route.type == 'Bottom') {
      return Navigator.SceneConfigs.FloatFromBottom; // 底部弹出
    }
    return Navigator.SceneConfigs.PushFromRight; // 右侧弹出
  }
}

  //flexDirection:'row',
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listStyle: {
  },
  recomItem: {
    flex:1,
    height:300,
    padding:8,
  },
  itemSeprator: {
    height:1,
    backgroundColor: 'grey',
  },
});


AppRegistry.registerComponent('demo', () => demo);
