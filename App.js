import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import firebase from './firebase';

import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import NewLogScreen from './components/NewLogScreen';
import CompScreen from './components/CompScreen';
import NewComp from './components/NewComp';
import JoinComp from './components/JoinComp';
import WaterScreen from './components/WaterScreen';
import LeaderScreen from './components/LeaderScreen';



export default class App extends Component {

  
  constructor(props) {
    super(props);
    this.state = {
      didLogin: false,
      currentUser: null,
    }
    this.updateLogin = this.updateLogin.bind(this);
  }

  updateLogin = (userID) => {
    this.setState({ 
      didLogin: true,
      currentUser: userID 
    });
  }

  render() {

    if(!this.state.didLogin) {
      return (
        <LoginScreen update={() => this.updateLogin()}/>
      )
    }

    return (
      <RootStack />
    );
  }
}

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    NewLog: {
      screen: NewLogScreen,
    },
    Comp: {
      screen: CompScreen,
    },
    GoNewComp: {
      screen: NewComp,
    },
    GoJoinComp: {
      screen: JoinComp,
    },
    Water: {
      screen: WaterScreen,
    },
    Leader: {
      screen: LeaderScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
