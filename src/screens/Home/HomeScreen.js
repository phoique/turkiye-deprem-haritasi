import React from 'react';
import {View, FlatList} from 'react-native';
import {Container, EarthquakeDetail} from '../../components';
import {earthquakeApi} from '../../services';
import {HomeHeader, EarthquakeCardItem} from './components';
import useStyles from './useStyles';

const HomeScreen = () => {
  const styles = useStyles();

  const getLastEarthquakes = earthquakeApi.useGetLastEarthquakesQuery({
    limit: 500,
  });

  const [selectedEarthquake, setSelectedEarthquake] = React.useState(null);

  const renderItem = React.useCallback(({item}) => {
    return (
      <EarthquakeCardItem
        earthquakeDetail={item}
        setSelectedEarthquake={setSelectedEarthquake}
        isLoading={item?.isLoading}
      />
    );
  }, []);

  const keyExtractor = React.useCallback(
    ({earthquake_id}) => `home-${earthquake_id}`,
    [],
  );

  const handleClose = React.useCallback(() => {
    setSelectedEarthquake(null);
  }, []);

  const loadingData = React.useMemo(() => {
    if (getLastEarthquakes.isFetching) {
      return [...Array(4).keys()].map(index => ({
        earthquake_id: `loading-${index}`,
        isLoading: true,
      }));
    }
    return null;
  }, [getLastEarthquakes.isFetching]);

  return (
    <Container safeAreaTop={false}>
      <View style={styles.homeContainer}>
        <HomeHeader total={getLastEarthquakes.data?.length} />
        <View style={styles.earthquakeCard}>
          <FlatList
            data={loadingData ?? getLastEarthquakes.data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
          />
        </View>
      </View>
      <EarthquakeDetail
        earthquakeDetail={selectedEarthquake}
        setClose={handleClose}
      />
    </Container>
  );
};

export default HomeScreen;
