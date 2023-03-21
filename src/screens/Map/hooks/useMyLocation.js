import React from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {useTranslation} from 'react-i18next';
import {toast} from '../../../services';

const useMyLocation = () => {
  const {t} = useTranslation();
  const [location, setLocation] = React.useState({
    latitude: null,
    longitude: null,
  });

  const infoToast = React.useCallback(
    () => toast.show(t('screens.map.locationInfo'), 'info'),
    [t],
  );

  const hasLocationPermission = React.useCallback(async () => {
    if (Platform.OS === 'ios') {
      const status = await Geolocation.requestAuthorization('whenInUse');
      if (status === 'granted') {
        return true;
      }

      infoToast();
      return false;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (hasPermission || status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    infoToast();
    return false;
  }, [infoToast]);

  const getMyLocation = React.useCallback(() => {
    try {
      hasLocationPermission().then(response => {
        if (response) {
          Geolocation.getCurrentPosition(
            position => {
              setLocation({
                latitude: position?.coords?.latitude,
                longitude: position?.coords?.longitude,
              });
            },
            () => {
              infoToast();
            },
            {
              accuracy: {
                android: 'high',
                ios: 'best',
              },
              enableHighAccuracy: true,
              timeout: 15000,
              distanceFilter: 0,
              forceRequestLocation: true,
              forceLocationManager: false,
              showLocationDialog: true,
            },
          );
        }
      });
    } catch (error) {
      infoToast();
    }
  }, [hasLocationPermission, infoToast]);

  return {location, getMyLocation};
};

export default useMyLocation;
