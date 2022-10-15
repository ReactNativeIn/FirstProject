import React, {useContext, createContext, useState} from 'react';

const LikingContext = createContext(null);

export function LikingContextProvider({children}) {
  const [liking, setLiking] = useState([]);
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
