import React, {useContext, useEffect, createContext, useState} from 'react';
import ItemStorage from '../asyncstorage/ItemStorage';
/*
(
from_member fk
to_member fk
)
*/
const FollowContext = createContext(null);

export function FollowContextProvider({children}) {
  const [follow, setFollow] = useState();

  // 불러오기
  useEffect(() => {
    ItemStorage.get('follow').then(setFollow).catch(console.error);
  }, []);

  // 저장
  useEffect(() => {
    ItemStorage.set('follow', follow).catch(console.error);
  }, [follow]);

  return (
    <FollowContext.Provider
      children={children}
      value={{
        follow,
        setFollow,
      }}
    />
  );
}

//커스텀 Hook 함수
export function useFollowContext() {
  const followContext = useContext(FollowContext);
  if (!followContext) {
    throw new Error('FollowContext.Provider is not found');
  }
  return followContext;
}
