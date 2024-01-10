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
  d: "M500 55.556c245.46 0 444.444 198.984 444.444 444.444S745.46 944.444 500 944.444 55.556 745.46 55.556 500 254.54 55.556 500 55.556zm78.69 272.008c3.288-42.912-28.942-74.292-70.923-70.34-.624.096-1.246.207-1.864.33-.882.108-1.768.23-2.62.61-18.632 4.941-33.954 22.01-36.528 41.052-.655 6.334-1.946 16.486-4.066 29.615-3.533 21.882-8.11 43.74-13.81 63.994-13.295 47.243-30.766 77.061-46.844 80.851-3.523.83-15.327 3.156-32.197 6.37l-1.342.256-1.749.332-1.746.332a8840.647 8840.647 0 01-32.263 6.06c-18.21 3.384-32.136 20.086-32.136 38.59v163.196c0 24.132 20.632 41.679 44.363 37.833l292.717-47.483c27.6-4.478 47.285-30.198 44.75-57.959-.431-2.702-.431-2.702-.5-3.082-.226-1.556-.243-3.657.369-6.532.3-.694 2.35-4.867 2.874-5.997 3.723-8.04 5.924-15.976 6.666-26.388.557-7.8.03-12.7-1.587-20.318-.918-4.326-1.062-5.78-.723-9.714.263-3.046.73-4.762 2.178-8.441l1.029-2.598c3.25-8.288 5.01-15.182 5.821-25.297.862-10.862-.15-18.403-2.837-28.083-.295-1.053-.436-1.555-.56-2.009l-.068-.246-.339-1.254c-.609-2.339-.726-3.387-.565-4.906.344-3.302.787-6.341 1.304-9.127.708-3.824 1.35-6.24 1.637-7.088 9.334-38.389-16.793-67.536-54.125-63.088l-70.278 8.36zM375 521.478v158.083l-32.731 5.31V527.634a8889.391 8889.391 0 0032.73-6.156zm138.164-222.765c15.574-.92 25.242 9.215 23.981 25.668l-6.303 82.286c-1.86 24.596 17.736 43.54 42.162 40.656l74.928-8.913c8.607-1.026 11.207 1.875 9.214 10.148-.385.872-1.537 5.209-2.621 11.059a157.817 157.817 0 00-1.774 12.372c-.747 7.07-.093 12.934 1.68 19.749.617 2.29.617 2.29 1.142 4.158 1.488 5.359 1.877 8.262 1.452 13.625-.455 5.66-1.223 8.67-3.078 13.398l-1.008 2.548c-2.8 7.11-4.262 12.491-4.92 20.128-.745 8.644-.222 13.94 1.51 22.1.844 3.975.984 5.28.751 8.545-.363 5.1-1.217 8.178-2.914 11.841-.077.167-.848 1.74-1.652 3.416l-.242.504a106.53 106.53 0 00-1.415 3.05c-1.465 3.387-2.498 6.644-3.091 10.267-1.13 6.88-1.077 13.224-.267 18.794.318 1.884.428 2.533.564 3.149l.044.194c.06.262.13.54.226.923-.04 2.693-4.637 8.7-10.523 9.655l-214.344 34.769.001-159.993c33.76-11.02 55.84-50.13 72.32-108.697 6.177-21.948 11.069-45.305 14.836-68.64 2.26-14 3.653-24.948 4.304-31.36.21-1.474 2.873-4.404 5.037-5.399z",
  fillRule: "evenodd"
}));

const SvgThumbCircle = React.forwardRef((props, ref) => {
  return React.createElement(_IconBase.default, Object.assign({
    name: "SvgThumbCircle"
  }, props, {
    ref: ref
  }), React.createElement(SvgIcon, null));
});
var _default = SvgThumbCircle;
exports.default = _default;