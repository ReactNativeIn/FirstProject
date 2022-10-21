import React from 'react';
import {View, Text, Image, StyleSheet, FlatList, Pressable} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFollowContext} from '../contexts/FollowContext';
import {useUserContext} from '../contexts/UserContext';
import ItemEmpty from '../lib/ItemEmpty';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

const imagePickerOption = {
  mediaType: 'photo',
  maxWidth: 768,
  maxHeight: 768,
  includeBase64: Platform.OS === 'android',
};

const Stories = () => {
  const navigation = useNavigation();
  const {follow} = useFollowContext();
  const {user, joinUser, setUser, setJoinUser} = useUserContext();

  console.log('확인 : ' + user);
  const checkF = ItemEmpty.check(follow);
  let storyInfo = [user];

  if (checkF) {
    const follows = follow.filter(f => f.from_member === user.email); //팔로우 조회

    //팔로우된 계정 조회
    for (let i = 0; i < follows.length; i++) {
      for (let j = 0; j < joinUser.length; j++) {
        if (joinUser[j].email === follows[i].to_member) {
          storyInfo = [...storyInfo, joinUser[j]];
        }
      }
    }
  }

  const onPickImage = res => {
    if (res.didCancel || !res) {
      return;
    }
    setUser({...user, profileImage: res.assets[0]?.uri});
    setJoinUser(
      joinUser.map(join =>
        join.email === user.email
          ? {...user, profileImage: res.assets[0]?.uri}
          : join,
      ),
    );
  };

  const onLaunchImageLibrary = () => {
    launchImageLibrary(imagePickerOption, onPickImage);
  };

  const renderItem = ({item}) => {
    return (
      <>
        <Pressable
          onPress={
            item.email === user.email
              ? () => onLaunchImageLibrary()
              : () => navigation.push('ProfileTab', {email: item.email})
          }>
          <View style={styles.wrapper}>
            {item.email === user.email ? (
              <View style={styles.first}>
                <Entypo name="circle-with-plus" style={styles.firstEntypo} />
              </View>
            ) : null}
            <View style={styles.imageWrapper}>
              <Image
                source={
                  item.profileImage
                    ? {uri: item.profileImage}
                    : require('../storage/images/user.png')
                }
                style={styles.image}
              />
            </View>
            <Text
              style={[
                styles.text,
                {opacity: item.email === user.email ? 1 : 0.5},
              ]}>
              {item.nickname}
            </Text>
          </View>
        </Pressable>
      </>
    );
  };

  return (
    <SafeAreaView>
      <FlatList
        data={storyInfo}
        renderItem={renderItem}
        keyExtractor={item => item.email}
        horizontal={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 8,
    position: 'relative',
  },
  first: {
    position: 'absolute',
    bottom: 15,
    right: 10,
    zIndex: 1,
  },
  firstEntypo: {
    fontSize: 20,
    color: '#405de6',
    backgroundColor: 'white',
    borderRadius: 100,
  },
  imageWrapper: {
    width: 68,
    height: 68,
    backgroundColor: 'white',
    borderWidth: 1.8,
    borderRadius: 100,
    borderColor: '#c13584',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  image: {
    resizeMode: 'cover',
    width: '92%',
    height: '92%',
    borderRadius: 100,
    backgroundColor: 'orange',
  },
  text: {
    textAlign: 'center',
    fontSize: 10,
  },
});

export default Stories;
