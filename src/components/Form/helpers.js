export const convertSelectDataToObject = data => {
  const response = {};
  for (let index = 0; index < data.length; index += 1) {
    const option = data[index];
    response[option.value] = option.label;
  }
  return response;
};
