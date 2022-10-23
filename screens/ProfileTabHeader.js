import React, {useEffect} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {ProfileBody, ProfileButtons} from '../components/ProfileBody';

const ProfileHeader = ({
  selectUser,
  followerCount,
  followingCount,
  postCount,
}) => {
  return (
    <View style={{width: '100%', padding: 10}}>
      <ProfileBody
        selectUser={selectUser}
        followerCount={followerCount}
        followingCount={followingCount}
        postCount={postCount}
      />
      <ProfileButtons email={selectUser.email} />
    </View>
  );
};

const styles = StyleSheet.create({
  margin: {
    marginBottom: 40,
  },
});

export default ProfileHeader;
