import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from './SignInScreen';
import WelcomeScreen from './WelcomeScreen';
import MainScreen from '../screen/MainScreen';
import EditProfile from './edit/EditProfile';
import EditPrivacy from './edit/EditPrivacy';

const Stack = createNativeStackNavigator();

function RootStack() {
  // const {user, setUser} = useUserContext();

  return (
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen name="EditPrivacy" component={EditPrivacy} />
    </Stack.Navigator>
  );
}

export default RootStack;
