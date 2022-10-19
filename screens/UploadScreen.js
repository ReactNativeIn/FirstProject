import React, {useEffect, useState, useRef, useCallback} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import IconRightButton from '../components/IconRightButton';
import {usePostContext} from '../contexts/PostContext';
import {useUserContext} from '../contexts/UserContext';
import AnimatedImage from '../components/AnimatedImage';

const UploadScrenn = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {res} = route.params || {};
  const {post, setPost} = usePostContext();
  const {user} = useUserContext();

  const [content, setContent] = useState('');

  const nextIndex = Math.max(...post.map(pos => pos.postIndex)) + 1;

  const onSubmit = useCallback(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    setPost([
      ...post,
      {
        postIndex: nextIndex,
        photoURL: res.assets[0]?.uri,
        nickname: user.nickname,
        content: content,
        date: year + '-' + month + '-' + day,
        email: user.email,
      },
    ]);
    navigation.pop();
  }, [res, user, content, navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <IconRightButton onPress={onSubmit} name="send" />,
    });
  }, [navigation, onSubmit]);

  return (
    <View style={styles.wrapper}>
      <AnimatedImage uri={res.assets[0]?.uri} />
      <TextInput
        style={styles.input}
        multiline={true}
        placeholder="이 사진에 대한 설명을 입력하세요..."
        textAlignVertical="top"
        value={content}
        onChangeText={setContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {width: '100%'},
  input: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    flex: 1,
    fontSize: 16,
  },
});

export default UploadScrenn;
