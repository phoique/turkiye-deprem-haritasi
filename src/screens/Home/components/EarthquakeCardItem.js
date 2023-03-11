import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {date} from '../../../helpers';
import useStyles from '../useStyles';
import {homeSlice} from '../../../store';

const EarthquakeCardItem = ({
  earthquakeDetail,

  isLoading,
}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {title, depth, date_time: dateTime, mag} = earthquakeDetail;
  const styles = useStyles(mag);

  const handlePress = React.useCallback(() => {
    dispatch(
      homeSlice.actions.setSelectedEarthquakeId(earthquakeDetail.earthquake_id),
    );
  }, [dispatch, earthquakeDetail.earthquake_id]);

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
        <Text style={styles.earthquakeCardItemSizeText}>{mag}</Text>
      </View>
      <View style={styles.earthquakeCardItemInfoContainer}>
        <Text style={styles.earthquakeCardItemInfoTitle}>{title}</Text>
        <Text style={styles.earthquakeCardItemInfoSubTitle}>
          {t('screens.home.depth', {depth})}
        </Text>
      </View>
      <View style={styles.earthquakeCardItemTime}>
        <Text style={styles.earthquakeCardItemTimeText}>
          {date.fromNow(dateTime)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(EarthquakeCardItem);
