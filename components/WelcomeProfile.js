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
import CustomButton from './CustomButton';
import {launchImageLibrary} from 'react-native-image-picker';
import ItemEmpty from '../lib/ItemEmpty';
import Auth from '../api/Auth';

function WelcomeProfile({form}) {
  const {setUser} = useUserContext();
  const [response, setResponse] = useState(null);

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

  const onSubmit = () => {
    const nextForm = {...form, profileImage: response};

    Auth.updateMember(nextForm);

    setUser(Auth.selectMember(nextForm));
  };

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
        <View style={styles.buttons}>
          <CustomButton title="입력완료" onPress={onSubmit} hasMarginBottom />
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
