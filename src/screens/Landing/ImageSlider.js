import React, {useState} from 'react';
import {View, ScrollView, Dimensions} from 'react-native';
import LandOne from '../../assets/images/land_1.svg';
import LandTwo from '../../assets/images/land_2.svg';

const ImageSlider = () => {
  const list = [
    {
      key: 1,
      tag: (
        <View style={{paddingRight: 20}}>
          <LandOne width={343} height={277} />
        </View>
      ),
    },
    {
      key: 2,
      tag: (
        <View style={{paddingRight: 40}}>
          <LandTwo width={294} height={279} />
        </View>
      ),
    },
  ];

  const [contentOffset, setContentOffset] = useState({x: 0, y: 0});
  const [contentSize, setContentSize] = useState(0);

  const [img, setImg] = useState(0);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    <View>
      <ScrollView
        onScroll={e => {
          if (contentOffset.x < e.nativeEvent.contentOffset.x) {
            setImg(1);
            if (contentOffset.x == 0 || e.nativeEvent.contentOffset.x == 0) {
              setImg(0);
            }
          } else {
            setImg(0);
          }
          setContentOffset(e.nativeEvent.contentOffset);
        }}
        snapToInterval={windowWidth}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        horizontal>
        {list.map(item => {
          return <View key={item.key}>{item.tag}</View>;
        })}
      </ScrollView>
      <View
        style={{
          width: windowWidth,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 7,
        }}>
        <View
          style={{
            width: 10,
            height: 10,
            borderRadius: 100,
            backgroundColor: img === 0 ? '#34D1D1' : '#DAF0F0',
            margin: 5,
          }}
        />
        <View
          style={{
            width: 10,
            height: 10,
            borderRadius: 100,
            backgroundColor: img === 1 ? '#34D1D1' : '#DAF0F0',
          }}
        />
      </View>
    </View>
  );
};
export default ImageSlider;
