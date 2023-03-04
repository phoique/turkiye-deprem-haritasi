import React from 'react';
import {View, FlatList} from 'react-native';
import {Container, EarthquakeDetail} from '../../components';
import {HomeHeader, EarthquakeCardItem} from './components';
import useStyles from './useStyles';
import data from './data.json';

const HomeScreen = () => {
  const styles = useStyles();

  const [selectedEarthquake, setSelectedEarthquake] = React.useState(null);

  const renderItem = React.useCallback(({item}) => {
    return (
      <EarthquakeCardItem
        mag={item.mag}
        title={item.title}
        depth={item.depth}
        time={item.date}
        setSelectedEarthquake={setSelectedEarthquake}
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

  return (
    <Container safeAreaTop={false}>
      <View style={styles.homeContainer}>
        <HomeHeader />
        <View style={styles.earthquakeCard}>
          <FlatList
            data={data.result}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
          />
        </View>
      </View>
      <EarthquakeDetail
        earthquakeId={selectedEarthquake}
        setClose={handleClose}
      />
    </Container>
  );
};

export default HomeScreen;
