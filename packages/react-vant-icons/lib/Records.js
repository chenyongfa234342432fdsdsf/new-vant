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
  d: "M527.778 111.111H218.167c-28.445 0-51.5 23.056-51.5 51.5v730.333c0 28.445 23.055 51.5 51.5 51.5h508.11c28.445 0 51.5-23.055 51.5-51.5V361.111c0-15.333-12.444-27.778-27.777-27.778s-27.778 12.445-27.778 27.778V888.89h-500V166.667h305.556c15.333 0 27.778-12.445 27.778-27.778 0-15.333-12.445-27.778-27.778-27.778m-55.556 555.556H305.556c-15.334 0-27.778 12.444-27.778 27.777 0 15.334 12.444 27.778 27.778 27.778h166.666c15.334 0 27.778-12.444 27.778-27.778 0-15.333-12.444-27.777-27.778-27.777m0 111.11H305.556c-15.334 0-27.778 12.445-27.778 27.779 0 15.333 12.444 27.777 27.778 27.777h166.666c15.334 0 27.778-12.444 27.778-27.777 0-15.334-12.444-27.778-27.778-27.778M726.944 55.556c-7.055 0-14.166 2.722-19.61 8.11l-210.5 210.556a29.374 29.374 0 00-7.612 13.222L460.5 394.611c-4.889 18.056 9.111 34.778 26.556 34.778 2.388 0 4.833-.333 7.277-1l107.111-28.722c5-1.334 9.556-3.945 13.223-7.611l210.61-210.5c10.779-10.89 10.779-28.39 0-39.223l-78.721-78.666c-5.445-5.39-12.5-8.111-19.612-8.111m0 67.11l39.278 39.278-185.889 185.89-53.61 14.388 14.333-53.666 185.888-185.89",
  fillRule: "evenodd"
}));

const SvgRecords = React.forwardRef((props, ref) => {
  return React.createElement(_IconBase.default, Object.assign({
    name: "SvgRecords"
  }, props, {
    ref: ref
  }), React.createElement(SvgIcon, null));
});
var _default = SvgRecords;
exports.default = _default;