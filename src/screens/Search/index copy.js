import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
  Image,
} from 'react-native';
import SearchIcon from '../../assets/icons/search_white.svg';
import EmptyList from './EmptyList';
import SearchEmpty from '../../assets/images/search_empty.svg';
import SearchResult from './search';

const Search = () => {
  const [searchResult, setSearchResult] = useState(null);
  const [query, setQuery] = useState('');
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
    if (query == 'jj') {
      setSearchResult([]);
      return;
    }
    if (query && query.trim().length == 0) {
      setSearchResult(null);
      return;
    } else setSearchResult(SearchResult);
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
    const {imageUrl, title, location, id} = props;
    return (
      <TouchableOpacity
        key={id}
        activeOpacity={0.7}
        style={{
          width: 324,
          height: 67,
          backgroundColor: '#DAF0F0',
          borderRadius: 7,
          marginBottom: 20,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          style={{
            width: 67,
            height: 67,
            borderRadius: 7,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          }}
          source={{uri: imageUrl}}
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
            {location}
          </Text>
        </View>
      </TouchableOpacity>
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
        <FlatList
          ListEmptyComponent={() => <NoResult />}
          data={searchResult}
          style={{paddingVertical: 10}}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <SearchItem
                id={item.id}
                imageUrl={item.imageUrl}
                title={item.title}
                location={item.location}
              />
            );
          }}
        />
      )}
    </View>
  );
};

export default Search;
