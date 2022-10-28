import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeTab from './HomeTab';
import ProfileTab from './ProfileTab';
import EditPostScreen from './EditPostScreen';
import {useUserContext} from '../contexts/UserContext';
import {useFollowContext} from '../contexts/FollowContext';
import EditProfile from './EditProfile';
import EditPrivacy from './EditPrivacy';
import SettingScreen from './SettingScreen';
import {useLikingContext} from '../contexts/LikingContext';
import {useCommentsContext} from '../contexts/CommentsContext';
import {usePostContext} from '../contexts/PostContext';

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
        name="EditPostScreen"
        component={EditPostScreen}
        options={{
          title: '게시물 수정',
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditPrivacy"
        component={EditPrivacy}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
    </Stack.Navigator>
  );
}

export default HomeStack;
