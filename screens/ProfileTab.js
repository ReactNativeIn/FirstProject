import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {usePostContext} from '../contexts/PostContext';
import ProfileHeader from './ProfileTabHeader';
import {useUserContext} from '../contexts/UserContext';
import {useFollowContext} from '../contexts/FollowContext';
import ItemEmpty from '../lib/ItemEmpty';
import {createIconSetFromFontello} from 'react-native-vector-icons';
const ProfileTab = ({route, navigation}) => {
  const {user, joinUser} = useUserContext();
  const {post} = usePostContext();
  const {follow} = useFollowContext();

  const checkR = ItemEmpty.check(route.params);
  const checkP = ItemEmpty.check(post);
  const checkF = ItemEmpty.check(follow);
  const userEmail = checkR ? route.params.email : user.email;

  const selectUser = joinUser.find(data => data.email === userEmail);

  console.log('----- ' + selectUser.email);
  let postCount = 0;
  let followingCount = 0;
  let followerCount = 0;
  let searchData;

  if (checkP) {
    post.map(data => {
      if (data.email === selectUser.email) {
        postCount = postCount + 1;
      }
    });
    searchData = post.filter(data => data.email === selectUser.email);
  }

  if (checkF) {
    follow.map(data => {
      if (data.from_member === selectUser.email) {
        followingCount = followingCount + 1;
      }
      if (data.to_member === selectUser.email) {
        followerCount = followerCount + 1;
      }
    });
  }

  const renderItem = ({item}) => {
    return (
      <Image
        source={item.photoURL ? {uri: item.photoURL} : null}
        style={styles.image}
      />
    );
  };

  return (
    <FlatList
      ListHeaderComponent={
        <ProfileHeader
          selectUser={selectUser}
          followerCount={followerCount}
          followingCount={followingCount}
          postCount={postCount}
          email={selectUser.email}
        />
      }
      data={searchData}
      renderItem={renderItem}
      keyExtractor={item => item.postIndex}
      numColumns={3}
    />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'red',
  },
  image: {
    width: '33%',
    height: 150,
    margin: 1,
  },
});

export default ProfileTab;
