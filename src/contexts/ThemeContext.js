import React from 'react';
import {theme} from '../constants';

export const ThemeContext = React.createContext(null);

export const ThemeContextProvider = ({children}) => {
  const [themeMode, setThemeMode] = React.useState('light');

  const values = React.useMemo(
    () => ({
      themeMode,
      setThemeMode,
      ...theme,
    }),
    [themeMode],
  );

  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeContextProvider');
  }
  return {
    themeMode: context.themeMode,
    setThemeMode: context.setThemeMode,
    ...theme,
  };
};
