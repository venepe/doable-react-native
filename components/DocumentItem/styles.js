import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    marginTop: 5,
    flexDirection: 'row',
    height: 120,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
    flexWrap: 'wrap',
    marginTop: 5,
    // fontFamily: 'Roboto-Thin',
  },
  image: {
    margin: 10,
    height: 80,
    width: 80,
  },
  infoContainer: {
    flex: 1,
    flexWrap: 'wrap',
  }
});
