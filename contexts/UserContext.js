import React, {useContext, createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
/*
email pk
name 
password
birthday
nickname
gender
profileImage
*/

export const UserContext = createContext(null);

export function UserContextProvider({children}) {
  /* 테스트를 위한 임시 데이터 */
  const [user, setUser] = useState({
    email: 'test@first.com',
    name: '테스트',
    password: '123456',
    birthday: '22-10-10',
    nickname: 'test',
    gender: '남',
    profileImage: '../storage/images/post1.jpg',
  }); // 로그인 회원 정보

  const [joinUser, setJoinUser] = useState([
    {
      email: 'test@first.com',
      name: '테스트',
      password: '123456',
      birthday: '22-10-10',
      nickname: 'test',
      gender: '남',
      profileImage: '../storage/images/post1.jpg',
    },
    {
      email: 'test1@first.com',
      name: '테스트1',
      password: '123456',
      birthday: '22-10-11',
      nickname: 'test1',
      gender: '남',
      profileImage: '../storage/images/post2.jpg',
    },
    {
      email: 'test2@first.com',
      name: '테스트2',
      password: '123456',
      birthday: '22-10-12',
      nickname: 'test2',
      gender: '남',
      profileImage: '../storage/images/post3.jpg',
    },
    {
      email: 'test3@first.com',
      name: '테스트3',
      password: '123456',
      birthday: '22-10-12',
      nickname: 'test3',
      gender: '남',
      profileImage: '../storage/images/post3.jpg',
    },
  ]); // 회원 배열저장 임시

  /*잠깐 주석 처리, 그리고 joinUser가 아니고 user를 불러와야하는거 같음
  // 불러오기
  useEffect(() => {
    async function load() {
      try {
        const rawJoinUser = await AsyncStorage.getItem('joinUser');
        const savedJoinUser = JSON.parse(rawJoinUser);
        setJoinUser(savedJoinUser);
      } catch (e) {
        console.log('Failed to load joinUser');
      }
    }
    load();
  }, []);

  // 저장
  useEffect(() => {
    async function save() {
      try {
        await AsyncStorage.setItem('joinUser', JSON.stringify(joinUser));
      } catch (e) {
        console.log('Failed to save joinUser');
      }
    }
    save();
  }, [joinUser]);
*/

  return (
    <UserContext.Provider
      children={children}
      value={{
        user,
        setUser,
        joinUser,
        setJoinUser,
      }}
    />
  );
}

export function useUserContext() {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error('UserContext.Provider is not found');
  }
  return userContext;
}
