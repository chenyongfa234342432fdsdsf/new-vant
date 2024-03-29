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
}, props), React.createElement("g", {
  fillRule: "nonzero"
}, React.createElement("path", {
  d: "M446.42 282.061a335.726 335.726 0 0153.58-4.283c14.599 0 28.978.938 43.081 2.758 4.186.507 8.344 1.089 12.475 1.747V111.111h55.555v185.177a311.039 311.039 0 0139 16.77l72.111-107.715V111.11H277.778v94.379l71.4 107.782a320.583 320.583 0 0139.71-16.923V111.111h55.556v171.261c.658-.105 1.316-.209 1.975-.31zm250.89 60.359c82.49 60.678 136.023 158.433 136.023 268.691 0 184.095-149.238 333.333-333.333 333.333-184.095 0-333.333-149.238-333.333-333.333 0-110.005 53.287-207.565 135.457-268.273L231.463 236.17a55.556 55.556 0 01-9.24-30.681v-94.379c0-30.682 24.872-55.555 55.555-55.555h444.444c30.683 0 55.556 24.873 55.556 55.555v94.232a55.556 55.556 0 01-9.39 30.906l-71.079 106.17zm-30.945 46.222l-.166.247a277.576 277.576 0 00-16.932-12.084c-33.698-21.512-72.347-35.955-113.856-41.236-11.42-1.34-23.11-2.01-35.07-2.01-15.129 0-29.86 1.072-44.192 3.216C323.572 357.8 222.222 472.62 222.222 611.111c0 153.413 124.366 277.778 277.778 277.778 153.412 0 277.778-124.365 277.778-277.778 0-91.014-43.772-171.805-111.413-222.469z"
}), React.createElement("path", {
  d: "M500 532.544l-78.567 78.567L500 689.68l78.567-78.568L500 532.544zm39.284-39.284l78.567 78.567c21.696 21.696 21.696 56.872 0 78.568l-78.567 78.567c-21.696 21.696-56.872 21.696-78.568 0l-78.567-78.567c-21.696-21.696-21.696-56.872 0-78.568l78.567-78.567c21.696-21.696 56.872-21.696 78.568 0z"
})));

const SvgMedalO = React.forwardRef((props, ref) => {
  return React.createElement(_IconBase.default, Object.assign({
    name: "SvgMedalO"
  }, props, {
    ref: ref
  }), React.createElement(SvgIcon, null));
});
var _default = SvgMedalO;
exports.default = _default;