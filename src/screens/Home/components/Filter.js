import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import useStyles from './useStyles';
import {homeSlice} from '../../../store';
import {FormGroup, Input} from '../../../components';

const snapPoints = ['65%'];
const Filter = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const styles = useStyles();

  const isFilterOpen = useSelector(state => state.home.isFilterOpen);

  const handleSheetChanges = React.useCallback(
    index => {
      if (index === -1) {
        dispatch(homeSlice.actions.setIsFilterOpen(false));
      }
    },
    [dispatch],
  );

  if (!isFilterOpen) return null;

  const i18nPrefix = 'screens.home.filter';
  return (
    <BottomSheet
      index={snapPoints.length - 1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose>
      <View style={styles.container}>
        <Text style={styles.title}>{t(`${i18nPrefix}.title`)}</Text>
        <FormGroup icon="list">
          <Input placeholder={t(`${i18nPrefix}.sort`)} />
        </FormGroup>
        <FormGroup icon="calendar">
          <Input placeholder={t(`${i18nPrefix}.calendar`)} />
        </FormGroup>
        <FormGroup icon="align-justify">
          <Input placeholder={t(`${i18nPrefix}.city`)} />
        </FormGroup>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.resetButton}>
            <Text style={styles.resetButtonText}>
              {t(`${i18nPrefix}.reset`)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterButtonText}>
              {t(`${i18nPrefix}.filter`)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
};

export default Filter;

/**
 * Sıralama (select)
 * Başlangıç bitiş tarih (date picker)
 * Şehir seçimi (select)
 */
