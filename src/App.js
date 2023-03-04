import 'react-native-gesture-handler';
import './languages';
import * as React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import MainNavigation from './navigation';
import {ThemeContextProvider} from './contexts';
import {StoreProvider} from './store';

const App = () => {
  return (
    <SafeAreaProvider>
      <StoreProvider>
        <ThemeContextProvider>
          <MainNavigation />
          <Toast />
        </ThemeContextProvider>
      </StoreProvider>
    </SafeAreaProvider>
  );
};

export default App;
