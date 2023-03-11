import React from 'react';
import {TextInput} from 'react-native';
import useStyles from './useStyles';

const Input = ({
  placeholder,
  value,
  onChangeText,
  keyboardType,
  editable,
  onFocus,
}) => {
  const styles = useStyles();
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      editable={editable}
      onFocus={onFocus}
      placeholderTextColor
    />
  );
};

export default Input;
