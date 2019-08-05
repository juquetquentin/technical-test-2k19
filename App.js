/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {createStackNavigator, createAppContainer} from 'react-navigation';
import HomePage from './src/components/HomePage';
import GamePage from './src/components/GamePage';
import ResultPage from './src/components/ResultPage';

const MainNavigator = createStackNavigator(
  {
    Home: {screen: HomePage},
    Game: {screen: GamePage},
    Result: {screen: ResultPage}
  },
  {
    initialRouteName: 'Home'
  }
);

const App = createAppContainer(MainNavigator);

export default App;
