import Toast from 'react-native-toast-message';

/**
 *
 * @param {String} message
 * @param {String} type success, error, info
 * @param {String} title
 * @param {String} position top, bottom
 * @param onPress
 * @returns
 */
const show = (message, type, title, position, onPress) =>
  Toast.show({
    text1: title ?? '',
    text2: message,
    type,
    position,
    onPress,
  });

export default {show};
