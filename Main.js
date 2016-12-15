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

export default class Main extends Component {
  constructor(props){
    super(props);
 
    this._navigate=this._navigate.bind(this);
  }
  render(){
    return (
      <View>
        <Button title='recommend' onPress={()=>this.props.navigator.push({component:Recommends})} />
        <Button title='myViewPager' onPress={()=>this.props.navigator.push({component:MyViewPager})} />
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
  }
});


