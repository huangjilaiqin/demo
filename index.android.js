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
  Image, 
  ListView,
  TouchableHighlight
} from 'react-native';

class NewsItem extends Component{
  constructor(props){
    super(props);
  }
  render(){
    const news=this.props.news;
    return (
      <View 
        key={news.key}
        style={styles.newsItem}>
        <Text>{news.title}</Text>
      </View>
    );
  }
}

export default class demo extends Component {
  constructor(props){
    super(props);
    this.state={num:0};
    this.maxId=2;
    this._randerRow=this._randerRow.bind(this);
    this._onEndReached=this._onEndReached.bind(this);
    this._renderSeparator=this._renderSeparator.bind(this);
    this._pullNews=this._pullNews.bind(this);

    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.datas=[];
    this.dsData=this.ds.cloneWithRows(this.datas);

    
    let newsType='yaowen';
    this._pullNews(newsType,this.maxId);
    this.maxId++;
  }

  _pullNews(newsType,page){
    let option={
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'User-Agent':'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.23 Mobile Safari/537.36',
        'Host':'c.m.163.com',
        'Connection': 'Keep-Alive',
        'Accept-Encoding': 'gzip',
      }
    };
    //http://temp.163.com/special/00804KVA/cm_shehui_03.js?callback=data_callback
    const url = 'http://temp.163.com/special/00804KVA/cm_'+newsType+'_0'+page+'.js?callback=data_callback';
    let myresp=fetch(url)
      .then((resp)=>{
        return resp.text();
      })
      .then((respText)=>{
        respText.replace('data_callback(','');
        respText=respText.replace(/\)$/,'');
        console.log(respText);
        respText='[{"title":"hj"}]';
        respJson=JSON.parse(respText);
        console.log('respJson:',respJson);
        return respJson;
      })
      .catch((error,r)=>{
        console.log(error,r);
        console.log(arguments);
        this.maxId--;
      });
    myresp.then((respJson)=>{
      console.log(this.datas);

      if(respJson){
        respJson.map((data)=>{
          item={
            title:data.title,
            imgsrc:data.imgurl,
            source:'',
            replyCount:data.tienum,
          };
          this.datas.push(item);
        });
        console.log(this.datas);
        this.dsData=this.ds.cloneWithRows(this.datas);
        this.setState((previousState, currentProps)=>{num:previousState.num++});
      }
      })
      .catch((error)=>{
        console.log('handle back error:',error);
        this.maxId--;
      });
    console.log('myresp:',myresp);
  
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
  _randerRow(news){
    return (
      <TouchableHighlight underlayColor="red">
        <View 
          key={news.key}
          style={styles.newsItem}>
          <Image 
            source={{uri:news.imgsrc}} 
            style={{width:64,marginRight:8}}/>
          <View 
            style={{flex:1,justifyContent:'space-between'}}>
            <Text 
              numberOfLines={2}
              ellipsizeMode='tail'
              style={{
                fontSize:16,
                color:'black',
              }}>{news.title}</Text>
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
                >{news.source}</Text>
              <Text
                style={{
                  fontSize:14,
                  color:'grey',
                }}
                >{news.replyCount}热度</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    ); 
  }
  _onEndReached(){
    let newsType='yaowen';
    this._pullNews(newsType,this.maxId);
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
  render() {
    
    return (
      <View style={styles.container}>
        <ListView
          style={styles.listStyle}
          dataSource={this.dsData}
          renderRow={this._randerRow}
          enableEmptySections = {true} 
          onEndReached={this._onEndReached}
          renderSeparator={this._renderSeparator}
        />
        <View style={{height:200,backgroundColor:'#0D87FF'}}>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listStyle: {
  },
  newsItem: {
    flex:1,
    flexDirection:'row',
    height:80,
    padding:8,
  },
  itemSeprator: {
    height:1,
    backgroundColor: 'grey',
  },
});

AppRegistry.registerComponent('demo', () => demo);
