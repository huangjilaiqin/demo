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
import {renderListEmptyView,renderListLoadingView} from './common/ViewUtil';

export default class Recommends extends Component {
  constructor(props){
    super(props);
    this.state={loading:true};
    this.type2Name={
      0:'串关',
      1:'胜平负',
      2:'亚盘',
      3:'大小球',
      4:'让球',
    };
    this._randerRow=this._randerRow.bind(this);
    this._onEndReached=this._onEndReached.bind(this);
    this._renderSeparator=this._renderSeparator.bind(this);
    this.itemPress=this.itemPress.bind(this);
    this.itemLongPress=this.itemLongPress.bind(this);
    this.pullDatas=this.pullDatas.bind(this);
    this.initDatas=this.initDatas.bind(this);
    this.onRefresh=this.onRefresh.bind(this);
    this.handleBack=this.handleBack.bind(this);

    
  }

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
    InteractionManager.runAfterInteractions(()=>{
      this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.datas=[];
      this.dsData=this.ds.cloneWithRows(this.datas);

      this.socket = new SocketIO('http://ws-live.qqshidao.com');
      this.socket.connect();
      this.socket.on('connect',()=>{console.log('connect')});
      this.socket.on('error',(err)=>{
        console.log('err',err)
        this.setState({loading:false});
      });
      this.socket.on('myTest',(args)=>{
        let recoms=args[0];
        this.datas=recoms;
        this.dsData=this.ds.cloneWithRows(this.datas);
        //this.setState((previousState, currentProps)=>{num:previousState.num++,net:1});
        this.setState({loading:false});
      });
      this.initDatas();
    });
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
    //todo bug 这个socket会保持所有的注册函数在一个全局队列里，即使关掉也会有
    this.socket.on('myTest',()=>console.log('myTest old'));
    this.socket.on('connect',()=>console.log('connect old'));
    this.socket.on('error',()=>console.log('error old'));
    this.socket.disconnect();
    this.socket=null;
  }
  handleBack(){
    let navigator = this.props.navigator;
    if (navigator && navigator.getCurrentRoutes().length > 1) {
      console.log('Recommends pop');
      navigator.pop();
      return true;
    }else{
      return false;
    }
  }

  itemPress(){
    console.log('itemPress');
  }
  itemLongPress(recom){
    console.log('itemLongPress');
    Clipboard.setString(recom.explains)
    Vibration.vibrate(5);
    //var content = Clipboard.getString();
  }

  initDatas(){
    this.setState({loading:true});
    this.socket.emit('myTest',{});
  }

  pullDatas(){
    this.setState({loading:true});
    this.socket.emit('myTest',{});
  }

  onPressEvent(e){
    console.log('onPressEvent:',e);
  }
  _randerRow(recom){
    console.log('recom',recom);
    return (
      <TouchableHighlight 
        underlayColor="white"
        onPressIn={()=>this.onPressEvent('onPressIn')}
        onPressOut={()=>this.onPressEvent('onPressOut')}
        onPress={()=>this.itemPress(recom)}
        onLongPress={()=>this.itemLongPress(recom)}
        delayLongPress={1500}
        >
        <View 
          key={recom.id}
          style={styles.recomItem}>
          <View>
            <View style={{flex:1,height:20,flexDirection:'row'}}>
              <Text>{recom.nickname}  </Text>
              <Text>{recom.simpleleague}  </Text>
              <Text>{recom.homesxname} vs {recom.awaysxname}  </Text>
              <Text>{moment(recom.vsdate).format('DD HH:mm')}  </Text>
            </View>

            <View style={{flex:1,height:20,flexDirection:'row'}}>
              <Text>{this.type2Name[recom.type]}  </Text>
              <Text>{recom.recommend}  </Text>
              <Text>{moment(recom.createtime).format('DD HH:mm')}  </Text>
            </View>

            <View style={{flex:1,height:30,flexDirection:'row'}}>
              <Text>￥{recom.price} {recom.buynum}次    </Text>
              <Text>win:{recom.winper}% {recom.winmoneyper}% {recom.winmoney}</Text>
            </View>

            <View>
              <Text>{recom.recent.map((d,id)=><Text key={id}>{d.result}</Text>)}</Text>
              <Text>{recom.recentAll.map((d,id)=><Text key={id}>{d.result}</Text>)}</Text>
              <Text>{recom.recentAll.map((d,id)=><Text key={id}>{d.type}</Text>)}</Text>
            </View>

            <Text>{recom.explains}</Text>
          </View>
        </View>
      </TouchableHighlight>
    ); 
  }
  _onEndReached(){
    console.log('_onEndReached:',arguments);
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
  onRefresh(){
    this.pullDatas();
  }

  render() {
    let size=0;
    if(this.dsData)
      size=this.dsData.getRowCount();
    if(this.state.loading)
      return renderListLoadingView();
    else if(!this.state.loading && size==0){
      return renderListEmptyView('暂无数据',this.onRefresh);
    }else{
      return (
        <View style={styles.container}>
          <ListView
            style={styles.listStyle}
            dataSource={this.dsData}
            renderRow={this._randerRow}
            enableEmptySections = {true} 
            refreshControl={
              <RefreshControl
                onRefresh={this.onRefresh}
                refreshing={this.state.loading}
                />
            }
            onEndReached={this._onEndReached}
            onEndReachedThreshold={80}
            renderSeparator={this._renderSeparator}
            //renderFooter={this.renderFooter}
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
  recomItem: {
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
