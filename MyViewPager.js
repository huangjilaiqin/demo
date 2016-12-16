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
} from 'react-native';
import ViewPager from 'react-native-viewpager';

export default class MyViewPager extends Component {
  constructor(props){
    super(props);
    let IMGS = [
      //'https://images.unsplash.com/photo-1441742917377-57f78ee0e582?h=1024',
      'http://www.jeep.com.cn/renegade/images/sy_degsn1.jpg',
      'https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?h=1024',
      'https://images.unsplash.com/photo-1441448770220-76743f9e6af6?h=1024',
      'https://images.unsplash.com/photo-1441260038675-7329ab4cc264?h=1024',
      'https://images.unsplash.com/photo-1441126270775-739547c8680c?h=1024',
      'https://images.unsplash.com/photo-1440964829947-ca3277bd37f8?h=1024',
      'https://images.unsplash.com/photo-1440847899694-90043f91c7f9?h=1024'
    ];
    let dataSource = new ViewPager.DataSource({
      pageHasChanged: (p1, p2) => p1 !== p2,
    });
    this.state={dataSource: dataSource.cloneWithPages(IMGS)};
    this._renderPage=this._renderPage.bind(this);
    this.handleBack=this.handleBack.bind(this);
 
  }
  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }
  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
  }
  handleBack(){
    let navigator = this.props.navigator;
    if (navigator && navigator.getCurrentRoutes().length > 1) {
      navigator.pop();
      return true;
    }else{
      return false;
    }
  }
  render(){
    return (
      <View style={{flex:1,height:200,backgroundColor:'grey'}}>
        <Text>viewpager</Text>
        
        <Text style={{}}>bottom</Text>
      </View>
    );
  }
  /*
  <ViewPager
          style={{height:200}}
          dataSource={this.state.dataSource}
          renderPage={this._renderPage}
          //renderPageIndicator={false}
          isLoop={false}
          initialPage={0}
          autoPlay={false}/>
          */
  _renderPage(data: Object,pageID: number | string,) {
    console.log(data);
    return (
      <View style={{width:Dimensions.get('window').width}}>
        <Text>{data}</Text>
        <Image
          source={{uri: data}}
          style={styles.base} />
      </View>
    );
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
    backgroundColor:'red',
  }
});


