import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import Camera from '../screens/Camera';
import AddPost from '../screens/Camera/AddPost';

const Stack = createStackNavigator();

const CamStack = ({navigation, route}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Camera"
        component={Camera}
        options={({navigation, route}) => ({
          header: () => <View />,
        })}
      />
      <Stack.Screen
        name="AddPost"
        component={AddPost}
        options={({navigation, route}) => ({
          header: () => <View />,
        })}
      />
    </Stack.Navigator>
  );
};
export default CamStack;
