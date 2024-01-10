"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _IconBase = _interopRequireDefault(require("./IconBase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const SvgIcon = props => React.createElement("svg", Object.assign({
  width: "1em",
  height: "1em",
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor"
}, props), React.createElement("path", {
  d: "M771.735 831.444c-30.944 36.5-76.055 57.445-123.889 57.445H384.68c-47.834 0-93-20.945-123.89-57.445-30.944-36.5-44.166-84.5-36.332-131.666l23.11-138.834c22-131.888 135-227.61 268.667-227.61 133.723 0 246.723 95.722 268.667 227.61l23.111 138.834c7.889 47.166-5.333 95.166-36.278 131.666zm-289.11-553.666c-55.223 0-103.223-40.334-114.223-95.89-1.056-5.5 1.278-9.277 2.722-11.11 1.556-1.89 4.278-4.111 8.39-4.111h273.444c4.166 0 6.833 2.222 8.444 4.11 1.444 1.834 3.778 5.612 2.722 11.112-11 55.555-59 95.889-114.222 95.889h-67.278zM862.845 690.61l-23.11-138.833C820.79 438.167 744.345 347.11 643.512 304.5c37.667-25.056 65.722-64.389 75.111-111.889 8.222-42.167-23.444-81.5-65.666-81.5H379.513c-42.167 0-73.889 39.333-65.611 81.5 9.389 47.5 37.444 86.833 75.056 111.889-100.723 42.611-177.223 133.667-196.167 247.278L169.68 690.61c-22.111 132.833 80.278 253.833 215 253.833h263.166c134.667 0 237.112-121 215-253.833zM585.702 638.9c15.333 0 27.778-12.444 27.778-27.778 0-15.333-12.445-27.778-27.778-27.778h-21.333l29.444-29.444c10.889-10.889 10.889-28.444 0-39.278-10.833-10.889-28.389-10.889-39.278 0L516.258 552.9l-38.278-38.278c-10.89-10.889-28.445-10.889-39.278 0-10.889 10.834-10.889 28.39 0 39.278l29.444 29.444h-21.333c-15.333 0-27.778 12.445-27.778 27.778 0 15.334 12.445 27.778 27.778 27.778h41.667v27.778h-41.667c-15.333 0-27.778 12.444-27.778 27.778 0 15.333 12.445 27.777 27.778 27.777h41.667v27.778c0 15.333 12.444 27.778 27.778 27.778 15.333 0 27.777-12.445 27.777-27.778v-27.778h41.667c15.333 0 27.778-12.444 27.778-27.777 0-15.334-12.445-27.778-27.778-27.778h-41.667V638.9h41.667z",
  fillRule: "evenodd"
}));

const SvgBalanceO = React.forwardRef((props, ref) => {
  return React.createElement(_IconBase.default, Object.assign({
    name: "SvgBalanceO"
  }, props, {
    ref: ref
  }), React.createElement(SvgIcon, null));
});
var _default = SvgBalanceO;
exports.default = _default;