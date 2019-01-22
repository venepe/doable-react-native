import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  PanResponder,
  Animated
} from 'react-native';
import { connect } from 'react-redux';
import { addBackTextWord, addFrontTextWord } from '../../actions';
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const SCREEN_WIDTH = Dimensions.get('screen').width;

class Draggable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDraggable: true,
      dropAreaValues: null,
      pan: new Animated.ValueXY(),
      opacity: new Animated.Value(1),
      word: props.word,
    };
  }

  componentWillMount() {
    this._val = { x:0, y:0 }
    this.state.pan.addListener((value) => this._val = value);

    this.panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gesture) => true,
        onPanResponderGrant: (e, gesture) => {
          this.state.pan.setOffset({
            x: this._val.x,
            y:this._val.y
          })
          this.state.pan.setValue({ x:0, y:0})
        },
        onPanResponderMove: Animated.event([
          null, { dx: this.state.pan.x, dy: this.state.pan.y }
        ]),
        onPanResponderRelease: (e, gesture) => {
          if (this.isDropArea(gesture)) {
            Animated.timing(this.state.opacity, {
              toValue: 0,
              duration: 1000
            }).start(() =>
              this.setState({
                showDraggable: false
              })
            );
          }
        }
      });
  }

  isDropArea(gesture) {
    const { word } = this.state;
    if (gesture.moveX < 50) {
      console.log('Front!');
      this.props.addFrontTextWord( { payload: { frontTextWord: word} });
      return true;
    } else if (gesture.moveX > SCREEN_WIDTH - 50) {
      console.log('Back!');
      this.props.addBackTextWord( { payload: { backTextWord: word }});
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <View style={styles.root}>
        {this.renderDraggable()}
      </View>
    );
  }

  renderDraggable() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    }
    if (this.state.showDraggable) {
      return (
          <Animated.View
            {...this.panResponder.panHandlers}
            style={[panStyle, styles.animatedContainer, {opacity:this.state.opacity}]}
            >
            <Text style={styles.text}>{this.state.word}</Text>
          </Animated.View>
      );
    }
  }
}

const styles = StyleSheet.create({
  root: {
    margin: 5,
  },
  animatedContainer: {
    backgroundColor: '#FFFF00',
  },
  text: {
    color: '#212121',
    fontSize: 18,
    fontWeight: '400',
    padding: 5,
    // fontFamily: 'Roboto-Thin',
  },
});

export default connect(
  null,
  { addBackTextWord, addFrontTextWord },
)(Draggable);
