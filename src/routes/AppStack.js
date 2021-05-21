import React, {useState, useMemo, useEffect} from 'react';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import RootStack from './RootStack';
import AuthStack from './AuthStack';
import Camera from '../assets/icons/camera.svg';
import CameraStack from '../routes/CamStack';
import Logo from '../assets/images/logo.svg';

const Stack = createStackNavigator();

const AppStack = ({initialScreen}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RootStack"
        component={RootStack}
        options={({navigation, route}) => ({
          header: () => (
            <View
              style={{
                height: 69,
                shadowColor: '#34D1D1',
                shadowOffset: {
                  width: 10,
                  height: 10,
                },
                shadowOpacity: 1,
                shadowRadius: 10,
                elevation: 10,
                backgroundColor: '#FFFF',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 25,
                paddingTop: 20,
              }}>
              {/* <Text
                style={{
                  fontSize: 40,
                  color: '#34D1D1',
                  fontFamily: 'Romantic',
                }}>
                Foodie
              </Text> */}
              <View style={{paddingTop: 5}}>
                <Logo />
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('CameraStack');
                }}
                activeOpacity={0.5}
                style={{
                  backgroundColor: '#34D1D1',
                  width: 45,
                  height: 45,
                  borderRadius: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Camera width={30} height={30} />
              </TouchableOpacity>
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="CameraStack"
        component={CameraStack}
        options={({navigation, route}) => ({
          header: () => <View />,
        })}
      />
    </Stack.Navigator>
  );
};
export default AppStack;
