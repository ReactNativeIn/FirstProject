import React, {useEffect} from 'react';
import {View, Text, StatusBar, ScrollView, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionic from 'react-native-vector-icons/Ionicons';
import Stories from '../screenComponents/Stories';
import Post from '../screenComponents/Post';

const HomeTab = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <FontAwesome name="plus-square-o" style={styles.headerLeft} />
      ),
      headerTitle: () => <Text style={styles.title}>Instagram</Text>,
      headerTitleAlign: 'center', //헤더의 텍스트를 가운데로 정렬
      headerRight: () => (
        <Feather style={styles.headerRight} name="navigation" />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.wrapper}>
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
        animated={true}
      />
      <ScrollView>
        <Stories />
        <Post />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    height: '100%',
  },
  headerLeft: {
    fontSize: 24,
    marginLeft: 10,
  },
  title: {
    fontFamily: 'Lobster-Regular',
    fontSize: 25,
    fontWeight: '500',
  },
  headerRight: {
    fontSize: 24,
    marginRight: 10,
  },
});
export default HomeTab;
