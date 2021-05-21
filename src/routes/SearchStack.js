import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import Search from '../screens/Search';
import SinglePost from '../screens/SinglePost/SinglePost'

const Stack = createStackNavigator();

const SearchStack = ({navigation, route}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={Search}
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
export default SearchStack;
