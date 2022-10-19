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
    uid: '', // 식별키
  });
  // console.log('form : ', form);
  const {isSignUp} = route.params ?? {}; // 로그인인지 회원가입인지 SignInButton 에서 받아옴
  const [loading, setLoading] = useState(false); // 로딩상태를 표시할지 말지 나타냄
  const {joinUser, setJoinUser} = useUserContext(); // 유저가 회원가입에 성공했을 경우, 해당 유저의 정보를 앱 실행하는 동안 저장해둠 (자동 로그인의 경우 지속적으로 저장)
  const {setUser} = useUserContext(); // 지금 내 유저 정보
  const createChangeTextHandler = name => value => {
    // form의 내용을 name과 value에 맞춰서 변경
    setForm({...form, [name]: value});
  };

  const onSubmit = () => {
    // 입력창에 내용을 전부 입력하고 확인 버튼을 눌렀을때
    Keyboard.dismiss();
    const {email, password, confirmPassword, name, birthday, phone} = form;

    function email_check(email) {
      const check =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i; // 이메일 정규표현식
      return email != '' && email != 'undefined' && check.test(email);
    }
    function phone_check(phone) {
      const check = /^\d{3}-\d{3,4}-\d{4}$/; // 전화번호(스마트폰 기준) 정규표현식
      return phone != '' && phone != 'undefined' && check.test(phone);
    }
    function password_check(pass) {
      const check =
        /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/; // 비밀번호 정규 표현식
      return pass != '' && pass != 'undefined' && check.test(pass);
    }

    function email_check2(email) {
      // 회원가입시 이메일 중복확인 및 해당 joinUser정보 가져오기
      if (joinUser?.length === undefined) return;
      for (let i = 0; i < joinUser?.length; i++) {
        if (joinUser[i].email === email) {
          return joinUser[i];
        }
      }
    }

    // 로그인시 비밀번호 일치 확인
    function password_check2(email) {
      if (joinUser?.length === undefined) return;
      for (let i = 0; i < joinUser?.length; i++) {
        console.log('for' + joinUser[i].email);
        if (email === joinUser[i].email) {
          return joinUser[i].password;
        }
      }
    }

    if (!email_check(email)) {
      Alert.alert('실패', '이메일을 입력해주세요');
      return;
    } else if (!password_check(password)) {
      Alert.alert('실패', '비밀번호를 입력해주세요(8~15자리)');
      return;
    } else if ((isSignUp && confirmPassword === '') || undefined) {
      Alert.alert('실패', '비밀번호 확인란을 입력해주세요');
      return;
    } else if (isSignUp && password !== confirmPassword) {
      Alert.alert('실패', '비밀번호가 일치하지 않습니다.');
      return;
    } else if ((isSignUp && name === '') || undefined) {
      Alert.alert('실패', '이름을 입력해주세요');
      return;
    } else if (isSignUp && !phone_check(phone)) {
      Alert.alert('실패', '전화번호를 입력해 주세요');
      return;
    } else if ((isSignUp && birthday === '') || undefined) {
      Alert.alert('실패', '생일을 입력해주세요');
      return;
    } else if (isSignUp && email_check2(email)) {
      Alert.alert('실패', '이미 존재하는 이메일 입니다.');
      return;
      /*
      TODO: 이메일이 존재하지 않았을때, 비밀번호가 틀렸을때,
      */
    } else if (!isSignUp && password !== password_check2(email)) {
      Alert.alert('실패', '아이디 또는 비밀번호가 틀렸습니다.');
      return;
    }
    // setLoading(true);
    // const info = {email, password}; // 회원가입시 사용한 정보가 들어감
    // // console.log('info : ', info);
    // setLoading(false);
    if (isSignUp) {
      navigation.navigate('Welcome', {form});
    } else {
      setUser(email_check2(email)); // 로그인 제대로 됐을때 로그인 정보를 user에 넣어주면서 MainScreen으로 이동
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
