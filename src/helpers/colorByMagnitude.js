import {theme} from '../constants';

const colorByMagnitude = magnitude => {
  const color = theme.colors.colorByMagnitude;

  if (!magnitude) return null;

  if (magnitude < 1.0) {
    return color[0];
  }
  if (magnitude >= 10.0) {
    return color[color.length - 1];
  }
  const floor = Math.floor(magnitude - 1);
  const index = floor === 0 ? 1 : floor;
  return color[index];
};
export default colorByMagnitude;
