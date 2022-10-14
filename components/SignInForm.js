import React, {useRef, useState} from 'react';
import {View, Text} from 'react-native';
import BorderedInput from './BorderedInput';
import {RadioButton} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {TouchableOpacity} from 'react-native';
import {StyleSheet} from 'react-native';
import {format} from 'date-fns';

function SignInForm({isSignUp, onSubmit, form, createChangeTextHandler}) {
  const [checked, setChecked] = useState('남'); // 라디오버튼 상태(기본값은 남)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false); // 모달창이 보이거나 안보이게
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const nameRef = useRef();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    const day = format(new Date(date), 'yyyy-MM-dd'); // date 상태 (내가 모달창에서 선택한 날짜)
    form.birthday = day;
    hideDatePicker();
  };
  return (
    <>
      <BorderedInput // TextInput 개조형태...
        hasMarginBottom
        placeholder="이메일"
        value={form.email}
        onChangeText={createChangeTextHandler('email')}
        autoCapitalize="none"
        autoCorrect={false}
        autoCompleteType="email"
        keyboardType="email-address"
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current.focus()}
      />
      <BorderedInput
        placeholder="비밀번호"
        secureTextEntry
        hasMarginBottom={isSignUp}
        value={form.password}
        onChangeText={createChangeTextHandler('password')}
        ref={passwordRef}
        returnKeyType={isSignUp ? 'next' : 'done'}
        onSubmitEditing={() => {
          if (isSignUp) {
            confirmPasswordRef.current.focus();
          } else {
            onSubmit();
          }
        }}
      />
      {isSignUp && (
        <>
          <BorderedInput
            hasMarginBottom
            placeholder="비밀번호 확인"
            secureTextEntry
            value={form.confirmPassword}
            onChangeText={createChangeTextHandler('confirmPassword')}
            ref={confirmPasswordRef}
            returnKeyType="done"
            onSubmitEditing={() => {
              nameRef.current.focus();
            }}
          />
          <BorderedInput
            hasMarginBottom
            placeholder="이름"
            value={form.name}
            ref={nameRef}
            onChangeText={createChangeTextHandler('name')}
            returnKeyType="done"
            onSubmitEditing={onSubmit}
          />
          <TouchableOpacity onPress={showDatePicker}>
            <View style={styles.text}>
              <Text style={!form.birthday && {color: 'gray'}}>
                {form.birthday ? form.birthday : '생일'}
              </Text>
            </View>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Text style={{fontSize: 18}}>성별</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton
                value="남"
                status={checked === '남' ? 'checked' : 'unchecked'}
                onPress={() => {
                  setChecked('남');
                  form.sex = '남';
                }}
              />
              <Text>남</Text>
              <RadioButton
                value="여"
                status={checked === '여' ? 'checked' : 'unchecked'}
                onPress={() => {
                  setChecked('여');
                  form.sex = '여';
                }}
              />
              <Text>여</Text>
            </View>
          </View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    borderColor: '#bdbdbd',
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: 'white',
    height: 48,
    marginBottom: 16,
    justifyContent: 'center',
  },
});

export default SignInForm;
