import React, {useCallback, useState} from 'react';
import {
  Alert,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {useUserContext} from '../contexts/UserContext';
import BorderedInput from './BorderedInput';
import CustomButton from './CustomButton';
import {launchImageLibrary} from 'react-native-image-picker';
import {v4 as uuid} from 'uuid';
import ItemEmpty from '../lib/ItemEmpty';

function WelcomeProfile({form}) {
  const {user, setUser, joinUser, setJoinUser} = useUserContext();
  const [displayName, setDisplayName] = useState('');
  const [response, setResponse] = useState(null);

  const checkJ = ItemEmpty.check(joinUser);

  const selectImage = () => {
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
        } else if (ItemEmpty.check(res)) {
          setResponse(res.assets[0]?.uri);
          return;
        }
      },
    );
  };

  const onSubmit = useCallback(() => {
    if (displayName === '') {
      Alert.alert('안됨!', '닉네임은 무조건 설정해주셔야 합니다!!!');
      return;
    }
    const uid = uuid();
    setUser(
      // user 정보 추가
      {
        ...form,
        nickname: displayName,
        profileImage: response,
        uid: uid,
      }, // profileImage 에 response 정보를 담는다.
    );
    checkJ
      ? setJoinUser([
          ...joinUser,
          {
            ...form,
            nickname: displayName,
            profileImage: response,
            uid: uid,
          },
        ])
      : setJoinUser([
          {
            ...form,
            nickname: displayName,
            profileImage: response,
            uid: uid,
          },
        ]);
  }, [user, response, displayName, joinUser]);

  // const onCancel = useCallback(() => { //다음에 버튼(삭제)
  //   const uid = uuid();
  //   setUser({...form, nickname: '', profileImage: response, uid});
  //   checkJ
  //     ? setJoinUser([
  //         ...joinUser,
  //         {
  //           ...form,
  //           nickname: displayName,
  //           profileImage: response,
  //           uid: uid,
  //         },
  //       ])
  //     : setJoinUser([
  //         {
  //           ...form,
  //           nickname: displayName,
  //           profileImage: response,
  //           uid: uid,
  //         },
  //       ]);
  // }, [user, response, displayName, joinUser]);

  return (
    <View style={styles.block}>
      <Pressable onPress={selectImage}>
        <Image
          style={styles.circle}
          source={
            response ? {uri: response} : require('../storage/images/user.png')
          }
        />
      </Pressable>
      <View style={styles.form}>
        <BorderedInput
          placeholder="닉네임"
          value={displayName}
          onChangeText={setDisplayName}
          onSubmitEditing={onSubmit}
          returnKeyType="next"
        />
        <View style={styles.buttons}>
          <CustomButton title="입력완료" onPress={onSubmit} hasMarginBottom />
          {/* <CustomButton title="다음에" onPress={onCancel} theme="secondary" /> */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    alignItems: 'center',
    marginTop: 24,
    paddingHorizontal: 16,
    width: '100%',
  },
  circle: {
    backgroundColor: '#cdcdcd',
    borderRadius: 64,
    width: 128,
    height: 128,
  },
  form: {
    marginTop: 16,
    width: '100%',
  },
  buttons: {
    marginTop: 48,
  },
});

export default WelcomeProfile;
