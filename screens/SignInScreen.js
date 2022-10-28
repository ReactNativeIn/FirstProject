import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  StyleSheet,
  View,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text} from 'react-native';
import SignInButton from '../components/SignInButton';
import SignInForm from '../components/SignInForm';
import {ScrollView} from 'react-native';
import {useUserContext} from '../contexts/UserContext';
import Auth from '../api/Auth';

function SignInScreen({navigation, route}) {
  const [form, setForm] = useState({
    //form의 상태 정보
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    birthday: '',
    gender: '남',
    phone: '',
    profileImage: null,
    nickname: '',
    introduce: '', //소개
  });
  const {isSignUp} = route.params ?? {}; // 로그인인지 회원가입인지 SignInButton 에서 받아옴
  const [loading, setLoading] = useState(false); // 로딩상태를 표시할지 말지 나타냄
  const {setUser} = useUserContext(); // 지금 내 유저 정보

  const createChangeTextHandler = name => value => {
    // form의 내용을 name과 value에 맞춰서 변경
    setForm({...form, [name]: value});
  };

  const onSubmit = async () => {
    // 입력창에 내용을 전부 입력하고 확인 버튼을 눌렀을때
    Keyboard.dismiss();
    let check;
    if (isSignUp) {
      check = await Auth.join(form);
      //회원가입 시도
      if (check === 'true') {
        //성공 시 welcome 이동
        navigation.navigate('Welcome', {form});
      } else {
        return;
      }
    } else if (!isSignUp) {
      //로그인 시도
      check = await Auth.login(form);
      if (check === null) {
        return;
      } else {
        setUser(check); //성공시 MainScreen이동
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.select({ios: 'padding'})}>
      <SafeAreaView style={styles.box}>
        <ScrollView>
          <Text style={styles.title}>Instagram</Text>
          <View style={styles.form}>
            <SignInForm
              isSignUp={isSignUp}
              onSubmit={onSubmit}
              form={form}
              createChangeTextHandler={createChangeTextHandler}
            />
          </View>
        </ScrollView>
        <View style={styles.button}>
          <SignInButton
            isSignUp={isSignUp}
            onSubmit={onSubmit}
            loading={loading}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  box: {flex: 1},
  title: {
    textAlign: 'center',
    fontSize: 32,
    marginBottom: 32,
    marginTop: 64,
    fontFamily: 'Lobster-Regular',
    fontWeight: '500',
  },
  form: {
    marginTop: 64,
    width: '100%',
    paddingHorizontal: 16,
    flex: 1,
  },
  button: {
    width: '100%',
    paddingHorizontal: 16,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
});

export default SignInScreen;
