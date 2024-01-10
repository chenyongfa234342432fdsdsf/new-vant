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
  fillRule: "evenodd"
}, React.createElement("path", {
  d: "M500 888.889c214.777 0 388.889-174.112 388.889-388.889 0-214.777-174.112-388.889-388.889-388.889-214.777 0-388.889 174.112-388.889 388.889 0 214.777 174.112 388.889 388.889 388.889zm0 55.555C254.54 944.444 55.556 745.46 55.556 500S254.54 55.556 500 55.556 944.444 254.54 944.444 500 745.46 944.444 500 944.444z",
  fillRule: "nonzero"
}), React.createElement("path", {
  d: "M501.58 277.383l39.283 39.284L678.356 454.16c10.848 10.848 10.848 28.435 0 39.283-10.848 10.848-28.436 10.848-39.284 0l-111.69-111.69V694.05c0 15.34-12.436 27.777-27.777 27.777-15.341 0-27.778-12.436-27.778-27.777V385.702l-107.74 107.741c-10.849 10.848-28.437 10.848-39.284 0-10.848-10.848-10.848-28.435 0-39.283l137.493-137.493 39.283-39.284z"
})));

const SvgUpgrade = React.forwardRef((props, ref) => {
  return React.createElement(_IconBase.default, Object.assign({
    name: "SvgUpgrade"
  }, props, {
    ref: ref
  }), React.createElement(SvgIcon, null));
});
var _default = SvgUpgrade;
exports.default = _default;