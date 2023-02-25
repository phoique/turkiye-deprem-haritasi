import * as React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MainNavigation from './navigation';
import {ThemeContextProvider} from './contexts';
import './languages';

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeContextProvider>
        <MainNavigation />
      </ThemeContextProvider>
    </SafeAreaProvider>
  );
};

export default App;
