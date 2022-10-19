import React, {useState} from 'react';
import {View, ScrollView, Dimensions} from 'react-native';
import SearchBox from '../components/SearchBox';

const SearchScreen = () => {
  const [image, setImage] = useState(null);

  const windowWidth = Dimensions.get('window').width;
  const windoeHeight = Dimensions.get('window').height;

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        position: 'relative',
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchBox />
      </ScrollView>
    </View>
  );
};

export default SearchScreen;
