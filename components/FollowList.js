import React from 'react';
import {View, Text, Image, StyleSheet, FlatList, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

const FollowList = () => {
  const navigation = useNavigation();

  const followlist = [
    {
      id: 1,
      name: 'Ram_Charan',
      accountName: 'Ram Charan',
      image: require('../storage/images/profile4.jpg'),
    },
    {
      id: 2,
      name: 'The_Tom',
      accountName: 'Tom',
      image: require('../storage/images/profile5.jpg'),
    },
    {
      id: 3,
      name: 'live_long',
      accountName: 'Live Long',
      image: require('../storage/images/profile2.jpg'),
    },
    {
      id: 4,
      name: 'the_real_hero',
      accountName: 'Ram Charan',
      image: require('../storage/images/post1.jpg'),
    },
    {
      id: 4,
      name: 'the_jerry',
      accountName: 'The Jerry',
      image: require('../storage/images/post2.jpg'),
    },
    {
      id: 5,
      name: 'angry_bird',
      accountName: 'Angry Bird',
      image: require('../storage/images/post3.jpg'),
    },
    {
      id: 6,
      name: 'mr_bean',
      accountName: 'Mr Bean',
      image: require('../storage/images/post4.jpg'),
      s,
    },
    {
      id: 7,
      name: 'the_Jd',
      accountName: 'Mr JD',
      image: require('../storage/images/post5.jpg'),
    },
    {
      id: 8,
      name: '_don_',
      accountName: 'Don',
      image: require('../storage/images/post6.jpg'),
    },
    {
      id: 9,
      name: 'black_white',
      accountName: 'blackWhite',
      image: require('../storage/images/post7.jpg'),
    },
    {
      id: 10,
      name: 'iron_man',
      accountName: 'Iron Man',
      image: require('../storage/images/post8.jpg'),
    },
    {
      id: 11,
      name: 'funny_videos',
      accountName: 'Funny Video Official',
      image: require('../storage/images/post9.jpg'),
    },
    {
      id: 12,
      name: 'mr_jhon',
      accountName: 'Mr Jhony',
      image: require('../storage/images/post10.jpg'),
    },
  ];

  const renderItem = ({item}) => {
    return (
      <Pressable
        onPress={() => {
          navigation.push('ProfileTab');
        }}>
        <View style={styles.wrapper}>
          {item.id === 1 ? (
            <View style={styles.first}>
              <Entypo name="circle-with-plus" style={styles.firstEntypo} />
            </View>
          ) : null}
          <View style={styles.imageWrapper}>
            <Image source={item.image} style={styles.image} />
          </View>
          <Text style={[styles.text, {opacity: item.id === 0 ? 1 : 0.5}]}>
            {item.name}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView>
      <FlatList
        data={followlist}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        vertical={true}
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
  image: {
    resizeMode: 'cover',
    width: '92%',
    height: '92%',
    borderRadius: 100,
    backgroundColor: 'orange',
  },
  text: {
    textAlign: 'center',
    fontSize: 10,
  },
});

export default FollowList;
