import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeTab from './HomeTab';
import ProfileTab from './ProfileTab';
import CommentScreen from './CommentScreen';
import EditPostScreen from './EditPostScreen';
import {useUserContext} from '../contexts/UserContext';

const Stack = createNativeStackNavigator();

function HomeStack() {
  const {joinUser, user} = useUserContext();

  useEffect(() => {
    console.log('joinUser : ', JSON.stringify(joinUser, null, 2));
    console.log('User : ', JSON.stringify(user, null, 2));
  }, [user]);

  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeTab" component={HomeTab} />
      <Stack.Screen name="ProfileTab" component={ProfileTab} />
      <Stack.Screen name="CommentScreen" component={CommentScreen} />
      <Stack.Screen name="EditPostScreen" component={EditPostScreen} />
    </Stack.Navigator>
  );
}

export default HomeStack;
