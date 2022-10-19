import React, {useContext, createContext, useState, useEffect} from 'react';
import ItemStorage from '../asyncstorage/ItemStorage';

/*
email pk 
name 
password
birthday
nickname
introduce
gender
profileImage
*/

const UserContext = createContext(null);

export function UserContextProvider({children}) {
  /* 테스트를 위한 임시 데이터 */
  const [user, setUser] = useState(null); // 로그인 회원 정보

  const [joinUser, setJoinUser] = useState(); // 회원 배열저장 임시

  // 불러오기
  useEffect(() => {
    ItemStorage.get('joinUser').then(setJoinUser).catch(console.error);
  }, []);

  // 저장
  useEffect(() => {
    ItemStorage.set('joinUser', joinUser).catch(console.error);
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
