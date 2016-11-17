/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight
} from 'react-native';

class NewsItem extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <View style={styles.newsItem}>
        <Text>{this.props.news.title}</Text>
      </View>
    );
  }
}

export default class demo extends Component {
  constructor(props){
    super(props);
    this.state={num:0};
    this._randerRow=this._randerRow.bind(this);
    this._onEndReached=this._onEndReached.bind(this);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.datas=[{title:'hj'},{title:'hm'},{title:'lq'}];
    this.dsData=this.ds.cloneWithRows(this.datas);
    /*
    setInterval(()=>{
      this.datas.push({title:'hj'+this.state.num});
      this.dsData=this.ds.cloneWithRows(this.datas);
      this.setState((previousState, currentProps)=>{num:previousState.num++});
    },1000);
    */
    //this.dsData=this.ds.cloneWithRows([{title:'hj'},{title:'hm'},{title:'lq'}]);
  }
  _randerRow(rowData){
    return (
      <NewsItem style={{flex:1}} news={rowData}/>
    ); 
  }
  _onEndReached(){
    console.log('_onEndReached');
    this.datas.push({title:'hj'+this.state.num});
    this.dsData=this.ds.cloneWithRows(this.datas);
    this.setState((previousState, currentProps)=>{num:previousState.num++});
  }
  render() {
    
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.dsData}
          renderRow={this._randerRow}
          enableEmptySections = {true} 
          onEndReached={this._onEndReached}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  newsItem: {
    flex:1,
    height:80,
  },
});

AppRegistry.registerComponent('demo', () => demo);
