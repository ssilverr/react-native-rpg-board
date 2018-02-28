import React, {Component} from "react";
import {
    View,
    StyleSheet,
    Animated,
    Dimensions,
    PanResponder,
    LayoutAnimation,
    UIManager
} from "react-native";
import {connect} from "react-redux";
import {discMoved} from "../redux/actions";
import {DISC_RADIUS, DISC_START_POSITION_X, DISC_START_POSITION_Y} from "../Defines";

let Window = Dimensions.get("window");


class DraggableDisc extends Component {

    // constructor
    constructor(props) {
        super(props);

        console.log("disc constructor", props);
        this.position = this.props.position;

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: (e, gesture) => {
                this.props.onTouched(this.props.discIndex, gesture)
            },
            onPanResponderMove: (e, gesture) => {
                this.props.onPositionChanged(this.props.discIndex, gesture);
            },
            onPanResponderRelease: (e, gesture) => {
                this.props.onReleased(this.props.discIndex, gesture)
            }
        });
    }

    render() {
        console.log("disc", this.props);
        return (
            <Animated.View
                {...this.panResponder.panHandlers}
                style={[this.props.position.getLayout(), styles.disc]}
            />
        );
    }
}

const styles = StyleSheet.create({
    disc: {
        position: "absolute",
        backgroundColor: "#1abc9c",
        width: DISC_RADIUS,
        height: DISC_RADIUS,
        borderRadius: DISC_RADIUS
    },
    draggableContainer: {
        position: "absolute",
        top: Window.height / 2 - DISC_RADIUS,
        left: Window.width / 2 - DISC_RADIUS,
        borderWidth: 3,
        borderColor: 'red'
    },
});

export default DraggableDisc;
