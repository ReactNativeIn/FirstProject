import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, FlatList, Pressable} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionic from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';

const Post = () => {
  const [like, setLike] = useState(false);

  const postInfo = [
    {
      postTitle: 'mr shermon',
      postPersonImage: require('../storage/images/userProfile.png'),
      postImage: require('../storage/images/post1.jpg'),
      likes: 765,
      isLiked: false,
    },
    {
      postTitle: 'chillhouse',
      postPersonImage: require('../storage/images/profile5.jpg'),
      postImage: require('../storage/images/post2.jpg'),
      likes: 345,
      isLiked: false,
    },
    {
      postTitle: 'Tom',
      postPersonImage: require('../storage/images/profile4.jpg'),
      postImage: require('../storage/images/post3.jpg'),
      likes: 734,
      isLiked: false,
    },
    {
      postTitle: 'The_Groot',
      postPersonImage: require('../storage/images/profile3.jpg'),
      postImage: require('../storage/images/post4.jpg'),
      likes: 875,
      isLiked: false,
    },
  ];

  console.log('확인');

  const renderItem = ({item}) => {
    return (
      <View style={styles.wrapper}>
        <View style={styles.posteHeader}>
          <View style={styles.avatarWrapper}>
            <Image source={item.postPersonImage} style={styles.avatarImage} />
            <View style={{paddingLeft: 5}}>
              <Text style={styles.avatarText}>{item.postTitle}</Text>
            </View>
          </View>
          <Feather name="more-vertical" style={{fontSize: 20}} />
        </View>
        <View style={styles.postWrapper}>
          <Image source={item.postImage} style={styles.postImage} />
        </View>
        <View style={styles.postFooter}>
          <View style={styles.likeCommentWrapper}>
            <Pressable onPress={() => setLike(!like)}>
              <AntDesign
                name={like ? 'heart' : 'hearto'}
                style={[styles.like, {color: like ? 'red' : 'black'}]}
              />
            </Pressable>
            <Pressable>
              <Ionic name="ios-chatbubble-outline" style={styles.comment} />
            </Pressable>
          </View>
        </View>
        <View style={{paddingHorizontal: 15}}>
          <Text>
            Liked by {like ? 'you and' : ''}{' '}
            {like ? item.likes + 1 : item.likes} others
          </Text>
          <Text style={styles.explanation}>
            If enjoy the video ! Please like and Subscribe :)
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <FlatList
        data={postInfo}
        renderItem={renderItem}
        keyExtractor={item => item.postTitle}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.1,
  },
  posteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  avatarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  avatarText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  postWrapper: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postImage: {
    width: '100%',
    height: 400,
  },
  postFooter: {
    paddingHorizontal: 12,
    paddingVertical: 15,
  },
  likeCommentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  like: {
    paddingRight: 10,
    fontSize: 20,
  },
  comment: {
    fontSize: 20,
    paddingRight: 10,
  },
  explanation: {
    fontWeight: '700',
  },
});

export default Post;
