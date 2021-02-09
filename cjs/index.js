"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(fn) {
  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
  var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var timeout;
  return function () {
    var context = this,
        args = arguments,
        callNow = immediate && !timeout,
        fnc = function fnc() {
      timeout = null;
      if (!immediate) fn.apply(context, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(fnc, wait);
    if (callNow) fn.apply(context, args);
  };
};

exports["default"] = _default;