import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  useWindowDimensions,
  Animated,
  Keyboard,
  StyleSheet,
  Pressable,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

const imagePickerOption = {
  mediaType: 'photo',
  maxWidth: 768,
  maxHeight: 768,
  includeBase64: Platform.OS === 'android',
};

const AnimatedImage = ({res, photoURL}) => {
  const {width} = useWindowDimensions();

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

  const onPickImage = res => {
    if (res.didCancel || !res) {
      return;
    }
    navigation.push('EditPostScreen', {res, postIndex: selectPost.postIndex});
  };

  const onLaunchImageLibrary = () => {
    launchImageLibrary(imagePickerOption, onPickImage);
  };

  return (
    <Pressable style={styles.block} onPress={onLaunchImageLibrary}>
      <Animated.Image
        source={{uri: res.assets[0]?.uri}}
        style={[styles.image, {height: animation}]}
        resizeMode="cover"
      />
    </Pressable>
  );
};

export default AnimatedImage;

const styles = StyleSheet.create({
  image: {width: '100%'},
});
