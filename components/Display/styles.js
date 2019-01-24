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
  title: {
    flexWrap: 'wrap',
    padding: 20,
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
  controlGroup: {
    alignItems: 'center',
  },
  controlTopGroup: {
    flexDirection: 'row',
  },
  controlBottomGroup: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topButton: {
    backgroundColor: 'transparent',
  },
  bottomButton: {
    backgroundColor: 'transparent',
  },
});
