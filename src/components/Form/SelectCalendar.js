import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import useStyles from './useStyles';

const SelectCalendar = ({placeholder}) => {
  const {i18n, t} = useTranslation();
  const styles = useStyles();
  const [modalVisible, setModalVisible] = React.useState(false);

  const onInputPress = React.useCallback(() => {
    setModalVisible(true);
  }, []);

  const handleCancel = React.useCallback(() => {
    setModalVisible(false);
  }, []);

  const handleConfirm = React.useCallback(() => {
    setModalVisible(false);
  }, []);

  return (
    <View style={styles.selectInputContainer}>
      <DateTimePickerModal
        locale={i18n.language}
        isVisible={modalVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        confirmTextIOS={t('components.form.confirmSelect')}
        cancelTextIOS={t('components.form.resetSelect')}
      />
      <TouchableOpacity onPress={onInputPress} style={styles.selectInputButton}>
        <Text style={styles.selectInputButtonText(false)}>{placeholder}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectCalendar;
