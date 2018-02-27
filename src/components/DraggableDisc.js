import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Animated,
  PanResponder,
  LayoutAnimation,
  UIManager
} from "react-native";

class DraggableDisc extends Component {
  // constructor
  constructor(props) {
    super(props);

    console.log("constructor");
    this.position = new Animated.ValueXY();

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (event, gesture) => {
        console.log("granted", gesture);
        this.position.setValue({ x0: gesture.moveX, y0: gesture.moveY });
      },
      onPanResponderMove: (event, gesture) => {
        this.position.setValue({ x: gesture.moveX, y: gesture.moveY });
        // console.log('move: ',position)
        // bal felső sarok (0,0), jobb alsó (X: 400,Y: 700)
      },
      onPanResponderRelease: (event, gesture) => {
      }
    });

    this.state = { panResponder };
    console.log(this.state);
  }

  getDiscStyle() {
    console.log("disc style position:", this.position);

    return {
      ...this.position.getLayout()
    };
  }

  render() {
    console.log("disc", this.position);
    return (
      <Animated.View
        style={[styles.disc, this.position.getLayout()]}
        {...this.state.panResponder.panHandlers}
      />
    );
  }
}

const styles = StyleSheet.create({
  disc: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 30,
    borderColor: "black"
  }
});

export default DraggableDisc;
