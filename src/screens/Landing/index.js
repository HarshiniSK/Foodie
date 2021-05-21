import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import ImageSlider from './ImageSlider';
import Logo from '../../assets/images/logo.svg';

const LandingPage = ({navigation, route}) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFF',
      paddingHorizontal: 20,
      height: windowHeight,
    },
    btn: {
      width: 169,
      height: 42,
      borderRadius: 7,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: 20,
      // fontWeight: '700',
      fontFamily: 'Oxygen-Bold',
    },
  });

  return (
    <View style={styles.container}>
      <View>
        {/* <Text
          style={{
            color: '#34D1D1',
            fontSize: 40,
            marginTop: 25,
            fontFamily: 'Oxygen-Bold',
          }}>
          FOODIE
        </Text> */}
        <View style={{paddingTop: 33}}>
          <Logo />
        </View>
        <Text
          style={{
            color: '#000000',
            fontSize: 20,
            marginTop: 10,
            fontFamily: 'Oxygen-Bold',
          }}>
          The journal for everyone
        </Text>
      </View>
      <View style={{marginVertical: 20}}>
        <ImageSlider />
      </View>
      <View style={{width: windowWidth, left: windowWidth * 0.25}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignIn')}
          activeOpacity={0.7}
          style={[styles.btn, {backgroundColor: '#34D1D1', marginTop: 30}]}>
          <Text style={[styles.text, {color: '#FFFF'}]}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignUp')}
          activeOpacity={0.7}
          style={[styles.btn, {backgroundColor: '#DAF0F0', marginTop: 15}]}>
          <Text style={[styles.text, {color: '#000000'}]}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LandingPage;
