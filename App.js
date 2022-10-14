import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import RootStack from './screens/RootStack';
import {UserContextProvider} from './contexts/UserContext';
import {SearchContextProvider} from './contexts/SearchContext';

function App() {
  return (
    <UserContextProvider>
      <SearchContextProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </SearchContextProvider>
    </UserContextProvider>
  );
}

export default App;
