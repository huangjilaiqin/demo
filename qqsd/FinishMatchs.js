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
import MatchsList from './MatchsList';

export default class FinishMatchsList extends Component {
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
    let mytime=new Date().getTime();
    let bodyStr='cid=3&c_ck=&mytime='+mytime+'&t=2&stid=2&c_key=c28d797bdf3f789e759150cdac45957a';
    let url='http://i.qqshidao.com/api/index.php?c_id=41000&c_type=2&c_cpid=2&suid=7fbef98cf1405f9424984422bbf8111d';
    let result=await fetch(url,{method:'POST','body':bodyStr,headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },});
    let obj=await result.json();
    if(obj.code==100){
      this.datas=obj.data.list;
      console.log('initDates length:',this.datas.length);
      this.cid=obj.cid;
    }
    this.setState({loading:false});
  }
  
  render(){
    console.log('FinishMatchsList length:',this.datas.length);
    this.datas=this.datas.sort((a,b)=>{
      let astate=a.status;
      let bstate=b.status;
      if(astate>bstate)
        return 1;
      else if(astate<bstate)
        return -1;
      else{
        let avs=new Date(a.vsdate).getTime();
        let bvs=new Date(b.vsdate).getTime();
        if(avs>bvs)
          return 1;
        else if(avs<bvs)
          return -1;
        else{
          let afid=parseInt(a.fid);
          let bfid=parseInt(b.fid);
          return afid-bfid;
        }
      }
    });
    console.log('FinishMatchsList length:',this.datas.length);
    return (
      <MatchsList datas={this.datas} loading={this.state.loading}/>
    );
  }
}
