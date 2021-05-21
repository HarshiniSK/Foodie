/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {NavigationContainer} from '@react-navigation/native';
import React, {
  useState,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  Text,
  useColorScheme,
  View,
  LogBox,
} from 'react-native';
import Loading from './src/screens/Landing/Loading';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AppStack from './src/routes/AppStack';
import AuthStack from './src/routes/AuthStack';
import {AuthContext, ProfileContext} from './src/components/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {signUpMeth, signInMeth} from './src/components/apiCalls';
import axios from 'axios';
import {SignUp, SignIn, Profile, options} from './src/components/api';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreAllLogs();

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
          initialScreen: 'Home',
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
          initialScreen: 'Profile',
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(() => ({
    signIn: async (username, password) => {
      console.log('In sign in func');
      let userToken = null;
      // if (userName == 'abc' && password == 'pass') {
      try {
        // userToken = 'abcd';
        var res = await axios.post(SignIn, {username, password}, options);
        if (res.status == 200) {
          console.log('status 200');
          if (res.data.status == 'ok') {
            console.log('status ok');
            userToken = res.data.data;
            await AsyncStorage.setItem('userToken', userToken);
            dispatch({type: 'LOGIN', id: username, token: userToken});
          } else {
            console.log('Else', res.data);
          }
        }
      } catch (e) {
        console.log(JSON.stringify(e, null, 2));
      }
      // }
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem('userToken');
      } catch (e) {
        console.error(e);
      }
      dispatch({type: 'LOGOUT'});
    },
    signUp: async (username, password) => {
      let userToken = null;
      // if (userName == 'abc' && password == 'pass') {
      try {
        var response = await axios.post(
          SignUp,
          {username: username, password: password},
          options,
        );
        // console.log(response);
        if (response.status == 200) {
          if (response.data.status == 'ok') {
            var res = await axios.post(SignIn, {username, password}, options);
            if (res.status == 200) {
              if (res.data.status == 'ok') {
                userToken = res.data.data;
                await AsyncStorage.setItem('userToken', userToken);
                var profile = await axios.post(
                  Profile,
                  {
                    token: userToken,
                    public_name: username,
                    cusins: [
                      'Continental',
                      'Italian',
                      'North Indian',
                      'South Indian',
                    ],
                    age: 0,
                  },
                  options,
                );
                // console.log('Profile Creation:', profile);
                dispatch({type: 'REGISTER', id: username, token: userToken});
              }
            }
          }
        }
        //   await AsyncStorage.setItem('userToken', token);
        //   dispatch({type: 'REGISTER', id: username, token: token});
        // userToken = 'abcd';
        // await AsyncStorage.setItem('userToken', userToken);
      } catch (e) {
        console.error('Err', JSON.stringify(e, null, 2));
      }
      // }
      // dispatch({type: 'REGISTER', id: username, token: userToken});
    },
  }));

  useEffect(() => {
    setTimeout(async () => {
      let userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
        // console.log('User Token:', userToken);
      } catch (e) {
        console.error(e);
      }
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
    }, 2000);
  }, []);
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFFF',
      flex: 1,
    },
  });

  if (loginState.isLoading) {
    return (
      <View>
        <Loading />
        {/* <Text>True</Text> */}
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      {/* <ProfileContext.Provider value={profileContext}> */}
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={isDarkMode ? '#011122' : '#FFFF'}
        />
        <NavigationContainer>
          {loginState.userToken != null ? (
            <AppStack initialRoute={loginState.initialScreen} />
          ) : (
            <AuthStack />
          )}
          {/* <AppStack /> */}
        </NavigationContainer>
      </SafeAreaView>
      {/* </ProfileContext.Provider> */}
    </AuthContext.Provider>
  );
};

export default App;
