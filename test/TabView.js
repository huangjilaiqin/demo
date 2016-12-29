'use strict';

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
  BackAndroid,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';

export default class TabView extends Component {
  constructor(props){
    super(props);
    this.state={nothing:new Date()};
    this.handleBack=this.handleBack.bind(this);
  }
  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)

  }
  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
  }
  handleBack(){
    let navigator = this.props.navigator;
    if (navigator && navigator.getCurrentRoutes().length > 1) {
      navigator.pop();
      return true;
    }else{
      return false;
    }
  }
  render(){
    return (
      <ScrollableTabView
      >
        <Text tabLabel='菠菜庄园'/>
        <Text tabLabel='沙地绿茵'/>
        <Text tabLabel='烽火蓝图'/>
        <Text tabLabel='祸水红颜'/>
        <Text tabLabel='球球讲堂'/>
        <Text tabLabel='建议反馈'/>
      </ScrollableTabView>
    );
  }
}
