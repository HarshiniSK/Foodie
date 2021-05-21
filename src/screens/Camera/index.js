import React, {Fragment, Component} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Button,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import RtArrow from '../../assets/icons/rght_arw.svg';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Arrow from '../../assets/icons/arrow.svg';
import CamDummy from '../../assets/images/empty_cam.svg';
// import compress from 'compress.js';

const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filepath: {
        data: '',
        uri: '',
      },
      fileData: '',
      fileUri: '',
      navigation: props.navigation,
      route: props.route,
    };
  }

  // chooseImage = () => {
  //   let options = {
  //     title: 'Select Image',
  //     type: 'photo',
  //     customButtons: [
  //       {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
  //     ],
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images',
  //     },
  //   };
  //   ImagePicker.showImagePicker(options, response => {
  //     console.log('Response = ', response);

  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else if (response.customButton) {
  //       console.log('User tapped custom button: ', response.customButton);
  //       alert(response.customButton);
  //     } else {
  //       const source = {uri: response.uri};

  //       // You can also display the image using data:
  //       // const source = { uri: 'data:image/jpeg;base64,' + response.data };
  //       // alert(JSON.stringify(response));s
  //       console.log('response', JSON.stringify(response));
  //       this.setState({
  //         filePath: response,
  //         fileData: response.data,
  //         fileUri: response.uri,
  //       });
  //     }
  //   });
  // };

  launchCamera = () => {
    let options = {
      includeBase64: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, response => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        this.setState({
          ...this.state,
          fileUri: `data:${response.type};base64,${response.base64}`,
        });
        // console.log(this.state.fileUri);
      }
    });
  };

  launchImageLibrary = () => {
    let options = {
      type: 'photo',
      includeBase64: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        // console.log('response', JSON.stringify(response));
        this.setState({
          ...this.state,
          fileUri: `data:${response.type};base64,${response.base64}`,
        });
        // this.setState(prevState => ({
        //   ...prevState,
        //   fileUri: `data:${response.type};base64,${response.base64}`,
        // }));
        // console.log(this.state.fileUri);
      }
    });
  };

  renderFileData() {
    if (this.state.fileData) {
      return (
        <Image
          source={{uri: 'data:image/jpeg;base64,' + this.state.fileData}}
          style={styles.images}
        />
      );
    } else {
      return (
        <Image
          source={require('../../assets/images/1.jpg')}
          style={styles.images}
        />
      );
      // <View><Text>No Image</Text></View>
    }
  }

  renderFileUri() {
    if (this.state.fileUri) {
      return <Image source={{uri: this.state.fileUri}} style={styles.images} />;
    } else {
      return (
        <View
          style={{
            backgroundColor: '#DAF0F0',
            width: 300,
            height: 300,
            borderRadius: 14,
            paddingLeft: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <CamDummy width={300} height={300} />
        </View>
      );
    }
  }
  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View style={styles.body}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 2,
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
                  onPress={() => this.state.navigation.goBack()}>
                  <Arrow />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 25,
                    fontFamily: 'Oxygen-Bold',
                    marginLeft: 20,
                  }}>
                  Add Post
                </Text>
              </View>
              <View>
                {this.state.fileUri != '' ? (
                  <TouchableOpacity
                    style={styles.btn1}
                    activeOpacity={0.5}
                    onPress={() =>
                      this.state.navigation.navigate('AddPost', {
                        fileUri: this.state.fileUri,
                      })
                    }>
                    <RtArrow style={styles.arrow} />
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>

            <View style={styles.ImageSections}>
              <View>{this.renderFileUri()}</View>
            </View>

            <View style={styles.btnParentSection}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={this.launchCamera}
                style={styles.btnSection}>
                <Text style={styles.btnText}>Click a Picture</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={this.launchImageLibrary}
                style={styles.btnSection}>
                <Text style={styles.btnText}>Choose from Gallery</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  btn1: {
    height: 30,
    width: 30,
    borderRadius: 7,
    backgroundColor: '#DAF0F0',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  body: {
    backgroundColor: '#FFF',
    paddingTop: 70,
    paddingHorizontal: 38,
    height: Dimensions.get('screen').height - 20,
    width: Dimensions.get('screen').width,
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 30,
    justifyContent: 'center',
  },
  images: {
    width: 300,
    height: 300,
    borderColor: 'black',
    marginHorizontal: 3,
    borderRadius: 14,
  },
  btnParentSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  btnSection: {
    width: 169,
    height: 42,
    backgroundColor: '#34D1D1',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginBottom: 20,
  },
  btnText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 15,
    fontFamily: 'Oxygen-Bold',
    borderRadius: 7,
  },
});
