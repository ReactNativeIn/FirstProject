import React from 'react';
import {View, StyleSheet, TouchableOpacity, Button} from 'react-native';
import {useUserContext} from '../contexts/UserContext';
import {Alert} from 'react-native';

function LogOutButton() {
  const {setUser} = useUserContext();
  return (
    <TouchableOpacity>
      <View style={[styles.box]}>
        <Button
          title="로그아웃 버튼"
          onPress={() => {
            setUser(null), Alert.alert('로그아웃', '로그아웃되었습니다.');
          }}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 200,
  },
});

export default LogOutButton;
