import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {useUserContext} from '../contexts/UserContext';
import {useFollowContext} from '../contexts/FollowContext';
import ItemEmpty from '../lib/ItemEmpty';
export const ProfileBody = ({
  nickname,
  profileImage,
  postCount,
  followerCount,
  followingCount,
}) => {
  return (
    <View>
      {nickname ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              {nickname}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Feather
              name="menu"
              style={{
                fontSize: 25,
              }}
            />
          </View>
        </View>
      ) : null}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingVertical: 20,
        }}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Image
            source={
              profileImage
                ? {uri: profileImage}
                : require('../storage/images/user.png')
            }
            style={{
              resizeMode: 'cover',
              width: 80,
              height: 80,
              borderRadius: 100,
            }}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>{postCount}</Text>
          <Text>게시물</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>
            {followerCount}
          </Text>
          <Text>팔로워</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>
            {followingCount}
          </Text>
          <Text>팔로잉</Text>
        </View>
      </View>
    </View>
  );
};

export const ProfileButtons = ({email}) => {
  const navigation = useNavigation();
  const {follow, setFollow} = useFollowContext();
  const {user} = useUserContext();

  const checkF = ItemEmpty.check(follow);
  let follows = [],
    checkFollows = false;

  if (checkF) {
    follows = follow.filter(data => data.from_member === user.email);

    checkFollows = follows.some(fo => fo.to_member === email);
  }

  const followsSet = fow => {
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

  const followsDelete = fow => {
    alert(fow + '팔로우 취소');
    setFollow(
      follow.filter(
        fo => fo.from_member === user.email && fo.to_member === email,
      ),
    );
  };

  return (
    <>
      {!email || email === user.email ? (
        <View style={styles.ButtonsWrapper}>
          <Pressable
            style={{
              flex: 1,
            }}
            onPress={() => {
              navigation.push('EditProfile');
            }}>
            <View style={styles.ProfileEdits}>
              <Text style={styles.EditText}>프로필 수정</Text>
            </View>
          </Pressable>
        </View> // 프로필수정 - End
      ) : checkFollows ? (
        <View style={styles.EditProfiles}>
          <TouchableOpacity
            onPress={() => followsDelete(email)}
            style={{flex: 1}}>
            <View
              style={[
                styles.followButton,
                {
                  backgroundColor: null,
                  borderWidth: 1,
                },
              ]}>
              <Text
                style={{
                  color: 'black',
                }}>
                팔로잉
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.EditProfiles}>
          <TouchableOpacity onPress={() => followsSet(email)} style={{flex: 1}}>
            <View
              style={[
                styles.followButton,
                {
                  backgroundColor: '#3493D9',
                  borderWidth: 0,
                },
              ]}>
              <Text
                style={{
                  color: 'white',
                }}>
                팔로우
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  ButtonsWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 5,
  },
  ProfileEdits: {
    width: '100%',
    height: 35,
    borderRadius: 5,
    borderColor: '#DEDEDE',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  EditText: {
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 1,
    opacity: 0.8,
  },
  EditProfiles: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  followButton: {
    width: '100%',
    height: 35,
    borderRadius: 5,
    borderColor: '#DEDEDE',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
