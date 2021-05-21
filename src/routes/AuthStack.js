import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import SignIn from '../screens/Auth/signin';
import SignUp from '../screens/Auth/signup';
import Landing from '../screens/Landing';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator headerMode={false}>
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
};
export default AuthStack;
