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
  TouchableHighlight,
  Clipboard,
  Vibration,
  RefreshControl,
  PixelRatio, 
  Dimensions,
  Navigator,
  BackAndroid,
  InteractionManager,
} from 'react-native';
import {time2see,get1Pixel,joinDict} from '../Util';

import moment from 'moment';
import SocketIO from 'react-native-socketio';
import {renderListEmptyView,renderListLoadingView} from '../common/ViewUtil';
import {sleep} from '../Util';
import NewsItem from '../components/NewsItem';
import CustomWebView from '../components/CustomWebView';
import GroupItem from './GroupItem';

export default class GroupList extends Component {
  constructor(props){
    super(props);
    this.state={loading:true,haveMore:true};
    this.datas=[];
    console.log('matchs constructor');

    this.itemPress=this.itemPress.bind(this);
    this.itemLongPress=this.itemLongPress.bind(this);
    
    this.renderHeader=this.renderHeader.bind(this);
    this.renderRow=this.renderRow.bind(this);
    this.renderFooter=this.renderFooter.bind(this);
    this.renderSeparator=this.renderSeparator.bind(this);


    //上拉加载
    this.onEndReached=this.onEndReached.bind(this);
    this.pullUpDatas=this.pullUpDatas.bind(this);
    
    //下拉加载
    this.onRefresh=this.onRefresh.bind(this);
    this.pullDownDatas=this.pullDownDatas.bind(this);

    this.handleBack=this.handleBack.bind(this);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.initDatas=this.initDatas.bind(this);

  }
  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
    InteractionManager.runAfterInteractions(()=>{
      this.initDatas().catch((e)=>{console.log('initDatas error:',e);});
    });
  }
  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
  }

  async initDatas(){
    let mytime=new Date().getTime();
    let body=this.props.body;
    let url=this.props.url;
    let bodyStr=joinDict(body);
    console.log('bodyStr:',bodyStr);
    let result=await fetch(url,{method:'POST','body':bodyStr,headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },});
    let obj=await result.json();
    if(obj.code==100){
      this.datas=obj.data;
    }else{
      console.log(obj.msg);
    }
    this.setState({loading:false});
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

  itemPress(data){
    console.log('itemPress');
    this.props.navigator.push({component:CustomWebView,passProps:{url:data.url}});
  }
  itemLongPress(data){
    console.log('itemLongPress');
    Clipboard.setString(data.explains)
    Vibration.vibrate(5);
    //var content = Clipboard.getString();
  }


  async pullDownDatas(){
    /*
    this.setState({loading:true});
    await sleep(2000);
    //请求网络数据
    this.setState({loading:false});
    */
    this.initDatas();
  }

  async pullUpDatas(){
    let mytime=new Date().getTime();
    let body=this.props.body;
    let url=this.props.url;
    if(this.datas.length>0){
      let oldestData=this.datas[this.datas.length-1];
      if(body.threadtype==1)
        body.id=oldestData.lastreplytime;
      else
        body.id=oldestData.id;
    }
    let bodyStr=joinDict(body);
    console.log('bodyStr:',bodyStr);
    let result=await fetch(url,{method:'POST','body':bodyStr,headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },});
    let obj=await result.json();
    if(obj.code==100){
      let ds=obj.data;

      for(let i=0;i<ds.length;i++){
        this.datas.push(ds[i]);
      }
      if(ds.length<10)
        this.setState({haveMore:false});
      else
        this.setState({haveMore:true});
    }else{
      console.log(obj.msg);
    }
  }

  onPressEvent(e){
    console.log('onPressEvent:',e);
  }
  renderRow(data, sectionID, rowID){
    return (
      <GroupItem data={data}/>
    ); 
  }
  
  onEndReached(obj){
    if(obj){
      if(this.state.haveMore)
        this.pullUpDatas().catch((e)=>console.log('pullUpDatas error:',e));
    }else{
      console.log('endreached init listiview',obj);
    }
  }
  renderSeparator(sectionID: number, rowID: number, adjacentRowHighlighted: bool){
    let key=`${sectionID}-${rowID}`;
    return (
      <View 
        key={key}
        style={{
          height: adjacentRowHighlighted ? 4 : get1Pixel(),
          backgroundColor:'grey'
        }}
      />      
    );  
  }
  renderHeader(){
    return null;
    /*
    return (
      <View>
        <Text>Header</Text>
      </View>
    );
    */
  }
  renderFooter(){
    let size=this.datas.length;
    if(this.state.haveMore && size>0)
      return (
        <View style={{alignItems:'center',justifyContent:'center',height:36}}>
          <Text>加载更多...</Text>
        </View>
      );
    else if(!this.state.haveMore)
      return (
        <View style={{alignItems:'center',justifyContent:'center',height:36}}>
          <Text>没有更多数据了</Text>
        </View>
      );
    else
      return null;
  }
  onRefresh(){
    this.pullDownDatas().then(()=>{console.log('下拉完成')}).catch((e)=>console.log('pullDownDatas error:',e));
  }

  render() {
    let matchDatas=this.datas;
    let loading=this.state.loading;

    if(loading){
      return renderListLoadingView();
    }else if(matchDatas.length==0){
      return renderListEmptyView('暂无数据',this.onRefresh);
    }else{
      let dsData=this.ds.cloneWithRows(matchDatas);
      return (
        <View style={styles.container}>
          <ListView
            style={styles.listStyle}
            dataSource={dsData}
            renderRow={this.renderRow}
            enableEmptySections = {true} 
            refreshControl={
              <RefreshControl
                onRefresh={this.onRefresh}
                refreshing={loading}
                />
            }
            onEndReached={this.onEndReached}
            onEndReachedThreshold={80}
            renderSeparator={this.renderSeparator}
            renderFooter={this.renderFooter}
            //renderHeader={this.renderHeader}
          />
        </View>
      );
    }
  }
}



  //flexDirection:'row',
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listStyle: {
  },
  dataItem: {
    flex:1,
    height:300,
    padding:8,
  },
  itemSeprator: {
    height:1,
    backgroundColor: 'grey',
  },
});


AppRegistry.registerComponent('demo', () => demo);
