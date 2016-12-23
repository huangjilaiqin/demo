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
      let data=JSON.parse(args[0]).data;
    });
    this.socket.on('change',(args)=>{
      let data=JSON.parse(args[0]).data;
      /*
       [
         [赛事id,赛事状态,"主队进球,主队半场进球,主队红牌,主队黄牌","客队进球,客队半场进球,客队红牌,客队黄牌","状态修改时间","pptv赛前视频id","pptv直播id","pptv赛后视频","是否存在RB动画","加时状态,加时主队比分,加时客队比分,主队点球比分,客队点球比分","备注"],
         [赛事id,赛事状态,"主队进球,主队半场进球,主队红牌,主队黄牌","客队进球,客队半场进球,客队红牌,客队黄牌","状态修改时间","pptv赛前视频id","pptv直播id","pptv赛后视频","是否存在RB动画","加时状态,加时主队比分,加时客队比分,主队点球比分,客队点球比分","备注"]
         [赛事id,赛事状态,"主队进球,主队半场进球,主队红牌,主队黄牌","客队进球,客队半场进球,客队红牌,客队黄牌","状态修改时间","pptv赛前视频id","pptv直播id","pptv赛后视频","是否存在RB动画","加时状态,加时主队比分,加时客队比分,主队点球比分,客队点球比分","备注"]
       ]
       * */
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
