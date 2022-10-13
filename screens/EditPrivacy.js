import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function EditPrivacy() {
  return (
    <View style={styles.box}>
      <Text style={{fontSize: 24}}>이메일이랑 비밀번호 변경 드가자~</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
