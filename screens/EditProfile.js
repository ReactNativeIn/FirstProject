import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  Pressable,
  TextInput,
} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import ProfileModal from '../components/ProfileModal';

function EditProfile({route, navigation}) {
  const [modalShown, setModalShown] = useState(false);
  const modalClose = () => setModalShown(false); // ProfileModal 모달 닫기용

  return (
    <View style={{flex: 1}}>
      <View style={styles.headerStyle} /* 헤더부분 */>
        <TouchableOpacity
          onPress={() => {
            Alert.alert('취소눌렀음', '취소!!!!');
            /* 변경사항 없이 뒤로가기
             */
            navigation.goBack();
          }}>
          <Ionic name="close-outline" style={{fontSize: 35}} />
        </TouchableOpacity>
        <Text style={styles.headerText}>프로필 편집</Text>
        <TouchableOpacity
          onPress={() => {
            Alert.alert('눌렸음', '변경이 눌렸따!');
            /*  TODO: 변경이 눌린 후 변경사항을 저장하고
            내비게이션을 뒤로 돌림
            navigation.goBack();
            */
          }}>
          <Ionic name="checkmark" style={{fontSize: 35, color: '#3493D9'}} />
        </TouchableOpacity>
      </View>
      <View style={{padding: 20, alignItems: 'center'}} /*프로필 사진 뷰*/>
        <Pressable onPress={() => setModalShown(true)}>
          <Image
            source={require('../storage/images/user.png')} // 내 디렉토리에 있는 이미지 썼음 나중엔 데이터베이스에 있는 프로필 사진 경로로 가야함
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
          defaultValue="김덕순"
          style={styles.textInputStyle}
        />
      </View>
      <View style={styles.viewPadding}>
        <Text
          style={{
            opacity: 0.5,
          }}>
          사용자 이름
        </Text>
        <TextInput
          placeholder="사용자 이름"
          defaultValue="user1234"
          style={styles.textInputStyle}
        />
      </View>
      <View style={styles.viewPadding}>
        <Text
          style={{
            opacity: 0.5,
          }}>
          소개
        </Text>
        <TextInput placeholder="소개" style={styles.textInputStyle} />
      </View>
      <Pressable
        android_ripple={{
          color: '#eee',
        }}
        onPress={() => navigation.push('EditPrivacy')}>
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
    fontSize: 14,
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
