import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
  Image,
  Animated,
} from 'react-native';
import axios from 'axios';
import SearchIcon from '../../assets/icons/search_white.svg';
import EmptyList from './EmptyList';
import SearchEmpty from '../../assets/images/search_empty.svg';
// import SearchResult from '../Home/data';
import SearchFlatlist from './SearchFlatlist';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {options, SearchRes} from '../../components/api';
const Search = ({navigation, route}) => {
  const ITEM_SIZE = 67;
  const DURATION = 400;
  const scrollY = useRef(new Animated.Value(0)).current;

  const [searchResult, setSearchResult] = useState(null);
  const [query, setQuery] = useState('');

  const fadeInBottom = {
    0: {
      opacity: 0,
      translateY: 100,
    },
    1: {
      opacity: 1,
      translateY: 0,
    },
  };

  const searchText = text => {
    setQuery(text);
  };
  const search = () => {
    Keyboard.dismiss();
    if (query.trim().length == 0) {
      setQuery('');
      setSearchResult(null);
      return;
    }
    // if (query == 'jj') {
    //   setSearchResult([]);
    //   return;
    // }
    if (query && query.trim().length == 0) {
      setSearchResult(null);
      return;
    } else {
      AsyncStorage.getItem('userToken').then(async res => {
        var search = await axios.post(
          SearchRes,
          {token: res, title: query},
          options,
        );
        console.log(search.data.data);

        setSearchResult([...search.data.data]);
      });
    }
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFF',
      paddingTop: 30,
      alignItems: 'center',
      paddingBottom: 10,
    },
    searchBar: {
      backgroundColor: '#DAF0F0',
      width: 324,
      height: 42,
      borderRadius: 21,
      flexDirection: 'row',
      marginBottom: 10,
    },
  });

  const SearchItem = props => {
    const id = 1;
    const {
      _id,
      public_name,
      createdAt,
      Location,
      title,
      Imageurl,
      Liked,
      Discription,
    } = props;
    return (
      <Animatable.View
        key={_id}
        // animation={fadeInBottom}
        duration={DURATION}
        delay={DURATION + 100 * id}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('SinglePost', {
              username: public_name,
              createdAt: createdAt,
              location: Location,
              title: title,
              imageUrl: Imageurl,
              isLiked: Liked,
              description: Discription,
            })
          }
          key={_id}
          activeOpacity={0.7}
          style={{
            width: 324,
            height: 80,
            backgroundColor: '#DAF0F0',
            borderRadius: 7,
            marginBottom: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            style={{
              width: 80,
              height: 80,
              borderRadius: 7,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            }}
            source={{uri: Imageurl}}
          />
          <View style={{paddingHorizontal: 10}}>
            <Text
              style={{
                fontFamily: 'Oxygen-Regular',
                fontSize: 15,
                color: '#000000',
                marginBottom: 5,
              }}>
              {title}
            </Text>
            <Text
              style={{
                fontFamily: 'Oxygen-Regular',
                fontSize: 12,
                color: '#818181',
              }}>
              {Location}
            </Text>
          </View>
        </TouchableOpacity>
      </Animatable.View>
    );
  };
  const NoResult = () => (
    <View style={{paddingHorizontal: 20}}>
      <View style={{paddingVertical: 20, width: '100%', alignSelf: 'center'}}>
        <Text
          style={{
            fontFamily: 'Oxygen-Bold',
            fontSize: 15,
            textAlign: 'center',
          }}>
          No Results Found...
        </Text>
      </View>
      <View style={{paddingVertical: 40, alignSelf: 'center'}}>
        <SearchEmpty />
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          onChangeText={searchText}
          value={query}
          placeholder="Search..."
          style={{paddingLeft: 20, paddingRight: 10, flex: 1}}
        />
        <TouchableOpacity
          onPress={search}
          activeOpacity={0.7}
          style={{
            width: 42,
            height: 42,
            backgroundColor: '#34D1D1',
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
            // flex:1
          }}>
          <SearchIcon width={22} height={22} />
        </TouchableOpacity>
      </View>
      {searchResult == null && <EmptyList />}
      {searchResult && (
        <Animated.FlatList
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: true},
          )}
          ListEmptyComponent={() => <NoResult />}
          data={searchResult}
          style={{paddingVertical: 10}}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            const inputRange = [
              -1,
              0,
              ITEM_SIZE * index,
              ITEM_SIZE * (index + 2),
            ];
            const opacityInputRange = [
              -1,
              0,
              ITEM_SIZE * index,
              ITEM_SIZE * (index + 2),
            ];
            const scale = scrollY.interpolate({
              inputRange,
              outputRange: [1, 1, 1, 0],
            });
            const opacity = scrollY.interpolate({
              inputRange: opacityInputRange,
              outputRange: [1, 1, 1, 0],
            });
            return (
              <SearchItem
                // scale={opacity}
                id={item._id}
                // imageUrl={item.Imageurl}
                // title={item.title}
                // location={item.Location}
                public_name={item.public_name}
                createdAt={item.createdAt}
                Location={item.Location}
                title={item.title}
                Imageurl={item.Imageurl}
                Liked={item.Liked}
                Discription={item.Discription}
              />
            );
          }}
        />
      )}
      {/* {searchResult && (<SearchFlatlist />)} */}
    </View>
  );
};

export default Search;
