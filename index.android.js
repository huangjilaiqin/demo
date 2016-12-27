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
  Navigator,
} from 'react-native';

import Main from './Main';
import Groups from './qqsd/Groups';


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
        initialRoute={{component: Groups}}
        configureScene={this.configureScene}
        renderScene={this.renderScene}/>
      /*
        <View style={{height:200,width:200,backgroundColor:'grey'}}>
          <View style={{height:100,backgroundColor:'red'}}>
          </View>
        </View>
        */
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
