import { createStackNavigator, createAppContainer } from 'react-navigation';
import CreateDeck from '../CreateDeck';
import CreateCard from '../CreateCard';
import DeckList from '../DeckList';
import CardList from '../CardList';
import DocumentList from '../DocumentList';
import Home from '../Home';
import Display from '../Display';

const MainStack = createStackNavigator({
  DeckList: { screen: DeckList },
  CardList: { screen: CardList },
  DocumentList: { screen: DocumentList },
  Home: { screen: Home },
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
    CreateCardModal: {
      screen: CreateCard,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

const App = createAppContainer(RootStack);

export default App;
