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

const dateConverter = (date, customFormat = 'DD.MM.YYYY HH:mm:ss') => {
  if (date) return dayjs(date).format(customFormat);
  return dayjs().format(customFormat);
};

export default {
  fromNow,
  dateConverter,
};
