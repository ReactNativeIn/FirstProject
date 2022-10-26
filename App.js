import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import RootStack from './screens/RootStack';
import {UserContextProvider} from './contexts/UserContext';
import {PostContextProvider} from './contexts/PostContext';
import {CommentsContextProvider} from './contexts/CommentsContext';
import {LikingContextProvider} from './contexts/LikingContext';
import {FollowContextProvider} from './contexts/FollowContext';
import {SearchContextProvider} from './contexts/SearchContext';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;
