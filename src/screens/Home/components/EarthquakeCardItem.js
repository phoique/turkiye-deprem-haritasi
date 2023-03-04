import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {date} from '../../../helpers';
import useStyles from '../useStyles';

const EarthquakeCardItem = ({
  earthquakeDetail,
  setSelectedEarthquake,
  isLoading,
}) => {
  const {t} = useTranslation();
  const {title, depth, timestamp, rev, mag} = earthquakeDetail;
  const magnitude = rev || mag;
  const styles = useStyles(magnitude);

  const handlePress = React.useCallback(() => {
    setSelectedEarthquake(earthquakeDetail);
  }, [earthquakeDetail, setSelectedEarthquake]);

  // is loading durumunda bu kartın skeleton görünümü
  if (isLoading) {
    return (
      <TouchableOpacity style={styles.earthquakeCardItem} onPress={handlePress}>
        <View style={styles.earthquakeCardItemSizeSkeleton} />
        <View style={styles.earthquakeCardItemInfoContainer}>
          <View style={styles.textSkeleton} />
          <View style={styles.textSkeleton2} />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.earthquakeCardItem} onPress={handlePress}>
      <View style={styles.earthquakeCardItemSize}>
        <Text style={styles.earthquakeCardItemSizeText}>{magnitude}</Text>
      </View>
      <View style={styles.earthquakeCardItemInfoContainer}>
        <Text style={styles.earthquakeCardItemInfoTitle}>{title}</Text>
        <Text style={styles.earthquakeCardItemInfoSubTitle}>
          {t('screens.home.depth', {depth})}
        </Text>
      </View>
      <View style={styles.earthquakeCardItemTime}>
        <Text style={styles.earthquakeCardItemTimeText}>
          {date.fromNow(timestamp, true)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(EarthquakeCardItem);
