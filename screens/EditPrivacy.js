import React, {useEffect, useState} from 'react';
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import {useUserContext} from '../contexts/UserContext';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {format} from 'date-fns';
import {setStatusBarNetworkActivityIndicatorVisible} from 'expo-status-bar';

export default function EditPrivacy({navigation}) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const {user, setUser, joinUser, setJoinUser} = useUserContext();
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [gender, setGender] = useState(user.gender);
  const [birthday, setBirthday] = useState(user.birthday);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    const day = format(new Date(date), 'yyyy-MM-dd'); // date 상태 (내가 모달창에서 선택한 날짜)
    setBirthday(day);
    hideDatePicker();
  };

  const onSubmit = () => {
    Alert.alert('저장', '저장되었습니다.');
    setUser({
      ...user,
      email,
      phone,
      gender,
      birthday,
    });
    // if() 개인정보 설정할때 정보비교용 uuid 만들자!
    navigation.navigate('ProfileTab');
  };

  useEffect(() => {
    navigation.setOptions({
      title: '개인정보',
      headerRight: () => (
        <Pressable onPress={() => onSubmit()}>
          <Ionic name="checkmark" style={{fontSize: 35, color: '#3493D9'}} />
        </Pressable>
      ),
    });
  }, [navigation]);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 16,
          borderColor: 'rgba(0,0,0,0.1)',
          borderBottomWidth: 1,
        }}>
        <Text>회원님의 정보를 정확히 입력해 주세요</Text>
      </View>
      <View style={styles.viewPadding}>
        <Text
          style={{
            opacity: 0.5,
          }}>
          이메일 주소
        </Text>
        <TextInput
          placeholder="이메일"
          value={email}
          style={styles.textInputStyle}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.viewPadding}>
        <Text
          style={{
            opacity: 0.5,
          }}>
          전화번호
        </Text>
        <TextInput
          placeholder="전화번호"
          value={phone}
          style={styles.textInputStyle}
          onChangeText={setPhone}
        />
      </View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.viewPadding}>
          <Text
            style={{
              opacity: 0.5,
            }}>
            성별
          </Text>
          <Text style={styles.textInputStyle}>{gender}</Text>
        </View>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}>
        <Pressable
          style={styles.background}
          onPress={() => setModalVisible(false)}>
          <Pressable
            android_ripple={{
              color: 'gray',
            }}
            style={[styles.whiteBox]}
            onPress={() => {
              setGender('남');
              setModalVisible(false);
            }}>
            <Text style={[styles.text, {fontSize: 16}]}>남</Text>
          </Pressable>
          <Pressable
            android_ripple={{
              color: 'gray',
            }}
            style={[styles.whiteBox]}
            onPress={() => {
              setGender('녀');
              setModalVisible(false);
            }}>
            <Text style={[styles.text, {fontSize: 16}]}>녀</Text>
          </Pressable>
          <Pressable
            android_ripple={{
              color: 'gray',
            }}
            style={[styles.whiteBox]}
            onPress={() => {
              setGender('공개안함');
              setModalVisible(false);
            }}>
            <Text style={[styles.text, {fontSize: 16}]}>공개안함</Text>
          </Pressable>
        </Pressable>
      </Modal>
      <TouchableOpacity onPress={showDatePicker}>
        <View style={styles.viewPadding}>
          <Text
            style={{
              opacity: 0.5,
            }}>
            생일
          </Text>
          <Text style={styles.textInputStyle}>{birthday}</Text>
        </View>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {flex: 1},
  viewPadding: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  textInputStyle: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: '#CDCDCD',
  },
  whiteBox: {
    width: '100%',
    backgroundColor: 'white',
    elevation: 2,
  },
  text: {
    fontWeight: 'bold',
    padding: 16,
  },
  background: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
    justifyContent: 'center',
  },
});
