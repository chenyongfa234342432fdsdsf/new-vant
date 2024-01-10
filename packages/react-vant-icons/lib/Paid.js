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
  d: "M111.111 333.333v444.445H888.89V333.333H111.11zm666.667-166.666c30.682 0 55.555 24.873 55.555 55.555v55.556h55.556c30.682 0 55.555 24.873 55.555 55.555v444.445c0 30.682-24.873 55.555-55.555 55.555H111.11c-30.682 0-55.555-24.873-55.555-55.555v-500l722.222-.001v-111.11zm166.666 222.222v55.555H666.667c-61.365 0-111.111 49.747-111.111 111.112 0 61.365 49.746 111.11 111.11 111.11h277.778v55.556H666.667C574.619 722.222 500 647.603 500 555.556c0-92.048 74.62-166.667 166.667-166.667h277.777zm-263.888 125c23.011 0 41.666 18.655 41.666 41.667 0 23.011-18.655 41.666-41.666 41.666-23.012 0-41.667-18.655-41.667-41.666 0-23.012 18.655-41.667 41.667-41.667zM582.53 69.253l.858.007c18.874.314 37.118 10.242 47.243 27.78l40.199 69.626h106.947v55.556h-74.872l32.066 55.54 19.878 34.43-65.68-2.651-106.65-184.723-292.068 168.625-103.849-4.193 19.972-11.532 96.154-55.514h-163.84v.018c-15.341 0-27.778 12.437-27.778 27.778s12.437 27.778 27.778 27.778v55.555c-17.76 0-34.22-5.555-47.742-15.022l-35.608-.002v-69.444h.026l.002-.243c.724-44.644 36.554-80.754 81.088-81.926l.001-.047h262.297L554.74 76.705c8.77-5.062 18.344-7.463 27.79-7.452z",
  fillRule: "nonzero"
}));

const SvgPaid = React.forwardRef((props, ref) => {
  return React.createElement(_IconBase.default, Object.assign({
    name: "SvgPaid"
  }, props, {
    ref: ref
  }), React.createElement(SvgIcon, null));
});
var _default = SvgPaid;
exports.default = _default;