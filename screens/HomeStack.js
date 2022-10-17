import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeTab from './HomeTab';
import ProfileTab from './ProfileTab';
import CommentScreen from './CommentScreen';
import EditPostScreen from './EditPostScreen';

const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeTab" component={HomeTab} />
      <Stack.Screen
        name="ProfileTab"
        component={ProfileTab}
        options={{
          title: '프로필',
        }}
      />
      <Stack.Screen
        name="CommentScreen"
        component={CommentScreen}
        options={{
          title: '댓글',
        }}
      />
      <Stack.Screen
        name="EditPostScreen"
        component={EditPostScreen}
        options={{
          title: '게시물 수정',
        }}
      />
    </Stack.Navigator>
  );
}

export default HomeStack;
