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
import {time2see,get1Pixel} from '../Util';

console.log('get1',get1Pixel());
export default class GroupItem extends Component {
  constructor(props){
    super(props);
  }

  getImgsView(imgs){

    if(imgs.length==1){
      let url=imgs[0];
      let r=url.match(/(\d+)x(\d+)$/);
      let height=r[1]/PixelRatio.get();
      let width=r[2]/PixelRatio.get();
      let max=imgSize*5/2;
      if(height>max && width>max){
        let rate=1;
        if(height>width){
          width=max/height*width;
          height=max;
        }else{
          height=max/width*height;
          width=max;
        }
      }else if(height>max){
        width=max/height*width;
        height=max;
      }else if(width>max){
        height=max/width*height;
        width=max;
      }
      url='http://static.qiuqiusd.com'+url+'_580.jpg';
      return <Image key={0} style={{height,width}} source={{uri:url}}/>;
    }else
      return imgs.map((url,i)=>{
        url='http://static.qiuqiusd.com'+url+'_180.jpg';
        return <Image key={i} style={styles.listImg} source={{uri:url}}/>
      })
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
      /**
        {
              imgs.map((url,i)=>{
                url='http://static.qiuqiusd.com'+url+'_180.jpg';
                return <Image key={i} style={styles.listImg} source={{uri:url}}/>
              })
          }
        */
      imgsView=<View style={styles.imgs}>
        {this.getImgsView(imgs)}
        </View>
    }
  
    return (
      <View style={styles.base}>
        <Image style={styles.headImg} source={{uri:data.headimg}}/>
        <View style={styles.main}>
          <Text style={styles.username}>{data.username}</Text>
          {titleView}
          {contentView}
          {imgsView}
          <Text style={styles.createtime}>{time2see(new Date(data.createtime))}</Text>
        </View>
      </View>
    );
  }
}

const imgSize=(Dimensions.get('window').width-(8+36+8+16+8))/3
//let styles = StyleSheet.create({
const styles = {
  base: {
    flex: 1,
    flexDirection:'row',
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
    width:36,
    height:36,
    borderRadius:18,
  },
  username:{
    color:'blue',
    fontSize:14,
  },
  main : {
    flex:1,
    alignItems:'flex-start',
    marginLeft:8,
  },
  title:{
    fontSize:15,
    color:'black',
    marginTop:6,
  },
  content:{
    fontSize:14,
    color:'grey',
    marginTop:6,
  },
  imgs:{
    flex:1,
    flexDirection:'row',
    marginTop:3,
    width:imgSize*3+12,
    flexWrap:'wrap',
  },
  listImg1:{
  },
  listImg:{
    width:imgSize,
    height:imgSize,
    marginRight:4,
    marginTop:4,
  },
  createtime:{
    fontSize:12,
    color:'grey',
    marginTop:4,
  },
  sperator:{
    backgroundColor:'grey', 
    height:1,
    width:100,
    alignSelf:'stretch',
    marginRight:8,
  },
};


