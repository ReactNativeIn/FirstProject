import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SearchScreen from './SearchScreen';

function SearchTab() {
  return (
    <View style={style.container}>
      <SearchScreen />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SearchTab;
