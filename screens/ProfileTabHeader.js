import React, {useEffect} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {ProfileBody, ProfileButtons} from '../components/ProfileBody';
import {useUserContext} from '../contexts/UserContext';
import ItemEmpty from '../lib/ItemEmpty';
import {usePostContext} from '../contexts/PostContext';
import {useFollowContext} from '../contexts/FollowContext';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation, useRoute} from '@react-navigation/native';

const ProfileHeader = ({
  selectUser,
  followerCount,
  followingCount,
  postCount,
}) => {
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          hitSlop={8}
          onPress={() => {
            alert('설정');
          }}>
          <Feather
            name="menu"
            style={{
              fontSize: 25,
            }}
          />
        </Pressable>
      ),
    });
  }, [navigation]);

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
