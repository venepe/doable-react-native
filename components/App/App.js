import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import CreateDeck from '../CreateDeck';
import CreateCard from '../CreateCard';
import DeckList from '../DeckList';
import CardList from '../CardList';
import DocumentList from '../DocumentList';
import Welcome from '../Welcome';
import Display from '../Display';
import SideMenu from '../SideMenu';

const MainStack = createStackNavigator({
  DeckList: { screen: DeckList },
  CardList: { screen: CardList },
  DocumentList: { screen: DocumentList },
  Welcome: { screen: Welcome },
});

const MainStackNav = createDrawerNavigator({
  MainStack: MainStack,
  },
{
  contentComponent: SideMenu,
  drawerPosition: 'left'
});

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStackNav,
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
