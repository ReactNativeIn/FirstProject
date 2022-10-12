import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ProfileScreen from './ProfileScreen';

function ProfileTab() {
  return (
    <View style={style.container}>
      <ProfileScreen />
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
