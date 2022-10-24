import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SearchTab from './SearchTab';
import ProfileTab from './ProfileTab';
import {useUserContext} from '../contexts/UserContext';
import {useFollowContext} from '../contexts/FollowContext';
import EditProfile from './EditProfile';
import EditPrivacy from './EditPrivacy';
import SettingScreen from './SettingScreen';

const Stack = createNativeStackNavigator();

function SearchStack() {
  const {joinUser, user} = useUserContext();
  const {follow} = useFollowContext();

  return (
    <Stack.Navigator>
      <Stack.Screen name="SearchTab" component={SearchTab} />
      <Stack.Screen
        name="ProfileTab"
        component={ProfileTab}
        options={{
          title: '프로필',
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

export default SearchStack;
