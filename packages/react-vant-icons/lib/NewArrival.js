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
  d: "M722.222 222.222C875.635 222.222 1000 346.588 1000 500c0 153.412-124.365 277.778-277.778 277.778H0V222.222h722.222zM290.786 414.325a382.615 382.615 0 01-13.016 40.291H248.4c-4.672-15.545-9.345-28.87-14.35-40.29l-30.705 11.103c5.34 8.883 10.012 18.718 14.017 29.187H183.32v30.139h63.412v25.697H188.66v30.138h58.072v75.188c0 6.028-4.005 9.2-11.348 9.2-4.005 0-8.677-.951-13.683-2.22l7.676 30.456h17.355c23.028 0 34.71-9.835 34.71-29.504v-83.12h54.733v-30.138h-54.734v-25.697h60.408v-30.139h-32.373c4.338-9.2 8.343-19.035 12.348-29.821zm174.549-53.932c-32.707 12.056-69.42 18.4-110.804 19.035v137.686c-1.335 46.636-11.68 83.12-30.37 109.45l25.03 25.064c24.364-33.629 37.38-78.36 39.049-134.514v-30.139h36.044v165.287h34.376V486.975h30.705v-31.407H388.24v-49.174c34.376-1.903 65.748-7.296 94.116-16.18zm187.899 142.128H527.412v144.665h34.042v-14.91h58.072v14.91h33.708V502.521zm155.86 0H679.265v144.665h34.042v-14.91h61.076v14.91h34.71V502.521zM207.35 552.963c-5.674 25.697-15.686 50.125-30.038 72.967l29.036 17.45c14.018-23.795 24.698-51.712 32.374-84.072zm108.133-1.903l-28.702 7.296c7.342 18.718 13.684 38.07 18.69 57.74l29.37-10.787c-4.673-16.497-11.348-34.58-19.358-54.25zm304.043-17.449v67.891h-58.072v-67.891h58.072zm154.858 0v67.891h-61.076v-67.891h61.076zM764.37 368.324H572.467v113.258h191.904V368.324zm-35.043 31.09v51.078H607.51v-51.077h121.817zM267.424 355l-36.045 5.71c4.673 6.663 9.011 13.96 13.016 21.89h-57.738v30.456h153.19v-30.455h-60.742c-4.005-10.152-7.676-19.353-11.681-27.601z",
  fillRule: "evenodd"
}));

const SvgNewArrival = React.forwardRef((props, ref) => {
  return React.createElement(_IconBase.default, Object.assign({
    name: "SvgNewArrival"
  }, props, {
    ref: ref
  }), React.createElement(SvgIcon, null));
});
var _default = SvgNewArrival;
exports.default = _default;