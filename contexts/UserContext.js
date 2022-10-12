import React, {useContext, createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext(null);

export function UserContextProvider({children}) {
  const [user, setUser] = useState(null); // 로그인 회원 정보
  const [joinUser, setJoinUser] = useState([]); // 회원 배열저장 임시

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
