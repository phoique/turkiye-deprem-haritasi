import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import useStyles from './useStyles';
import {homeSlice} from '../../../store';
import {FormGroup, Select, SelectCalendar} from '../../../components';
import {staticsServices} from '../../../services';
import {selectDataGenerator} from './helpers';
import {useFilterSort} from '../hooks';

const snapPoints = ['65%'];
const Filter = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const styles = useStyles();
  const sortData = useFilterSort();

  const filter = useSelector(({home}) => home.filter);

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

  if (!isFilterOpen) return null;

  const i18nPrefix = 'screens.home.filter';
  return (
    <BottomSheet
      index={snapPoints.length - 1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose>
      <Formik
        initialValues={{
          sort: filter.sort,
          startDate: filter.startDate,
          endDate: filter.endDate,
          city: filter.city,
        }}
        onSubmit={values => {
          dispatch(homeSlice.actions.setFilterData(values));
          dispatch(homeSlice.actions.setIsFilterOpen(false));
        }}
        enableReinitialize>
        {({setFieldValue, handleSubmit, handleReset, values}) => (
          <View style={styles.container}>
            <Text style={styles.title}>{t(`${i18nPrefix}.title`)}</Text>
            <FormGroup icon="list">
              <Select
                name="sort"
                placeholder={t(`${i18nPrefix}.sort`)}
                data={sortData}
                onChange={setFieldValue}
                value={values.sort}
              />
            </FormGroup>
            <FormGroup icon="calendar">
              <SelectCalendar
                name="startDate"
                onChange={setFieldValue}
                placeholder={t(`${i18nPrefix}.startDate`)}
                value={values.startDate}
              />
            </FormGroup>
            <FormGroup icon="calendar">
              <SelectCalendar
                disabled={!values.startDate}
                minimumDate={values.startDate}
                name="endDate"
                onChange={setFieldValue}
                placeholder={t(`${i18nPrefix}.endDate`)}
                value={values.endDate}
              />
            </FormGroup>
            <FormGroup icon="align-justify">
              <Select
                name="city"
                onChange={setFieldValue}
                placeholder={t(`${i18nPrefix}.city`)}
                data={cityListQuery.data}
                value={values.city}
              />
            </FormGroup>
            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={() => {
                  handleReset();
                  dispatch(
                    homeSlice.actions.setFilterData({
                      sort: null,
                      startDate: null,
                      endDate: null,
                      city: null,
                    }),
                  );
                  dispatch(homeSlice.actions.setIsFilterOpen(false));
                }}>
                <Text style={styles.resetButtonText}>
                  {t(`${i18nPrefix}.reset`)}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.filterButton}
                onPress={handleSubmit}>
                <Text style={styles.filterButtonText}>
                  {t(`${i18nPrefix}.filter`)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </BottomSheet>
  );
};

export default React.memo(Filter);
