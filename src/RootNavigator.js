import React from 'react';
import { StackNavigator } from 'react-navigation';
import Login from './screens/Login';
import Board from './screens/Board';

const RootNavigator = StackNavigator({
  Login: {
      screen: Login,
      navigationOptions: {
          header: null
      }
  },
  Board: {
    screen: Board,
    navigationOptions: {
      header: null
    }
  }
});

export default RootNavigator;