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
  d: "M722.222 222.222C875.635 222.222 1000 346.588 1000 500c0 153.412-124.365 277.778-277.778 277.778H0V222.222h722.222zm0 55.556H55.556v444.444h666.666c122.73 0 222.222-99.492 222.222-222.222s-99.492-222.222-222.222-222.222zM291.667 396.444l28.333 10a238.98 238.98 0 01-13.667 33.334h34v29h-61.666v30h56v28.666h-56v89.334c0 20-11 30-33 30h-17.334l-7-29.334c5 1.334 9.667 2 14 2 8 0 12-3.333 12-10v-82H188v-28.666h59.333v-30h-64.666v-29H218c-4.333-11.667-9.333-22.667-15-32.667l27.667-10.333c5.333 12 10.666 26.333 15.333 43h31.667c5.333-14 10-28.334 14-43.334zm172.666-56l15.334 28c-28.667 10-60.334 16-95 18.334v54h103v30.333h-32v174.667h-31V471.11h-40v33.667C383 563.444 370 610.11 345.667 645.11l-22.334-24c19-28 29.334-66.667 30.667-116.333v-144c41-.667 77.667-7.667 110.333-20.334zm186.334 150v150H620v-16h-61.667v16h-31v-150h123.334zm155.333 0v150h-31.667v-16H710v16h-31v-150h127zm-598 51.667l28.667 6c-8 33.667-19 63-33.667 88l-26-16.667c14.667-24 25-50 31-77.333zm104.333-2.333C321 561.11 328 580.444 333 597.778l-26.667 10c-5.333-20.667-12-41-20-61l26-7zM620 520.444h-61.667v74.334H620v-74.334zm154.333 0H710v74.334h64.333v-74.334zm-13-171.333v116.333H572V349.111h189.333zm-31.666 30h-126v56.333h126v-56.333zm-465.334-45c4 9 8.334 19 12.334 30h61.666v29.333H186v-29.333h59.333c-4-8.667-8.666-17-13.666-24.667l32.666-5.333z",
  fillRule: "nonzero"
}));

const SvgNewArrivalO = React.forwardRef((props, ref) => {
  return React.createElement(_IconBase.default, Object.assign({
    name: "SvgNewArrivalO"
  }, props, {
    ref: ref
  }), React.createElement(SvgIcon, null));
});
var _default = SvgNewArrivalO;
exports.default = _default;