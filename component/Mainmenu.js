import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import App from '../App';
import ListCon from './ListCon';
import { Icon } from 'native-base';
import HomeScreen from './HomeScreen';


import DailyCon from './DailyCon';
import MonthlyCon from './MonthlyCon';
import WeeklyCon from './WeeklyCon';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

class Mainmenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disconnect : false
        }
    }

    ListStackScreen() {
        return (
            <Stack.Navigator> 
                <Stack.Screen  name="Home Screen" component={HomeScreen}/>
                <Stack.Screen  name="Connexion" component={App}/>
                <Stack.Screen  name="Daily Con" component={DailyCon}/>
                <Stack.Screen  name="Weekly Con" component={WeeklyCon}/>
                <Stack.Screen  name="Monthly Con" component={MonthlyCon}/>
            </Stack.Navigator>
        )
    }
  render() {
    if(this.state.disconnect){
        return(<App/>)
  }else
  {
  return (
      <NavigationContainer >
          <Tab.Navigator>
              <Tab.Screen
                  name={"List"}
                  options={{
                      headerTransparent : true,
                      tabBarLabel: 'List',
                      tabBarIcon: ({ color, size }) => (
                          <MaterialCommunityIcons name="view-list" color={color} size={size} />
                      )
                  }} component={this.ListStackScreen.bind(this)}
              />
              </Tab.Navigator>
            </NavigationContainer>
  );
  }
}
}

export default Mainmenu;