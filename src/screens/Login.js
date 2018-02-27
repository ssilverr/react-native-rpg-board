import React, { Component } from 'react';
import { View, Text } from 'react-native';
import buttonWithBackground from '../common/ButtonWithBackground';

class Board extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
      };

    render() {
        const { navigate } = this.props.navigation;
        
        return (
            <View>
                <Text>Login</Text>
            </View>
        );
    }
}

export default Board;