import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import RootStack from './screens/RootStack';
import {UserContextProvider} from './contexts/UserContext';
import {PostContextProvider} from './contexts/PostContext';
import {CommentsContextProvider} from './contexts/CommentsContext';
import {LikingContextProvider} from './contexts/LikingContext';
import {FollowContextProvider} from './contexts/FollowContext';
import {SearchContextProvider} from './contexts/SearchContext';

function App() {
  return (
    <UserContextProvider>
      <SearchContextProvider>
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
      </SearchContextProvider>
    </UserContextProvider>
  );
}

export default App;
