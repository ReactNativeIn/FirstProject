import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainScreen from './screen/MainScreen';
import RootStack from './screens/RootStack';
import {UserContextProvider} from './contexts/UserContext';
import EditProfile from './screens/EditProfile';

function App() {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <EditProfile />
      </NavigationContainer>
    </UserContextProvider>
  );
}

export default App;
