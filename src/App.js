import * as React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MainNavigation from './navigation';
import {ThemeContextProvider} from './contexts';

function App() {
  return (
    <SafeAreaProvider>
      <ThemeContextProvider>
        <MainNavigation />
      </ThemeContextProvider>
    </SafeAreaProvider>
  );
}

export default App;
