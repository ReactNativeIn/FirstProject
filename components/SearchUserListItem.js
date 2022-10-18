import React from 'react';
import {Platform, Pressable, StyleSheet, Text, Image, View} from 'react-native';
import {useUserContext} from '../contexts/UserContext';

function truncate(text) {
  // 정규식을 사용해 모든 줄 바꿈 문자 제거
  const replaced = text.replace(/\n/g, ' ');
  if (replaced.length <= 100) {
    return replaced;
  }
  return replaced.slice(0, 100).concat('...');
}

function SearchUserListItem({log}) {
  const {email, nickname} = log; // 사용하기 편하게 객체 구조 분해 할당
  const {user} = useUserContext();
  return (
    <Pressable
      style={({pressed}) => [
        styles.block,
        Platform.OS === 'ios' && pressed && {backgroundColor: '#efefef'},
      ]}
      android_ripple={{color: '#ededed'}}>
      <View style={styles.container}>
        <View style={styles.imageWrapper}>
          <Image
            source={
              user.profileImage
                ? require('../storage/images/userProfile.png')
                : {uri: user.profileImage}
            }
            style={styles.image}
          />
        </View>
        <Text style={styles.title}>{email}</Text>
        <Text style={styles.displayName}>{'#' + nickname}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  date: {
    fontSize: 12,
    color: '#546e7a',
    marginBottom: 8,
  },
  title: {
    color: '#263238',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    marginRight: 10,
    position: 'absolute',
    left: 100,
    top: 10,
  },
  body: {
    color: '#37474f',
    fontSize: 16,
    lineHeight: 21,
  },
  displayName: {
    color: '#263238',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 8,
    position: 'absolute',
    left: 100,
    top: 35,
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
    width: '94%',
    height: '94%',
    borderRadius: 100,
    backgroundColor: 'orange',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SearchUserListItem;
