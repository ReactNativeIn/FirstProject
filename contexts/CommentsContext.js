import React, {useContext, createContext, useState} from 'react';

/*
commentIndex pk
nickname 
content
date
postIndex fk
email fk
*/
const CommentsContext = createContext(null);

export function CommentsContextProvider({children}) {
  const [comments, setComments] = useState([
    {
      commentIndex: 1,
      nickname: 'test',
      content: '테스트 댓글',
      date: '22-10-13',
      postIndex: 1,
      email: 'test@first.com',
    },
    {
      commentIndex: 2,
      nickname: 'test',
      content: '테스트 댓글2',
      date: '22-10-12',
      postIndex: 1,
      email: 'test@first.com',
    },
    {
      commentIndex: 3,
      nickname: 'test',
      content: '테스트 댓글3',
      date: '22-10-14',
      postIndex: 2,
      email: 'test@first.com',
    },
  ]);
  return (
    <CommentsContext.Provider
      children={children}
      value={{
        comments,
        setComments,
      }}
    />
  );
}

//커스텀 Hook 함수
export function useCommentsContext() {
  const commentsContext = useContext(CommentsContext);
  if (!commentsContext) {
    throw new Error('CommentsContext.Provider is not found');
  }
  return commentsContext;
}
