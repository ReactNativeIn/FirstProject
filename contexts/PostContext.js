import React, {useContext, createContext, useState} from 'react';

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
  const [post, setPost] = useState([
    {
      postIndex: 1,
      photoURL: '../storage/images/post1',
      nickname: 'test',
      content: '테스트다',
      date: '22-10-15',
      email: 'test@first.com',
    },
    {
      postIndex: 2,
      photoURL: '../storage/images/post2',
      nickname: 'test1',
      content: '테스트다2',
      date: '22-10-12',
      email: 'test1@first.com',
    },
    {
      postIndex: 3,
      photoURL: '../storage/images/post3',
      nickname: 'test3',
      content: '테스트다3',
      date: '22-10-13',
      email: 'test3@first.com',
    },
    {
      postIndex: 4,
      photoURL: '../storage/images/post4',
      nickname: 'test1',
      content: '테스트다4',
      date: '22-10-14',
      email: 'test1@first.com',
    },
  ]);

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
