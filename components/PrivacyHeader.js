import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Ionic from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

export default function PrivacyHeader({onSubmit, changeCheck}) {
  const navigation = useNavigation();

  return (
    <View style={styles.headerStyle} /* 헤더부분 */>
      <TouchableOpacity
        onPress={() => {
          changeCheck()
            ? Alert.alert('주의', '변경사항을 저장하지 않고 나가시겠습니까?', [
                {
                  text: '취소',
                  onPress: () => null,
                },
                {
                  text: '넵',
                  onPress: () => {
                    navigation.goBack();
                  },
                },
              ])
            : navigation.goBack();
        }}>
        <Ionic name="arrow-back-outline" style={{fontSize: 35}} />
      </TouchableOpacity>
      <Text style={styles.headerText}>개인정보 설정</Text>
      <TouchableOpacity
        onPress={() => {
          onSubmit();
          navigation.navigate('ProfileTab');
        }}>
        <Ionic name="checkmark" style={{fontSize: 35, color: '#3493D9'}} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  textColor: {
    color: '#3493D9',
  },
  viewPadding: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  textInputStyle: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: '#CDCDCD',
  },
});
