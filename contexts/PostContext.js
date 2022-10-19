import React, {useContext, useEffect, createContext, useState} from 'react';
import ItemStorage from '../asyncstorage/ItemStorage';
/*
postIndex pk
photoURL
nickname
content
date
email fk
*/
const PostContext = createContext(null);

export function PostContextProvider({children}) {
  const [post, setPost] = useState();

  // 불러오기
  useEffect(() => {
    ItemStorage.get('post').then(setPost).catch(console.error);
  }, []);

  // 저장
  useEffect(() => {
    ItemStorage.set('post', post).catch(console.error);
  }, [post]);

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
