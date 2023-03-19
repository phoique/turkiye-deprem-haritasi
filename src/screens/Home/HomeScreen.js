import React from 'react';
import {View, FlatList, RefreshControl} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Container, EarthquakeDetail} from '../../components';
import {earthquakeServices} from '../../services';
import {homeSlice} from '../../store';
import {HomeHeader, EarthquakeCardItem, Filter} from './components';
import useStyles from './useStyles';

const HomeScreen = () => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const {limit, page, filter} = useSelector(({home}) => ({
    limit: home.limit,
    page: home.page,
    filter: home.filter,
  }));

  // Filtreleme yapılacak mı?
  const isFilterStatus = React.useMemo(
    () => Object.values(filter).some(value => !!value),
    [filter],
  );

  const getLastEarthquakeQuery = earthquakeServices.useGetLastEarthquakesQuery({
    limit,
    skip: (page - 1) * limit,
  });

  const earthquakeSearchQuery = earthquakeServices.useEarthquakeSearchQuery(
    {
      limit,
      skip: (page - 1) * limit,
      match: {
        date_starts: filter.startDate,
        date_ends: filter.endDate,
        cityCode: filter.city,
      },
    },
    {skip: !isFilterStatus},
  );

  const renderItem = React.useCallback(({item}) => {
    return (
      <EarthquakeCardItem earthquakeDetail={item} isLoading={item?.isLoading} />
    );
  }, []);

  const keyExtractor = React.useCallback(
    ({earthquake_id: id}) => `home-${id}`,
    [],
  );

  const data = React.useMemo(() => {
    if (getLastEarthquakeQuery.isLoading || earthquakeSearchQuery.isLoading) {
      return [...Array(4).keys()].map(index => ({
        earthquake_id: `loading-${index}`,
        isLoading: true,
      }));
    }

    if (isFilterStatus) {
      return earthquakeSearchQuery.data;
    }
    return getLastEarthquakeQuery.data;
  }, [
    earthquakeSearchQuery.data,
    earthquakeSearchQuery.isLoading,
    getLastEarthquakeQuery.data,
    getLastEarthquakeQuery.isLoading,
    isFilterStatus,
  ]);

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
        <HomeHeader total={data?.length} isFilterStatus={isFilterStatus} />
        <View style={styles.earthquakeCard}>
          <FlatList
            data={data}
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
      <Filter />
    </Container>
  );
};

export default HomeScreen;
