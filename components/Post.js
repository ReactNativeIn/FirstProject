import React, {useState, useRef} from 'react';
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

  const {post, setPost} = usePostContext(); // post 목록
  const {comments} = useCommentsContext(); // 댓글 목록
  const {liking, setLiking} = useLikingContext(); //좋아요 목록
  const {user, joinUser} = useUserContext(); // 로그인 유저, 유저 목록

  let commentNum = 0,
    likeNum = 0,
    userAvatar = '',
    likeSet = false;

  console.log('랜더 확인');
  post.map(lik => {
    console.log(lik);
  });

  const imsi = post.map(po => {
    (commentNum = 0), (likeNum = 0), (userAvatar = ''), (likeSet = false);
    comments.map(com => {
      if (po.postIndex === com.postIndex) {
        commentNum = commentNum + 1;
      }
    });
    liking.map(lik => {
      if (po.postIndex === lik.postIndex) {
        likeNum = likeNum + 1;
      }
    });
    joinUser.map(jo => {
      if (po.email === jo.email) {
        userAvatar = jo.profileImage;
      }
    });
    liking.map(lik => {
      if (po.postIndex === lik.postIndex && lik.email === user.email) {
        likeSet = true;
      }
    });
    po.commentNum = commentNum;
    po.likeNum = likeNum;
    po.userAvatar = userAvatar;
    po.likeSet = likeSet;
    console.log('확인!!' + po.postIndex + ' _ ' + po.userAvatar);
    return po; //{}했기 때문에 return 해줘야함
  });

  const postInfo = [...imsi];
  const postIndex = useRef('');

  const renderItem = ({item}) => {
    const date = item.date.split('-');

    const likeClick = () => {
      console.log(item.likeSet);
      if (item.likeSet) {
        console.log('te');
        setLiking(
          liking.filter(
            lik => lik.postIndex !== item.postIndex || lik.email !== user.email,
          ),
        );
        item = {...item, likeSet: false};
      } else {
        setLiking([...liking, {postIndex: item.postIndex, email: user.email}]);
      }
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
                    postIndex.current = item.postIndex;
                    console.log('해당1 - ' + postIndex.current);
                  }}>
                  <Feather name="more-vertical" style={{fontSize: 20}} />
                </Pressable>
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
                navigation.push('CommentScreen', {postIndex: item.postIndex});
              }}>
              <Ionic name="ios-chatbubble-outline" style={styles.comment} />
            </Pressable>
          </View>
        </View>
        <View style={{paddingHorizontal: 15}}>
          <Text>좋아요 개수: {item.likeNum}</Text>
          <Text>댓글 개수: {item.commentNum}</Text>
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
      <ActionSheetModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        actions={[
          {
            icon: 'edit',
            text: '설명 수정',
            onPress: () => {
              console.log('해당2' + postIndex.current);
              navigation.push('EditPostScreen', {
                postIndex: postIndex.current,
              });
            },
          },
          {
            icon: 'delete',
            text: '게시물 삭제',
            onPress: () => {
              setPost(post.filter(pos => pos.postIndex !== postIndex.current));
            },
          },
        ]}
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
