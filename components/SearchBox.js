import React, {useState, useContext} from 'react';
import {
  Pressable,
  View,
  TextInput,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import SearchContext from '../contexts/SearchContext';

const SearchBox = () => {
  const {width} = useWindowDimensions();

  const [focusIn, setFocusIn] = useState(false);
  const {keyword, onChangeText} = useContext(SearchContext);

  const focusInEvent = () => {
    setFocusIn(true);
  };

  const focusOut = () => {
    setFocusIn(false);
  };

  return (
    <View style={[styles.container, {width: width - 10}]}>
      <TextInput
        onFocus={focusInEvent}
        onBlur={focusOut}
        placeholder="Search"
        placeholderTextColor="#909090"
        value={keyword}
        onChangeText={onChangeText}
        style={styles.textInput}
      />
      <Pressable
        styles={({pressed}) => [styles.button, pressed && {opacity: 0.5}]}
        onPress={() => onChangeText('')}></Pressable>
      <Ionic
        name="close-circle-outline"
        style={styles.clearButton}
        onPress={() => onChangeText('')}></Ionic>
      <Ionic name="search" style={styles.searchIcon} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    width: '94%',
    backgroundColor: '#EBEBEB',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 15,
    padding: 4,
    paddingLeft: 38,
  },
  clearButton: {
    fontSize: 18,
    opacity: 0.7,
    position: 'absolute',
    zIndex: 1,
    right: 35,
  },
  searchIcon: {
    fontSize: 18,
    opacity: 0.7,
    position: 'absolute',
    zIndex: 1,
    left: 10,
  },
});
export default SearchBox;
