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
  WebView,
  ProgressBarAndroid, 
  ActivityIndicator,
} from 'react-native';

const windowSize=Dimensions.get('window');
const windowWidth=windowSize.width;
const windowHeight=windowSize.height;

export default class CustomWebView extends Component {
  constructor(props){
    super(props);
    this.state={loading:false};
    console.log('CustomWebView init',this);
    this.handleBack=this.handleBack.bind(this);
  }

  render(){
    console.log('CustomWebView:',this.props);
    let url=this.props.url;
    let loading=this.state.loading?<ActivityIndicator style={{alignSelf:'flex-start'}}/>:null;
    return (
      <View style={{backgroundColor:'grey',width:windowWidth,height:windowHeight}}>
        {loading}
        <WebView 
          source={{uri:url}}
          onLoadStart={()=>this.setState({loading:true})}
          onLoadEnd={()=>this.setState({loading:false})}
          />
      </View>
    ); 
  }
  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }
  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
  }
  handleBack(){
    console.log('handleBack',this);
    let navigator = this.props.navigator;
    if (navigator && navigator.getCurrentRoutes().length > 1) {
      navigator.pop();
      return true;
    }else{
      return false;
    }
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


