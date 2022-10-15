import React, {useContext, createContext, useState} from 'react';

const PostContext = createContext(null);

export function PostContextProvider({children}) {
  const [post, setPost] = useState([]);
  return (
    <PostContext.Provider
      children={children}
      value={{
        post,
        setPost,
      }}
    />
  );
}

//커스텀 Hook 함수
export function usePostContext() {
  const postContext = useContext(PostContext);
  if (!postContext) {
    throw new Error('UserContext.Provider is not found');
  }
  return postContext;
}
