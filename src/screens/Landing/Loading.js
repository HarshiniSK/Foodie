import React from 'react';
import {View, StyleSheet, Dimensions, StatusBar} from 'react-native';
import Loading from '../../assets/images/loading.svg';
import Logo from '../../assets/images/logo.svg';

const LandingPage = () => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const styles = StyleSheet.create({
    container: {
      // flex: 1,
      backgroundColor: '#FFF',
      paddingHorizontal: 20,
      height: windowHeight,

      // alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFF" />
      {/* <View style={{position: 'absolute', top: 50, left: 50}}>
        <Logo />
      </View> */}
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Loading width={329} height={298} />
      </View>
    </View>
  );
};

export default LandingPage;
