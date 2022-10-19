import React, {useContext, createContext, useState} from 'react';

/*
(
from_member fk
to_member fk
)
*/
const FollowContext = createContext(null);

export function FollowContextProvider({children}) {
  const [follow, setFollow] = useState([
    {
      from_member: 'test@first.com',
      to_member: 'test1@first.com',
    },
    {
      from_member: 'test@first.com',
      to_member: 'test2@first.com',
    },
    {
      from_member: 'test1@first.com',
      to_member: 'test2@first.com',
    },
  ]);
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
