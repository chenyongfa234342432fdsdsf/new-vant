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
  d: "M885.464 448.158A392.47 392.47 0 01888.889 500c0 214.777-174.112 388.889-388.889 388.889-214.777 0-388.889-174.112-388.889-388.889 0-214.777 174.112-388.889 388.889-388.889 60.39 0 117.565 13.765 168.559 38.33l-24.11 50.05c-44.65-21.507-93.688-32.824-144.449-32.824-184.095 0-333.333 149.238-333.333 333.333 0 184.095 149.238 333.333 333.333 333.333 184.095 0 333.333-149.238 333.333-333.333 0-14.994-.986-29.85-2.939-44.506l55.07-7.336zM658.147 202.974c-15.342 0-27.778-12.436-27.778-27.778 0-15.341 12.436-27.777 27.778-27.777 15.34 0 27.777 12.436 27.777 27.777 0 15.342-12.436 27.778-27.777 27.778zm199.885 278.687c-15.341 0-27.778-12.436-27.778-27.777 0-15.342 12.437-27.778 27.778-27.778s27.778 12.436 27.778 27.778c0 15.34-12.437 27.777-27.778 27.777zm-518.767-24.009c-6.935-6.924-8.056-17.69-1.944-25.396l14.292-18.016c5.858-7.386 16.816-9.24 24.56-4.07l123.697 82.56c6.525 4.355 17.754 3.788 23.846-1.155l326.858-265.179c7.346-5.96 18.854-5.452 25.294.978l8.05 8.04c7.008 6.996 6.498 18.102-.847 25.436L532.257 611.145c-10.915 10.899-28.835 10.422-40.07-.797L339.264 457.652z",
  fillRule: "nonzero"
}));

const SvgCertificate = React.forwardRef((props, ref) => {
  return React.createElement(_IconBase.default, Object.assign({
    name: "SvgCertificate"
  }, props, {
    ref: ref
  }), React.createElement(SvgIcon, null));
});
var _default = SvgCertificate;
exports.default = _default;