import React, {useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Bolt from '../../assets/icons/nut.svg';
import RtArrow from '../../assets/icons/rght_arw.svg';
import Pad from '../../assets/icons/BB.svg';
import Bulb from '../../assets/icons/Sun.svg';
import SignOut from '../../assets/icons/signout.svg';
import {AuthContext, ProfileContext} from '../../components/context';

export default function Profile({navigation, route}) {
  const {signOut} = useContext(AuthContext);
  // const {profileData} = useContext(ProfileContext);
  // const profileData = {public_name: 'ABCD'};
  // const profileData = ProfileContext._currentValue;
  // console.log('Profile Data:', ProfileContext._currentValue);
  // console.log("Profile:",profileData);
  return (
    <ProfileContext.Consumer>
      {profile => {
        console.log(profile);
        const {public_name} = profile.profile.data;
        return (
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: '#FFF',
              paddingVertical: 25,
              justifyContent: 'flex-start',
            }}>
            <View
              style={{
                width: 146,
                height: 146,
                backgroundColor: '#34D1D1',
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Oxygen-Bold',
                  fontSize: 100,
                  color: '#FFF',
                }}>
                {public_name[0]}
              </Text>
            </View>
            <View style>
              <Text style={styles.head}>{public_name}</Text>
              {/* <Text style={styles.txt1}>@lorem_ipsum</Text> */}
            </View>
            <View style={{paddingHorizontal: 30, paddingTop: 20}}>
              <View style={styles.row1}>
                <Bolt style={styles.bolt} />

                <Text style={styles.txt2}>Change Password</Text>
                <TouchableOpacity
                  style={styles.btn1}
                  activeOpacity={0.5}
                  onPress={() =>
                    navigation.navigate('EditProfile', {
                      initial: public_name[0],
                    })
                  }>
                  <RtArrow style={styles.arrow} />
                </TouchableOpacity>
              </View>
              <View style={styles.row1}>
                <Pad style={styles.pad} />
                <Text style={styles.txt2}>My Reviews</Text>
                <TouchableOpacity
                  style={styles.btn1}
                  activeOpacity={0.5}
                  onPress={() => navigation.navigate('MyReviews')}>
                  <RtArrow style={styles.arrow} />
                </TouchableOpacity>
              </View>
              {/* <View style={styles.row1}>
                <Bulb style={styles.bulb} />
                <Text style={styles.txt2}>Change Theme</Text>
                <TouchableOpacity style={styles.btn1} activeOpacity={0.5}>
                  <RtArrow style={styles.arrow} />
                </TouchableOpacity>
              </View> */}

              <TouchableOpacity
                style={styles.btn2}
                activeOpacity={0.5}
                onPress={() => {
                  signOut();
                }}>
                <SignOut />
                <Text style={styles.txt3}>Sign Out</Text>
              </TouchableOpacity>
            </View>
            {/* </View> */}
          </SafeAreaView>
        );
      }}
    </ProfileContext.Consumer>
  );
}
const styles = StyleSheet.create({
  arrow: {},

  head: {
    fontSize: 25,
    // fontWeight: 'bold',
    fontFamily: 'Oxygen-Bold',
    marginTop: 15,
    textAlign: 'center',
  },
  txt1: {
    fontSize: 17,
    fontFamily: 'Oxygen-Bold',
    color: '#818181',
    marginTop: 10,
    textAlign: 'center',
  },
  row1: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 10,
  },

  txt2: {
    marginLeft: 20,
    fontFamily: 'Oxygen-Bold',
    fontSize: 17,
    flex: 3,
  },
  btn2: {
    backgroundColor: '#34D1D1',
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 36,
    flexDirection: 'row',
    borderRadius: 7,
    marginTop: 30,
  },
  txt3: {
    color: '#FFF',
    fontSize: 15,
    fontFamily: 'Oxygen-Bold',
    marginLeft: 10,
  },
  btn1: {
    height: 30,
    width: 30,
    borderRadius: 7,
    backgroundColor: '#DAF0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
