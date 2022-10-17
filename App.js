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
      <PostContextProvider>
        <CommentsContextProvider>
          <LikingContextProvider>
            <FollowContextProvider>
              <NavigationContainer>
                <RootStack />
              </NavigationContainer>
            </FollowContextProvider>
          </LikingContextProvider>
        </CommentsContextProvider>
      </PostContextProvider>
    </UserContextProvider>
  );
}

export default App;
