import React, {useState, useRef} from 'react';
import {View, Text, Image, StyleSheet, FlatList, Pressable} from 'react-native';
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
import {useFollowContext} from '../contexts/FollowContext';
import ItemEmpty from '../lib/ItemEmpty';

const Post = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const {post, setPost} = usePostContext(); // post 목록
  const {comments, setComments} = useCommentsContext(); // 댓글 목록
  const {liking, setLiking} = useLikingContext(); //좋아요 목록
  const {user, joinUser} = useUserContext(); // 로그인 유저, 유저 목록
  const {follow, setFollow} = useFollowContext(); // 팔로우 목록
  const postIndex = useRef(''); //수정할 post 번호값 저장

  const checkF = ItemEmpty.check(follow);
  const checkP = ItemEmpty.check(post);
  const checkL = ItemEmpty.check(liking);

  let follows,
    imsi = [{}];

  let commentNum = 0,
    likeNum = 0,
    userAvatar = '',
    likeSet = false;

  if (checkF) {
    follows = follow.filter(f => f.from_member === user.email); //팔로우 조회
  }

  if (checkP) {
    imsi = post.map(po => {
      (commentNum = 0), (likeNum = 0), (userAvatar = ''), (likeSet = false);
      comments?.map(com => {
        if (po.postIndex === com.postIndex) {
          commentNum = commentNum + 1;
        }
      });
      liking?.map(lik => {
        if (po.postIndex === lik.postIndex) {
          likeNum = likeNum + 1;
        }
      });
      joinUser?.map(jo => {
        if (po.email === jo.email) {
          userAvatar = jo.profileImage;
        }
      });
      liking?.map(lik => {
        if (po.postIndex === lik.postIndex && lik.email === user.email) {
          likeSet = true;
        }
      });
      po.commentNum = commentNum;
      po.likeNum = likeNum;
      po.userAvatar = userAvatar;
      po.likeSet = likeSet;
      return po; //{}했기 때문에 return 해줘야함
    });
  }

  const postInfo = [...imsi];

  const renderItem = ({item}) => {
    const date = item.date.split('-');

    const likeClick = () => {
      if (item.likeSet) {
        setLiking(
          liking.filter(
            lik => lik.postIndex !== item.postIndex || lik.email !== user.email,
          ),
        );
        item = {...item, likeSet: false};
      } else {
        checkL
          ? setLiking([
              ...liking,
              {postIndex: item.postIndex, email: user.email},
            ])
          : setLiking([{postIndex: item.postIndex, email: user.email}]);
      }
    };

    const followSet = fow => {
      alert(fow + '팔로우');
      checkF
        ? setFollow([
            ...follow,
            {
              from_member: user.email,
              to_member: fow,
            },
          ])
        : setFollow([
            {
              from_member: user.email,
              to_member: fow,
            },
          ]);
    };

    return (
      <View style={styles.wrapper}>
        <View style={styles.posteHeader}>
          <View style={styles.avatarWrapper}>
            <Pressable
              onPress={() =>
                navigation.push('ProfileTab', {email: item.email})
              }>
              <Image
                source={
                  item.userAvatar
                    ? {uri: item.userAvatar}
                    : require('../storage/images/user.png')
                }
                style={styles.avatarImage}
              />
            </Pressable>
            <View style={{paddingLeft: 5}}>
              <Text style={styles.avatarText}>{item.nickname}</Text>
            </View>
          </View>
          <View>
            {!follows?.some(fo => fo.to_member === item.email) ? (
              user.email !== item.email ? (
                <Pressable
                  style={styles.follow}
                  onPress={() => followSet(item.email)}>
                  <Text>팔로우</Text>
                </Pressable>
              ) : (
                <>
                  <Pressable
                    hitSlop={8}
                    onPress={() => {
                      setModalVisible(true);
                      postIndex.current = item.postIndex;
                    }}>
                    <Feather name="more-vertical" style={{fontSize: 20}} />
                  </Pressable>
                </>
              )
            ) : null}
          </View>
        </View>
        <View style={styles.postWrapper}>
          <Image
            source={
              item.photoURL
                ? {uri: item.photoURL}
                : require('../storage/images/post1.jpg')
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
      {checkP ? (
        <>
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
                  navigation.push('EditPostScreen', {
                    postIndex: postIndex.current,
                  });
                },
              },
              {
                icon: 'delete',
                text: '게시물 삭제',
                onPress: () => {
                  setComments(
                    comments.filter(com => com.postIndex !== postIndex.current),
                  );
                  setLiking(
                    liking.filter(lik => lik.postIndex !== postIndex.current),
                  );
                  setPost(
                    post.filter(pos => pos.postIndex !== postIndex.current),
                  );
                },
              },
            ]}
          />
        </>
      ) : (
        <View style={{backgroundColor: 'red', flex: 1}}></View>
      )}
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
