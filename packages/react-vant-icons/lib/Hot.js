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
  d: "M363.145 169.602l97.571-97.572c21.696-21.696 56.872-21.696 78.568 0l97.571 97.572h137.988c30.682 0 55.555 24.873 55.555 55.555v137.988l97.572 97.571c21.696 21.696 21.696 56.872 0 78.568l-97.572 97.571v137.988c0 30.682-24.873 55.555-55.555 55.555H636.855l-97.571 97.572c-21.696 21.696-56.872 21.696-78.568 0l-97.571-97.572H225.157c-30.682 0-55.555-24.873-55.555-55.555V636.855L72.03 539.284c-21.696-21.696-21.696-56.872 0-78.568l97.572-97.571V225.157c0-30.682 24.873-55.555 55.555-55.555h137.988zM250 419.415v161.17h48.91V515.39h53.444v65.194h49.125v-161.17h-49.125v56.399H298.91v-56.399H250zm177.823 80.695c0 18.836 3.635 34.52 10.905 47.054 7.27 12.533 16.753 21.694 28.45 27.484 11.696 5.79 26.47 8.685 44.32 8.685 17.563 0 32.229-3.353 43.998-10.059 11.768-6.706 20.765-16.088 26.992-28.144 6.226-12.057 9.339-27.503 9.339-46.34 0-25.945-7.126-46.118-21.378-60.52-14.252-14.402-34.55-21.603-60.894-21.603-25.696 0-45.742 7.329-60.138 21.987-14.396 14.659-21.594 35.144-21.594 61.456zm48.91.22c0-16.418 2.987-28.181 8.961-35.29 5.974-7.11 13.892-10.664 23.753-10.664 10.293 0 18.445 3.5 24.455 10.499 6.01 7 9.015 18.084 9.015 33.256 0 18.03-2.879 30.526-8.637 37.49-5.758 6.962-13.892 10.443-24.4 10.443-10.222 0-18.301-3.554-24.24-10.664-5.938-7.11-8.907-18.8-8.907-35.07zm124.595-80.915v39.798h49.881v121.372h48.91V459.213H750v-39.798H601.328z",
  fillRule: "nonzero"
}));

const SvgHot = React.forwardRef((props, ref) => {
  return React.createElement(_IconBase.default, Object.assign({
    name: "SvgHot"
  }, props, {
    ref: ref
  }), React.createElement(SvgIcon, null));
});
var _default = SvgHot;
exports.default = _default;