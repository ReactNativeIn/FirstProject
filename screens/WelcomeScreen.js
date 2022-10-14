import React from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';

// import SetupProfile from '../components/SetupProfile';

function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.select({ios: 'padding'})}>
      <SafeAreaView style={styles.block}>
        <Text style={styles.title}>환영합니다!</Text>
        <Text style={styles.description}>프로필을 설정하세요.</Text>
        <Text>프로필 설정 이미지 및 별명 입력란 만들기</Text>
        <Text>프로필 설정은 나중에 하셔도 됩니다.</Text>
        <CustomButton
          title="다음"
          onPress={() => navigation.navigate('Main')}
        />
        {/* <SetupProfile /> 프로필 세팅 컴포넌트*/}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  block: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 48,
  },
  description: {
    marginTop: 16,
    fontSize: 21,
    color: '#757575',
  },
});

export default WelcomeScreen;
