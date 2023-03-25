import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import useStyles from '../useStyles';
import {homeSlice, mapSlice} from '../../../store';
import {FormGroup, Select, Icon} from '../../../components';
import {staticsServices} from '../../../services';
import {citySelectData} from '../../../helpers';
import useHomeStyles from '../../Home/components/useStyles';

const snapPoints = ['35%'];
const MapFilter = ({setFitbounds}) => {
  const styles = useStyles();
  const homeStyles = useHomeStyles();

  const dispatch = useDispatch();
  const {t} = useTranslation();
  const filter = useSelector(({map}) => map.filter);

  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  const cityListQuery = staticsServices.useCityListQuery(null, {
    selectFromResult: result => ({
      ...result,
      data: citySelectData(result.data),
    }),
    skip: !isFilterOpen,
  });

  const handleSheetChanges = React.useCallback(index => {
    if (index === -1) {
      setIsFilterOpen(false);
    }
  }, []);

  const handleFilterStatus = React.useCallback(() => {
    setIsFilterOpen(prev => !prev);
  }, []);

  const i18nPrefix = 'screens.home.filter';

  return (
    <>
      <TouchableOpacity
        style={styles.mapFilterButton}
        onPress={handleFilterStatus}>
        <Icon name="filter" size={30} />
      </TouchableOpacity>
      {isFilterOpen && (
        <BottomSheet
          index={snapPoints.length - 1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enablePanDownToClose>
          <Formik
            initialValues={{
              city: filter.city,
            }}
            onSubmit={values => {
              dispatch(homeSlice.actions.resetEarthquake());
              dispatch(mapSlice.actions.setFilterData(values));
              setIsFilterOpen(false);
              setFitbounds(true);
            }}
            enableReinitialize>
            {({setFieldValue, handleSubmit, values}) => (
              <View style={homeStyles.container}>
                <Text style={homeStyles.title}>{t(`${i18nPrefix}.title`)}</Text>
                <FormGroup icon="align-justify">
                  <Select
                    name="city"
                    onChange={setFieldValue}
                    placeholder={t(`${i18nPrefix}.city`)}
                    data={cityListQuery.data}
                    value={values.city}
                  />
                </FormGroup>
                <View style={homeStyles.footer}>
                  <View />
                  <TouchableOpacity
                    style={homeStyles.filterButton}
                    onPress={handleSubmit}>
                    <Text style={homeStyles.filterButtonText}>
                      {t(`${i18nPrefix}.filter`)}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </BottomSheet>
      )}
    </>
  );
};

export default React.memo(MapFilter);
