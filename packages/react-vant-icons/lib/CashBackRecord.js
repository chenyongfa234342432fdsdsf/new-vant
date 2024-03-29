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
  d: "M852.486 654.407l-50.595-22.947c-29.361 64.737-77.951 118.86-140.897 155.201C496.783 881.468 286.806 825.206 192 660.994 97.19 496.783 153.454 286.806 317.666 192 481.877 97.19 691.854 153.454 786.66 317.666l48.113-27.778C724.624 99.105 480.67 33.738 289.888 143.886 99.105 254.036 33.738 497.99 143.886 688.772c110.15 190.783 354.103 256.15 544.886 146.002 74.927-43.26 130.51-107.157 163.714-180.367zM688.772 834.774c74.927-43.26 130.51-107.157 163.714-180.367l-50.595-22.947c-29.361 64.737-77.951 118.86-140.897 155.201C496.783 881.468 286.806 825.206 192 660.994 97.19 496.783 153.454 286.806 317.666 192 481.877 97.19 691.854 153.454 786.66 317.666l48.113-27.778C724.624 99.105 480.67 33.738 289.888 143.886 99.105 254.036 33.738 497.99 143.886 688.772c110.15 190.783 354.103 256.15 544.886 146.002zm122.625-502.115c15.341 0 27.778-12.437 27.778-27.778s-12.437-27.778-27.778-27.778-27.778 12.437-27.778 27.778 12.437 27.778 27.778 27.778zm16.244 337.294c15.34 0 27.777-12.437 27.777-27.778s-12.436-27.778-27.777-27.778c-15.342 0-27.778 12.437-27.778 27.778s12.436 27.778 27.778 27.778z",
  fillRule: "nonzero"
}), React.createElement("path", {
  d: "M874.77 402.805a.25.25 0 01.353-.025l110.719 96.088a.25.25 0 010 .377l-110.719 96.088a.25.25 0 01-.413-.19v-67.366H750c-15.341 0-27.778-12.436-27.778-27.777 0-15.341 12.437-27.778 27.778-27.778h124.71v-69.253c0-.04.01-.08.027-.114z"
}), React.createElement("path", {
  d: "M326.543 437.654c0-15.341 12.436-27.778 27.778-27.778h277.777c15.342 0 27.778 12.437 27.778 27.778s-12.436 27.778-27.778 27.778H354.321c-15.342 0-27.778-12.437-27.778-27.778z",
  fillRule: "nonzero"
}), React.createElement("path", {
  d: "M520.987 437.654v83.333h111.111c15.342 0 27.778 12.437 27.778 27.778s-12.436 27.778-27.778 27.778H520.987v111.111c0 15.341-12.436 27.778-27.777 27.778-15.342 0-27.778-12.437-27.778-27.778l-.001-111.111H354.32c-15.342 0-27.778-12.437-27.778-27.778s12.436-27.778 27.778-27.778h111.11v-83.333h55.556zm86.403-145.987c13.286 7.67 17.838 24.659 10.167 37.945l-69.444 120.281L500 422.115l69.444-120.281c7.671-13.286 24.66-17.838 37.946-10.167zm-250 0c13.286-7.671 30.274-3.119 37.945 10.167l69.444 120.281-48.112 27.778-69.445-120.281c-7.67-13.286-3.118-30.275 10.168-37.945z"
})));

const SvgCashBackRecord = React.forwardRef((props, ref) => {
  return React.createElement(_IconBase.default, Object.assign({
    name: "SvgCashBackRecord"
  }, props, {
    ref: ref
  }), React.createElement(SvgIcon, null));
});
var _default = SvgCashBackRecord;
exports.default = _default;