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

export default class MatchItem extends Component {
  constructor(props){
    super(props);
  }
  
  render(){
    let data=this.props.data;
    let halfText='';
    let status=data.status;
    let hscore=data.hscore;
    let ascore=data.ascore;
    let timestateColor=styles.timestateNotIng;
    let stateText='未'; 

    let scoreColor=styles.scoreNotIng;

    //红牌数据
    let hredcard=data.hredcard;
    let aredcard=data.aredcard;
    let hredcardTxt=null;
    let aredcardTxt=null;
    if(hredcard>0)
      hredcardTxt=<View style={styles.redcardBg}><Text style={styles.redcard}>{hredcard}</Text></View>;
    if(aredcard>0)
      aredcardTxt=<View style={styles.redcardBg}><Text style={styles.redcard}>{aredcard}</Text></View>;

    if(status==0){
      //未开始
      hscore='-';
      ascore='-';
      //styles.timestate.setColor('red');
      //styles.timestate.color='red';
    }else if(status<4){
      //进行中
      timestateColor=styles.timestateIng;
      scoreColor=styles.scoreIng;
      stateText='12'; 
    }else if(status==4){
      //完场
      timestateColor=styles.timestateNotIng;
      stateText='完'; 
      scoreColor=styles.scoreFinish;
    }else if(status==5){
      stateText='取消';
    }else if(status==6){
      stateText='改期';
    }else if(status==7){
      stateText='腰斩';
    }else if(status==8){
      stateText='中断';
    }else if(status==9){
      stateText='待定';
    }
    if(status>=2 && status<=4)
      halfText=`半场${data.hhalfscore}-${data.ahalfscore}`

    return (
      <View style={styles.base}>
        <View style={styles.info}>
          <Text>{data.lname} {data.stime} {halfText}</Text>
        </View>
        <View style={styles.main}>
          <Text style={[styles.timestate,timestateColor]}>{stateText}</Text>
          <View style={styles.sperator}/>
          <View style={styles.maininfo}>
            <View style={styles.teaminfo}>
              <Text style={[styles.score,scoreColor]}>{hscore}</Text>
              <Text style={styles.teamname}>{data.hname}</Text>
              <Text>{data.hstanding}</Text>
              {hredcardTxt}
            </View>
            <View style={styles.teaminfo}>
              <Text style={[styles.score,scoreColor]}>{ascore}</Text>
              <Text style={styles.teamname}>{data.aname}</Text>
              <Text>{data.astanding}</Text>
              {aredcardTxt}
            </View>
          </View>
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
    marginLeft:16,
    marginRight:8,
  },
  info:{
    marginRight:16,
  },
  timestate:{
    marginRight:16,
  },
  timestateNotIng:{
    color:'grey',
  },
  timestatetIng:{
    color:'green',
  },
  main : {
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    marginTop:8,
  },
  sperator:{
    backgroundColor:'grey', 
    width:1,
    alignSelf:'stretch',
    marginRight:8,
  },
  maininfo:{
    flex:1,
  },
  teaminfo:{
    flex:1, 
    flexDirection:'row',
    alignItems:'center',
  },
  score:{
    fontSize:16,
    marginRight:6,
  },
  scoreNotIng:{
    color:'grey', 
  },
  scoreIng:{
    color:'green', 
  },
  scoreFinish:{
    color:'red',
  },
  teamname:{
    fontSize:16,
    marginRight:6,
    color:'#234455',
  },
  redcardBg:{
    backgroundColor:'red',
    width:16,
    height:16,
    marginLeft:6,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:1,
  },
  redcard:{
    fontSize:12,
    fontWeight:'bold',
    color:'white',
  },
  
};


