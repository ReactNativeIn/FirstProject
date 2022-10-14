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
      <Stack.Screen name="ProfileTab" component={ProfileTab} />
      <Stack.Screen name="CommentScreen" component={CommentScreen} />
      <Stack.Screen name="EditPostScreen" component={EditPostScreen} />
    </Stack.Navigator>
  );
}

export default HomeStack;
