import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeTab from './HomeTab';
import SearchTab from './SearchTab';
import ProfileTab from './ProfileTab';

const Tab = createBottomTabNavigator();

function MainScreen() {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="홈"
        component={HomeTab}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
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
        name="프로필"
        component={ProfileTab}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainScreen;
