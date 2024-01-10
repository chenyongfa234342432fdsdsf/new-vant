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
  d: "M222.222 111.111h555.556c30.682 0 55.555 24.873 55.555 55.556v250c0 15.34-12.436 27.777-27.777 27.777-15.342 0-27.778-12.436-27.778-27.777v-250H222.222v666.666h194.445c15.34 0 27.777 12.437 27.777 27.778s-12.436 27.778-27.777 27.778H222.222c-30.682 0-55.555-24.873-55.555-55.556V166.667c0-30.683 24.873-55.556 55.555-55.556z"
}), React.createElement("path", {
  d: "M722.222 888.889c92.048 0 166.667-74.62 166.667-166.667s-74.62-166.666-166.667-166.666-166.666 74.619-166.666 166.666c0 92.048 74.619 166.667 166.666 166.667zm0 55.555C599.492 944.444 500 844.952 500 722.222S599.492 500 722.222 500s222.222 99.492 222.222 222.222-99.492 222.222-222.222 222.222z",
  fillRule: "nonzero"
}), React.createElement("path", {
  d: "M694.444 640.488c0-15.341 12.437-27.778 27.778-27.778S750 625.147 750 640.488v71.175l53.834 53.834c10.848 10.848 10.848 28.436 0 39.284-10.848 10.848-28.436 10.848-39.284 0l-53.834-53.834a55.556 55.556 0 01-16.272-39.284v-71.175z",
  fillRule: "nonzero"
}), React.createElement("path", {
  d: "M305.556 277.778h333.333c15.341 0 27.778 12.436 27.778 27.778 0 15.34-12.437 27.777-27.778 27.777H305.556c-15.342 0-27.778-12.436-27.778-27.777 0-15.342 12.436-27.778 27.778-27.778zM305.556 388.889h222.222c15.341 0 27.778 12.436 27.778 27.778 0 15.34-12.437 27.777-27.778 27.777H305.556c-15.342 0-27.778-12.436-27.778-27.777 0-15.342 12.436-27.778 27.778-27.778zM305.556 500h111.11c15.342 0 27.778 12.437 27.778 27.778s-12.436 27.778-27.777 27.778H305.556c-15.342 0-27.778-12.437-27.778-27.778S290.214 500 305.556 500z"
})));

const SvgTodoListO = React.forwardRef((props, ref) => {
  return React.createElement(_IconBase.default, Object.assign({
    name: "SvgTodoListO"
  }, props, {
    ref: ref
  }), React.createElement(SvgIcon, null));
});
var _default = SvgTodoListO;
exports.default = _default;