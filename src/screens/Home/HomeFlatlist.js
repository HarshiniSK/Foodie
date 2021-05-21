import * as React from 'react';
import {
  StatusBar,
  Image,
  FlatList,
  Dimensions,
  Animated,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
const {width} = Dimensions.get('screen');
// import DATA from './data';
import Close from '../../assets/icons/close_blue.svg';
import {
  FlingGestureHandler,
  Directions,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler';

const OVERFLOW_HEIGHT = 70;
const SPACING = 10;
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.6;
const VISIBLE_ITEMS = 3;

const OverflowItems = ({data, scrollXAnimated, navigation}) => {
  const inputRange = [-1, 0, 1];
  const translateY = scrollXAnimated.interpolate({
    inputRange,
    outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
  });
  return (
    <View style={styles.overflowContainer}>
      <Animated.View style={{transform: [{translateY}]}}>
        {data.map((item, index) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <Text style={[styles.title]} numberOfLines={1}>
                {item.title}
              </Text>
              <View style={styles.itemContainerRow}>
                <Text style={[styles.location]}>{item.Location}</Text>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => navigation.goBack()}
                  style={{marginRight: 10}}>
                  <Close />
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </Animated.View>
    </View>
  );
};

export default function App({navigation, route, reviewData}) {
  // const [data, setData] = React.useState(DATA);
  const [data, setData] = React.useState(reviewData);

  const scrollXIndex = React.useRef(new Animated.Value(0)).current;
  const scrollXAnimated = React.useRef(new Animated.Value(0)).current;
  const [index, setIndex] = React.useState(0);
  const setActiveIndex = React.useCallback(activeIndex => {
    scrollXIndex.setValue(activeIndex);
    setIndex(activeIndex);
  });

  React.useEffect(() => {
    // if (index === data.length - VISIBLE_ITEMS - 1) {
    //   // get new data
    //   // fetch more data
    //   const newData = [...data, ...data];
    //   setData(newData);
    // }
    const newData = reviewData;
    setData(newData);
  });

  React.useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start();
  });

  return (
    <FlingGestureHandler
      key="up"
      direction={Directions.UP}
      onHandlerStateChange={ev => {
        if (ev.nativeEvent.state === State.END) {
          // if (index === data.length - 1) {
          //   return;
          // }
          // setActiveIndex(index + 1);
          console.log('Swiped Up!');
          navigation.navigate('SinglePost', {
            username: data[index].public_name,
            createdAt: data[index].createdAt,
            location: data[index].Location,
            title: data[index].title,
            imageUrl: data[index].Imageurl,
            isLiked: data[index].Liked,
            description: data[index].Discription,
          });
        }
      }}>
      {/* <TapGestureHandler
      onHandlerStateChange={() => {
        console.log('Swiped Up!');
              navigation.navigate('SinglePost', {
                username: "lorem_ipsum",
                createdAt: "May 14, 2021",
                location: data[index].location,
                title: data[index].title,
              });
      }}> */}
      <FlingGestureHandler
        key="left"
        direction={Directions.LEFT}
        onHandlerStateChange={ev => {
          if (ev.nativeEvent.state === State.END) {
            if (index === data.length - 1) {
              return;
            }
            setActiveIndex(index + 1);
          }
        }}>
        <FlingGestureHandler
          key="right"
          direction={Directions.RIGHT}
          onHandlerStateChange={ev => {
            if (ev.nativeEvent.state === State.END) {
              if (index === 0) {
                return;
              }
              setActiveIndex(index - 1);
            }
          }}>
          <SafeAreaView style={styles.container}>
            {/* <StatusBar hidden /> */}
            <OverflowItems
              data={data}
              scrollXAnimated={scrollXAnimated}
              navigation={navigation}
            />
            <FlatList
              data={data}
              keyExtractor={(_, index) => String(index)}
              horizontal
              inverted
              contentContainerStyle={{
                flex: 1,
                justifyContent: 'center',
                padding: SPACING * 2,
                marginTop: 5,
              }}
              scrollEnabled={false}
              removeClippedSubviews={false}
              CellRendererComponent={({
                item,
                index,
                children,
                style,
                ...props
              }) => {
                const newStyle = [style, {zIndex: data.length - index}];
                return (
                  <View style={newStyle} index={index} {...props}>
                    {children}
                  </View>
                );
              }}
              renderItem={({item, index: i}) => {
                const inputRange = [i - 1, i, i + 1];
                const translateX = scrollXAnimated.interpolate({
                  inputRange,
                  outputRange: [50, 0, -100],
                });
                const scale = scrollXAnimated.interpolate({
                  inputRange,
                  outputRange: [0.8, 1, 1.3],
                });
                const opacity = scrollXAnimated.interpolate({
                  inputRange,
                  outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
                });

                return (
                  <Animated.View
                    style={{
                      position: 'absolute',
                      left: -ITEM_WIDTH / 2,
                      opacity,
                      transform: [
                        {
                          translateX,
                        },
                        {scale},
                      ],
                    }}>
                    <Image
                      source={{uri: item.Imageurl}}
                      style={{
                        width: ITEM_WIDTH,
                        height: ITEM_HEIGHT,
                        borderRadius: 14,
                      }}
                    />
                  </Animated.View>
                );
              }}
            />
          </SafeAreaView>
        </FlingGestureHandler>
      </FlingGestureHandler>
    </FlingGestureHandler>
    // </TapGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 27,
    fontFamily: 'Oxygen-Bold',
    letterSpacing: -1,
  },
  location: {
    fontSize: 15,
    fontFamily: 'Oxygen-Bold',
    color: '#818181',
  },

  itemContainer: {
    height: OVERFLOW_HEIGHT,
    padding: SPACING * 2,
  },
  itemContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overflowContainer: {
    height: OVERFLOW_HEIGHT,
    overflow: 'hidden',
  },
});
