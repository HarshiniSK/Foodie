import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Arrow from '../../assets/icons/arrow.svg';
import DnArrow from '../../assets/icons/dwnarrw.svg';
import {ChangePassword, options} from '../../components/api';
import {AuthContext} from '../../components/context';

export default function EditProfile({navigation, route}) {
  const {signOut} = useContext(AuthContext);
  const [password, setPassword] = useState('');
  const changePassword = () => {
    AsyncStorage.getItem('userToken')
      .then(async res => {
        var response = await axios.post(
          ChangePassword,
          {token: res, newpassword: password},
          options,
        );
        if (response.status == 200 && response.data.status == 'ok') {
          signOut();
        }
      })
      .catch(e => console.log(JSON.stringify(e, null, 2)));
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFF',
        paddingHorizontal: 30,
        paddingTop: 30,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          style={styles.arrow}
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}>
          <Arrow style={styles.arr} />
        </TouchableOpacity>
        <Text style={styles.heading}>Change Password</Text>
      </View>
      <View
        style={{
          width: 146,
          height: 146,
          marginVertical: 20,
          backgroundColor: '#34D1D1',
          borderRadius: 100,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <Text style={{fontFamily: 'Oxygen-Bold', fontSize: 100, color: '#FFF'}}>
          {route.params.initial}
        </Text>
      </View>

      <View style={styles.Boxcontainer}>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Change Password"
          placeholderTextColor="#717171"
          underlineColorAndroid="transparent"
          onChangeText={text => setPassword(text)}
        />

        <TouchableOpacity
          style={styles.btn2}
          activeOpacity={0.5}
          onPress={() => {
            changePassword();
          }}>
          <DnArrow style={styles.arrw} />
          <Text style={styles.txt3}>Change</Text>
        </TouchableOpacity>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
            borderRadius: 7,
          }}>
          <Text
            style={{color: '#000', fontFamily: 'Oxygen-Bold', fontSize: 15}}>
            After changing password, you will be directed to the Sign In page
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  Boxcontainer: {},
  arrow: {
    marginRight: 30,
  },
  heading: {
    alignItems: 'flex-start',
    fontSize: 25,

    fontFamily: 'Oxygen-Bold',
  },
  photo: {
    marginTop: '10%',
  },
  input: {
    height: 42,
    width: 324,
    borderRadius: 7,
    padding: '1%',
    paddingLeft: 20,
    fontFamily: 'Oxygen-Bold',
    marginTop: 20,
    backgroundColor: '#DAF0F0',
  },
  btn2: {
    backgroundColor: '#34D1D1',
    alignItems: 'center',
    width: 120,
    height: 36,
    borderRadius: 7,
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 20,
  },
  arrw: {},
  txt3: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'Oxygen-Bold',
  },
  arr: {},
});
