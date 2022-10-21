import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import SearchScreen from './SearchScreen';
import SearchBox from '../components/SearchBox';

function SearchTab({navigation}) {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <SearchBox />,
    });
  }, [navigation]);

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
