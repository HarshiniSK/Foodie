import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
// import {Arrow} from 'svg';
import Arrow from '../../assets/icons/arrow.svg';
// import {Photo} from 'svg';
// import {DnArrow} from 'svg';
import HomeFlatlist from '../Home/HomeFlatlist';
import axios from 'axios';
import {MyReviewsGet, options} from '../../components/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MyReviews({navigation, route}) {
  const [reviewData, setReviewData] = useState(null);
  useEffect(async () => {
    AsyncStorage.getItem('userToken')
      .then(async res => {
        var reviews = await axios.post(MyReviewsGet, {token: res}, options);
        reviews = await axios.post(MyReviewsGet, {token: res}, options);
        console.log(reviews.data.data);
        setReviewData(reviews.data.data);
      })
      .catch(e => console.log(JSON.stringify(e, null, 2)));
  }, []);
  if (reviewData == null) {
    return <View />;
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFF',
      }}>
      {reviewData.length != 0 ? (
        <HomeFlatlist
          navigation={navigation}
          route={route}
          reviewData={reviewData}
        />
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: '#FFF',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{color: '#000', fontFamily: 'Oxygen-Bold', fontSize: 20}}>
            No Reviews Posted Yet
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}
