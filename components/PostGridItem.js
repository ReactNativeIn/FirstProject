import React from 'react';
import {
  StyleSheet,
  useWindowDimensions,
  Image,
  Pressable,
  FlatList,
  View,
} from 'react-native';

function PostGridItem({post}) {
  const dimensions = useWindowDimensions();
  const size = (dimensions.width - 3) / 3;

  const onPress = () => {
    // TODO: 단일 포스트 조회 화면 띄우기
  };

  return (
    <View>
      <Pressable
        onPress={onPress}
        style={({pressed}) => [
          {
            opacity: pressed ? 0.6 : 1,
            width: size,
            height: size,
          },
          styles.block,
        ]}>
        <Image
          style={styles.image}
          source={require('../storage/images/post1.jpg')}
          resizeMethod="resize"
          resizeMode="cover"
        />
      </Pressable>
      <Pressable
        onPress={onPress}
        style={({pressed}) => [
          {
            opacity: pressed ? 0.6 : 1,
            width: size,
            height: size,
          },
          styles.block,
        ]}>
        <Image
          style={styles.image}
          source={require('../storage/images/post2.jpg')}
          resizeMethod="resize"
          resizeMode="cover"
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {},
  image: {
    backgroundColor: '#bdbdbd',
    width: '100%',
    height: '100%',
  },
});

export default PostGridItem;
