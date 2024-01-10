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
  d: "M295.13 166.637c-.723 0-1.39.055-2.112.055-23.278 1-51.666 18.445-86.666 53.445-139.723 139.777 136.5 419.277 139.333 422.11 2.833 2.723 282.167 279.223 422.111 139.278 35-35 52.444-63.333 53.444-86.61.834-21.5-11.666-43.945-40.722-73-28.778-28.834-52.833-42.445-72.833-40.612-18.278 1.778-37.778 17.89-57.945 47.945-18.166 30.444-43.277 39.722-60.944 41.889-46 5.888-100.389-25.834-173.278-98.723-72.944-73-104.333-128.055-98.722-173.222 2.167-17.722 11.389-42.778 43.056-61.778 28.888-19.389 45-38.889 46.777-57.166 1.89-19.5-11.777-44-40.666-72.89-28-28-50-40.721-70.834-40.721m376.167 710.166c-167.111 0-354.778-185.166-364.889-195.278-13.055-13.11-317.944-322.055-139.333-500.666 45.944-45.945 85.222-68.111 123.666-69.667 51.39-1.944 89.167 31.5 114.5 56.89 41.778 41.721 60.334 80.221 56.667 117.555-3.555 36.11-27.167 68.388-72.333 98.666-14.5 8.722-16.945 16.111-17.667 21.667-1.778 14.667 6.556 50.778 82.889 127.167 76.278 76.222 112.389 84.333 127.167 82.888 5.555-.722 12.944-3.222 20.889-16.5 31.055-46.333 63.333-70 99.444-73.5 36.833-4.166 75.722 14.778 117.5 56.612 25.389 25.388 59 64.888 56.944 114.555-1.61 38.39-23.722 77.667-69.666 123.611-40.278 40.278-87.167 56-135.778 56",
  fillRule: "evenodd"
}));

const SvgPhoneO = React.forwardRef((props, ref) => {
  return React.createElement(_IconBase.default, Object.assign({
    name: "SvgPhoneO"
  }, props, {
    ref: ref
  }), React.createElement(SvgIcon, null));
});
var _default = SvgPhoneO;
exports.default = _default;