import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen, MapScreen, SettingsScreen} from '../screens';
import BottomItem from './BottomItem';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  const tabBar = ({state, descriptors, navigation}) => (
    <BottomItem
      state={state}
      descriptors={descriptors}
      navigation={navigation}
    />
  );

  return (
    <Tab.Navigator tabBar={tabBar}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{tabBarIcon: 'home', headerShown: false}}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{tabBarIcon: 'map'}}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{tabBarIcon: 'settings'}}
      />
    </Tab.Navigator>
  );
};

export default React.memo(BottomNavigation);
