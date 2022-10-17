import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileTab from './ProfileTab';
import EditProfile from './EditProfile';
import EditPrivacy from './EditPrivacy';

const Stack = createNativeStackNavigator();

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileTab" component={ProfileTab} />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen name="EditPrivacy" component={EditPrivacy} />
    </Stack.Navigator>
  );
}

export default ProfileStack;
