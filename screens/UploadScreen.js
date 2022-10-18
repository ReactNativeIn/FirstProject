import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  View,
  Platform,
  Text,
  useWindowDimensions,
  TextInput,
  Animated,
  Keyboard,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import IconRightButton from '../components/IconRightButton';
import {usePostContext} from '../contexts/PostContext';
import {useUserContext} from '../contexts/UserContext';

const UploadScrenn = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {res} = route.params || {};
  const {width} = useWindowDimensions();
  const {post, setPost} = usePostContext();
  const {user} = useUserContext();

  const [content, setContent] = useState('');

  // KeyboardAvoidingView를 사용해 키보드가 컴포넌트를 가리지 않도록 구현할 수 있지만, 지금과 같은 레이아웃일 때는 구현하기가 좀 복잡
  //이벤트 등록 , 이벤트가 더 쉽고 자연
  //useEffect로 구현- 컴포넌트가 화면에 나타났을 때 등록 하고, 사라질 때 이벤트를 해제하기 위해서
  const animation = useRef(new Animated.Value(width)).current;
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const didShow = Keyboard.addListener('keyboardDidShow', () =>
      setIsKeyboardOpen(true),
    ); //키보드가 나타났을때
    const didHide = Keyboard.addListener('keyboardDidHide', () =>
      setIsKeyboardOpen(false),
    ); //키보드가 사라졌을때

    return () => {
      didShow.remove();
      didHide.remove();
    };
  }, []);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isKeyboardOpen ? 0 : width,
      useNativeDriver: false,
      duration: 150,
      delay: 100,
    }).start();
  }, [isKeyboardOpen, width, animation]);

  const nextIndex = Math.max(...post.map(pos => pos.postIndex)) + 1;

  const onSubmit = useCallback(() => {
    console.log(content);
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    //포스트 작성 로직
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
      <Animated.Image
        source={{uri: res.assets[0]?.uri}}
        style={[styles.image, {height: animation}]}
        resizeMode="cover"
      />
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
