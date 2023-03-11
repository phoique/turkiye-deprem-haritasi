import React from 'react';
import {View, FlatList, RefreshControl} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Container, EarthquakeDetail} from '../../components';
import {earthquakeApi} from '../../services';
import {homeSlice} from '../../store';
import {HomeHeader, EarthquakeCardItem} from './components';
import useStyles from './useStyles';

const HomeScreen = () => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const {limit, page} = useSelector(({home}) => ({
    limit: home.limit,
    page: home.page,
  }));
  const getLastEarthquakeQuery = earthquakeApi.useGetLastEarthquakesQuery({
    limit,
    skip: (page - 1) * limit,
  });

  const renderItem = React.useCallback(({item}) => {
    return (
      <EarthquakeCardItem earthquakeDetail={item} isLoading={item?.isLoading} />
    );
  }, []);

  const keyExtractor = React.useCallback(
    ({earthquake_id: id}) => `home-${id}`,
    [],
  );

  const loadingData = React.useMemo(() => {
    if (getLastEarthquakeQuery.isLoading) {
      return [...Array(4).keys()].map(index => ({
        earthquake_id: `loading-${index}`,
        isLoading: true,
      }));
    }
    return null;
  }, [getLastEarthquakeQuery.isLoading]);

  const handleNextPage = React.useCallback(() => {
    dispatch(homeSlice.actions.setNextPage());
  }, [dispatch]);

  const handleRefresh = React.useCallback(() => {
    dispatch(homeSlice.actions.reset());
    getLastEarthquakeQuery.refetch();
  }, [dispatch, getLastEarthquakeQuery]);

  return (
    <Container safeAreaTop={false}>
      <View style={styles.homeContainer}>
        <HomeHeader total={getLastEarthquakeQuery.data?.length} />
        <View style={styles.earthquakeCard}>
          <FlatList
            data={loadingData ?? getLastEarthquakeQuery.data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            onEndReached={handleNextPage}
            onEndReachedThreshold={0.5}
            refreshControl={
              <RefreshControl
                refreshing={getLastEarthquakeQuery.isFetching}
                onRefresh={handleRefresh}
              />
            }
          />
        </View>
      </View>
      <EarthquakeDetail />
    </Container>
  );
};

export default HomeScreen;
