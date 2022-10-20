import React, {useState} from 'react';
import {View, Text, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import {useCommentsContext} from '../contexts/CommentsContext';
import {useUserContext} from '../contexts/UserContext';
import ItemEmpty from '../lib/ItemEmpty';

const MessageScreen = ({route}) => {
  const [text, setText] = useState('');
  const {comments, setComments} = useCommentsContext();
  const {user} = useUserContext();

  const checkC = ItemEmpty.check(comments);

  //commentIndex값은 원래는 자동으로 들어감
  const setComment = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const nextCommentIndex = checkC
      ? Math.max(...comments.map(com => com.commentIndex)) + 1
      : 1;
    checkC
      ? setComments([
          ...comments,
          {
            commentIndex: nextCommentIndex,
            nickname: user.nickname,
            content: text,
            date: year + '-' + month + '-' + day,
            postIndex: route.params.postIndex,
            email: user.email,
          },
        ])
      : setComments([
          {
            commentIndex: nextCommentIndex,
            nickname: user.nickname,
            content: text,
            date: year + '-' + month + '-' + day,
            postIndex: route.params.postIndex,
            email: user.email,
          },
        ]);
    setText('');
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.renderWrapper}>
        {item.postIndex === route.params.postIndex && (
          <>
            <View style={styles.nicknameView}>
              <Text style={styles.nickname}>{item.nickname}</Text>
            </View>
            <Text style={styles.content}>{item.content}</Text>
          </>
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.avoid}>
      <View style={styles.wrapper}>
        <FlatList
          data={comments}
          renderItem={renderItem}
          keyExtractor={item => item.commentIndex}
        />

        <TextInput
          placeholder="댓글을 입력해주세요"
          style={styles.input}
          value={text}
          onChangeText={setText}
          onSubmitEditing={setComment}
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
  renderWrapper: {
    alignItems: 'flex-start',
  },
  nicknameView: {
    backgroundColor: 'blue',
    borderRadius: 10,
    padding: 3,
    minWidth: 60,
    alignItems: 'center',
    marginVertical: 15,
  },
  nickname: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  content: {
    color: 'black',
    marginHorizontal: 50,
    borderWidth: 1,
    borderRadius: 5,
    minWidth: 50,
  },
});
export default MessageScreen;
