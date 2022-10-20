import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeTab from './HomeTab';
import ProfileTab from './ProfileTab';
import CommentScreen from './CommentScreen';
import EditPostScreen from './EditPostScreen';
import {useUserContext} from '../contexts/UserContext';
import {useFollowContext} from '../contexts/FollowContext';

const Stack = createNativeStackNavigator();
/*
UploadScreen -> 사진 올리기 화면
은 HomeTab의 하단 탭을 가리고 그 위에 띄울 것이기 때문에 RootStack에 등록
그리고 로그인 상태에서만 접근 가능
*/
function HomeStack() {
  const {joinUser, user} = useUserContext();
  const {follow} = useFollowContext();

  useEffect(() => {
    console.log('joinUser : ', JSON.stringify(joinUser, null, 2));
    console.log('User : ', JSON.stringify(user, null, 2));
    console.log('follow : ', JSON.stringify(follow, null, 2));
  }, [user, joinUser, follow]);

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
    </Stack.Navigator>
  );
}

export default HomeStack;
