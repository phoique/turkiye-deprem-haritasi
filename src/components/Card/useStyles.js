import {StyleSheet} from 'react-native';
import {useTheme} from '../../contexts';

function useStyles() {
  const {typography, font, colors, themeMode} = useTheme();
  return StyleSheet.create({
    container: {
      backgroundColor: colors[themeMode].lightGray,
      borderRadius: 20,
      padding: 15,
    },
    titleContainer: {
      flexDirection: 'row',
      gap: 5,
    },
    title: {
      fontFamily: font.bold,
      fontSize: typography.h4,
      color: colors.light.primary,
      marginBottom: 10,
    },
  });
}

export default useStyles;
