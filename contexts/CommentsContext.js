import React, {useContext, createContext, useState} from 'react';

const CommentsContext = createContext(null);

export function CommentsContextProvider({children}) {
  const [comments, setComments] = useState([]);
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
