import React, {useRef} from 'react';
import BorderedInput from './BorderedInput';
import {ScrollView} from 'react-native';

function SignInForm({isSignUp, onSubmit, form, createChangeTextHandler}) {
  return (
    <ScrollView>
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
        // onSubmitEditing={() => passwordRef.current.focus()}
      />
      <BorderedInput
        placeholder="비밀번호"
        secureTextEntry
        hasMarginBottom={isSignUp}
        value={form.password}
        onChangeText={createChangeTextHandler('password')}
        // ref={passwordRef}
        returnKeyType={isSignUp ? 'next' : 'done'}
        // onSubmitEditing={() => {
        //   if (isSignUp) {
        //     confirmPasswordRef.current.focus();
        //   } else {
        //     onSubmit();
        //   }
        // }}
      />
      {isSignUp && (
        <>
          <BorderedInput
            hasMarginBottom
            placeholder="비밀번호 확인"
            secureTextEntry
            value={form.confirmPassword}
            onChangeText={createChangeTextHandler('confirmPassword')}
            // ref={confirmPasswordRef}
            returnKeyType="done"
            onSubmitEditing={onSubmit}
          />
          <BorderedInput
            hasMarginBottom
            placeholder="이름"
            secureTextEntry
            value={form.confirmPassword}
            onChangeText={createChangeTextHandler('name')}
            returnKeyType="done"
            onSubmitEditing={onSubmit}
          />
          <BorderedInput
            hasMarginBottom
            placeholder="생일"
            secureTextEntry
            value={form.confirmPassword}
            onChangeText={createChangeTextHandler('birthday')}
            returnKeyType="done"
            onSubmitEditing={onSubmit}
          />
          <BorderedInput
            placeholder="성별"
            secureTextEntry
            value={form.confirmPassword}
            onChangeText={createChangeTextHandler('sex')}
            returnKeyType="done"
            onSubmitEditing={onSubmit}
          />
        </>
      )}
    </ScrollView>
  );
}

export default SignInForm;
