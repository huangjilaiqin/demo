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

export default class StateTime extends Component {
  constructor(props){
    super(props);
    this.state={tag:true};
    
  }
  componentDidMount () {
    this.intervalId=setInterval(
      ()=>this.setState({tag:!this.state.tag})
      ,1000);
  }
  componentWillUnmount () {
    this.intervalId && clearInterval(this.intervalId);
  }
  
  render(){
    let tag=this.state.tag?"'":'';
    return (
      <Text style={[...this.props.style]}>{this.props.time}{tag}</Text>
    );
  }
}
