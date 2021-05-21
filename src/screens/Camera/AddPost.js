import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  styles,
  button,
} from 'react-native';
import Post from '../../assets/icons/post.svg';
import Arrow from '../../assets/icons/arrow.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {options, AddPost_} from '../../components/api';

// import GetLocation from 'react-native-get-location';

const AddPost = ({navigation, route}) => {
  const [title, setTitle] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [location, setLocation] = useState('');
  const [des, setDes] = useState('');

  const camera = async () => {
    // AsyncStorage.getItem('userToken')
    //   .then(async res => {
    //     var response = await axios.post(
    //       AddPost_,
    //       {
    //         token: res,
    //         Likes: 9,
    //         Liked: false,
    //         Imageurl: route.params.fileUri,
    //         title: title,
    //         Discription: des,
    //         Location: location,
    //         cusins: cuisine,
    //       },
    //       options,
    //     );
    //     console.log(response.status);
    //     // console.log(response.data.status);
    //     // console.log(response.data.data);
    //   })
    //   .catch(e => {
    //     console.error(JSON.stringify(e, null, 2));
    //   });
    console.log('Posted - dummy');
    navigation.navigate('Profile');
  };
  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        paddingTop: 30,
        paddingHorizontal: 20,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          activeOpacity={0.5}
          hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
          onPress={() => navigation.goBack()}>
          <Arrow />
        </TouchableOpacity>
        <Text style={{fontSize: 25, fontFamily: 'Oxygen-Bold', marginLeft: 20}}>
          Add Post
        </Text>
      </View>
      <View style={{alignItems: 'center', paddingTop: 20}}>
        <Image
          source={{uri: route.params.fileUri}}
          style={{width: 300, height: 300, borderRadius: 14, marginBottom: 10}}
        />
      </View>

      <TextInput
        maxLength={30}
        style={{
          height: 40,
          fontFamily: 'Oxygen-Bold',
          borderBottomColor: '#DAF0F0',
          borderBottomWidth: 2,
        }}
        placeholder="Enter Title"
        placeholderTextColor="#818181"
        onChangeText={text => setTitle(text)}
      />

      <TextInput
        style={{
          height: 40,
          fontFamily: 'Oxygen-Bold',
          borderBottomColor: '#DAF0F0',
          borderBottomWidth: 2,
        }}
        placeholder="Enter Location"
        placeholderTextColor="#818181"
        onChangeText={text => setLocation(text)}
      />
      <TextInput
        style={{
          height: 40,
          fontFamily: 'Oxygen-Bold',
          borderBottomColor: '#DAF0F0',
          borderBottomWidth: 2,
        }}
        placeholder="Enter Cuisine"
        placeholderTextColor="#818181"
        onChangeText={text => setCuisine(text)}
      />
      <TextInput
        numberOfLines={5}
        multiline={true}
        maxLength={255}
        textAlignVertical="top"
        style={{
          height: 140,
          fontFamily: 'Oxygen-Bold',
          textAlignVertical: 'top',
          borderBottomColor: '#DAF0F0',
          borderBottomWidth: 2,
        }}
        placeholder="Enter Description"
        placeholderTextColor="#818181"
        onChangeText={text => setDes(text)}
      />

      <TouchableOpacity
        activeOpacity={0.5}
        style={{
          backgroundColor: '#34D1D1',
          height: 36,
          width: 120,
          marginTop: 20,
          borderRadius: 7,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}
        onPress={() => camera()}>
        <Post />
        <Text
          style={{
            color: 'white',
            fontSize: 15,
            fontFamily: 'Oxygen-Bold',
            marginLeft: 10,
          }}>
          Post
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddPost;
