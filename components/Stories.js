import React, {useContext} from 'react';
import {View, Text, Image, StyleSheet, FlatList, Pressable} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFollowContext} from '../contexts/FollowContext';
import {useUserContext} from '../contexts/UserContext';

const Stories = () => {
  const navigation = useNavigation();
  const {follow, setFollow} = useFollowContext();
  const {user, joinUser} = useUserContext();
  console.log(joinUser);

  let storyInfo = [user];

  const follows = follow.filter(f => f.from_member === user.email); //팔로우 조회
  console.log(follows);
  follows.map(f => console.log('팔로우 조회 확인'.concat(f.to_member)));
  joinUser.map(u => console.log('확2'.concat(u.email)));

  const test = joinUser.filter(u => u.email === 'test1@first.com');
  console.log('test'.concat(test[0].email));

  //팔로우된 계정 조회
  for (let i = 0; i < follows.length; i++) {
    console.log('확');
    for (let j = 0; j < joinUser.length; j++) {
      if (joinUser[j].email === follows[i].to_member) {
        storyInfo = [...storyInfo, joinUser[j]];
      }
    }
  }

  storyInfo.map(s => console.log('확인'.concat(s.profileImage)));

  // const userInfo = follows.filter(f =>
  //   joinUser.filter(u => u.email === f.to_member),
  // );

  // console.log('확'.concat(userInfo[0].email));

  /*
  Image컴포넌트의 require는 동적으로 이미지를 변경할 수 없음. 고정 되어 있어야함
  */
  const renderItem = ({item}) => {
    return (
      <Pressable
        onPress={() => {
          navigation.push('ProfileTab', item.email);
        }}>
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
                  ? require('../storage/images/user.png')
                  : {uri: item.profileImage}
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
