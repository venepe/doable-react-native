import {
  Dimensions,
  StyleSheet,
} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
  },
  subContainer: {
    flex: 1,
  },
  backContainer: {
    flex: 1,
  },
  playerContainer: {
    flex: 1,
    marginBottom: 20,
  },
  backButtonContainer: {
    backgroundColor: 'transparent',
    padding: 10,
    marginTop: 15,
    width: 58,
  },
  boxContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    margin: 20,
  },
  title: {
    color: '#FFFF00',
    fontSize: 28,
    fontWeight: '400',
    // fontFamily: 'Roboto-Thin',
  },
  interactiveContainer: {
    flex: 1,
    justifyContent: 'center',
    margin: 20,
  },
});
