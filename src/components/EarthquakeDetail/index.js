import React from 'react';
import {View, Text} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {useTranslation} from 'react-i18next';
import Icon from '../Icons';
import useStyles from './useStyles';
import InfoCard from './InfoCard';

const snapPoints = ['40%', '50%', '65%'];
const EarthquakeDetail = ({earthquakeDetail, setClose}) => {
  const {t} = useTranslation();
  const styles = useStyles();

  const handleSheetChanges = React.useCallback(
    index => {
      if (index === -1) setClose();
    },
    [setClose],
  );

  if (!earthquakeDetail) return null;

  const {
    mag,
    title,
    depth,
    date,
    rev,
    location_properties: {closestCity},
  } = earthquakeDetail;
  return (
    <BottomSheet
      index={snapPoints.length - 1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose>
      <View style={styles.container}>
        <View style={styles.infoHeaderContainer}>
          <Icon
            name="TurkishFlag"
            type="custom"
            style={styles.infoHeaderIcon}
          />
          <View style={styles.infoHeaderTextContainer}>
            <Text style={styles.infoHeaderTitle}>
              {t('constants.country.turkey')}
            </Text>
            <Text style={styles.infoHeaderSubTitle}>{title}</Text>
          </View>
          <View style={styles.infoHeaderMagContainer}>
            <Text style={styles.infoHeaderMagText}>{rev || mag}</Text>
          </View>
        </View>
        <View style={styles.otherInfoRowContainer}>
          <InfoCard
            icon="activity"
            title={t('components.earthquakeDetail.depthTitle')}
            description={t('components.earthquakeDetail.depthDescription', {
              depth,
            })}
          />
          <InfoCard
            icon="list"
            title={t('components.earthquakeDetail.affectedAreaTitle')}
            description={closestCity.name}
          />
        </View>
        <View style={styles.otherInfoRowContainer}>
          <InfoCard
            icon="edit-3"
            title={t('components.earthquakeDetail.beforeRevTitle')}
            description={rev ? `${rev} - ${mag}` : '-'}
          />
          <InfoCard
            icon="clock"
            title={t('components.earthquakeDetail.timeTitle')}
            description={date}
          />
        </View>
      </View>
    </BottomSheet>
  );
};

export default EarthquakeDetail;
