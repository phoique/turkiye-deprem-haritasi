import {StyleSheet} from 'react-native';
import {useTheme} from '../../contexts';
import {colorByMagnitude} from '../../helpers';

function useStyles() {
  const {typography, colors, themeMode} = useTheme();
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
  });
}

export default useStyles;
