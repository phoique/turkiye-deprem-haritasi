import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import MapView from 'react-native-maps';
import {earthquakeServices} from '../../services';
import {Container, EarthquakeDetail} from '../../components';
import useStyles from './useStyles';
import {debounce} from './helpers';
import {EarthquakeMarker, MapFilter, MyLocation} from './components';

const defaultCoordinate = {
  latitude: 41.0122,
  longitude: 28.976,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const MapScreen = () => {
  const styles = useStyles();
  const [fitbounds, setFitbounds] = React.useState(true);
  const [map, setMap] = React.useState(null);
  const [region, setRegion] = React.useState({
    latitude: defaultCoordinate.latitude,
    longitude: defaultCoordinate.longitude,
  });

  const getLastEarthquakeQuery = earthquakeServices.useEarthquakeSearchQuery(
    {
      limit: 100,
      geoNear: {
        lon: region.longitude,
        lat: region.latitude,
        radiusMeter: 100,
      },
    },
    {skip: !region.latitude || !region.longitude},
  );

  React.useEffect(() => {
    if (map && getLastEarthquakeQuery.currentData && fitbounds) {
      const ids = [];
      for (let i = 0; i < getLastEarthquakeQuery.currentData.length; i += 1) {
        ids.push(getLastEarthquakeQuery.currentData[i].earthquake_id);
      }
      map.fitToSuppliedMarkers(ids);
      setFitbounds(false);
    }
  }, [fitbounds, getLastEarthquakeQuery.currentData, map]);

  const debouncedFunction = debounce(handleRegionChange, 1000);
  function handleRegionChange({latitude, longitude}) {
    setRegion({latitude, longitude});
  }

  const changeRegion = React.useCallback(
    ({latitude, longitude}) => {
      setRegion({latitude, longitude});
      map.animateToRegion({...defaultCoordinate, latitude, longitude}, 1000);
    },
    [map],
  );

  return (
    <Container safeAreaTop={false}>
      <MapView
        ref={ref => setMap(ref)}
        style={styles.container}
        minZoomLevel={5}
        maxZoomLevel={20}
        initialRegion={{
          latitude: defaultCoordinate.latitude,
          longitude: defaultCoordinate.longitude,
        }}
        onRegionChangeComplete={debouncedFunction}>
        {getLastEarthquakeQuery.data?.map(earthquake => (
          <EarthquakeMarker
            key={earthquake.earthquake_id}
            id={earthquake.earthquake_id}
            latitude={earthquake.geojson.coordinates[1]}
            longitude={earthquake.geojson.coordinates[0]}
            mag={earthquake.mag}
            map={map}
          />
        ))}
      </MapView>
      {getLastEarthquakeQuery.isFetching && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      )}
      <MyLocation changeRegion={changeRegion} />
      <MapFilter />
      <EarthquakeDetail />
    </Container>
  );
};

export default MapScreen;
