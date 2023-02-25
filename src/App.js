import * as React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MainNavigation from './navigation';

function App() {
  return (
    <SafeAreaProvider>
      <MainNavigation />
    </SafeAreaProvider>
  );
}

export default App;
