import React, {Component} from "react";
import {
    Dimensions,
    Text,
    View,
    Animated,
    PanResponder,
    LayoutAnimation,
    UIManager,
    Image,
    StyleSheet
} from "react-native";
import PhotoView from "react-native-photo-view";
import DraggableDisc from "../components/DraggableDisc";
import ImageZoom from 'react-native-image-pan-zoom';

import ButtonWithBackground from "../common/ButtonWithBackground";

let CIRCLE_RADIUS = 5;
let Window = Dimensions.get("window");
let ZOOM_AMOUNT = 1;
let MIN_ZOOM_AMOUNT = 1;
let MAX_ZOOM_AMOUNT = 10;
const DISC_START_POSITION_X = 250;
const DISC_START_POSITION_Y = 250;

class Board extends Component {
    constructor(props) {
        super(props);

        this.state = {
            discs: [
                {
                    key: "0",
                    position: new Animated.ValueXY({x: DISC_START_POSITION_X, y: DISC_START_POSITION_Y})
                },
                {
                    key: "1",
                    position: new Animated.ValueXY({x: DISC_START_POSITION_X + 50, y: DISC_START_POSITION_Y + 50})
                },
            ]
            ,
            board: {
                zoom: 5,
                x: 0,
                y: 0,
            }
        };

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            // onGrant we set the Animated.ValueXYs offset as the previous value
            onPanResponderGrant: (e, gesture) => {
                this.state.position.setOffset({
                    x: this.state.discs[0].position.x._value,
                    y: this.state.discs[0].position.y._value
                });
                // we also reset the current value to 0, so we can freshly start the new tracking
                this.state.discs[0].position.setValue({x: 0, y: 0});
            },

            // onMove, we move the Animated.ValueXY, so it follows the touch.
            onPanResponderMove: Animated.event([
                null,
                {
                    dx: this.state.discs[0].position.x,
                    dy: this.state.discs[0].position.y
                }
            ]),

            // onRelease
            onPanResponderRelease: (e, gesture) => {
                this.state.discs[0].position.flattenOffset();
            }
        });
    }

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
        let zoom = this.state.board.zoom + ZOOM_AMOUNT;
        zoom = this.calculateZoom(zoom);
        this.setState({zoom});
    };

    handleOnZoomOutClicked = () => {
        let zoom = this.state.board.zoom - ZOOM_AMOUNT;
        zoom = this.calculateZoom(zoom);
        this.setState({zoom});
    };

    handleOnBoardMove = (moveObject) => {
        console.log(moveObject);
    };

    renderDiscs = () => {
        return this.state.discs.map(singleDisc =>
            <Animated.View
                {...this.panResponder.panHandlers}
                style={[singleDisc.position.getLayout(), styles.circle, {
                    width: CIRCLE_RADIUS * 2 * (this.state.board.zoom),
                    height: CIRCLE_RADIUS * 2 * (this.state.board.zoom)
                }]}
            />
        )
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.buttonContainer}>
                        <ButtonWithBackground
                            color="#29aaf4"
                            onPress={() => this.handleOnZoomInClicked()}>
                            +
                        </ButtonWithBackground>
                    </View>

                    <View style={styles.buttonContainer}>
                        <ButtonWithBackground
                            color="#29aaf4"
                            onPress={() => this.handleOnZoomOutClicked()}
                        >
                            -
                        </ButtonWithBackground>
                    </View>

                    <View style={[styles.buttonContainer, {width: 100}]}>
                        <ButtonWithBackground
                            color="#29aaf4">
                            Add disc
                        </ButtonWithBackground>
                    </View>

                </View>

                <ImageZoom cropWidth={Window.width}
                           cropHeight={Window.height}
                           maxOverflow={300}
                           onMove={(moveObject) => this.handleOnBoardMove(moveObject)}
                           centerOn={{
                               x: this.state.board.x,
                               y: this.state.board.y,
                               scale: this.state.board.zoom,
                               duration: 0
                           }}>
                    <Image style={{flex: 1}}
                           source={{uri: "http://www.undercoveryeti.com/blog/wp-content/uploads/2014/05/Undeground-Fort-700x525.jpg"}}/>
                </ImageZoom>

                {this.renderDiscs()}
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
    buttonContainer: {
        width: 50,
        height: 50
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
