import React from 'react';
import {View, Text} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import Icon from '../Icons';
import useStyles from './useStyles';
import InfoCard from './InfoCard';

const snapPoints = ['40%', '50%', '65%'];
const EarthquakeDetail = ({earthquakeId, setClose}) => {
  const styles = useStyles();

  const handleSheetChanges = React.useCallback(
    index => {
      if (index === -1) setClose();
    },
    [setClose],
  );

  if (!earthquakeId) return null;

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
            <Text style={styles.infoHeaderTitle}>Türkiye</Text>
            <Text style={styles.infoHeaderSubTitle}>
              ASLANBEYCIFTLIGI-GOKSUN (KAHRAMANMARAS)
            </Text>
          </View>
          <View style={styles.infoHeaderMagContainer}>
            <Text style={styles.infoHeaderMagText}>2.2</Text>
          </View>
        </View>
        <View style={styles.otherInfoRowContainer}>
          <InfoCard
            icon="activity"
            title="Derinlik"
            description="10 km derinliğinde"
          />
          <InfoCard
            icon="activity"
            title="Etkilenen Bölge"
            description="Adana, Kahramanmaraş, Mersin"
          />
        </View>
        <View style={styles.otherInfoRowContainer}>
          <InfoCard icon="activity" title="Revize" description="-" />
          <InfoCard
            icon="activity"
            title="Zaman"
            description="2021.04.25 12:12:12"
          />
        </View>
      </View>
    </BottomSheet>
  );
};

export default EarthquakeDetail;
