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
import {
    DISC_RADIUS, DISC_START_POSITION_X, DISC_START_POSITION_Y, MAX_ZOOM_AMOUNT, MIN_ZOOM_AMOUNT,
    ZOOM_AMOUNT
} from "../Defines";

let Window = Dimensions.get("window");

class Board extends Component {

    // constructor

    constructor(props) {
        super(props);

        // init state

        this.state = {
            discs: [
                {
                    position: new Animated.ValueXY({x: DISC_START_POSITION_X + 20, y: DISC_START_POSITION_Y}),
                },
                {
                    position: new Animated.ValueXY({x: DISC_START_POSITION_X + 50, y: DISC_START_POSITION_Y}),
                },
            ]
            ,
            board: {
                scale: 9,
                offsetX: 0,
                offsetY: 0,
            }
        };
    }

    // handle interactions
    // button clicks
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

    handleOnAddDiscClicked = () => {
        let newDiscs = this.state.discs;
        newDiscs.push({position: new Animated.ValueXY({x:DISC_START_POSITION_X,y:DISC_START_POSITION_Y})});
        this.setState({ discs: newDiscs });
    };

    // disc interactions
    handleDiscTouched = (key) => {
        // TODO is this needed?
        // console.log('touched',key);
        // this.state.discs[key].position.setOffset({
        //     x: this.state.discs[key].position.x._value,
        //     y: this.state.discs[key].position.y._value
        // });
        // // we also reset the current value to 0, so we can freshly start the new tracking
        // this.state.discs[key].position.setValue({x: 0, y: 0});
    };

    handleDiscMoved = (key, gesture) => {
        console.log('animating', this.state.discs[key].position);
        console.log('gesture', gesture);
        let newDiscs = this.state.discs;

        newDiscs[key].position = new Animated.ValueXY({x: gesture.moveX, y: gesture.moveY});
        newDiscs[key].position.setOffset({
            x: this.state.board.offsetX * this.state.board.scale,
            y: this.state.board.offsetY * this.state.board.scale
        });

        this.setState({ discs: newDiscs });
    };

    handleDiscReleased = (key) => {
        console.log('released',key);
        console.log('boardState',this.state.board);
    };

    // board interactions
    handleOnBoardMove = (moveObject) => {
        // iterating through all the discs
        let newDiscs = this.state.discs;
        this.state.discs.map((singleDisc) => {
            singleDisc.position.setOffset({
                x: moveObject.positionX * moveObject.scale,
                y: moveObject.positionY * moveObject.scale
            });
        });

        console.log('moveObject', moveObject);
        let newBoard = this.state.board;
        newBoard.scale = moveObject.scale;
        newBoard.offsetX = moveObject.positionX;
        newBoard.offsetY = moveObject.positionY;

        this.setState({ discs: newDiscs, board: newBoard });
    };

    // simple render functions

    renderDiscs = () => {

        // Objectkénet tárolom az adatot, de így végig lehet rajta menni Arrayként
        // Object.values(this.state.discs).map()

        return this.state.discs.map((singleDisc, index ) =>
            <DraggableDisc
                discIndex={index}
                position={singleDisc.position}
                onTouched={(key) => {
                    this.handleDiscTouched(key);
                    console.log('singledisc',singleDisc);
                }}
                onPositionChanged={ (key, gesture) => this.handleDiscMoved(key, gesture)}
                onReleased={(key) => this.handleDiscReleased(key)}/>
        )
    };

    // main render

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
                            color="#29aaf4"
                            onPress={() => this.handleOnAddDiscClicked()}>
                            Add disc
                        </ButtonWithBackground>
                    </View>

                </View>

                <ImageZoom cropWidth={Window.width}
                           cropHeight={Window.height}
                           maxOverflow={300}
                           onMove={(moveObject) => this.handleOnBoardMove(moveObject)}
                           centerOn={{
                               x: this.state.board.offsetX,
                               y: this.state.board.offsetY,
                               scale: this.state.board.scale,
                               duration: 0
                           }}>
                    <Image style={{flex: 1}}
                           source={{uri: "http://www.undercoveryeti.com/blog/wp-content/uploads/2014/05/Undeground-Fort-700x525.jpg"}}/>
                </ImageZoom>

                {this.renderDiscs()}
            </View>
        );
    }

    // local functions

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
}

// styling

let styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        borderColor: "red",
        borderWidth: 3
    },
    buttonContainer: {
        width: 50,
        height: 50
    }
});

export default Board;
