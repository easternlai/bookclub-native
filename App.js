import React from 'react';
import {createAppContainer, createSwitchNavigator } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import BooksScreen from './src/screens/BooksScreen';
import BookScreen from './src/screens/BookScreen';
import SuggestBookScreen from './src/screens/SuggestBookScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { setNavigator } from './src/navigationRef';
import {Provider as AuthProvider} from './src/context/authContext';
import {Provider as BookProvider} from './src/context/BookContext';
import {Provider as SearchProvier} from './src/context/SearchContext';

const switchNavigator = createSwitchNavigator({
  // ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen
  }),
  mainFlow: createBottomTabNavigator({
    booksFlow: createStackNavigator({
      Books: BooksScreen,
      Book: BookScreen
    }),
    SuggestBook: SuggestBookScreen,
    Dashboard: DashboardScreen
  })
});

const App = createAppContainer(switchNavigator);

export default () => {
return (
<SearchProvier>
<BookProvider>
  <AuthProvider>
    <App ref={(navigator) => {setNavigator(navigator)}}/> 
  </AuthProvider>
</BookProvider>
</SearchProvier>
)
}