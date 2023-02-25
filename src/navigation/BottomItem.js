import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Icon} from '../components';
import useStyles from './useStyles';
import {useTheme} from '../contexts';

const BottomItem = ({state, descriptors, navigation}) => {
  const styles = useStyles();
  const {colors, themeMode} = useTheme();

  const handlePress = React.useCallback(
    (route, isFocused) => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    },
    [navigation],
  );

  const handleLongPress = React.useCallback(
    route => {
      navigation.emit({
        type: 'tabLongPress',
        target: route.key,
      });
    },
    [navigation],
  );

  return (
    <View style={styles.bottomContainer}>
      <View style={styles.bottomTabView}>
        {state.routes.map((route, index) => {
          const icon = descriptors[route.key].options.tabBarIcon;
          const isFocused = state.index === index;

          return (
            <TouchableOpacity
              style={styles.tabButton}
              key={route.name}
              onPress={() => handlePress(route, isFocused)}
              onLongPress={() => handleLongPress(route)}>
              <Icon
                type="Feather"
                name={icon}
                size={30}
                color={
                  isFocused ? colors[themeMode].black : colors[themeMode].gray
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default React.memo(BottomItem);
