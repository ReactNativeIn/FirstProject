import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import SearchBox from '../components/SearchBox';
import SearchContext from '../contexts/SearchContext';
import SearchUserList from '../components/SearchUserList';
import {UserContext} from '../contexts/UserContext';
import EmptySearchResult from '../components/EmptySearchResult';

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
      <View style={styles.filteredStyle}>
        <SearchUserList logs={filtered} />
        <EmptySearchResult type="EMPTY_KEYWORD" />
      </View>
    );
  }

  if (filtered.length === 0) {
    return (
      <View style={styles.filteredStyle}>
        <SearchBox />
        <SearchUserList logs={filtered} />
        <EmptySearchResult type="NOT_FOUND" />
      </View>
    );
  }

  return (
    <View style={styles.filteredStyle}>
      <SearchUserList logs={filtered} />
    </View>
  );
}

const styles = StyleSheet.create({
  filteredStyle: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    position: 'relative',
  },
});

export default SearchScreen;
