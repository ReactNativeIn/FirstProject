import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const [change, setChange] = useState(null);

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
      email ? (
      <Pressable onPress={() => navigation.push('EditProfile')}>
        <Text>프로필 설정변경</Text>
      </Pressable>
      ) : (
      <Pressable onPress={() => navigation.push('EditProfile')}>
        <Text>Follow</Text>
      </Pressable>
      )
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
