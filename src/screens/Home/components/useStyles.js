import {StyleSheet} from 'react-native';
import {useTheme} from '../../../contexts';

function useStyles() {
  const {typography, colors, font, themeMode} = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 10,
    },
    title: {
      fontSize: typography.h3,
      fontFamily: 'Poppins-Bold',
      textAlign: 'center',
      marginBottom: 10,
    },
    footer: {
      marginTop: 'auto',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    resetButton: {
      backgroundColor: colors[themeMode].lightGray,
      borderRadius: 20,
      paddingHorizontal: 40,
      paddingVertical: 10,
    },
    resetButtonText: {
      color: colors.light.black,
      fontSize: typography.h4 - 2,
      fontFamily: font.regular,
    },
    filterButton: {
      backgroundColor: colors[themeMode].success,
      borderRadius: 20,
      paddingHorizontal: 40,
      paddingVertical: 10,
    },
    filterButtonText: {
      color: colors.light.white,
      fontSize: typography.h4 - 2,
      fontFamily: font.bold,
    },
  });
}

export default useStyles;
