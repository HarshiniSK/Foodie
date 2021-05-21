import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {
  FlingGestureHandler,
  Directions,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import Arrow from '../../assets/icons/arrow.svg';
import Star from '../../assets/icons/star.svg';
import StarFilled from '../../assets/icons/star_filled.svg';

const SinglePost = ({navigation, route}) => {
  const SPACING = 40;
  const {username, imageUrl, createdAt, location, title, isLiked, description} =
    route.params;
  const [like, setLike] = useState(isLiked);
  return (
    <FlingGestureHandler
      key="down"
      direction={Directions.DOWN}
      onHandlerStateChange={ev => {
        if (ev.nativeEvent.state === State.END) {
          // console.log('Swiped Down!');
          navigation.goBack();
        }
      }}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: SPACING - 10,
          paddingTop: SPACING - 10,
        }}>
        <Image
          source={{uri: imageUrl}}
          style={[StyleSheet.absoluteFillObject]}
          blurRadius={2}
        />
        <View
          style={[
            StyleSheet.absoluteFillObject,
            {backgroundColor: '#000', opacity: 0.5},
          ]}
        />
        <View style={{backgroundColor: '#FFF', borderRadius: 14}}>
          <View style={{flexDirection: 'row', padding: SPACING - 20}}>
            <TouchableOpacity
              hitSlop={{top: 30, left: 30, right: 30, bottom: 30}}
              activeOpacity={0.7}
              style={{marginRight: SPACING - 20}}
              onPress={() => {
                navigation.goBack();
              }}>
              <Arrow />
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Text
                  style={{
                    color: '#000',
                    fontFamily: 'Oxygen-Bold',
                    fontSize: 15,
                    marginRight: SPACING + 20,
                  }}>
                  @{username}
                </Text>
              </View>
              <View>
                {/* <Text
                  style={{
                    color: '#818181',
                    fontFamily: 'Oxygen-Regular',
                    fontSize: 15,
                  }}>
                  {createdAt}
                </Text> */}
              </View>
            </View>
          </View>
          <View
            style={{
              alignItems: 'center',
              paddingBottom: SPACING - 30,
              paddingTop: 0,
            }}>
            <Image
              source={{uri: imageUrl}}
              style={{width: '90%', height: 225, borderRadius: 14}}
            />
          </View>
          <View
            style={{
              paddingHorizontal: SPACING - 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={{
                  fontFamily: 'Oxygen-Bold',
                  fontSize: 20,
                  color: '#000',
                }}>
                {title}
              </Text>
              <Text
                style={{
                  fontFamily: 'Oxygen-Bold',
                  fontSize: 15,
                  color: '#818181',
                }}>
                {location}
              </Text>
            </View>
            <View>
              {like ? (
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => setLike(false)}>
                  <StarFilled />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => setLike(true)}>
                  <Star />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={{padding: SPACING - 20, paddingTop: 5}}>
            <Text
              style={{
                fontFamily: 'Oxygen-Bold',
                fontSize: 16,
                color: '#000',
              }}>
              {description}
            </Text>
          </View>
        </View>
      </View>
    </FlingGestureHandler>
  );
};

export default SinglePost;
