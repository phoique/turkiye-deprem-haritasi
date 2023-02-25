import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '../contexts';

function useStyles() {
  const {colors, themeMode} = useTheme();
  const insets = useSafeAreaInsets();
  return StyleSheet.create({
    bottomContainer: {
      backgroundColor: colors[themeMode].background,
    },
    bottomTabView: {
      flexDirection: 'row',
      backgroundColor: colors[themeMode].white,
      justifyContent: 'space-around',
      paddingTop: 10,
      borderRadius: 10,
      paddingBottom: insets.bottom || 10,
      shadowColor: colors[themeMode].shadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 5,
    },
    tabButton: {
      height: 50,
      width: 70,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
}

export default useStyles;
