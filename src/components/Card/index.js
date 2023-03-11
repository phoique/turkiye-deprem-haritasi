import React from 'react';
import {View, Text} from 'react-native';
import Icon from '../Icons';
import useStyles from './useStyles';

const Card = ({title, icon, children}) => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        {icon && <Icon name={icon} size={24} />}
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.body}>{children}</View>
    </View>
  );
};

export default Card;
