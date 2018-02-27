import React, { Component } from "react";
import { View, Text } from "react-native";
import ButtonWithBackground from "../common/ButtonWithBackground";

class Board extends React.Component {
  static navigationOptions = {
    title: "Welcome"
  };

  handleLoginPress() {
    this.props.navigation.navigate("Board");
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View>
        <ButtonWithBackground
          color="#29aaf4"
          onPress={() => this.handleLoginPress()}>
          Login
        </ButtonWithBackground>
      </View>
    );
  }
}

export default Board;
