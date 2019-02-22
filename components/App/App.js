import { createStackNavigator, createAppContainer } from 'react-navigation';
import UpdateDeck from '../UpdateDeck';
import CreateCard from '../CreateCard';
import DeckList from '../DeckList';
import CardList from '../CardList';
import DocumentList from '../DocumentList';
import Welcome from '../Welcome';
import Display from '../Display';
import Memory from '../Memory';

const MainStack = createStackNavigator({
  DeckList: { screen: DeckList },
  CardList: { screen: CardList },
  DocumentList: { screen: DocumentList },
  Welcome: { screen: Welcome },
});

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    UpdateDeckModal: {
      screen: UpdateDeck,
    },
    DisplayModal: {
      screen: Display,
    },
    MemoryModal: {
      screen: Memory,
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
