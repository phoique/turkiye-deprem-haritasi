import React from 'react';
import {
  View,
  Text,
  Modal,
  Alert,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import Container from '../Container';
import Icon from '../Icons';
import useStyles from './useStyles';
import {convertSelectDataToObject} from './helpers';

const SelectItem = ({value, label, onPress, selectedId}) => {
  const styles = useStyles();
  const isSelected = value === selectedId;
  return (
    <TouchableOpacity style={styles.selectItemContent} onPress={onPress}>
      <Icon name={isSelected ? 'check-circle' : 'circle'} size={24} />
      <Text style={styles.selectItemText(isSelected)}>{label}</Text>
    </TouchableOpacity>
  );
};

const Select = ({placeholder, data, value}) => {
  const {t} = useTranslation();
  const styles = useStyles();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(value);

  const handleSelect = React.useCallback(item => {
    setSelectedId(item.value);
    setModalVisible(false);
  }, []);

  const renderItem = ({item}) => {
    return (
      <SelectItem
        value={item.value}
        label={item.label}
        onPress={() => handleSelect(item)}
        selectedId={selectedId}
      />
    );
  };

  const keyExtractor = React.useCallback(item => `select-${item.value}`, []);

  const handleReset = React.useCallback(() => {
    setSelectedId(null);
  }, []);

  const onInputPress = React.useCallback(() => {
    setModalVisible(true);
  }, []);

  const handleClose = React.useCallback(() => {
    setModalVisible(false);
  }, []);

  const items = React.useMemo(() => convertSelectDataToObject(data), [data]);

  return (
    <View style={styles.selectInputContainer}>
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.selectContainer}>
          <Container safeAreaBottom>
            <View style={styles.selectHeaderContainer}>
              <Text style={styles.selectHeader}>{placeholder}</Text>
              <TouchableOpacity
                style={styles.selectHeaderClose}
                onPress={handleClose}>
                <Icon name="x" size={24} />
              </TouchableOpacity>
            </View>
            <View style={styles.selectItemContainer}>
              <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                extraData={selectedId}
              />
            </View>
            <View style={styles.selectFooter}>
              <TouchableOpacity
                style={styles.selectResetButton}
                onPress={handleReset}>
                <Text style={styles.selectResetButtonText}>
                  {t('components.form.resetSelect')}
                </Text>
              </TouchableOpacity>
            </View>
          </Container>
        </View>
      </Modal>
      <TouchableOpacity onPress={onInputPress} style={styles.selectInputButton}>
        <Text style={styles.selectInputButtonText(selectedId)}>
          {selectedId ? items[selectedId] : placeholder}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(Select);
