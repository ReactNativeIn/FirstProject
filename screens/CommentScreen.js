import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import {FlatList, TextInput} from 'react-native-gesture-handler';

const MessageScreen = () => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([
    {
      idd: 0,
      id: 1,
      displayName: 'test1',
      message: '안녕1111111111111111111111111111111111111111111',
    },
    {
      idd: 1,
      id: -1,
      displayName: 'test2',
      message: '안녕222222222222222222222222222222222222222222222222222222',
    },
    {
      idd: 2,
      id: 1,
      displayName: 'test1',
      message: '어쩔',
    },
    {
      idd: 3,
      id: -1,
      displayName: 'test2',
      message: '그래',
    },
    {
      idd: 4,
      id: 1,
      displayName: 'test1',
      message: 'ㅇㅇ',
    },
  ]);

  const setMessage = () => {
    const nextIdd =
      messages.length > 0
        ? Math.max(...messages.map(message => message.idd)) + 1
        : 1;
    setMessages([
      ...messages,
      {
        idd: nextIdd,
        id: messages[nextIdd - 1].id * -1,
        displayName: messages[nextIdd - 1].id === 1 ? 'test1' : 'test2',
        message: text,
      },
    ]);
    setText('');
  };

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          alignItems: 'flex-start',
        }}>
        <View
          style={{
            backgroundColor: 'blue',
            borderRadius: 10,
            padding: 3,
            minWidth: 60,
            alignItems: 'center',
            marginVertical: 15,
          }}>
          <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>
            {item.displayName}
          </Text>
        </View>
        <Text
          style={{
            color: 'black',
            marginHorizontal: 50,
            borderWidth: 1,
            borderRadius: 5,
            minWidth: 50,
          }}>
          {item.message}
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.avoid}>
      <View style={styles.wrapper}>
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={item => item.idd}
        />

        <TextInput
          placeholder="댓글을 입력해주세요"
          style={styles.input}
          value={text}
          onChangeText={setText}
          onSubmitEditing={setMessage}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  avoid: {
    flex: 1,
  },
  input: {
    fontSize: 16,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 10,
  },
});
export default MessageScreen;
