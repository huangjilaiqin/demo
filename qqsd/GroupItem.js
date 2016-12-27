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

import StateTime from './StateTime';
import {time2see} from '../Util';

export default class GroupItem extends Component {
  constructor(props){
    super(props);
  }
  
  render(){
    let data=this.props.data;

    let titleView=null;
    if(data.title){
      titleView=<Text style={styles.title}>{data.title}</Text>
    }
    let contentView=null;
    if(data.partcontent){
      contentView=<Text style={styles.content}>{data.partcontent}</Text>
    }
    let imgsView=null;
    if(data.imglist){
      let imgs=data.imglist.split(',');
      imgsView=<View style={styles.imgs}>
          {imgs.map((url,i)=>{
            url='http://static.qiuqiusd.com'+url+'_180.jpg';
            return <Image key={i} style={styles.listImg} source={{uri:url}}/>
          })}
        </View>
    }
  
    return (
      <View style={styles.base}>
        <View style={styles.info}>
          <Image style={styles.headImg} source={{uri:data.headimg}}/>
          <View style={styles.userinfo}>
            <Text>{data.username}</Text>
            <Text>{time2see(new Date(data.createtime))}</Text>
          </View>
        </View>
        <View style={styles.main}>
          {titleView}
          {contentView}
          {imgsView}
        </View>
      </View>
    );
  }
}

//let styles = StyleSheet.create({
const styles = {
  base: {
    flex: 1,
    marginTop:8,
    marginBottom:8,
    marginLeft:8,
    marginRight:8,
  },
  info:{
    flex:1,
    flexDirection:'row',
  },
  headImg:{
    width:32,
    height:32,
  },
  userinfo:{
  
  },
  main : {
    flex:1,
    alignItems:'center',
    marginTop:8,
  },
  title:{},
  content:{},
  imgs:{
    flex:1,
    flexDirection:'row',
    backgroundColor:'red',
  },
  listImg:{
    width:64,
    height:64,
  },
  sperator:{
    backgroundColor:'grey', 
    width:1,
    alignSelf:'stretch',
    marginRight:8,
  },
};


