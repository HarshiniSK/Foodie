import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from '../screens/Profile/';
import EditProfile from '../screens/Profile/EditProfile';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import MyReviews from '../screens/Profile/MyReviews';
import SinglePost from '../screens/SinglePost/SinglePost';

const Stack = createStackNavigator();

const AppStack = ({navigation, route}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={({navigation, route}) => ({
          header: () => <View />,
        })}
      />
      <Stack.Screen
        name="MyReviews"
        component={MyReviews}
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
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={({navigation, route}) => ({
          header: () => <View />,
        })}
      />
    </Stack.Navigator>
  );
};
export default AppStack;
