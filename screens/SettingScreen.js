import React, {useEffect, useState} from 'react';
import {View, Button, Text, Pressable} from 'react-native';
import LogOutButton from '../components/LogoutButton';
import {StyleSheet} from 'react-native';

function SettingScreens({navigation}) {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text style={styles.headerText}>설정</Text>,
      headerTitleAlign: 'center',
    });
  }, [navigation]);

  return (
    <View style={styles.f}>
      <View style={styles.text}>
        <LogOutButton />
        <View style={styles.box}>
          <Button
            title="계정정보"
            onPress={() => navigation.navigate('EditProfile')}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    flex: 0.2,
    color: '#212121',
    justifyContent: 'center',
    alignItems: 'center',
  },
  f: {
    flex: 1,
  },
  box: {
    width: 200,
    marginTop: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default SettingScreens;
