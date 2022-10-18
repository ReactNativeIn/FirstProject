import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeStack from './HomeStack';
import SearchTab from './SearchTab';
import ProfileStack from './ProfileStack';
import {useUserContext} from '../contexts/UserContext';

const Tab = createBottomTabNavigator();

function MainScreen() {
  const {user, joinUser} = useUserContext();
  // useEffect(() => {
  //   console.log('joinUser : ', JSON.stringify(joinUser, null, '\t'));
  //   console.log('user : ', JSON.stringify(user, null, '\t'));
  // }, [joinUser]);

  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="검색"
        component={SearchTab}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="person" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default MainScreen;
