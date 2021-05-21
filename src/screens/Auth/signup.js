import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import SignUpImage from '../../assets/images/signup.svg';
import Arrow from '../../assets/icons/arrow.svg';
import {AuthContext} from '../../components/context';

export default function SignUp({navigation, route}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {width, height} = Dimensions.get('window');
  const signUpHandler = (username, password) => {
    signUp(username, password);
  };

  const {signUp} = useContext(AuthContext);
  return (
    <SafeAreaView style={{backgroundColor: '#FFF', flex: 1}}>
      <View style={styles.Boxcontainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.arrow}
          onPress={() => navigation.goBack()}>
          <Arrow />
        </TouchableOpacity>
        <Text style={styles.Heading}>Sign Up</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.txt1}>Already have an account?</Text>
          <TouchableOpacity
            activeOpacity={0.5}
            // style={styles.btn1}
            onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.txt2}>Sign In</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          onChangeText={text => setUsername(text)}
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
            onPress={() => signUpHandler(username.trim(), password)}>
            <Text style={styles.txt3}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.Pic1}>
        <SignUpImage width={width - 100} height={height * 0.3} />
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
    paddingTop: '20%',
  },
  Heading: {
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
    marginTop: 20,
    height: 42,
    width: 169,
    borderRadius: 7,
  },
  Pic1: {
    paddingBottom: 5,
    // justifyContent: 'center',
    alignItems: 'center',
  },
});
