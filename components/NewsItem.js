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
  Navigator,
  BackAndroid,
  TouchableOpacity,
} from 'react-native';


export default class NewsItem extends Component {
  constructor(props){
    super(props);
    console.log('NewsItem init');
  }

  render(){
    let data=this.props.data;
    let itemPress=this.props.onPress;
    return (
      <TouchableOpacity onPress={()=>itemPress(data)}>
      <View 
        key={data.id}
        style={styles.dataItem}
        >
        <Image style={styles.newsImg} source={{uri:data.thumbnail_pic_s03}}/>
        <Text style={styles.title}>{data.title}</Text>
        <View style={styles.detail}>
          <Text  style={styles.source}>{data.author_name}</Text>
          <Text  style={styles.source}>{data.date}</Text>
        </View>
        <View style={styles.itemSeprator}/>
      </View>
      </TouchableOpacity>
    ); 
  }
}
  //flexDirection:'row',
const px_1=1 / PixelRatio.get();
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listStyle: {
  },
  dataItem: {
    flex:1,
    padding:8,
  },
  itemSeprator: {
    height:px_1,
    backgroundColor: 'grey',
    paddingLeft:8,
    paddingRight:8,
  },
  title:{
    fontSize:18,
    marginTop:8,
  },
  detail:{
    flex:1,
    flexDirection:'row',
    marginTop:6,
    marginBottom:6,
  },
  source:{
    fontSize:12,
  },
  newsImgList:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    backgroundColor:'grey',
  },
  newsImg:{
    flexGrow:1,
    backgroundColor:'white',
    borderRadius:5,
    height:200,
  },
  imgSeparator:{
    width:2,
  }
});


