import React from 'react';
import {View, Text} from 'react-native';
import Icon from '../Icons';
import useStyles from './useStyles';

const FormGroup = ({title, children, icon}) => {
  const styles = useStyles();
  return (
    <View style={styles.formGroupContainer}>
      {!icon && <Text style={styles.formTitle}>{title}</Text>}
      <View style={styles.formGroupInputContainer}>
        {children}
        {icon && <Icon name={icon} size={24} />}
      </View>
    </View>
  );
};

export default FormGroup;
