import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import useStyles from '../useStyles';

const EarthquakeCardItem = ({
  mag,
  title,
  depth,
  time,
  setSelectedEarthquake,
}) => {
  const {t} = useTranslation();
  const styles = useStyles();

  const handlePress = React.useCallback(() => {
    setSelectedEarthquake(title);
  }, [setSelectedEarthquake, title]);

  return (
    <TouchableOpacity style={styles.earthquakeCardItem} onPress={handlePress}>
      <View style={styles.earthquakeCardItemSize}>
        <Text style={styles.earthquakeCardItemSizeText}>{mag}</Text>
      </View>
      <View style={styles.earthquakeCardItemInfoContainer}>
        <Text style={styles.earthquakeCardItemInfoTitle}>{title}</Text>
        <Text style={styles.earthquakeCardItemInfoSubTitle}>
          {t('screens.home.depth', {depth})}
        </Text>
      </View>
      <View style={styles.earthquakeCardItemTime}>
        <Text style={styles.earthquakeCardItemTimeText}>{time}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(EarthquakeCardItem);
