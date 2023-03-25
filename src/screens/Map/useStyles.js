import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '../../contexts';
import {colorByMagnitude} from '../../helpers';

function useStyles() {
  const {typography, colors, themeMode} = useTheme();
  const insets = useSafeAreaInsets();

  return StyleSheet.create({
    container: {
      flex: 1,
    },
    markerContainer: magnitude => ({
      backgroundColor: colorByMagnitude(magnitude),
      width: 30,
      height: 30,
      borderRadius: 30 / 2,
      justifyContent: 'center',
      alignItems: 'center',
    }),
    markerText: {
      fontSize: typography.h5,
      fontFamily: 'Poppins-Medium',
      color: colors[themeMode].white,
    },
    loadingContainer: {
      position: 'absolute',
      marginTop: insets.top + 10,
      marginLeft: 20,
      padding: 10,
      backgroundColor: colors[themeMode].lightGray,
      borderRadius: 15,
    },
    myLocationContainer: {
      position: 'absolute',
      bottom: 10,
      right: 10,
      backgroundColor: colors[themeMode].white,
      borderRadius: 15,
      padding: 10,
    },
    mapFilterButton: {
      position: 'absolute',
      top: 0,
      right: 10,
      padding: 10,
      marginTop: insets.top + 10,
      backgroundColor: colors[themeMode].white,
      borderRadius: 15,
    },
  });
}

export default useStyles;
