import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    marginTop: 5,
    flexDirection: 'row',
    height: 80,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
    flexWrap: 'wrap',
    // fontFamily: 'Roboto-Thin',
  },
  image: {
    margin: 10,
    height: 50,
    width: 50,
  },
  infoContainer: {
    flex: 1,
    flexWrap: 'wrap',
  }
});
