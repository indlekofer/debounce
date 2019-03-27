export default (fn, wait = 100, immediate = false) => {
  let timeout;
  return function() {
    const context = this,
          args = arguments,
          callNow = immediate && !timeout,
          fnc = () => {
            timeout = null;
            if (!immediate) fn.apply(context, args);
          };
    clearTimeout(timeout);
    timeout = setTimeout(fnc, wait);
    if (callNow) fn.apply(context, args);
  }
}
