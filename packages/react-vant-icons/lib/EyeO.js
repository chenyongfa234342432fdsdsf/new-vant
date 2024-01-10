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
  d: "M789.018 367.497C708.123 293.956 609.223 250 500 250c-109.223 0-208.123 43.956-289.018 117.497-56.716 51.56-98.894 117.15-99.854 132.007.134-2.084 1.057.722 3.4 5.63 4.46 9.334 11.517 21.04 20.65 33.934 21.377 30.18 51.159 62.929 85.304 92.62C305.41 705.539 403.067 750 500 750c96.933 0 194.591-44.462 279.518-118.311 34.145-29.692 63.927-62.441 85.304-92.62 9.133-12.894 16.19-24.601 20.65-33.935 2.166-4.537 3.118-7.278 3.355-6.123-1.817-15.761-43.698-80.505-99.809-131.514zM500 194.444c277.778 0 444.444 250 444.444 305.556C944.444 555.556 750 805.556 500 805.556c-250 0-444.444-250-444.444-305.556 0-55.556 166.666-305.556 444.444-305.556zm0 138.89c-92.047 0-166.667 74.619-166.667 166.666S407.953 666.667 500 666.667 666.667 592.047 666.667 500 592.047 333.333 500 333.333zm0 55.555c61.365 0 111.111 49.746 111.111 111.111S561.365 611.111 500 611.111 388.889 561.365 388.889 500 438.635 388.889 500 388.889z",
  fillRule: "nonzero"
}));

const SvgEyeO = React.forwardRef((props, ref) => {
  return React.createElement(_IconBase.default, Object.assign({
    name: "SvgEyeO"
  }, props, {
    ref: ref
  }), React.createElement(SvgIcon, null));
});
var _default = SvgEyeO;
exports.default = _default;