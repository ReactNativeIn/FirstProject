import React, {useState} from 'react';
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
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionic from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const SearchScreen = () => {
  const [image, setImage] = useState(null);

  const getData = data => {
    setImage(data);
  };

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
