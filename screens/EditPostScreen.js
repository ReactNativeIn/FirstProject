import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import IconRightButton from '../components/IconRightButton';
import {usePostContext} from '../contexts/PostContext';

const EditPostScreen = () => {
  const navigation = useNavigation();
  const {post, setPost} = usePostContext();
  const route = useRoute();
  const {params} = route.params || {};
  const {res} = route.params || {};

  const selectPost = post.find(po => po.postIndex === params.postIndex);

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
              photoURL: res ? res.assets[0]?.uri : selectPost.photoURL,
              content: content,
              date: year + '-' + month + '-' + day,
            }
          : item,
      ),
    );
    navigation.pop();
  }, [res, navigation, post, content]);

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
      <AnimatedImage res={res} />
      <Image
        source={
          selectPost.photoURL
            ? require('../storage/images/post1.jpg')
            : {uri: selectPost.photoURL}
        }
        style={styles.postImage}
      />
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
