import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Pressable,
  Button,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionic from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import ActionSheetModal from './ActionSheetModal';
import {useNavigation} from '@react-navigation/native';

const Post = () => {
  const [like, setLike] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const postInfo = [
    {
      postTitle: 'mr shermon',
      postPersonImage: require('../storage/images/userProfile.png'),
      postImage: require('../storage/images/post1.jpg'),
      description: 'If enjoy the video ! Please like and Subscribe :)',
      likes: 765,
      date: new Date(),
      isLiked: false,
    },
    {
      postTitle: 'chillhouse',
      postPersonImage: require('../storage/images/profile5.jpg'),
      postImage: require('../storage/images/post2.jpg'),
      description: 'If enjoy the video ! Please like and Subscribe :)',
      likes: 345,
      date: new Date(),
      isLiked: false,
    },
    {
      postTitle: 'Tom',
      postPersonImage: require('../storage/images/profile4.jpg'),
      postImage: require('../storage/images/post3.jpg'),
      description: 'If enjoy the video ! Please like and Subscribe :)',
      likes: 734,
      date: new Date(),
      isLiked: false,
    },
    {
      postTitle: 'The_Groot',
      postPersonImage: require('../storage/images/profile3.jpg'),
      postImage: require('../storage/images/post4.jpg'),
      description: 'If enjoy the video ! Please like and Subscribe :)',
      likes: 875,
      date: new Date(),
      isLiked: true,
    },
  ];

  const renderItem = ({item}) => {
    const year = item.date.getFullYear();
    const month = item.date.getMonth() + 1;
    const day = item.date.getDate();

    const follow = () => {
      alert('팔로우');
      setHidden(false);
    };

    return (
      <View style={styles.wrapper}>
        <View style={styles.posteHeader}>
          <View style={styles.avatarWrapper}>
            <Pressable onPress={() => navigation.push('ProfileTab')}>
              <Image source={item.postPersonImage} style={styles.avatarImage} />
            </Pressable>
            <View style={{paddingLeft: 5}}>
              <Text style={styles.avatarText}>{item.postTitle}</Text>
            </View>
          </View>
          <View>
            {/*자신의 게시물이면 ... , 타인의 게시물이면 팔로우 버튼 */}
            {item.isLiked ? (
              hidden ? (
                <Pressable style={styles.follow} onPress={follow}>
                  <Text>팔로우</Text>
                </Pressable>
              ) : null
            ) : (
              <>
                <Pressable
                  hitSlop={8}
                  onPress={() => {
                    setModalVisible(true);
                  }}>
                  <Feather name="more-vertical" style={{fontSize: 20}} />
                </Pressable>
                <ActionSheetModal
                  visible={modalVisible}
                  onClose={() => setModalVisible(false)}
                  actions={[
                    {
                      icon: 'edit',
                      text: '설명 수정',
                      onPress: () => {
                        navigation.push('EditPostScreen', {
                          description: item.description,
                          postImage: item.postImage,
                        });
                      },
                    },
                    {
                      icon: 'delete',
                      text: '게시물 삭제',
                      onPress: () => {
                        alert('삭제');
                      },
                    },
                  ]}
                />
              </>
            )}
          </View>
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
            <Pressable
              onPress={() => {
                navigation.push('CommentScreen');
              }}>
              <Ionic name="ios-chatbubble-outline" style={styles.comment} />
            </Pressable>
          </View>
        </View>
        <View style={{paddingHorizontal: 15}}>
          <Text>
            Liked by {like ? 'you and' : ''}{' '}
            {like ? item.likes + 1 : item.likes} others
          </Text>
          <Text style={styles.explanation}>{item.description}</Text>
          <Text>
            {year}년 {month}월 {day}일
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
  follow: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: 70,
    height: 34,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'gray',
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
