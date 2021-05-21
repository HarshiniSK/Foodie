import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import SignInImage from '../../assets/images/signin.svg';
import Arrow from '../../assets/icons/arrow.svg';
import {AuthContext} from '../../components/context';

export default function SignIn({navigation, route}) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const {signIn} = useContext(AuthContext);

  const loginHandler = (userName, password) => {
    signIn(userName, password);
  };

  return (
    <SafeAreaView style={{backgroundColor: '#FFF', flex: 1}}>
      <View style={styles.Boxcontainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.arrow}
          onPress={() => navigation.goBack()}>
          <Arrow />
        </TouchableOpacity>
        <Text style={styles.Heading}>Sign In</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.txt1}>Don't have an account?</Text>
          <TouchableOpacity
            activeOpacity={0.5}
            // style={styles.btn1}
            onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.txt2}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          onChangeText={text => setUserName(text)}
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#717171"
          underlineColorAndroid="transparent"
        />
        <TextInput
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#717171"
          underlineColorAndroid="transparent"
        />
        <View style={{alignSelf: 'center'}}>
          <TouchableOpacity
            style={styles.btn2}
            activeOpacity={0.5}
            onPress={() => {
              loginHandler(userName.trim(), password);
            }}>
            <Text style={styles.txt3}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.Pic1}>
        <SignInImage />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Boxcontainer: {
    flex: 1,
    paddingHorizontal: 30,
  },
  arrow: {
    // width: 100,
    // height: 100,
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    paddingTop: '20%',
  },
  Heading: {
    // backgroundColor:"red",
    fontSize: 30,
    textAlign: 'left',
    justifyContent: 'flex-start',
    paddingTop: '15%',
    fontFamily: 'Oxygen-Bold',
    color: '#000',
  },
  txt1: {
    marginTop: 5,
    textAlign: 'left',
    fontSize: 17,
    fontFamily: 'Oxygen-Bold',
    color: '#818181',
  },
  txt2: {
    textAlign: 'right',
    marginTop: 5,
    color: '#34D1D1',
    fontSize: 17,
    fontFamily: 'Oxygen-Bold',
  },
  input: {
    borderRadius: 7,
    height: 42,
    // margin: 15,
    marginTop: 20,
    borderWidth: 0,
    padding: '1%',
    paddingLeft: 20,
    backgroundColor: '#DAF0F0',
    fontFamily: 'Oxygen-Regular',
  },
  txt3: {
    textAlign: 'center',
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: 'Oxygen-Bold',
  },
  btn2: {
    backgroundColor: '#34D1D1',
    alignItems: 'center',
    justifyContent: 'center',
    // marginHorizontal: '20%',
    marginTop: 20,
    height: 42,
    width: 169,
    borderRadius: 7,
  },
  Pic1: {
    paddingBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
