import React, {useEffect} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';

export default function EditPrivacy({navigation}) {
  useEffect(() => {
    navigation.setOptions({
      title: '개인정보',
      headerRight: () => (
        <Pressable onPress={() => navigation.navigate('ProfileTab')}>
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
          defaultValue="hello@1234.com"
          style={styles.textInputStyle}
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
          defaultValue="010-1234-5678"
          style={styles.textInputStyle}
        />
      </View>
      <View style={styles.viewPadding}>
        <Text
          style={{
            opacity: 0.5,
          }}>
          성별
        </Text>
        <TextInput
          placeholder="성별"
          defaultValue="남"
          style={styles.textInputStyle}
        />
      </View>
      <View style={styles.viewPadding}>
        <Text
          style={{
            opacity: 0.5,
          }}>
          생일
        </Text>
        <TouchableOpacity>
          <Text style={styles.textInputStyle}>
            SignInForm의 form.birthday 정보를 가져올것
          </Text>
        </TouchableOpacity>
      </View>
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
});
