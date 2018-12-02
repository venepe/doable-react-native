import { createStackNavigator, createAppContainer } from 'react-navigation';
import DeckList from '../DeckList';
import FlashcardList from '../FlashcardList';
import Home from '../Home';
import Recording from '../Recording';

const MainStack = createStackNavigator({
  DeckList: { screen: DeckList },
  FlashcardList: { screen: FlashcardList },
  Home: { screen: Home },
});

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    RecordingModal: {
      screen: Recording,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

const App = createAppContainer(RootStack);

export default App;
