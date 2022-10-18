import React, {useState, useEffect} from 'react';
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
import {usePostContext} from '../contexts/PostContext';
import {useLikingContext} from '../contexts/LikingContext';
import {useUserContext} from '../contexts/UserContext';
import {useCommentsContext} from '../contexts/CommentsContext';

const Post = () => {
  const navigation = useNavigation();
  const [hidden, setHidden] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const {post, setPost} = usePostContext();
  const [like, setLike] = useState(false);
  const {comments} = useCommentsContext();
  const {liking, setLiking} = useLikingContext();
  const {user, joinUser} = useUserContext();

  post.map(po => {
    console.log('확인post: ');
    console.log(po);
  });
  let postInfo = [];
  console.log('확확호학1 -' + postInfo);

  // const nextPostInfo = postInfo.map((pos, index) => {
  //   let commentNum = 0,
  //     likeNum = 0,
  //     userAvatar = '',
  //     likeSet = false;

  //   for (let i = 0; i < post.length; i++) {
  //     if (postInfo[i].postIndex === pos.postIndex) {
  //       commentNum = commentNum + 1;
  //     }
  //   }

  //   pos.postIndex === index + 1 && {...postInfo, commentNum: commentNum};

  //   for (let i = 0; i < liking.length; i++) {
  //     if (liking[i].postIndex === pos.postIndex) {
  //       likeNum = likeNum + 1;
  //     }
  //   }

  //   pos.postIndex === index + 1 && {...postInfo, likeNum: likeNum};

  //   for (let i = 0; i < joinUser.length; i++) {
  //     if (joinUser[i].email === pos.email) {
  //       userAvatar = joinUser[i].profileImage;
  //       break;
  //     }
  //   }

  //   pos.postIndex === index + 1
  //     ? {...postInfo, userAvatar: userAvatar}
  //     : console.log(pos.postIndex === index + 1);

  // liking.map(l => {
  //   l.postIndex === pos.postIndex && l.email === pos.email
  //     ? {...postInfo, likeSet: true}
  //     : {...postInfo, likeSet: false};
  // });

  // for (let i = 0; i < liking.length; i++) {
  //   if (
  //     liking[i].postIndex === pos.postIndex &&
  //     liking[i].email === pos.email
  //   ) {

  //   }
  // }
  // });

  // nextPostInfo.map(pos => {
  //   console.log('-------' + userAvatar);
  // });

  // for (let i = 0; i < post.length; i++) {
  //   if (post[i].postIndex === i + 1) {
  //     commentNum = commentNum + 1;
  //   }
  // }

  // for (let i = 0; i < joinUser.length; i++) {
  //   if (joinUser[i].email === item.email) {
  //     userAvatar = joinUser[i];
  //     break;
  //   }
  // }

  // for (let i = 0; i < liking.length; i++) {
  //   if (liking[i].postIndex === item.postIndex) {
  //     likeNum = likeNum + 1;
  //     if (liking[i].email === user.email) {
  //       likeSet = true;
  //     }
  //   }
  // }

  // console.log('확212인' + postInfo); // 삭제 기능 확인

  const renderItem = ({item, index}) => {
    const date = item.date.split('-');

    const likeClick = () => {
      alert('click');
    };

    const follow = () => {
      alert('팔로우');
      setHidden(false);
    };

    return (
      <View style={styles.wrapper}>
        <View style={styles.posteHeader}>
          <View style={styles.avatarWrapper}>
            <Pressable
              onPress={() => navigation.push('ProfileTab', item.email)}>
              <Image
                source={
                  item.userAvatar
                    ? require('../storage/images/user.png')
                    : {uri: item.userAvatar}
                }
                style={styles.avatarImage}
              />
            </Pressable>
            <View style={{paddingLeft: 5}}>
              <Text style={styles.avatarText}>{item.nickname}</Text>
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
                        setPost(
                          post.filter(pos => pos.postIndex !== item.postIndex),
                        );
                      },
                    },
                  ]}
                />
              </>
            )}
          </View>
        </View>
        <View style={styles.postWrapper}>
          <Image
            source={
              item.photoURL
                ? require('../storage/images/post1.jpg')
                : {uri: item.photoURL}
            }
            style={styles.postImage}
          />
        </View>
        <View style={styles.postFooter}>
          <View style={styles.likeCommentWrapper}>
            <Pressable onPress={likeClick}>
              <AntDesign
                name={item.likeSet ? 'heart' : 'hearto'}
                style={[styles.like, {color: item.likeSet ? 'red' : 'black'}]}
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
            Liked by {item.likeSet ? 'you and' : ''} {item.likeNum} others
          </Text>
          <Text style={styles.explanation}>{item.content}</Text>
          <Text>
            {date[0]}년 {date[1]}월 {date[2]}일
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
        keyExtractor={item => item.postIndex}
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
