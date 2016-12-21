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

export default class MatchItem extends Component {
  constructor(props){
    super(props);
  }
  
  render(){
    let data=this.props.data;
    let halfText='';
    if(data.status>=2)
      halfText=`半场${data.hhalfscore}-${data.ahalfscore}`
    return (
      <View style={styles.base}>
        <View style={styles.info}>
          <Text>{data.lname}{data.stime} {halfText}</Text>
        </View>
        <View style={styles.main}>
          <Text>未</Text>
          <View style={styles.sperator}/>
          <View style={styles.maininfo}>
            <View style={styles.teaminfo}>
              <Text>{data.hscore}</Text>
              <Text>{data.hsxname}</Text>
              <Text>{data.hstanding}</Text>
            </View>
            <View style={styles.teaminfo}>
              <Text>{data.ascore}</Text>
              <Text>{data.asxname}</Text>
              <Text>{data.astanding}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
  info:{
    
  },
  main : {
    flex:1,
    flexDirection:'row',
    alignItems:'center',
  },
  sperator:{
    backgroundColor:'grey', 
    width:1,
    alignSelf:'stretch',
  },
  maininfo:{
    flex:1,
  },
  teaminfo:{
    flex:1, 
    flexDirection:'row',
  },
});


