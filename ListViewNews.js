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

import moment from 'moment';
import SocketIO from 'react-native-socketio';
import {renderListEmptyView} from './common/ViewUtil';
import {sleep} from './Util';
import NewsItem from './components/NewsItem';
import CustomWebView from './components/CustomWebView';

export default class ListViewNews extends Component {
  constructor(props){
    super(props);
    this.state={foot:1,loading:true,haveMore:true};
    console.log('ListViewNews :',this);

    this.itemPress=this.itemPress.bind(this);
    this.itemLongPress=this.itemLongPress.bind(this);
    
    this.renderHeader=this.renderHeader.bind(this);
    this.renderRow=this.renderRow.bind(this);
    this.renderFooter=this.renderFooter.bind(this);
    this.renderSeparator=this.renderSeparator.bind(this);

    //初始化加载列表
    this.initDatas=this.initDatas.bind(this);

    //上拉加载
    this.onEndReached=this.onEndReached.bind(this);
    this.pullUpDatas=this.pullUpDatas.bind(this);
    
    //下拉加载
    this.onRefresh=this.onRefresh.bind(this);
    this.pullDownDatas=this.pullDownDatas.bind(this);


    this.handleBack=this.handleBack.bind(this);

    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.datas=[];
    this.dsData=this.ds.cloneWithRows(this.datas);
  }
  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
    //this.initDatas();
    InteractionManager.runAfterInteractions(()=>{
      this.initDatas();
    });
  }
  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
  }
  
  handleBack(){
    let navigator = this.props.navigator;
    console.log('ListViewNews handleBack:',this);
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

  async initDatas(){
    console.log('before initDatas:',new Date());
    this.setState({loading:true});
    let result=await fetch('http://v.juhe.cn/toutiao/index?type=yule&key=4d989f478e4896d0cb5b762538c90587');
    let obj=await result.json();
    if(obj.error_code==0){
      //this.datas=obj.result.data;
      this.datas=[];
      let ds=obj.result.data;
      for(let i=0;i<10;i++){
        let size=ds.length;
        for(let j=0;j<size;j++)
          this.datas.push(ds[j]);
      }
      console.log('news size:',this.datas.length);
      this.dsData=this.ds.cloneWithRows(this.datas);
    }
    //todo 没有上拉加载所以加载数据后就设置成false
    this.setState({loading:false,haveMore:false});
    console.log('after initDatas:',new Date());
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
    await sleep(1000);
    let base=this.state.foot*5;
    for(let i=0;i<5;i++){
      this.datas.push({
        id:base+i,
        name:'hj'+i+new Date(),
      });
    }
    this.dsData=this.ds.cloneWithRows(this.datas);
    console.log('before state:',this.state);
    this.setState((pre)=>{this.state.foot=pre.foot++;});
    console.log('after state:',this.state);
    //todo 这个为什么错的
    //this.setState((pre)=>this.state.foot=pre.foot++);
    if(this.state.foot>3 && this.state.haveMore)
      this.setState({haveMore:false});
  }

  onPressEvent(e){
    console.log('onPressEvent:',e);
  }
  renderRow(data, sectionID, rowID){
    return (
      <NewsItem data={data} onPress={this.itemPress}/>
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
    console.log('renderSeparator key:',key);
    return (
      <View 
        key={key}
        style={{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor:'black'
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
    console.log('renderFooter');
    let size=this.dsData.getRowCount();
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
    console.log('render:',this.state,size);
    let size=this.dsData.getRowCount();
    if(!this.state.loading && size==0){
      return renderListEmptyView('暂无数据',this.onRefresh);
    }else{
      return (
        <View style={styles.container}>
          <ListView
            style={styles.listStyle}
            dataSource={this.dsData}
            renderRow={this.renderRow}
            enableEmptySections = {true} 
            refreshControl={
              <RefreshControl
                onRefresh={this.onRefresh}
                refreshing={this.state.loading}
                />
            }
            onEndReached={this.onEndReached}
            onEndReachedThreshold={80}
            //renderSeparator={this.renderSeparator}
            renderFooter={this.renderFooter}
            renderHeader={this.renderHeader}
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
