import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './Home';
import Total from './Total';

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const RootStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Total: {
    screen: Total,
  },
});

const AppContainer = createAppContainer(RootStack);