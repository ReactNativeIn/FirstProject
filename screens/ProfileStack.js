import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileTab from './ProfileTab';
import MessageScreen from './MessageScreen';
import EditProfile from './EditProfile';

const Stack = createNativeStackNavigator();

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileTab" component={ProfileTab} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
}

export default ProfileStack;
