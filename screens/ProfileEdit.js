import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';

function ProfileTab() {
  const navigation = useNavigation();
  return (
    <View style={style.container}>
      <Pressable onPress={() => navigation.push('EditProfile')}>
        <Image
          source={require('../storage/images/user.png')}
          style={{width: 80, height: 80, borderRadius: 100}}
        />
      </Pressable>
      <Pressable onPress={() => navigation.push('EditProfile')}>
        <Text>프로필 설정변경</Text>
      </Pressable>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProfileTab;
