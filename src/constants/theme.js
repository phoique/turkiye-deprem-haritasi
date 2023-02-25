import {Dimensions} from 'react-native';

const theme = {
  colors: {
    light: {
      white: '#FFFFFF',
      black: '#000000',
      gray: '#95a5a6',
      background: '#F9FBFF',
      text: '#000',
      shadow: '#000',
    },
    dark: {},
  },
  sizes: {
    screen: {
      height: Dimensions.get('screen').height,
      width: Dimensions.get('screen').width,
    },
    window: {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
    },
  },
  typography: {
    h1: 32,
    h2: 24,
    h3: 28,
    h4: 16,
    h5: 13,
    h6: 10,
  },
};

export default theme;
