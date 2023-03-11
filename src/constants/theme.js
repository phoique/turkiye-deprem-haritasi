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
      red: '#e74c3c',
      lightGray: '#ecf0f1',
      input: '#dcdde1',
    },
    dark: {},
    colorByMagnitude: {
      1: '#2ed573',
      2: '#32e677',
      3: '#3cfa82',
      4: '#c0ff00',
      5: '#f1c40f',
      6: '#f39c12',
      7: '#e74c3c',
      8: '#d63031',
      9: '#c0392b',
      10: '#b71540',
    },
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
    h2: 28,
    h3: 24,
    h4: 16,
    h5: 13,
    h6: 10,
  },
  font: {
    italic: 'Poppins-Italic',
    bold: 'Poppins-Bold',
    regular: 'Poppins-Regular',
    medium: 'Poppins-Medium',
    light: 'Poppins-Light',
  },
};

export default theme;
