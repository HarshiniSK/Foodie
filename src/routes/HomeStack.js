import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home/';
import SinglePost from '../screens/SinglePost/SinglePost';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';


const Stack = createStackNavigator();

const AppStack = ({navigation, route}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={({navigation, route}) => ({
          header: () => <View />,
        })}
      />
      <Stack.Screen
        name="SinglePost"
        component={SinglePost}
        options={({navigation, route}) => ({
          header: () => <View />,
        })}
      />
    </Stack.Navigator>
  );
};
export default AppStack;
