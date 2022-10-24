import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  BackHandler,
} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import ProfileModal from '../components/ProfileModal';
import {launchImageLibrary} from 'react-native-image-picker';
import {useUserContext} from '../contexts/UserContext';
import {usePostContext} from '../contexts/PostContext';
import ItemEmpty from '../lib/ItemEmpty';

function EditProfile({route, navigation}) {
  const {user, setUser, joinUser, setJoinUser} = useUserContext(); // 사진의 res 정보를 바로 user에 담음
  const [modalShown, setModalShown] = useState(false);
  const [response, setResponse] = useState(user.profileImage);
  const modalClose = () => setModalShown(false); // ProfileModal 모달 닫기용
  const [name, setName] = useState(user.name); // 유저 이름
  const [nickname, setNickname] = useState(user.nickname); // 닉네임
  const [introduce, setIntroduce] = useState(user.introduce); // 소개
  const {post, setPost} = usePostContext();

  const checkP = ItemEmpty.check(post);

  const changeCheck = () => {
    // 변경사항이 있을 시 true
    if (
      name !== user.name ||
      nickname !== user.nickname ||
      introduce !== user.introduce ||
      response !== user.profileImage
    )
      return true;
  };
  const reset = () => {
    setName(user.name);
    setNickname(user.nickname);
    setIntroduce(user.introduce);
    setResponse(user.profileImage);
  };

  const onSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 512,
        maxHeight: 512,
        includeBase64: Platform.OS === 'android',
      },
      res => {
        if (res.didCancel) {
          return;
        }
        setResponse(res?.assets[0]?.uri);
      },
    );
    setModalShown(false);
  };
  const normalImage = () => {
    setResponse(null);
    setModalShown(false);
  };

  const onSubmit = () => {
    if (nickname === '') {
      Alert.alert('안됨!!!', '닉네임은 꼭 입력해주셔야됩니다~');
      return;
    }
    setUser(prev => ({
      ...prev,
      name: name,
      nickname: nickname,
      profileImage: response,
      introduce: introduce,
    }));

    const rejoin = joinUser.map(re =>
      re.uid === user.uid
        ? {
            ...user,
            name: name,
            nickname: nickname,
            profileImage: response,
            introduce: introduce,
          }
        : re,
    );

    if (checkP) {
      setPost(
        post.map(pos =>
          pos.email === user.email ? {...pos, nickname: nickname} : pos,
        ),
      );
    }

    setJoinUser(rejoin);

    setModalShown(false);

    navigation.goBack();
  };

  const handlePressBack = () => {
    if (changeCheck()) {
      Alert.alert('주의', '변경사항을 저장하지 않고 나가시겠습니까?', [
        {
          text: '취소',
          onPress: () => null,
        },
        {
          text: '넵',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
      return true;
    }
    return false;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handlePressBack);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handlePressBack);
    };
  }, [handlePressBack]);

  return (
    <KeyboardAvoidingView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <View style={styles.headerStyle} /* 헤더부분 */>
            <TouchableOpacity
              onPress={() => {
                changeCheck()
                  ? Alert.alert(
                      '주의',
                      '변경사항을 저장하지 않고 나가시겠습니까?',
                      [
                        {
                          text: '취소',
                          onPress: () => null,
                        },
                        {
                          text: '넵',
                          onPress: () => {
                            navigation.goBack();
                          },
                        },
                      ],
                    )
                  : navigation.goBack();
              }}>
              <Ionic name="close-outline" style={{fontSize: 35}} />
            </TouchableOpacity>
            <Text style={styles.headerText}>프로필 편집</Text>
            <TouchableOpacity
              onPress={() => {
                //  TODO: 변경이 눌린 후 변경사항을 저장하고(현재 컴포넌트(EditProfile.js의 상태를 저장))
                onSubmit();
              }}>
              <Ionic
                name="checkmark"
                style={{fontSize: 35, color: '#3493D9'}}
              />
            </TouchableOpacity>
          </View>
          <View style={{padding: 20, alignItems: 'center'}} /*프로필 사진 뷰*/>
            <Pressable onPress={() => setModalShown(true)}>
              <Image
                source={
                  response
                    ? {uri: response}
                    : require('../storage/images/user.png')
                } // 내 디렉토리에 있는 이미지 썼음 나중엔 데이터베이스에 있는 프로필 사진 경로로 가야함
                style={{width: 80, height: 80, borderRadius: 100}}
              />
            </Pressable>
            <Pressable onPress={() => setModalShown(true)}>
              <Text
                style={[
                  styles.textColor,
                  {fontSize: 20, fontWeight: 'bold', padding: 10},
                ]}>
                프로필 사진 변경
              </Text>
            </Pressable>
          </View>
          <ProfileModal
            modalShown={modalShown}
            setModalShown={modalClose} /* 모달 띄우는 컴포넌트 */
            onSelectImage={onSelectImage}
            normalImage={normalImage}
          />
          <View style={styles.viewPadding}>
            <Text
              style={{
                opacity: 0.5,
              }}>
              이름
            </Text>
            <TextInput
              placeholder="이름"
              value={name}
              style={styles.textInputStyle}
              onChangeText={setName}
            />
          </View>
          <View style={styles.viewPadding}>
            <Text
              style={{
                opacity: 0.5,
              }}>
              닉네임
            </Text>
            <TextInput
              placeholder="닉네임"
              value={nickname}
              style={styles.textInputStyle}
              onChangeText={setNickname}
            />
          </View>
          <View style={styles.viewPadding}>
            <Text
              style={{
                opacity: 0.5,
              }}>
              소개
            </Text>
            <TextInput
              placeholder="소개"
              value={introduce}
              style={styles.textInputStyle}
              onChangeText={setIntroduce}
            />
          </View>
          <Pressable
            android_ripple={{
              color: '#eee',
            }}
            onPress={() => {
              changeCheck()
                ? Alert.alert(
                    '주의',
                    '변경사항을 저장하지 않고 나가시겠습니까?',
                    [
                      {
                        text: '취소',
                        onPress: () => null,
                      },
                      {
                        text: '넵',
                        onPress: () => {
                          reset();
                          navigation.push('EditPrivacy');
                        },
                      },
                    ],
                  )
                : navigation.push('EditPrivacy');
            }}>
            <Text
              style={[
                styles.textColor,
                {fontSize: 20, fontWeight: 'bold', padding: 10},
                styles.viewPadding,
              ]}>
              개인정보 설정
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  textColor: {
    color: '#3493D9',
  },
  viewPadding: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  textInputStyle: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: '#CDCDCD',
  },
});

export default EditProfile;
