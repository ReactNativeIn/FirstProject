import React, {useEffect, useState} from 'react';
import {View, Text, StatusBar, StyleSheet, Pressable} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Stories from '../components/Stories';
import Post from '../components/Post';
import ActionSheetModal from '../components/ActionSheetModal';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import client from '../api/client';

const imagePickerOption = {
  mediaType: 'photo',
  maxWidth: 768,
  maxHeight: 768,
  includeBase64: Platform.OS === 'android',
};

const HomeTab = ({navigation, route}) => {
  const [modalVisible, setModalVisible] = useState(false);

  client
    .get('/test')
    .then(console.log('안녕'))
    .catch(errer => console.log(errer));

  const onPickImage = res => {
    if (res.didCancel || !res) {
      return;
    }
    navigation.push('UploadScrenn', {res});
  };

  const onLaunchCamera = () => {
    launchCamera(imagePickerOption, onPickImage);
  };

  const onLaunchImageLibrary = () => {
    launchImageLibrary(imagePickerOption, onPickImage);
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <>
          <Pressable hitSlop={8} onPress={() => setModalVisible(true)}>
            <FontAwesome name="plus-square-o" style={styles.headerLeft} />
          </Pressable>
          <ActionSheetModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            actions={[
              {
                icon: 'camera',
                text: '카메라 촬영하기',
                onPress: onLaunchCamera,
              },
              {
                icon: 'photo',
                text: '사진 선택하기',
                onPress: onLaunchImageLibrary,
              },
            ]}
          />
        </>
      ),
      headerTitle: () => <Text style={styles.title}>Instagram</Text>,
      headerTitleAlign: 'center', //헤더의 텍스트를 가운데로 정렬
    });
  }, [navigation, modalVisible]);

  return (
    <View style={styles.wrapper}>
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
        animated={true}
      />
      <Stories />
      <View style={{flex: 1}}>
        <Post />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    height: '100%',
  },
  headerLeft: {
    fontSize: 24,
    marginLeft: 10,
  },
  title: {
    fontFamily: 'Lobster-Regular',
    fontSize: 25,
    fontWeight: '500',
  },
  headerRight: {
    fontSize: 24,
    marginRight: 10,
  },
});
export default HomeTab;
