'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image, 
  TouchableNativeFeedback,
  PixelRatio, 
} from 'react-native';


function onPress(){
  console.log('onPress test');
}

export function renderListEmptyView(tip,cb){
  return (
    //PixelRatio.getPixelSizeForLayoutSize(142.5)
    <View style={{width:392.72,alignItems:'center',backgroundColor:'grey'}}>
      <Text style={{width:180,height:200,fontSize:60}}>{tip}</Text>
      <View style={{width:180,height:200}}>
        <Button style={{width:180,height:200,fontSize:60}}
          onPress={cb}
          title='点击刷新'
          color="#841584"
        />
      </View>
      <TouchableNativeFeedback
           onPress={cb}
           background={TouchableNativeFeedback.SelectableBackground()}>
         <View style={{elevation: 4,
           borderRadius: 2,width: 150, height: 100, backgroundColor: 'red'}}>
           <Text style={{textAlign: 'center',
             alignItems:'center',
             color: 'white',
             padding: 8,
             fontSize:60}}>Button</Text>
         </View>
       </TouchableNativeFeedback>
       <View style={{width:360,height:20,alignSelf:'flex-start',marginLeft:0,backgroundColor:'black'}}>
        <Text>aaa</Text>
       </View>
    </View>
  ); 
}

export function renderListLoadingView(tip,cb){
  return (
    <View>
      <Text>正在加载数据...</Text>
    </View>
  ); 
}

/*
 * style={{height:20}}
export function renderListErrorView(tip,cb){
  return (
    <View>
      <Text>{tip}</Text>
      <Button
        onPress={cb}
        title='点击刷新'
        color="#841584"
        width=36
      />
    </View>
  ); 
}
*/
