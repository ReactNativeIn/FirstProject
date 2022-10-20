import React, {useContext, useEffect, createContext, useState} from 'react';
import ItemStorage from '../asyncstorage/ItemStorage';
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
  const [comments, setComments] = useState();

  // 불러오기
  useEffect(() => {
    ItemStorage.get('comments').then(setComments).catch(console.error);
  }, []);

  // 저장
  useEffect(() => {
    ItemStorage.set('comments', comments).catch(console.error);
  }, [comments]);

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
