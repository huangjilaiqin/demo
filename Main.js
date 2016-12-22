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
  Button,
} from 'react-native';

import MyViewPager from './MyViewPager';
import Recommends from './Recommends';
import ListViewDemo from './ListViewDemo';
import ListViewNews from './ListViewNews';
import Qqsd from './qqsd/Qqsd';

export default class Main extends Component {
  constructor(props){
    super(props);
 
    this._navigate=this._navigate.bind(this);
  }
  //<Button style={styles.myButton} title='recommend' onPress={()=>this.props.navigator.push({component:Recommends})} />
  render(){
    return (
      <View>
        <Button style={styles.myButton} title='myViewPager' onPress={()=>this.props.navigator.push({component:MyViewPager})} />
        <Button style={styles.myButton} title='ListView示例' onPress={()=>this.props.navigator.push({component:ListViewDemo})} />
        <Button style={styles.myButton} title='新闻' onPress={()=>this.props.navigator.push({component:ListViewNews})} />
        <Button style={styles.myButton} title='球球是道' onPress={()=>this.props.navigator.push({component:Qqsd})} />
      </View>
    );
  }
  _navigate(name, type = 'Normal') {
    this.props.navigator.push({
      component: SecondPage,
      passProps: {
        name: name
      },
      type: type
    });
  }
}
const styles = StyleSheet.create({
  page: {
    width: 200,
    height: 200,
  },
  base:{
    width: Dimensions.get('window').width,
    height:Dimensions.get('window').height, 
    backgroundColor:'grey',
  },
  myButton:{
    margin:0
  }
});


