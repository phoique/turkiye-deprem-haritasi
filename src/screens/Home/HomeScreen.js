import React from 'react';
import {View, FlatList} from 'react-native';
import {Container} from '../../components';
import {HomeHeader, EarthquakeCardItem} from './components';
import useStyles from './useStyles';
import data from './data.json';

const HomeScreen = () => {
  const styles = useStyles();

  const renderItem = React.useCallback(({item}) => {
    console.log(item);
    return (
      <EarthquakeCardItem
        mag={item.mag}
        title={item.title}
        depth={item.depth}
        time={item.date}
      />
    );
  }, []);

  return (
    <Container safeAreaTop={false}>
      <View style={styles.homeContainer}>
        <HomeHeader />
        <View style={styles.earthquakeCard}>
          <FlatList
            data={data.result}
            renderItem={renderItem}
            keyExtractor={(item, index) => `uni-${index}`}
          />
        </View>
      </View>
    </Container>
  );
};

export default HomeScreen;
