import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {ProfileBody, ProfileButtons} from '../components/ProfileBody';
import ProfileGridview from '../components/ProfileGridview';
import {useUserContext} from '../contexts/UserContext';
import ItemEmpty from '../lib/ItemEmpty';
import {usePostContext} from '../contexts/PostContext';
import {useFollowContext} from '../contexts/FollowContext';

const ProfileScreen = ({route}) => {
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

  if (checkP) {
    post.map(data => {
      if (data.email === selectUser.email) {
        postCount = postCount + 1;
      }
    });
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

  return (
    <ScrollView>
      <View style={{width: '100%', height: '100%', backgroundColor: 'white'}}>
        <View style={{width: '100%', padding: 10}}>
          <ProfileBody
            nickname={selectUser.nickname}
            profileImage={selectUser.profileImage}
            followerCount={followerCount}
            followingCount={followingCount}
            postCount={postCount}
          />
          <ProfileButtons email={selectUser.email} />
        </View>
        <ScrollView>
          <ProfileGridview />
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  margin: {
    marginBottom: 40,
  },
});

export default ProfileScreen;
