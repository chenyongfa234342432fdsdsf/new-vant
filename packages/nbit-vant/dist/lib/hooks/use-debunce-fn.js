"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _react() {
  const data = _interopRequireWildcard(require("react"));

  _react = function () {
    return data;
  };

  return data;
}

var _useLatest = _interopRequireDefault(require("./use-latest"));

var _useUnmount = _interopRequireDefault(require("./use-unmount"));

var _utils = require("../utils");

var _debounce = require("../utils/debounce");

var _devLog = require("../utils/dev-log");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function useDebounceFn(fn, options) {
  var _a;

  if (process.env.NODE_ENV === 'development') {
    if (!(0, _utils.isFunction)(fn)) {
      (0, _devLog.devWarning)('useDebounceFn', `expected parameter is a function, got ${typeof fn}`);
    }
  }

  const fnRef = (0, _useLatest.default)(fn);
  const wait = (_a = options === null || options === void 0 ? void 0 : options.wait) !== null && _a !== void 0 ? _a : 1000;
  const debounced = (0, _react().useMemo)(() => (0, _debounce.debounce)((...args) => {
    return fnRef.current(...args);
  }, wait, options), []);
  (0, _useUnmount.default)(() => {
    debounced.cancel();
  });
  return {
    run: debounced,
    cancel: debounced.cancel,
    flush: debounced.flush
  };
}

var _default = useDebounceFn;
exports.default = _default;