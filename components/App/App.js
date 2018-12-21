import { createStackNavigator, createAppContainer } from 'react-navigation';
import CreateDeck from '../CreateDeck';
import DeckList from '../DeckList';
import AudiocardList from '../AudiocardList';
import Home from '../Home';
import Display from '../Display';
import PlayerOverlay from '../PlayerOverlay';

const MainStack = createStackNavigator({
  DeckList: { screen: DeckList },
  AudiocardList: { screen: AudiocardList },
  Home: { screen: Home },

  // CreateDeck: { screen: CreateDeck },
});

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    CreateDeckModal: {
      screen: CreateDeck,
    },
    DisplayModal: {
      screen: Display,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

const App = createAppContainer(RootStack);

export default App;
