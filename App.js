import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import RootStack from './screens/RootStack';
import {UserContextProvider} from './contexts/UserContext';
import {PostContextProvider} from './contexts/PostContext';
import {CommentsContextProvider} from './contexts/CommentsContext';
import {LikingContextProvider} from './contexts/LikingContext';
import {FollowContextProvider} from './contexts/FollowContext';

function App() {
  return (
    <UserContextProvider>
      <FollowContextProvider>
        <PostContextProvider>
          <CommentsContextProvider>
            <LikingContextProvider>
              <NavigationContainer>
                <RootStack />
              </NavigationContainer>
            </LikingContextProvider>
          </CommentsContextProvider>
        </PostContextProvider>
      </FollowContextProvider>
    </UserContextProvider>
  );
}

export default App;
