import React, { Component } from "react";
import {
  Dimensions,
  Text,
  View,
  Animated,
  PanResponder,
  LayoutAnimation,
  UIManager,
  StyleSheet
} from "react-native";
import PhotoView from "react-native-photo-view";
import DraggableDisc from "../components/DraggableDisc";
import ButtonWithBackground from "../common/ButtonWithBackground";

let CIRCLE_RADIUS = 5;
let Window = Dimensions.get("window");
let ZOOM_AMOUNT = 0.5;
let MIN_ZOOM_AMOUNT = 1;
let MAX_ZOOM_AMOUNT = 7;

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      zoom: 1,
      min_zoom: MIN_ZOOM_AMOUNT,
      max_zoom: MAX_ZOOM_AMOUNT
    };

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      // onGrant we set the Animated.ValueXYs offset as the previous value
      onPanResponderGrant: (e, gesture) => {
        this.state.pan.setOffset({
          x: this.state.pan.x._value,
          y: this.state.pan.y._value
        });
        // we also reset the current value to 0, so we can freshly start the new tracking
        this.state.pan.setValue({ x: 0, y: 0 });
      },

      // onMove, we move the Animated.ValueXY, so it follows the touch.
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.pan.x,
          dy: this.state.pan.y
        }
      ]),

      // onRelease
      onPanResponderRelease: (e, gesture) => {
        this.state.pan.flattenOffset();
      }
    });
  }

  handleOnScale() {}

  calculateZoom = modifiedZoom => {
    console.log(modifiedZoom);
    if (modifiedZoom < MIN_ZOOM_AMOUNT) {
      console.log("returned MIN AMOUNT");
      return MIN_ZOOM_AMOUNT;
    } else if (modifiedZoom > MAX_ZOOM_AMOUNT) {
      console.log("returned MAX");
      return MAX_ZOOM_AMOUNT;
    } else {
      console.log("returned: ", modifiedZoom);
      return modifiedZoom;
    }
  };

  handleOnZoomInClicked = () => {
    let zoom = this.state.zoom + ZOOM_AMOUNT;
    zoom = this.calculateZoom(zoom);
    this.setState({ zoom });
  };

  handleOnZoomOutClicked = () => {
    let zoom = this.state.zoom - ZOOM_AMOUNT;
    zoom = this.calculateZoom(zoom);
    this.setState({ zoom });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ width: 50, height: 50 }}>
          <ButtonWithBackground
            color="#29aaf4"
            onPress={() => this.handleOnZoomInClicked()}
          >
            +
          </ButtonWithBackground>
        </View>

        <View style={{ width: 50, height: 50 }}>
          <ButtonWithBackground
            color="#29aaf4"
            onPress={() => this.handleOnZoomOutClicked()}
          >
            -
          </ButtonWithBackground>
        </View>

        <PhotoView
          source={{
            uri: "http://www.undercoveryeti.com/blog/wp-content/uploads/2014/05/Undeground-Fort-700x525.jpg"
          }}
          minimumZoomScale={MIN_ZOOM_AMOUNT}
          maximumZoomScale={MAX_ZOOM_AMOUNT}
          androidScaleType="center"
          onLoad={() => console.log("Image loaded!")}
          scale={this.state.zoom}
          style={styles.mainContainer}
          onScale={() => {
            this.handleOnScale();
          }}
        />

        <Animated.View
          {...this.panResponder.panHandlers}
          style={[this.state.pan.getLayout(), styles.circle, {width: CIRCLE_RADIUS * 2 * (this.state.zoom), height: CIRCLE_RADIUS * 2 * (this.state.zoom)}]}
        />
      </View>
    );
  }
}

let styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    borderColor: "red",
    borderWidth: 3
  },
  draggableContainer: {
    position: "absolute",
    top: Window.height / 2 - CIRCLE_RADIUS,
    left: Window.width / 2 - CIRCLE_RADIUS
  },
  circle: {
    position: "absolute",
    backgroundColor: "#1abc9c",
    width: CIRCLE_RADIUS,
    height: CIRCLE_RADIUS,
    borderRadius: CIRCLE_RADIUS
  }
});

export default Board;
