import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import IconRightButton from '../components/IconRightButton';
import {usePostContext} from '../contexts/PostContext';
import AnimatedImage from '../components/AnimatedImage';

const EditPostScreen = ({route}) => {
  const navigation = useNavigation();
  const {post, setPost} = usePostContext();

  const selectPost = post.find(po => po.postIndex === route.params.postIndex);

  const [content, setContent] = useState(selectPost.content);

  const onSubmit = useCallback(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    // TODO: 포스트 수정
    // TODO: 포스트 및 포스트 목록 업데이트
    setPost(
      post.map(item =>
        item.postIndex === selectPost.postIndex
          ? {
              ...item,
              photoURL: selectPost.photoURL,
              content: content,
              date: year + '-' + month + '-' + day,
            }
          : item,
      ),
    );
    navigation.pop();
  }, [navigation, post, content]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <IconRightButton onPress={onSubmit} name="send" />,
    });
  }, [navigation, onSubmit]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ios: 'height'})}
      style={styles.block}
      keyboardVerticalOffset={Platform.select({
        ios: 88,
      })}>
      <AnimatedImage uri={selectPost.photoURL} />
      <TextInput
        style={styles.input}
        multiline={true}
        textAlignVertical="top"
        value={content}
        onChangeText={setContent}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
  },
  input: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    flex: 1,
    fontSize: 16,
  },
  postImage: {
    width: '100%',
    height: 300,
  },
  sendIcon: {
    fontSize: 24,
  },
});

export default EditPostScreen;
