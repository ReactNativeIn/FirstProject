import {useState} from 'react';
import {Modal, Platform, Pressable, StyleSheet, Text, View} from 'react-native';

function ProfileModal({modalShown, setModalShown, onSelectImage, normalImage}) {
  return (
    <>
      <Modal // 배경용 모달
        visible={modalShown}
        transparent={true}
        animationType="fade"
        onRequestClose={setModalShown}>
        <Pressable style={styles.background} onPress={setModalShown} />
      </Modal>
      <Modal // 슬라이드 하면서 나오는 모달
        visible={modalShown}
        transparent={true}
        animationType="slide"
        onRequestClose={setModalShown}>
        <Pressable
          style={{flex: 1, justifyContent: 'flex-end'}}
          onPress={setModalShown}>
          <View style={[styles.whiteBox]}>
            <Pressable>
              <Text style={[styles.text, {fontSize: 14}]}>
                프로필 사진 변경
              </Text>
              <View style={styles.separator} />
              <Pressable
                android_ripple={{
                  color: 'gray',
                }}
                style={[styles.whiteBox]}
                onPress={onSelectImage}>
                <Text style={[styles.text, {fontSize: 16}]}>
                  새 프로필 사진
                </Text>
              </Pressable>
              <Pressable
                android_ripple={{
                  color: 'gray',
                }}
                style={[styles.whiteBox]}
                onPress={normalImage}>
                <Text style={[styles.text, {fontSize: 16}]}>
                  기본 이미지 사용
                </Text>
              </Pressable>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
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
    fontSize: 14,
    fontWeight: 'bold',
  },
  textColor: {
    color: '#3493D9',
  },
  text: {
    fontWeight: 'bold',
    padding: 16,
  },
  background: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
  },
  whiteBox: {
    width: '100%',
    backgroundColor: 'white',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    elevation: 2,
  },
  separator: {
    backgroundColor: '#e0e0e0',
    height: 1,
  },
});

export default ProfileModal;
