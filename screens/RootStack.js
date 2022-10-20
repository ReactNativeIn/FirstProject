import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from './SignInScreen';
import WelcomeScreen from './WelcomeScreen';
import MainScreen from './MainScreen';
import UploadScreen from './UploadScreen';
import {useUserContext} from '../contexts/UserContext';
import CommentScreen from './CommentScreen';
import {Alert, BackHandler} from 'react-native';

const Stack = createNativeStackNavigator();

function RootStack() {
  const {user, setUser} = useUserContext();

  useEffect(() => {
    const backAction = () => {
      Alert.alert('잠깐!!!', '앱을 종료하시겠습니까?', [
        {
          text: '취소',
          onPress: () => null,
        },
        {
          text: '확인',
          onPress: () => {
            BackHandler.exitApp();
          },
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="UploadScrenn"
            component={UploadScreen}
            options={{title: '새 게시물', headerBackTitle: '뒤로가기'}}
          />
          <Stack.Screen
            name="CommentScreen"
            component={CommentScreen}
            options={{
              title: '댓글',
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default RootStack;
