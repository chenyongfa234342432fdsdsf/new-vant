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
  d: "M777.778 555.556V111.11H222.222v444.445h555.556zm-388.89 111.11h222.223v-55.555H388.89v55.556zm333.334 55.556H277.778V888.89h444.444V722.222zm55.556-666.666c30.722 0 55.555 24.888 55.555 55.555v444.445c0 30.722-24.833 55.555-55.555 55.555H666.667v55.556h55.555c30.722 0 55.556 24.889 55.556 55.555V888.89c0 30.722-24.834 55.555-55.556 55.555H277.778c-30.722 0-55.556-24.833-55.556-55.555V722.222c0-30.666 24.834-55.555 55.556-55.555h55.555V611.11h-111.11c-30.723 0-55.556-24.833-55.556-55.555V111.11c0-30.667 24.833-55.555 55.555-55.555h555.556zM583.333 833.36c-15.34 0-27.777-12.436-27.777-27.778 0-15.34 12.436-27.777 27.777-27.777h55.556c15.341 0 27.778 12.436 27.778 27.777 0 15.342-12.437 27.778-27.778 27.778h-55.556z",
  fillRule: "evenodd"
}));

const SvgDesktopO = React.forwardRef((props, ref) => {
  return React.createElement(_IconBase.default, Object.assign({
    name: "SvgDesktopO"
  }, props, {
    ref: ref
  }), React.createElement(SvgIcon, null));
});
var _default = SvgDesktopO;
exports.default = _default;