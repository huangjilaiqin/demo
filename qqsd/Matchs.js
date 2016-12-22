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
import FutureMatchs from './FutureMatchs';
import LiveMatchs from './LiveMatchs';
import FinishMatchs from './FinishMatchs';
import SocketIO from 'react-native-socketio';

export default class MyViewPager extends Component {
  constructor(props){
    super(props);
    this.state={nothing:new Date()};
    this.handleBack=this.handleBack.bind(this);
  }
  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
    this.socket = new SocketIO('http://wsn.500.com');
    this.socket.connect();
    this.socket.on('connect',()=>{console.log('wsn connect')});
    this.socket.on('error',(err)=>{
      console.log('err',err)
      this.setState({loading:false});
    });
    this.socket.on('init',(args)=>{
      console.log('init:',args);
    });
    this.socket.on('change',(args)=>{
      console.log('change:',args);
    });
    setTimeout(()=>{
      this.setState({nothing:new Date()});
    },1000);
  }
  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
    this.socket.on('error',(err)=>{});
    this.socket.on('init',(args)=>{});
    this.socket.on('change',(args)=>{});
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
      <ScrollableTabView>
        <LiveMatchs tabLabel='即时'/>
        <FinishMatchs tabLabel='完场'/>
        <FutureMatchs tabLabel='赛程'/>
      </ScrollableTabView>
    );
  }
}
