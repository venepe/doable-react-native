import {
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
  topButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    padding: 10,
    marginTop: 20,
  },
  title: {
    flexWrap: 'wrap',
    padding: 20,
    color: '#FFFF00',
    fontSize: 28,
    fontWeight: '400',
    // fontFamily: 'Roboto-Thin',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  columnContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  topButton: {
    margin: 4,
    padding: 20,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FAFAFA',
    fontSize: 20,
    fontWeight: '400',
    // fontFamily: 'Roboto-Thin',
    textAlign: 'center',
    alignSelf: 'stretch',
  },
});
