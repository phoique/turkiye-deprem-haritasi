import {StyleSheet} from 'react-native';
import {useTheme} from '../../contexts';

function useStyles() {
  const {colors, typography, themeMode} = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 10,
    },
    infoHeaderContainer: {
      flex: 0.4,
      flexDirection: 'row',
    },
    infoHeaderIcon: {
      flex: 1,
      height: 100,
      width: 100,
    },
    infoHeaderTextContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      marginLeft: 10,
    },
    infoHeaderTitle: {
      fontFamily: 'Poppins-Bold',
      fontSize: typography.h4,
      marginBottom: 5,
    },
    infoHeaderSubTitle: {
      fontFamily: 'Poppins-Regular',
      fontSize: typography.h6,
    },
    infoHeaderMagContainer: {
      flex: 0.2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    infoHeaderMagText: {
      fontFamily: 'Poppins-Bold',
      fontSize: typography.h3,
    },
    otherInfoRowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 10,
    },
    otherInfoContainer: {
      flex: 1,
    },
    otherInfoTitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 3,
      gap: 5,
    },
    otherInfoTitle: {
      fontFamily: 'Poppins-Bold',
      fontSize: typography.h4 - 2,
      color: colors[themeMode].gray,
    },
    otherInfoDescription: {
      fontFamily: 'Poppins-Bold',
      fontSize: typography.h5 - 1,
    },
    otherInfoIcon: {
      color: colors[themeMode].gray,
    },
  });
}

export default useStyles;
