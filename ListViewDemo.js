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
} from 'react-native';

import moment from 'moment';
import SocketIO from 'react-native-socketio';
import {renderListEmptyView} from './common/ViewUtil';
import {sleep} from './Util';

export default class ListViewDemo extends Component {
  constructor(props){
    super(props);
    this.state={foot:1,loading:false};
    
    this._randerRow=this._randerRow.bind(this);
    this._onEndReached=this._onEndReached.bind(this);
    this._renderSeparator=this._renderSeparator.bind(this);
    //this._pullNews=this._pullNews.bind(this);
    this.itemPress=this.itemPress.bind(this);
    this.itemLongPress=this.itemLongPress.bind(this);
    this.pullDatas=this.pullDatas.bind(this);
    this.initDatas=this.initDatas.bind(this);
    this.onRefresh=this.onRefresh.bind(this);
    this.handleBack=this.handleBack.bind(this);
    this.renderFooter=this.renderFooter.bind(this);

    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.datas=[];
    this.dsData=this.ds.cloneWithRows(this.datas);


    
  }
  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)

    this.initDatas();
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

  itemPress(){
    console.log('itemPress');
  }
  itemLongPress(recom){
    console.log('itemLongPress');
    Clipboard.setString(recom.explains)
    Vibration.vibrate(5);
    //var content = Clipboard.getString();
  }

  async initDatas(){
    this.setState({loading:true});
    await sleep(1000);
    for(let i=0;i<5;i++){
      this.datas.push({
        id:i,
        name:'hj'+i,
      });
    }
    this.dsData=this.ds.cloneWithRows(this.datas);
    this.setState({loading:false});
  }

  pullDatas(){
    this.setState({loading:true});
  }

  onPressEvent(e){
    console.log('onPressEvent:',e);
  }
  _randerRow(recom){
    return (
      /*
      <TouchableHighlight 
        key={recom.id}
        underlayColor="white"
        onPressIn={()=>this.onPressEvent('onPressIn')}
        onPressOut={()=>this.onPressEvent('onPressOut')}
        onPress={()=>this.itemPress(recom)}
        onLongPress={()=>this.itemLongPress(recom)}
        delayLongPress={1000}
        >
        <View 
          key={recom.id}
          style={styles.recomItem}>
          <Text>item</Text>
        </View>
      </TouchableHighlight>
      */
      <View 
        key={recom.id}
        style={styles.recomItem}>
        <Text>item</Text>
      </View>
    ); 
  }
  _onEndReached(obj){
    //this._pullNews(recomType,this.maxId);
    if(obj){
      console.log('real endreached',obj);
      console.log(this.state);
      this.setState({foot:this.state.foot++});
      this.setState((pre)=>{console.log(pre);this.state.foot=pre.foot++;});
    }else{
      console.log('endreached init listiview',obj);
      
    }
  }
  _renderSeparator(sectionID: number, rowID: number, adjacentRowHighlighted: bool){
    let key=`${sectionID}-${rowID}`;
    console.log(key,sectionID,rowID);
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
    return (
      <View>
        <Text>Header</Text>
      </View>
    );
  }
  renderFooter(){
    console.log('renderFooter');
    if(this.state.foot<10)
      return (
        <View>
          <Text>加载更多</Text>
        </View>
      );
    else if(this.state.foot>=10)
      return (
        <View>
          <Text>没有更多数据了</Text>
        </View>
      );
  }
  onRefresh(){
    //this.pullDatas();
    console.log('下拉');
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
