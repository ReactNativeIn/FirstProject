import React, {useMemo} from 'react';
import {View, Image, Text, StyleSheet, Pressable} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

function CardComponent({user, photoURL, description, createdAt, id}) {
  const date = useMemo(
    () => (createdAt ? new Date(createdAt.seconds * 1000) : new Date()),
    [createdAt],
  );

  const onOpenProfile = () => {
    // 사용자 프로필 화면 열기
  };

  return (
    <View style={styles.block}>
      <View style={[styles.head, styles.paddingBlock]}>
        <Pressable style={styles.profile} onPress={onOpenProfile}>
          <Image
            source={
              user.photoURL
                ? {
                    uri: user.photoURL,
                  }
                : require('../assets/user.png')
            }
            resizeMode="cover"
            style={styles.avatar}
          />
        </Pressable>
        <View style={styles.display}>
          <Text style={styles.displayName}>{user.displayName}</Text>
          <Text>Lee 23, 2019</Text>
        </View>
      </View>
      <View>
        <Image source={{uri: photoURL}} style={styles.image} />
      </View>
      <View style={styles.paddingBlock}>
        <View>
          <Pressable>
            <AntDesign name="heart" style={{color: 'red'}} />
          </Pressable>
          <Pressable>
            <Ionicons name="chatbubbles" style={{color: 'black'}} />
          </Pressable>
        </View>
      </View>
      <View>
        <Text>101 likes</Text>
      </View>
      <View>
        <Text>
          <Text style={{fontWeight: '900'}}>Anpigon</Text>
          이번에는 리액트 네이티브(React Native)로 인스타그램 UI을 구현하는
          포스팅입니다. 다른 앱을 따라 만들어 보는 것은 굉장히 재미있습니다.
          구글에서 인스타그램 클론 코딩 강의를 찾아보니, 다른 개발자들이 올린
          동영상 강의를 몇 개 찾을 수 있었습니다.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  paddingBlock: {
    height: 45,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  display: {
    flex: 1,

    marginLeft: 8,
  },
  displayName: {
    fontSize: 16,
  },
  image: {
    height: 200,
    width: null,
    flex: 1,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  date: {
    color: '#757575',
    fontSize: 12,
    lineHeight: 18,
  },
});

export default CardComponent;
