import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import * as CustomSvgIcons from './custom';

function Icon({type, name, color, size, style}) {
  if (type === 'Feather') {
    return <Feather name={name} color={color} size={size} style={style} />;
  }
  if (type === 'custom') {
    const SvgIconWrapper = CustomSvgIcons[name];
    return <SvgIconWrapper height={15} width={20} {...style} />;
  }
  return <Feather name="x" />;
}

Icon.defaultProps = {
  type: 'Feather',
  size: 12,
  color: 'black',
};

export default Icon;
