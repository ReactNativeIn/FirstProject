import React, {useContext} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import UserContext from '../contexts/UserContext';

function SearchFriends({navigation}) {
  const {keyword} = useContext(SearchContext);
  const {logs} = useContext(UserContext);

  const filtered =
    keyword === ''
      ? []
      : logs.filter(log =>
          [log.title, log.body].some(text => text.includes(keyword)),
        );

  return (
    <View style={styles.block}>
      <UserList logs={filtered} />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
});

export default SearchFriends;
