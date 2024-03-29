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
  d: "M500 111.314L386.156 225.157H225.157v161L111.314 500l113.843 113.844v160.999h161L500 888.686l113.844-113.843h160.999v-161L888.686 500 774.843 386.156V225.157h-161L500 111.314zm-136.855 58.288l97.571-97.572c21.696-21.696 56.872-21.696 78.568 0l97.571 97.572h137.988c30.682 0 55.555 24.873 55.555 55.555v137.988l97.572 97.571c21.696 21.696 21.696 56.872 0 78.568l-97.572 97.571v137.988c0 30.682-24.873 55.555-55.555 55.555H636.855l-97.571 97.572c-21.696 21.696-56.872 21.696-78.568 0l-97.571-97.572H225.157c-30.682 0-55.555-24.873-55.555-55.555V636.855L72.03 539.284c-21.696-21.696-21.696-56.872 0-78.568l97.572-97.571V225.157c0-30.682 24.873-55.555 55.555-55.555h137.988zM277.98 419.415h43.476v56.399h47.505v-56.399h43.668v161.17H368.96V515.39h-47.505v65.194H277.98v-161.17zm158.066 80.695c0-26.312 6.398-46.797 19.194-61.456 12.796-14.658 30.615-21.987 53.456-21.987 23.417 0 41.46 7.2 54.128 21.603 12.668 14.402 19.002 34.575 19.002 60.52 0 18.837-2.767 34.283-8.301 46.34-5.534 12.056-13.532 21.438-23.993 28.144-10.46 6.706-23.497 10.06-39.108 10.06-15.868 0-29-2.896-39.397-8.686-10.397-5.79-18.826-14.951-25.288-27.484-6.462-12.533-9.693-28.218-9.693-47.054zm43.475.22c0 16.27 2.639 27.96 7.917 35.07 5.279 7.11 12.46 10.664 21.546 10.664 9.341 0 16.571-3.481 21.69-10.444 5.118-6.963 7.677-19.459 7.677-37.489 0-15.172-2.67-26.257-8.013-33.256-5.343-7-12.589-10.5-21.738-10.5-8.765 0-15.803 3.555-21.114 10.665-5.31 7.109-7.965 18.872-7.965 35.29zm110.751-80.915h132.153v39.798h-44.339v121.372h-43.475V459.213h-44.339v-39.798z",
  fillRule: "nonzero"
}));

const SvgHotO = React.forwardRef((props, ref) => {
  return React.createElement(_IconBase.default, Object.assign({
    name: "SvgHotO"
  }, props, {
    ref: ref
  }), React.createElement(SvgIcon, null));
});
var _default = SvgHotO;
exports.default = _default;