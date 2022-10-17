import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, Platform, Pressable, StyleSheet, View} from 'react-native';
import {useUserContext} from '../contexts/UserContext';
import BorderedInput from './BorderedInput';
import CustomButton from './CustomButton';
import {launchImageLibrary} from 'react-native-image-picker';

function WelcomeProfile({form}) {
  const {user, setUser, joinUser, setJoinUser} = useUserContext();
  const [displayName, setDisplayName] = useState('');
  const [response, setResponse] = useState('');
  const navigation = useNavigation();

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
        }
        setResponse(res);
      },
    );
  };

  const onSubmit = () => {
    setUser(
      // user 정보 추가
      {...form, nickname: displayName, profileImage: response}, // profileImage 에 response 정보를 담는다.
    );
    setJoinUser(joinUser.concat(user));
    navigation.navigate('Main');
  };

  const onCancel = () => {
    setUser({...form, nickname: '', profileImage: null});
    setJoinUser(joinUser.concat(user));
    navigation.navigate('Main');
  };

  return (
    <View style={styles.block}>
      <Pressable onPress={selectImage}>
        <Image
          style={styles.circle}
          source={
            response
              ? {uri: response?.assets[0]?.uri}
              : require('../storage/images/user.png')
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
          <CustomButton title="다음에" onPress={onCancel} theme="secondary" />
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
