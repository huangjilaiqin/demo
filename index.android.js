/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import moment from 'moment';
//import SocketIO from 'react-native-socketio';
let SocketIO = require('react-native-socketio');

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image, 
  ListView,
  TouchableHighlight
} from 'react-native';

class NewsItem extends Component{
  constructor(props){
    super(props);
  }
  render(){
    const recom=this.props.recom;
    return (
      <View 
        key={recom.key}
        style={styles.recomItem}>
        <Text>{recom.title}</Text>
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
    this._renderSeparator=this._renderSeparator.bind(this);
    //this._pullNews=this._pullNews.bind(this);
    this.itemPress=this.itemPress.bind(this);
    this.itemLongPress=this.itemLongPress.bind(this);
    this.initData=this.initData.bind(this);
    this.pullUp=this.pullUp.bind(this);
    this.pullDonw=this.pullDonw.bind(this);

    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.datas=[];
    this.dsData=this.ds.cloneWithRows(this.datas);

    //this._pullNews();

    this.socket = new SocketIO('http://ws-live.qqshidao.com',{'log':true});
    this.socket.connect();
    console.log('to connect');
    this.socket.on('connect',()=>{console.log('connect')});
    this.socket.on('error',(err)=>{console.log('err',err)});
    this.socket.on('myTest',(args)=>{
      console.log('data:',args);
      let data=args[0];
      let recoms=data['recoms'];
      let updown=data['updown'];
      let a=[1,3,5];
      let b=[7,8,9];
      let c=[...a,...b];
      console.log(c);
      
      if(updown==1)
        for(let r of recoms)
          this.datas.unshift(r);
      else
        for(let r of recoms)
          this.datas.push(r);

      console.log(this.datas);
      this.dsData=this.ds.cloneWithRows(this.datas);
      this.setState((previousState, currentProps)=>{num:previousState.num++});
      /*
      */
    });
    this.initData();
  }

  itemPress(){
    console.log('itemPress');
  }
  itemLongPress(){
    console.log('itemLongPress');
  }

  initData(){
    this.socket.emit('myTest',{id:0,updown:-1});
  }

  pullDonw(){
    let id=0;
    if(datas.length>0)
      id=this.datas[0]['id'];
    this.socket.emit('myTest',{id,updown:1});
  }
  
  pullUp(){
    let id=0;
    if(datas.length>0)
      id=this.datas[this.datas.length]['id'];
    this.socket.emit('myTest',{id,updown:-1});
  }

    

  /*
  function getMoviesFromApiAsync() {
    return fetch('https://facebook.github.io/react-native/movies.json')
        .then((response) => response.json())
        .then((responseJson) => {
        return responseJson.movies;
      })
      .catch((error) => {
        console.error(error);
    });
  }
  //*/
  /*
  async function getMoviesFromApi() {
    try {
      let response = await fetch('https://facebook.github.io/react-native/movies.json');
      let responseJson = await response.json();
      return responseJson.movies;
    } catch(error) {
      console.error(error);
    }
  }
  /*/
  onPressEvent(e){
    console.log('onPressEvent:',e);
  }
  _randerRow(recom){
    return (
      <TouchableHighlight 
        underlayColor="red"
        onPressIn={()=>this.onPressEvent('onPressIn')}
        onPressOut={()=>this.onPressEvent('onPressOut')}
        onPress={()=>this.onPressEvent('onPress')}
        onLongPress={()=>this.onPressEvent('onLongPress')}
        delayPressIn={5}
        delayLongPress={2000}
        delayPressOut={5}
        >
        <View 
          key={recom.id}
          style={styles.recomItem}>
          <View>
            <Text>{recom.simpleleague}</Text>
            <Text>{recom.vsdate}</Text>
            <Text>{recom.homesxname} vs {recom.awaysxname}</Text>
          </View>
          <View 
            style={{flex:1,justifyContent:'space-between'}}>
            <Text 
              numberOfLines={2}
              ellipsizeMode='tail'
              style={{
                fontSize:16,
                color:'black',
              }}>{recom.title}</Text>
            <View 
              style={{
                flex:1,
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'flex-end',  //让子节点在cross方向上与底部对齐
              }}>
              <Text
                style={{
                  fontSize:14,
                  color:'grey',
                }}
                >{recom.source}</Text>
              <Text
                style={{
                  fontSize:14,
                  color:'grey',
                }}
                >{recom.replyCount}热度</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    ); 
  }
  _onEndReached(){
    console.log('_onEndReached:',arguments);
    let recomType='yaowen';
    //this._pullNews(recomType,this.maxId);
    this.maxId++;
  }
  _renderSeparator(sectionID: number, rowID: number, adjacentRowHighlighted: bool){
    //console.log('_renderSeparator',sectionID,rowID,adjacentRowHighlighted);
    return (
      <View 
        key={`${sectionID}-${rowID}`}
        style={{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor:'black'
        }}
      />      
    );  
  }
  renderHeader(){
    return (
      <View>
        <Text>Header</Text>
      </View>
    );
  }
  renderFooter(){
    return (
      <View>
        <Text>Footer</Text>
      </View>
    );
  }
  render() {
    
    return (
      <View style={styles.container}>
        <ListView
          style={styles.listStyle}
          dataSource={this.dsData}
          renderRow={this._randerRow}
          enableEmptySections = {true} 
          onEndReached={this._onEndReached}
          onEndReachedThreshold={80}
          renderSeparator={this._renderSeparator}
          renderFooter={this.renderFooter}
          renderHeader={this.renderHeader}
        />
        <View style={{height:200,backgroundColor:'#0D87FF'}}>
        </View>
      </View>
    );
  }
}

  //flexDirection:'row',
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listStyle: {
  },
  recomItem: {
    flex:1,
    height:200,
    padding:8,
  },
  itemSeprator: {
    height:1,
    backgroundColor: 'grey',
  },
});

AppRegistry.registerComponent('demo', () => demo);
