import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    marginTop: 1,
    padding: 28,
    paddingLeft: 15,
  },
  card: {
    flexDirection: 'column',
    backgroundColor: '#000000',
    shadowColor: '#FAFAFA',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  title: {
    color: '#FFFF00',
    fontSize: 28,
    fontWeight: '400',
    // fontFamily: 'Roboto-Thin',
  },
});
