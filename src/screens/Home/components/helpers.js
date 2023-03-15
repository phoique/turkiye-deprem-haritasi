/**
 * @description Şehir listesini select için uygun formata çevirir.
 * @param {Object} cities
 * @returns {Array}
 */
export const selectDataGenerator = cities => {
  const response = [];
  if (cities) {
    const citiesArray = Object.values(cities);
    for (let i = 0; i < citiesArray.length; i += 1) {
      const city = citiesArray[i];
      response.push({
        label: city.city,
        value: city.cityCode,
      });
    }
  }
  return response;
};
