'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';

export default class AwesomeProject extends Component {
    // 构造
    constructor(props) {
      super(props);
      // 初始状态
      this.state = {
        textInputValue: ''
      };
      this.buttonPressed = this.buttonPressed.bind(this);
      this.editable=true;
    }

    buttonPressed() { //当按钮按下的时候执行此函数
      let textInputValue = 'new value';

      //this.setState({textInputValue});

      //修改文本输入框的属性值
      this.editable=!this.editable;
      let able=this.editable;
      console.log(able);
      this.refs.textInputRefer.setNativeProps({
        editable:this.editable
      });

      this.refs.text2.setNativeProps({
        style:{
          color:'blue',
          fontSize:30
        }
      });
        //使文本输入框变为不可编辑
    }

    render() {
      console.log('render');
      return (
          //ref={'text2'}>   //指定本组件的引用名
          <View style={styles.container}>
              <Text style={styles.buttonStyle} onPress={this.buttonPressed}>
                  按我
              </Text>
              <Text style={styles.textPromptStyle} ref="text2">
                  文字提示
              </Text>
            <View>
              <TextInput style={styles.textInputStyle}
                ref="textInputRefer"
                value={this.state.textInputValue}
                onChangeText={(textInputValue)=>this.setState({textInputValue})}
              />
            </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonStyle: { //文本组件样式,定义简单的按钮
        fontSize: 20,
        backgroundColor: 'grey'
    },
    textPromptStyle: { //文本组件样式
        fontSize: 20
    },
    textInputStyle: { //文本输入组件样式
        width: 150,
        height: 50,
        fontSize: 20,
        backgroundColor: 'grey'
    }
});


