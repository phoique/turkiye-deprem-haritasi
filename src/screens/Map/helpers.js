export function debounce(func, delay) {
  let timerId;
  // eslint-disable-next-line func-names
  return function (...args) {
    const context = this;

    clearTimeout(timerId);

    timerId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}
