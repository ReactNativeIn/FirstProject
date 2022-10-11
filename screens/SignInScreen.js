import React, {useState} from 'react';
import {Keyboard, StyleSheet, View, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text} from 'react-native';
import SignInButton from '../components/SignInButton';
import SignInForm from '../components/SignInForm';

function SignInScreen({navigation, route}) {
  const [form, setForm] = useState({
    //form의 상태 정보
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    birthday: '',
    sex: '',
  });
  const {isSignUp} = route.params ?? {}; // 로그인 되어 있는지 아닌지 물어보기 SignInButton 에서 받아옴
  const [loading, setLoading] = useState(false); // 로딩상태를 표시할지 말지 나타냄

  const createChangeTextHandler = name => value => {
    // form의 내용을 name과 value에 맞춰서 변경
    setForm({...form, [name]: value});
  };

  const onSubmit = () => {
    // 입력창에 내용을 전부 입력하고 확인 버튼을 눌렀을때
    Keyboard.dismiss();
    const {email, password, confirmPassword} = form;

    if (isSignUp && password !== confirmPassword) {
      Alert.alert('실패', '비밀번호가 일치하지 않습니다.');
      return;
    }
    setLoading(true);
    const info = {email, password};
    Alert.alert('연습용', '로그인되었습니다...');
    setLoading(false);
    // navigation.navigate()    // 로그인 후 메인탭으로 이동

    /*  데이터베이스에 정보를 저장되어있는거랑 비교할때 쓰는 기능
    try {
        const {user} = isSignUp ? await signUp(info) : await signIn(info);
        const profile = await getUser(user.uid);
        if (!profile) {
          navigation.navigate('Welcome', {uid: user.uid});
        } else {
          setUser(profile);
        }
      } catch (e) {
        const messages = {
          'auth/email-already-in-use': '이미 가입된 이메일입니다.',
          'auth/wrong-password': '잘못된 비밀번호입니다.',
          'auth/user-not-found': '존재하지 않는 계정입니다.',
          'auth/invalid-email': '유효하지 않은 이메일 주소입니다.',
        };
        const msg = messages[e.code] || `${isSignUp ? '가입' : '로그인'} 실패`;
        Alert.alert('실패', msg);
      } finally {
        setLoading(false);
      }
      */
  };

  return (
    <SafeAreaView style={styles.box}>
      <Text style={styles.text}>First</Text>
      <View style={styles.form}>
        <SignInForm
          isSignUp={isSignUp}
          onSubmit={onSubmit}
          form={form}
          createChangeTextHandler={createChangeTextHandler}
        />
        <SignInButton
          isSignUp={isSignUp}
          onSubmit={onSubmit}
          loading={loading}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  box: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: {
    fontSize: 32,
    fontStyle: 'italic',
    marginBottom: 32,
  },
  form: {
    marginTop: 64,
    width: '100%',
    paddingHorizontal: 16,
  },
});

export default SignInScreen;
