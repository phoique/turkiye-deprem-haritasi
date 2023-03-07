import React from 'react';
import {Platform, View, Text} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
  Marker,
} from 'react-native-maps';
import {earthquakeApi} from '../../services';
import {Container, EarthquakeDetail} from '../../components';
import useStyles from './useStyles';

const provider = Platform.OS === 'ios' ? PROVIDER_DEFAULT : PROVIDER_GOOGLE;
const defaultCoordinate = {latitude: 41.0122, longitude: 28.976};

const MapScreen = () => {
  const styles = useStyles();
  const getLastEarthquakes = earthquakeApi.useGetLastEarthquakesQuery({
    limit: 500,
  });

  const [map, setMap] = React.useState(null);
  const [region, setRegion] = React.useState({
    latitude: defaultCoordinate.latitude,
    longitude: defaultCoordinate.longitude,
  });
  const [selectedEarthquake, setSelectedEarthquake] = React.useState(null);

  React.useEffect(() => {
    if (map) {
      const ids = [];
      for (let i = 0; i < getLastEarthquakes.data.length; i += 1) {
        ids.push(getLastEarthquakes.data[i].earthquake_id);
      }
      map.fitToSuppliedMarkers(ids);
    }
  }, [getLastEarthquakes.data, map]);

  const handleClose = React.useCallback(() => {
    setSelectedEarthquake(null);
  }, []);

  return (
    <Container safeAreaTop={false}>
      <MapView
        ref={ref => setMap(ref)}
        provider={provider}
        style={styles.container}
        region={{
          latitude: region.latitude,
          longitude: region.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {getLastEarthquakes.data.map(earthquake => (
          <Marker
            identifier={earthquake.earthquake_id}
            key={earthquake.earthquake_id}
            coordinate={{
              latitude: earthquake.geojson.coordinates[1],
              longitude: earthquake.geojson.coordinates[0],
            }}
            onPress={() => {
              setSelectedEarthquake(earthquake);
              setRegion({
                latitude: earthquake.geojson.coordinates[1],
                longitude: earthquake.geojson.coordinates[0],
              });
            }}>
            <View
              style={styles.markerContainer(earthquake.rev || earthquake.mag)}>
              <Text style={styles.markerText}>
                {earthquake.rev || earthquake.mag}
              </Text>
            </View>
          </Marker>
        ))}
      </MapView>
      <EarthquakeDetail
        earthquakeDetail={selectedEarthquake}
        setClose={handleClose}
      />
    </Container>
  );
};

export default MapScreen;
