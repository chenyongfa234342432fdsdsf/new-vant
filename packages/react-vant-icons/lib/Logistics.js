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
  d: "M631.133 111.111c52.964 0 98.566 37.385 108.953 89.32l37.692 188.458 128.68 42.893c22.685 7.562 37.986 28.792 37.986 52.705v293.29c0 30.683-24.873 55.556-55.555 55.556H666.667v-55.555h222.222V484.487l-159.265-53.089-44.014-220.071c-5.194-25.968-27.995-44.66-54.477-44.66H166.667V111.11h464.466zM444.444 500c15.342 0 27.778 12.437 27.778 27.778s-12.436 27.778-27.778 27.778H111.111c-15.341 0-27.778-12.437-27.778-27.778S95.77 500 111.111 500h333.333zm0-166.667c15.342 0 27.778 12.437 27.778 27.778s-12.436 27.778-27.778 27.778H111.111c-15.341 0-27.778-12.437-27.778-27.778s12.437-27.778 27.778-27.778h333.333zm-278.237-166.67c-15.13-.245-27.318-12.586-27.318-27.774 0-15.341 12.436-27.778 27.778-27.778h464.466c52.964 0 98.566 37.385 108.953 89.32l37.692 188.458 128.68 42.893c22.685 7.562 37.986 28.792 37.986 52.705v293.29c0 30.683-24.873 55.556-55.555 55.556H666.667v-55.555h222.222V484.487l-159.265-53.089-44.014-220.071c-5.194-25.968-27.995-44.66-54.477-44.66H166.667z"
}), React.createElement("path", {
  d: "M611.111 861.111c30.683 0 55.556-24.873 55.556-55.555 0-30.683-24.873-55.556-55.556-55.556-30.682 0-55.555 24.873-55.555 55.556 0 30.682 24.873 55.555 55.555 55.555zm0 55.556C549.746 916.667 500 866.92 500 805.556s49.746-111.112 111.111-111.112 111.111 49.747 111.111 111.112c0 61.365-49.746 111.11-111.11 111.11zM222.222 861.111c30.683 0 55.556-24.873 55.556-55.555 0-30.683-24.873-55.556-55.556-55.556-30.682 0-55.555 24.873-55.555 55.556 0 30.682 24.873 55.555 55.555 55.555zm0 55.556c-61.365 0-111.11-49.746-111.11-111.111s49.745-111.112 111.11-111.112 111.111 49.747 111.111 111.112c0 61.365-49.746 111.11-111.11 111.11z"
}), React.createElement("path", {
  d: "M277.778 833.333v-55.555h277.778v55.555z"
})));

const SvgLogistics = React.forwardRef((props, ref) => {
  return React.createElement(_IconBase.default, Object.assign({
    name: "SvgLogistics"
  }, props, {
    ref: ref
  }), React.createElement(SvgIcon, null));
});
var _default = SvgLogistics;
exports.default = _default;