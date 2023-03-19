import React from 'react';
import {View, Text} from 'react-native';
import {Marker} from 'react-native-maps';
import {useDispatch} from 'react-redux';
import {homeSlice} from '../../../store';
import useStyles from '../useStyles';

const EarthquakeMarker = ({id, latitude, longitude, mag, map}) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const handleMarkerPress = React.useCallback(
    ({nativeEvent}) => {
      dispatch(homeSlice.actions.setSelectedEarthquakeId(nativeEvent.id));
      map.animateToRegion(nativeEvent.coordinate, 1000);
    },
    [dispatch, map],
  );

  return (
    <Marker
      id={id}
      identifier={id}
      coordinate={{latitude, longitude}}
      onPress={handleMarkerPress}>
      <View style={styles.markerContainer(mag)}>
        <Text style={styles.markerText}>{mag}</Text>
      </View>
    </Marker>
  );
};

export default EarthquakeMarker;
