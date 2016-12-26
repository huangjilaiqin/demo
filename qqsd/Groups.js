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

import '../UserAgent';
import GroupList from './GroupList';

export default class Groups extends Component {
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
    //post cid mytime t:1,2,3 stid c_key:c28d797bdf3f789e759150cdac45957a
    //http://i.qqshidao.com/api/index.php?c_id=41000&c_type=2&c_cpid=2&suid=7fbef98cf1405f9424984422bbf8111d
    return (
      <ScrollableTabView
        scrollWithoutAnimation={true}
      >
        <GroupList tabLabel='菠菜庄园' url=''/>
        <GroupList tabLabel='沙地绿茵' url=''/>
        <GroupList tabLabel='烽火蓝图' url=''/>
        <GroupList tabLabel='祸水红颜' url=''/>
        <GroupList tabLabel='球球讲堂' url=''/>
        <GroupList tabLabel='建议反馈' url=''/>
      </ScrollableTabView>
    );
  }
}
