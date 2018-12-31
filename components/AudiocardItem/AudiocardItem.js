import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import gql from 'graphql-tag';
import { propType } from 'graphql-anywhere';
import { connect } from 'react-redux';
import styles from './styles';
import { getActiveAudiocard } from '../../reducers';

class AudiocardItem extends Component {
  static propTypes = {
    rowID: PropTypes.number,
    onPress: PropTypes.func,
    deleteAudiocard: PropTypes.func,
  }

  static defaultProps = {
    rowID: 0,
    onPress: () => {},
  }

  static getDerivedStateFromProps(nextProps, prevState) {
        return {
          activeAudiocard: nextProps.activeAudiocard,
        }
      }

  constructor(props) {
    super(props);

    this.state = {
      rowID: props.rowID,
      audiocardItem: props.audiocardItem,
      activeAudiocard: props.activeAudiocard,
    };
  }

  componentDidUpdate(prevProps) {
    const props = this.props;
    if (props.activeAudiocard !== prevProps.activeAudiocard) {
      this.setState({
        activeAudiocard: props.activeAudiocard,
      });
    }
  }

  render() {
    let color = '#FF8A80';

    const audiocardItem = this.state.audiocardItem || {};
    const activeAudiocard = this.state.activeAudiocard || {};
    const opacity = audiocardItem.questionText === activeAudiocard.questionText ? .5 : 1.0;

    return (
        <TouchableOpacity onPress={() => this.props.onPress({ id: audiocardItem.id })}>
          <View style={[styles.card, styles.container, { opacity }]}>
            <View style={styles.infoContainer}>
              <View style={styles.infoSubContainer}>
                <Text style={[styles.title, { color }]}>{audiocardItem.questionText}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
    );
  }
}

AudiocardItem.fragments = {
  audiocardItem: gql`
    fragment AudiocardItem on Audiocard {
      nodeId
      id
      questionText
      questionAudioUri
      answerText
      answerAudioUri
      createdAt
    }
  `,
};

AudiocardItem.propTypes = {
  audiocardItem: propType(AudiocardItem.fragments.audiocardItem).isRequired,
};

const mapStateToProps = state => ({
  activeAudiocard: getActiveAudiocard(state),
});

export default connect(
  mapStateToProps,
)(AudiocardItem);
