import React, {useContext, createContext, useState} from 'react';
/*
likeIndex pk
postIndex fk
email fk

*/
const LikingContext = createContext(null);

export function LikingContextProvider({children}) {
  const [liking, setLiking] = useState([
    {
      postIndex: 1,
      email: 'test@first.com',
    },
    {
      postIndex: 1,
      email: 'test1@first.com',
    },
    {
      postIndex: 2,
      email: 'test@first.com',
    },
  ]);
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
