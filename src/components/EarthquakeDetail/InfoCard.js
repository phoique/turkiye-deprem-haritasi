import React from 'react';
import {View, Text} from 'react-native';
import Icon from '../Icons';
import useStyles from './useStyles';

const InfoCard = ({icon, title, description}) => {
  const styles = useStyles();
  return (
    <View style={styles.otherInfoContainer}>
      <View style={styles.otherInfoTitleContainer}>
        <Icon name={icon} size={22} style={styles.otherInfoIcon} />
        <Text style={styles.otherInfoTitle}>{title}</Text>
      </View>
      <Text style={styles.otherInfoDescription}>{description}</Text>
    </View>
  );
};

export default InfoCard;
