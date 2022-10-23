import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileTab from './ProfileTab';
import EditProfile from './EditProfile';
import EditPrivacy from './EditPrivacy';
import SettingScreen from './SettingScreen';

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

export default ProfileStack;
