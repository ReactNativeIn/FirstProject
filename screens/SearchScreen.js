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

function SearchScreen({}) {
  const {keyword} = useContext(SearchContext);
  const {joinUser} = useContext(UserContext);
  const filtered =
    keyword === ''
      ? []
      : joinUser.filter(log =>
          [log.email].some(text => text.includes(keyword)),
        );

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
