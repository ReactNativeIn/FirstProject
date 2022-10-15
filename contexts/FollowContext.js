import React, {useContext, createContext, useState} from 'react';

const FollowContext = createContext(null);

export function FollowContextProvider({children}) {
  const [follow, setFollow] = useState([]);
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
