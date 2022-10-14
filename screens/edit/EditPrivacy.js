import React, {useEffect} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';

export default function EditPrivacy({navigation}) {
  useEffect(() => {
    navigation.setOptions({
      title: '개인정보',
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
      <Pressable
        android_ripple={{
          color: '#eee',
        }}>
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
      </Pressable>
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
        <TextInput
          placeholder="생일"
          defaultValue="1234-01-12"
          style={styles.textInputStyle}
        />
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
