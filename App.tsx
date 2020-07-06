/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import Routes from './src/routes';
import { AuthProvider } from './src/context/LoginContext';

const App = () => {
  return (
    <>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </>
  );
};


export default App;
