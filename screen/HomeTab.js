import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  StyleSheet,
  Pressable,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionic from 'react-native-vector-icons/Ionicons';
import Stories from '../screenComponents/Stories';
import Post from '../screenComponents/Post';
import ActionSheetModal from '../components/ActionSheetModal';
import Entypo from 'react-native-vector-icons/Entypo';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

const imagePickerOption = {
  mediaType: 'photo',
  maxWidth: 768,
  maxHeight: 768,
  includeBase64: Platform.OS === 'android',
};

const HomeTab = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const onPickImage = res => {
    if (res.didCancel || !res) {
      return;
    }
    navigation.push('Upload', {res});
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
      headerRight: () => (
        <Pressable onPress={() => navigation.push('MessageScreen')}>
          <Feather style={styles.headerRight} name="navigation" />
        </Pressable>
      ),
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
