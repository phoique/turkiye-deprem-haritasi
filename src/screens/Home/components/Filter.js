import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import useStyles from './useStyles';
import {homeSlice} from '../../../store';
import {FormGroup, Select, SelectCalendar} from '../../../components';
import {staticsServices} from '../../../services';
import {selectDataGenerator} from './helpers';

const snapPoints = ['65%'];
const initialFilter = {
  sort: null,
  startDate: null,
  endDate: null,
  city: null,
};
const Filter = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const styles = useStyles();

  const filter = useSelector(({home}) => home.filter);
  const [formState, setFormState] = React.useState({...filter});

  const isFilterOpen = useSelector(state => state.home.isFilterOpen);
  const cityListQuery = staticsServices.useCityListQuery(null, {
    selectFromResult: result => ({
      ...result,
      data: selectDataGenerator(result.data),
    }),
    skip: !isFilterOpen,
  });

  const handleSheetChanges = React.useCallback(
    index => {
      if (index === -1) {
        dispatch(homeSlice.actions.setIsFilterOpen(false));
      }
    },
    [dispatch],
  );

  const handleChange = React.useCallback((name, value) => {
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleReset = React.useCallback(() => {
    setFormState(initialFilter);
    dispatch(homeSlice.actions.setFilterData(initialFilter));
    dispatch(homeSlice.actions.setIsFilterOpen(false));
  }, [dispatch]);

  const handleSubmit = React.useCallback(() => {
    setFormState(initialFilter);
    dispatch(homeSlice.actions.setFilterData(formState));
    dispatch(homeSlice.actions.setIsFilterOpen(false));
  }, [dispatch, formState]);

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
          <Select
            name="sort"
            placeholder={t(`${i18nPrefix}.sort`)}
            data={[]}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup icon="calendar">
          <SelectCalendar
            name="startDate"
            onChange={handleChange}
            placeholder={t(`${i18nPrefix}.startDate`)}
            value={formState.startDate}
          />
        </FormGroup>
        <FormGroup icon="calendar">
          <SelectCalendar
            disabled={!formState.startDate}
            minimumDate={formState.startDate}
            name="endDate"
            onChange={handleChange}
            placeholder={t(`${i18nPrefix}.endDate`)}
            value={formState.endDate}
          />
        </FormGroup>
        <FormGroup icon="align-justify">
          <Select
            name="city"
            onChange={handleChange}
            placeholder={t(`${i18nPrefix}.city`)}
            data={cityListQuery.data}
            value={formState.city}
          />
        </FormGroup>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.resetButtonText}>
              {t(`${i18nPrefix}.reset`)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton} onPress={handleSubmit}>
            <Text style={styles.filterButtonText}>
              {t(`${i18nPrefix}.filter`)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
};

export default React.memo(Filter);
