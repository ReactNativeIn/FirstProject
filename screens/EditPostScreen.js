import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  Image,
  Pressable,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';

function EditPostScreen() {
  const navigation = useNavigation();
  navigation.setOptions({
    headerRight: () => (
      <Pressable onPress={() => navigation.navigate('HomeTab')}>
        <Feather name="send" style={styles.sendIcon} />
      </Pressable>
    ),
  });
  const {params} = useRoute();

  // 라우트 파라미터의 description을 초깃값으로 사용
  const [description, setDescription] = useState(params.description);

  const onSubmit = useCallback(() => {
    // TODO: 포스트 수정
    // TODO: 포스트 및 포스트 목록 업데이트
    navigation.pop();
  }, [navigation]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ios: 'height'})}
      style={styles.block}
      keyboardVerticalOffset={Platform.select({
        ios: 88,
      })}>
      <ScrollView>
        <Image source={params.postImage} style={styles.postImage} />
        <TextInput
          style={styles.input}
          multiline={true}
          placeholder="이 사진에 대한 설명을 입력하세요..."
          textAlignVertical="top"
          value={description}
          onChangeText={setDescription}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

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
