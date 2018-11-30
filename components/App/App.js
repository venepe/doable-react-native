import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from '../Home';

const MainNavigator = createStackNavigator({
  Home: { screen: Home },
});

const App = createAppContainer(MainNavigator);

export default App;
