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
    let url='http://106.75.147.59/api/index.php?c_id=10031&c_type=2&c_cpid=2&suid=7fbef98cf1405f9424984422bbf8111d&quid=70734';
    return (
      <ScrollableTabView
        scrollWithoutAnimation={true}
      >
        <GroupList tabLabel='菠菜庄园' url={url} bodyStr='c_ck=&vtype=1&groupid=3&id=&threadtype=1&c_key=f11b1287365c925fe3ee76a048b367cc&pagesize=10&pageno=1'/>
        <GroupList tabLabel='沙地绿茵' url={url} bodyStr='c_ck=&vtype=1&groupid=1&id=&threadtype=1&c_key=c28d797bdf3f789e759150cdac45957a&pagesize=10&pageno=1'/>
        <GroupList tabLabel='烽火蓝图' url={url} bodyStr='c_ck=&vtype=1&groupid=1&id=&threadtype=1&c_key=c28d797bdf3f789e759150cdac45957a&pagesize=10&pageno=1'/>
        <GroupList tabLabel='祸水红颜' url={url} bodyStr='c_ck=&vtype=1&groupid=1&id=&threadtype=1&c_key=c28d797bdf3f789e759150cdac45957a&pagesize=10&pageno=1'/>
        <GroupList tabLabel='球球讲堂' url={url} bodyStr='c_ck=&vtype=1&groupid=1&id=&threadtype=1&c_key=c28d797bdf3f789e759150cdac45957a&pagesize=10&pageno=1'/>
        <GroupList tabLabel='建议反馈' url={url} bodyStr='c_ck=&vtype=1&groupid=1&id=&threadtype=1&c_key=c28d797bdf3f789e759150cdac45957a&pagesize=10&pageno=1'/>
      </ScrollableTabView>
    );
  }
}
