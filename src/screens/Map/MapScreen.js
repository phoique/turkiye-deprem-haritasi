import React from 'react';
import {View, Text} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {earthquakeServices} from '../../services';
import {Container, EarthquakeDetail} from '../../components';
import useStyles from './useStyles';

const defaultCoordinate = {latitude: 41.0122, longitude: 28.976};

const MapScreen = () => {
  const styles = useStyles();
  const getLastEarthquakeQuery = earthquakeServices.useGetLastEarthquakesQuery({
    limit: 1000,
  });

  const [map, setMap] = React.useState(null);
  const [region, setRegion] = React.useState({
    latitude: defaultCoordinate.latitude,
    longitude: defaultCoordinate.longitude,
  });
  const [selectedEarthquake, setSelectedEarthquake] = React.useState(null);

  React.useEffect(() => {
    if (map && getLastEarthquakeQuery.data) {
      const ids = [];
      for (let i = 0; i < getLastEarthquakeQuery.data.length; i += 1) {
        ids.push(getLastEarthquakeQuery.data[i].earthquake_id);
      }
      map.fitToSuppliedMarkers(ids);
    }
  }, [getLastEarthquakeQuery.data, map]);

  const handleClose = React.useCallback(() => {
    setSelectedEarthquake(null);
  }, []);

  return (
    <Container safeAreaTop={false}>
      <MapView
        ref={ref => setMap(ref)}
        provider={PROVIDER_GOOGLE}
        style={styles.container}
        region={{
          latitude: region.latitude,
          longitude: region.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {getLastEarthquakeQuery.data?.map(earthquake => (
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
