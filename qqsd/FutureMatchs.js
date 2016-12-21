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
  InteractionManager,
} from 'react-native';
import Matchs from './Matchs';

export default class FutureMatchs extends Component {
  constructor(props){
    super(props);
    this.state={loading:true};
    this.datas=[];
    this.cid=0;
    this.initDatas=this.initDatas.bind(this);
  }
  componentDidMount () {
    //加载数据
    InteractionManager.runAfterInteractions(()=>{
      this.initDatas().catch((e)=>{console.log('initDatas error:',e);});
    });
  }
  componentWillUnmount () {
  }
  async initDatas(){
    console.log('initDatas');
    let opt={
      cid:3, 
      c_ck:'',
      mytime:new Date(),
      t:1, 
      stid:1,
      c_key:'c28d797bdf3f789e759150cdac45957a'
    };
    let data = new FormData();
    data.append( "json", JSON.stringify(opt));
    let bodyStr='cid=3&c_ck=&mytime=1482312427923&t=1&stid=1&c_key=c28d797bdf3f789e759150cdac45957a';
    let url='http://i.qqshidao.com/api/index.php?c_id=41000&c_type=2&c_cpid=2&suid=7fbef98cf1405f9424984422bbf8111d';
    let result=await fetch(url,{method:'POST','body':bodyStr,headers: {
      "Content-Type": "application/x-www-form-urlencoded"
      },});
    let obj=await result.json();
    if(obj.code==100){
      this.datas=obj.data.list;
      this.cid=obj.cid;
    }
    this.setState({loading:false});
    console.log('initDatas back');
  }
  
  render(){
    return (
      <Matchs datas={this.datas} loading={this.state.loading}/>
    );
  }
}
