import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/en';
import 'dayjs/locale/tr';

dayjs.extend(relativeTime);
dayjs.locale('tr');
/**
 * @description Gelen zaman türünü x gün / ay / saat... önce şeklinde döndürür.
 * @param {*} date
 * @returns
 */
const fromNow = (date, timestamp = false) => {
  if (timestamp) return dayjs.unix(date).fromNow();
  return dayjs(date).fromNow();
};

/**
 * @description Gelen zaman türünü belirtilen formata göre döndürür.
 * @param {*} date
 * @param {*} customFormat
 * @returns {string}
 */
const dateConverter = (date, customFormat = 'DD.MM.YYYY HH:mm:ss') => {
  if (date) return dayjs(date).format(customFormat);
  return dayjs().format(customFormat);
};

/**
 * @description Gelen zaman türünü dayjs objesine dönüştürür.
 * @param {*} date
 * @param {*} customFormat
 * @returns
 */
const dateObject = (date, customFormat = 'DD.MM.YYYY HH:mm:ss') => {
  if (date) return dayjs(date, customFormat).toDate();
  return dayjs().toDate();
};

export default {
  fromNow,
  dateConverter,
  dateObject,
};
