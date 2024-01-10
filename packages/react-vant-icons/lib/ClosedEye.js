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
  d: "M85.26 345.238c-26.768-28.64 15.701-72.148 42.532-43.446 58.156 62.228 138.743 110.914 217.855 138.336 199.438 69.118 391.397-.516 545.582-138.336 29.055-25.968 71.77 17.314 42.523 43.446-19.976 17.858-40.684 34.799-62.038 50.647 17.924 35.233 35.842 70.449 53.77 105.665 17.874 35.118-34.04 66.188-51.945 31.008-19.41-38.196-38.853-76.336-58.271-114.5l6.242 12.267c-35.623 22.484-72.73 41.841-110.976 57.36l43.496 113.343c14.18 36.944-44.013 52.78-57.995 16.334l-42.15-109.817c-41.199 12.182-83.465 19.759-126.398 21.911v-.01c.045.747.069 1.508.069 2.284v129.024c0 39.624-60.145 39.624-60.145 0V531.73c0-.976.036-1.928.107-2.856-40.302-2.814-81.023-10.626-121.84-24.082-.944-.311-1.887-.624-2.831-.94L296.928 623.52c-13.987 36.452-72.166 20.6-57.995-16.336l46.095-120.118a35.842 35.842 0 012.081-4.49c-35.25-15.161-69.874-33.439-102.41-54.713-23.58 31.223-47.154 62.45-70.735 93.657-9.99 13.25-25.63 20.312-41.14 11.03-12.787-7.656-20.832-28.742-10.79-42.03l74.059-98.056c-18.084-14.681-35.135-30.431-50.832-47.226z",
  fillRule: "evenodd"
}));

const SvgClosedEye = React.forwardRef((props, ref) => {
  return React.createElement(_IconBase.default, Object.assign({
    name: "SvgClosedEye"
  }, props, {
    ref: ref
  }), React.createElement(SvgIcon, null));
});
var _default = SvgClosedEye;
exports.default = _default;