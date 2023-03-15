import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import useStyles from './useStyles';
import {date} from '../../helpers';

const SelectCalendar = ({
  placeholder,
  onChange,
  name,
  value,
  disabled,
  minimumDate,
}) => {
  const {i18n, t} = useTranslation();
  const styles = useStyles();
  const [modalVisible, setModalVisible] = React.useState(false);

  const onInputPress = React.useCallback(() => {
    setModalVisible(true);
  }, []);

  const handleCancel = React.useCallback(() => {
    setModalVisible(false);
  }, []);

  const handleConfirm = React.useCallback(
    selectDate => {
      setModalVisible(false);
      onChange(name, date.dateConverter(selectDate, 'YYYY-MM-DD'));
    },
    [name, onChange],
  );

  return (
    <View style={styles.selectInputContainer}>
      <DateTimePickerModal
        minimumDate={minimumDate ? date.dateObject(minimumDate) : null}
        date={date.dateObject(value)}
        locale={i18n.language}
        isVisible={modalVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        confirmTextIOS={t('components.form.confirmSelect')}
        cancelTextIOS={t('components.form.resetSelect')}
      />
      <TouchableOpacity
        onPress={onInputPress}
        style={styles.selectInputButton}
        disabled={disabled}>
        <Text style={styles.selectInputButtonText(false)}>
          {value ? date.dateConverter(value, 'DD.MM.YYYY') : placeholder}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectCalendar;
