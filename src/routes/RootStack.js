import React, {useState, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import axios from 'axios';
import Search from '../routes/SearchStack';

import Home from '../routes/HomeStack';
import Profile from '../routes/ProfileStack';

import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import HomeActive from '../assets/icons/home_active.svg';
import UserActive from '../assets/icons/user_active.svg';
import SearchActive from '../assets/icons/search_active.svg';
import HomeInactive from '../assets/icons/home_inactive.svg';
import UserInactive from '../assets/icons/user_inactive.svg';
import SearchInactive from '../assets/icons/search_inactive.svg';
import {AuthContext, ProfileContext} from '../components/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {options, ProfileGet} from '../components/api';

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  icons: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    width: 60,
  },
});

const MyTabBar = ({state, descriptors, navigation}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        height: 58,
        backgroundColor: '#FFFF',
        alignItems: 'center',
        paddingLeft: '12%',
        shadowColor: '#34D1D1',
        shadowOffset: {
          width: 10,
          height: 10,
        },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 10,
        description: '',
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            activeOpacity={0.5}
            key={label}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1}}>
            {/* <Text style={{color: isFocused ? '#34D1D1' : '#818181'}}>
              {label}
            </Text> */}
            {label === 'Home' ? (
              <View style={styles.icons}>
                {isFocused ? (
                  <HomeActive height={24} width={24} />
                ) : (
                  <HomeInactive height={24} width={24} />
                )}
              </View>
            ) : label === 'Search' ? (
              <View style={styles.icons}>
                {isFocused ? (
                  <SearchActive height={24} width={24} />
                ) : (
                  <SearchInactive height={24} width={24} />
                )}
              </View>
            ) : label === 'Profile' ? (
              <View style={styles.icons}>
                {isFocused ? (
                  <UserActive height={24} width={24} />
                ) : (
                  <UserInactive height={24} width={24} />
                )}
              </View>
            ) : null}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const MyTabs = () => {
  const [profileData, setProfileData] = useState(null);
  useEffect(async () => {
    AsyncStorage.getItem('userToken')
      .then(async res => {
        var response = await axios.post(ProfileGet, {token: res}, options);
        setProfileData({profile: response.data});
      })
      .catch(e => console.log('Profile Error', JSON.stringify(e, null, 2)));
  }, []);

  return (
    <ProfileContext.Provider value={profileData}>
      <Tab.Navigator
        tabBar={props => <MyTabBar {...props} />}
        initialRouteName="Home"
        backBehavior="firstRoute"
        tabBarOptions={{
          activeTintColor: '#34D1D1',
          inactiveTintColor: '#818181',
          keyboardHidesTabBar: true,
          style: {
            backgroundColor: '#FFFF',
            height: 68,
            paddingBottom: 20,
          },
        }}>
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </ProfileContext.Provider>
  );
};

export default MyTabs;
