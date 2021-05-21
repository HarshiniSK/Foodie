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
          // if (index === data.length - 1) {
          //   return;
          // }
          // setActiveIndex(index + 1);
          console.log('Swiped Down!');
          navigation.goBack();
        }
      }}>
      <View
        style={{flex: 1, paddingHorizontal: SPACING, paddingTop: SPACING - 10}}>
        <Image
          source={{uri: imageUrl}}
          style={[StyleSheet.absoluteFillObject]}
          blurRadius={30}
        />
        <View
          style={[
            StyleSheet.absoluteFillObject,
            {backgroundColor: '#818181', opacity: 0.5},
          ]}
        />
        <View >
          <View style={{flexDirection: 'row'}}>
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
                    color: '#FFF',
                    fontFamily: 'Oxygen-Bold',
                    fontSize: 15,
                    marginRight: SPACING + 20,
                  }}>
                  @{username}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: '#FFF',
                    fontFamily: 'Oxygen-Light',
                    fontSize: 15,
                  }}>
                  {createdAt}
                </Text>
              </View>
            </View>
          </View>
          <View style={{alignItems: 'center', paddingVertical: SPACING - 20}}>
            <Image
              source={{uri: imageUrl}}
              style={{width: 225, height: 225, borderRadius: 14}}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={{
                  fontFamily: 'Oxygen-Bold',
                  fontSize: 20,
                  color: '#FFF',
                }}>
                {title}
              </Text>
              <Text
                style={{
                  fontFamily: 'Oxygen-Bold',
                  fontSize: 15,
                  color: '#FFF',
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
          <View style={{paddingVertical: SPACING - 20}}>
            <Text
              style={{
                fontFamily: 'Oxygen-Bold',
                fontSize: 17,
                color: '#FFF',
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
