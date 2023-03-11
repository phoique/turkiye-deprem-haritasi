import {StyleSheet} from 'react-native';
import {useTheme} from '../../contexts';

function useStyles() {
  const {typography, font, colors, themeMode} = useTheme();
  return StyleSheet.create({
    formGroupContainer: {
      marginVertical: 10,
    },
    formTitle: {
      fontSize: typography.h4,
      fontFamily: font.bold,
      marginBottom: 7,
    },
    formGroupInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors[themeMode].input,
      borderRadius: 17,
      paddingVertical: 12,
      paddingHorizontal: 10,
    },
    input: {
      fontSize: typography.h4,
      fontFamily: font.regular,
      flex: 1,
    },
  });
}

export default useStyles;
