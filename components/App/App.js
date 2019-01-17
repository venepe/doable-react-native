import { createStackNavigator, createAppContainer } from 'react-navigation';
import CreateDeck from '../CreateDeck';
import DeckList from '../DeckList';
import CardList from '../CardList';
import DocumentList from '../DocumentList';
import Home from '../Home';
import Display from '../Display';
import SearchDeckList from '../SearchDeckList';

const MainStack = createStackNavigator({
  DeckList: { screen: DeckList },
  SearchDeckList: { screen: SearchDeckList },
  CardList: { screen: CardList },
  DocumentList: { screen: DocumentList },
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
