import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeTab from './HomeTab';
import ProfileTab from './ProfileTab';
import MessageScreen from './MessageScreen';

const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeTab" component={HomeTab} />
      <Stack.Screen name="ProfileTab" component={ProfileTab} />
      <Stack.Screen name="MessageScreen" component={MessageScreen} />
    </Stack.Navigator>
  );
}

export default HomeStack;
