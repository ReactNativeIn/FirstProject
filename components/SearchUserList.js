import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import SearchUserListItem from './SearchUserListItem';

function SearchUserList({logs}) {
  return (
    <FlatList
      data={logs}
      style={styles.block}
      renderItem={({item}) => <SearchUserListItem log={item} />}
      keyExtractor={log => log.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}

const styles = StyleSheet.create({
  block: {flex: 1},
  separator: {
    backgroundColor: '#e0e0e0',
    height: 1,
    width: '100%',
  },
});

export default SearchUserList;
