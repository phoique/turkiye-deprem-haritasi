import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import useStyles from '../useStyles';

const EarthquakeCardItem = ({mag, title, depth, time}) => {
  const styles = useStyles();
  return (
    <TouchableOpacity style={styles.earthquakeCardItem}>
      <View style={styles.earthquakeCardItemSize}>
        <Text style={styles.earthquakeCardItemSizeText}>{mag}</Text>
      </View>
      <View style={styles.earthquakeCardItemInfoContainer}>
        <Text style={styles.earthquakeCardItemInfoTitle}>{title}</Text>
        <Text style={styles.earthquakeCardItemInfoSubTitle}>
          Derinlik: {depth}
        </Text>
      </View>
      <View style={styles.earthquakeCardItemTime}>
        <Text style={styles.earthquakeCardItemTimeText}>{time}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default EarthquakeCardItem;
