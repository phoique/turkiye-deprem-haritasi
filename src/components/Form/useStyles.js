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
      backgroundColor: colors[themeMode].lightGray,
      borderRadius: 17,
      paddingVertical: 12,
      paddingHorizontal: 10,
    },
    input: {
      fontSize: typography.h4 - 2,
      fontFamily: font.regular,
      flex: 1,
    },
    selectInputContainer: {flex: 1},
    selectContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: colors[themeMode].white,
    },
    selectHeaderContainer: {
      marginBottom: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    selectHeader: {
      fontSize: typography.h4,
      fontFamily: 'Poppins-Bold',
      textAlign: 'center',
    },
    selectHeaderClose: {
      position: 'absolute',
      right: 10,
    },
    selectItemContainer: {
      flex: 1,
    },
    selectItemContent: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
      marginBottom: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors[themeMode].lightGray,
    },
    selectItemText: isSelected => ({
      fontSize: typography.h4 - 3,
      fontFamily: isSelected ? font.bold : font.regular,
    }),
    selectFooter: {
      alignItems: 'center',
    },
    selectResetButton: {
      backgroundColor: colors[themeMode].lightGray,
      borderRadius: 20,
      paddingHorizontal: 40,
      paddingVertical: 10,
      alignItems: 'center',
    },
    selectResetButtonText: {
      color: colors.light.black,
      fontSize: typography.h4 - 2,
      fontFamily: font.bold,
    },
    selectInputButton: {
      flex: 1,
      justifyContent: 'center',
    },
    selectInputButtonText: isSelected => ({
      fontSize: typography.h4 - 2,
      fontFamily: font.regular,
      color: isSelected
        ? colors[themeMode].black
        : colors[themeMode].placeholder,
    }),
  });
}

export default useStyles;
