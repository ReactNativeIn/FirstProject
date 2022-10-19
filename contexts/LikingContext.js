import React, {useContext, useEffect, createContext, useState} from 'react';
import ItemStorage from '../asyncstorage/ItemStorage';
/*
(postIndex fk
email fk) pk

*/
const LikingContext = createContext(null);

export function LikingContextProvider({children}) {
  const [liking, setLiking] = useState();

  // 불러오기
  useEffect(() => {
    ItemStorage.get('liking').then(setLiking).catch(console.error);
  }, []);

  // 저장
  useEffect(() => {
    ItemStorage.set('liking', liking).catch(console.error);
  }, [liking]);

  return (
    <LikingContext.Provider
      children={children}
      value={{
        liking,
        setLiking,
      }}
    />
  );
}

//커스텀 Hook 함수
export function useLikingContext() {
  const likingContext = useContext(LikingContext);
  if (!likingContext) {
    throw new Error('LikingContext.Provider is not found');
  }
  return likingContext;
}
