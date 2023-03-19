import {useTranslation} from 'react-i18next';

const useFilterSort = () => {
  const {t} = useTranslation();

  const i18nPrefix = 'screens.home.filter.sortItems';
  return [
    {
      label: t(`${i18nPrefix}.dateFromNewToOld`),
      value: 'date_-1',
    },
    {
      label: t(`${i18nPrefix}.dateFromOldToNew`),
      value: 'date_1',
    },
    {
      label: t(`${i18nPrefix}.magFromHighToLow`),
      value: 'mag_-1',
    },
    {
      label: t(`${i18nPrefix}.magFromLowToHigh`),
      value: 'mag_1',
    },
  ];
};

export default useFilterSort;
