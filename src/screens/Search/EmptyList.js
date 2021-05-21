import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SearchEmpty from '../../assets/images/search_empty.svg';

const EmptyList = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFF',
      paddingTop: 20,
    },
  });
  const Dummy = () => {
    return (
      <View
        style={{
          width: 324,
          height: 67,
          backgroundColor: '#DAF0F0',
          borderRadius: 7,
          marginBottom: 20,
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: 67,
            height: 67,
            backgroundColor: 'rgba(52, 209, 209, 0.21)',
            borderRadius: 7,
            marginBottom: 20,
            borderTopEndRadius: 0,
            borderBottomRightRadius: 0,
          }}
        />
        <View>
          <View
            style={{
              width: 150,
              height: 3,
              marginTop: 20,
              marginLeft: 30,
              backgroundColor: 'rgba(52, 209, 209, 0.21)',
            }}
          />
          <View
            style={{
              width: 150,
              height: 3,
              marginTop: 25,
              marginLeft: 30,
              backgroundColor: 'rgba(52, 209, 209, 0.21)',
            }}
          />
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Dummy />
      <Dummy />
      <View style={{paddingLeft: '10%'}}>
        <SearchEmpty />
      </View>
    </View>
  );
};

export default EmptyList;
