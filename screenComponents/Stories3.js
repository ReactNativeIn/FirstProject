import React from 'react';
import {View, Text, Image, StyleSheet, FlatList, Pressable} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

const Stories = () => {
  const navigation = useNavigation();

  const storyInfo = [
    {
      id: 1,
      name: 'Your Story',
      image: require('../storage/images/userProfile.png'),
    },
    {
      id: 0,
      name: 'Ram_Charan',
      image: require('../storage/images/profile1.jpg'),
    },
    {
      id: 0,
      name: 'Tom',
      image: require('../storage/images/profile2.jpg'),
    },
    {
      id: 0,
      name: 'The_Groot',
      image: require('../storage/images/profile3.jpg'),
    },
    ,
    {
      id: 0,
      name: 'loverland',
      image: require('../storage/images/profile4.jpg'),
    },
    ,
    {
      id: 0,
      name: 'chillhouse',
      image: require('../storage/images/profile5.jpg'),
    },
  ];

  const renderItem = ({item}) => (
    <Pressable
      onPress={() => {
        navigation.push('ProfileTab');
      }}>
      <View style={styles.wrapper}>
        {item.id == 1 ? (
          <View style={styles.first}>
            <Entypo name="circle-with-plus" style={styles.firstEntypo} />
          </View>
        ) : null}
        <View style={styles.imageWrapper}>
          <Image
            source={item.image}
            style={{
              resizeMode: 'cover',
              width: '92%',
              height: '92%',
              borderRadius: 100,
              backgroundColor: 'orange',
            }}
          />
        </View>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 10,
            opacity: data.id == 0 ? 1 : 0.5,
          }}>
          {item.name}
        </Text>
      </View>
    </Pressable>
  );
  return (
    <SafeAreaView>
      <FlatList
        data={storyInfo}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 8,
    position: 'relative',
  },
  first: {
    position: 'absolute',
    bottom: 15,
    right: 10,
    zIndex: 1,
  },
  firstEntypo: {
    fontSize: 20,
    color: '#405de6',
    backgroundColor: 'white',
    borderRadius: 100,
  },
  imageWrapper: {
    width: 68,
    height: 68,
    backgroundColor: 'white',
    borderWidth: 1.8,
    borderRadius: 100,
    borderColor: '#c13584',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Stories;
