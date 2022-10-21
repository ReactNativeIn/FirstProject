import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SearchTab from './SearchTab';
import ProfileTab from './ProfileTab';
import {useUserContext} from '../contexts/UserContext';
import {useFollowContext} from '../contexts/FollowContext';

const Stack = createNativeStackNavigator();

function SearchStack() {
  const {joinUser, user} = useUserContext();
  const {follow} = useFollowContext();

  useEffect(() => {
    console.log('joinUser : ', JSON.stringify(joinUser, null, 2));
    console.log('User : ', JSON.stringify(user, null, 2));
    console.log('follow : ', JSON.stringify(follow, null, 2));
  }, [user, joinUser, follow]);

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
    </Stack.Navigator>
  );
}

export default SearchStack;
