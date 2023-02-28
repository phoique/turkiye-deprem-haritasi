import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '../../contexts';

const Container = ({
  children,
  safeAreaTop,
  safeAreaBottom,
  safeAreaRight,
  safeAreaLeft,
  style,
}) => {
  const {colors, themeMode} = useTheme();
  const insets = useSafeAreaInsets();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[themeMode].background,
      paddingTop: safeAreaTop ? insets.top : 0,
      paddingBottom: safeAreaBottom ? insets.bottom : 0,
      paddingRight: safeAreaRight ? insets.right : 0,
      paddingLeft: safeAreaLeft ? insets.left : 0,
      ...style,
    },
  });

  return <View style={styles.container}>{children}</View>;
};

Container.defaultProps = {
  safeAreaTop: true,
};

export default React.memo(Container);
