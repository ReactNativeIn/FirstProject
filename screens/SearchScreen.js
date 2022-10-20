import React, {useContext, useState} from 'react';
import {
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  Text,
} from 'react-native';
import SearchBox from '../components/SearchBox';
import SearchContext from '../contexts/SearchContext';
import SearchUserList from '../components/SearchUserList';
import useUserContext from '../contexts/UserContext';
import {UserContext} from '../contexts/UserContext';
import EmptySearchResult from '../components/EmptySearchResult';
import {UserProfileBody} from '../components/UserProfileBody';
import {NavigationContainer} from '@react-navigation/native';

function SearchScreen({}) {
  const {keyword} = useContext(SearchContext);
  const {joinUser} = useContext(UserContext);

  const filtered =
    keyword === ''
      ? []
      : joinUser.filter(log =>
          [log.email].some(text => text.includes(keyword)),
        );

  if (keyword === '') {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          position: 'relative',
        }}>
        <SearchBox />
        <SearchUserList logs={filtered} />
        <EmptySearchResult type="EMPTY_KEYWORD" />
      </View>
    );
  }

  if (filtered.length === 0) {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          position: 'relative',
        }}>
        <SearchBox />
        <SearchUserList logs={filtered} />
        <EmptySearchResult type="NOT_FOUND" />
      </View>
    );
  }

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        position: 'relative',
      }}>
      <SearchBox />
      <SearchUserList logs={filtered} />
    </View>
  );
}

export default SearchScreen;
