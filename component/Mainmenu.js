import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import App from '../App';
import ListCon from './ListCon';
import { Icon } from 'native-base';


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
                <Stack.Screen name="List" component={ListCon} options={{
                    headerTitleAlign :'center',
                    headerRight: () => (
                        <Icon name="md-log-out" onPress={() => {this.setState({disconnect : true})}} />
                    ),
                    
                    headerStatusBarHeight: 5,
                    headerStyle: {
                        backgroundColor: '#041a48'
                    }
                }} />
                
                <Stack.Screen  name="Connexion" component={App}/>
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