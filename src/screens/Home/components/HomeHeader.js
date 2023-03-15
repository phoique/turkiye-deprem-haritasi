import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {Icon} from '../../../components';
import useStyles from '../useStyles';
import {homeSlice} from '../../../store';

const HomeHeader = ({total, isFilterStatus}) => {
  const {t} = useTranslation();
  const styles = useStyles();
  const dispatch = useDispatch();

  const handleFilter = React.useCallback(() => {
    dispatch(homeSlice.actions.setIsFilterOpen(true));
  }, [dispatch]);

  return (
    <View style={styles.homeHeader}>
      <TouchableOpacity style={styles.homwHeaderIcon} onPress={handleFilter}>
        <Icon name="filter" size={30} color="#fff" />
      </TouchableOpacity>
      <View style={styles.homeHeaderContainer}>
        <Text style={styles.homeHeaderTitle}>
          {isFilterStatus
            ? t('screens.home.headerTitleFilter')
            : t('screens.home.headerTitle')}
        </Text>
        <Text style={styles.homeHeaderSubtitle}>
          {t('screens.home.headerSubTitle', {total})}
        </Text>
      </View>
    </View>
  );
};

export default React.memo(HomeHeader);
