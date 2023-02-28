import React from 'react';
import {View, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Icon} from '../../../components';
import useStyles from '../useStyles';

const HomeHeader = () => {
  const {t} = useTranslation();
  const styles = useStyles();
  return (
    <View style={styles.homeHeader}>
      <View style={styles.homwHeaderIcon}>
        <Icon name="filter" size={30} color="#fff" />
      </View>
      <View style={styles.homeHeaderContainer}>
        <Text style={styles.homeHeaderTitle}>
          {t('screens.home.headerTitle')}
        </Text>
        <Text style={styles.homeHeaderSubtitle}>
          {t('screens.home.headerSubTitle', {total: 450})}
        </Text>
      </View>
    </View>
  );
};

export default HomeHeader;
