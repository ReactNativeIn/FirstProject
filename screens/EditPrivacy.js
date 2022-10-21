import React, {useEffect, useState} from 'react';
import {
  Alert,
  BackHandler,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useUserContext} from '../contexts/UserContext';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {format} from 'date-fns';
import PrivacyHeader from '../components/PrivacyHeader';

export default function EditPrivacy({navigation}) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const {user, setUser, joinUser, setJoinUser} = useUserContext();
  const [phone, setPhone] = useState(user.phone);
  const [gender, setGender] = useState(user.gender);
  const [birthday, setBirthday] = useState(user.birthday);

  const changeCheck = () => {
    // 변경사항이 있을 시 true
    if (
      phone !== user.phone ||
      gender !== user.gender ||
      birthday !== user.birthday
    )
      return true;
  };

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
    setUser(prev => ({
      ...prev,
      phone: phone,
      gender: gender,
      birthday: birthday,
    }));
    if (joinUser?.length === undefined) return;

    const rejoin = joinUser.map(re =>
      re.uid === user.uid
        ? {
            ...user,
            phone,
            gender,
            birthday,
          }
        : re,
    );
    setJoinUser(rejoin);
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
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <PrivacyHeader onSubmit={onSubmit} changeCheck={changeCheck} />
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
      <View style={[styles.viewPadding, {paddingTop: 16}]}>
        <Text>이메일 주소</Text>
        <View
          style={[
            styles.textInputStyle,
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 6,
            },
          ]}>
          <Text style={{fontSize: 18, opacity: 0.5}}>{user.email}</Text>
          <Text style={{fontSize: 14, opacity: 0.5, color: 'red'}}>
            이메일은 변경할 수 없습니다.
          </Text>
        </View>
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
              setGender('여');
              setModalVisible(false);
            }}>
            <Text style={[styles.text, {fontSize: 16}]}>여</Text>
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
