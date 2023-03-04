import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '../../contexts';

function useStyles() {
  const insets = useSafeAreaInsets();
  const {colors, typography, themeMode} = useTheme();
  return StyleSheet.create({
    homeContainer: {
      flex: 2,
    },
    homeHeader: {
      flex: 0.6,
      backgroundColor: colors.light.red,
      paddingTop: insets.top,
      borderBottomEndRadius: 30,
      borderBottomStartRadius: 30,
    },
    homeHeaderTitle: {
      fontSize: typography.h2,
      color: colors.light.white,
      marginBottom: 5,
      fontFamily: 'Poppins-Bold',
    },
    homeHeaderSubtitle: {
      fontSize: typography.h5 - 2,
      color: colors.light.white,
      fontFamily: 'Poppins-Regular',
    },
    homeHeaderContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    homwHeaderIcon: {
      alignItems: 'flex-end',
      paddingRight: 10,
    },
    earthquakeCard: {
      flex: 1.4,
      marginTop: 10,
    },
    earthquakeCardItem: {
      flexDirection: 'row',
      height: 80,
      alignItems: 'center',
      marginHorizontal: 20,
      marginVertical: 10,
      backgroundColor: colors.light.white,
      borderRadius: 15,
      padding: 10,
      shadowColor: colors.light.black,
      shadowOffset: {
        width: 0,
        height: 1.5,
      },
      shadowOpacity: 0.22,
      shadowRadius: 3,
      elevation: 4,
    },
    earthquakeCardItemSize: {
      backgroundColor: '#e67e22',
      borderRadius: 15,
      marginRight: 10,
      height: '100%',
      width: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },
    earthquakeCardItemSizeText: {
      color: colors.light.white,
      fontSize: typography.h3,
      fontFamily: 'Poppins-Bold',
    },
    earthquakeCardItemInfoContainer: {
      gap: 3,
      flex: 1,
    },
    earthquakeCardItemInfoTitle: {
      fontSize: typography.h4 - 2,
      fontFamily: 'Poppins-Bold',
    },
    earthquakeCardItemInfoSubTitle: {
      fontSize: typography.h7,
      fontFamily: 'Poppins-Regular',
    },
    earthquakeCardItemTime: {
      marginLeft: 'auto',
      marginTop: 'auto',
    },
    earthquakeCardItemTimeText: {
      fontSize: typography.h6,
      fontFamily: 'Poppins-Regular',
      color: colors.light.gray,
    },

    // Skeleton style
    earthquakeCardItemSizeSkeleton: {
      backgroundColor: colors[themeMode].lightGray,
      borderRadius: 15,
      marginRight: 10,
      height: '100%',
      width: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textSkeleton: {
      backgroundColor: colors[themeMode].lightGray,
      borderRadius: 15,
      height: 20,
      width: '40%',
    },
    textSkeleton2: {
      backgroundColor: colors[themeMode].lightGray,
      borderRadius: 15,
      height: 20,
      width: '50%',
    },
  });
}

export default useStyles;
