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
  d: "M499.994 444.461c-61.277 0-111.11-49.833-111.11-111.111 0-61.278 49.833-111.111 111.11-111.111 61.278 0 111.112 49.833 111.112 111.111 0 61.278-49.834 111.111-111.112 111.111M666.661 333.35c0-92.056-74.611-166.667-166.667-166.667-92.055 0-166.666 74.611-166.666 166.667s74.61 166.667 166.666 166.667 166.667-74.611 166.667-166.667m113.283 435.928c-6.5 6.778-13.333 13.11-20.277 19.444-2.945 2.611-5.834 5.39-8.834 8-6.055 5.167-12.389 9.834-18.666 14.556-4.278 3.11-8.334 6.444-12.667 9.444-5.278 3.611-10.722 6.834-16.167 10.167-5.61 3.444-11.11 7.055-16.889 10.278-4.444 2.389-9.055 4.444-13.555 6.666-6.945 3.5-13.833 7.111-21.056 10.167-3.777 1.611-7.722 2.833-11.666 4.333-8 3.111-16.056 6.334-24.334 8.945-3.833 1.166-7.889 2-11.777 3.11-8.445 2.334-16.89 4.779-25.556 6.556-6.222 1.278-12.667 1.945-19 2.945-6.556 1-13 2.278-19.667 3a395.119 395.119 0 01-39.833 2c-13.389 0-26.722-.667-39.833-2-6.667-.722-13.111-2-19.667-3-6.389-1-12.778-1.667-19-2.945-8.667-1.777-17.111-4.222-25.556-6.555-3.888-1.111-7.944-1.945-11.777-3.111-8.278-2.611-16.334-5.834-24.334-8.945-3.944-1.5-7.889-2.722-11.666-4.333-7.223-3.056-14.111-6.667-21.056-10.167-4.5-2.222-9.111-4.277-13.611-6.666-5.722-3.223-11.222-6.834-16.833-10.278-5.445-3.333-10.945-6.556-16.167-10.167-4.333-3-8.444-6.333-12.667-9.444-6.277-4.722-12.61-9.39-18.666-14.556-3-2.61-5.89-5.389-8.834-8-6.944-6.333-13.777-12.666-20.277-19.444a64.608 64.608 0 01-1.89-2.111C278.834 670.11 383.89 611.11 500 611.11c116.111 0 221.111 59 281.833 156.056-.666.722-1.222 1.389-1.889 2.11M111.111 500c0-214.389 174.5-388.889 388.889-388.889S888.889 285.611 888.889 500c0 82.833-26.222 159.444-70.5 222.556-70.167-100.667-186.278-167-318.389-167-132.111 0-248.222 66.333-318.444 167C137.333 659.444 111.11 582.833 111.11 500m738.167 274.278c59.389-75.611 95.166-170.611 95.166-274.278 0-245.444-199-444.444-444.444-444.444-245.444 0-444.444 199-444.444 444.444 0 103.667 35.722 198.667 95.166 274.278 30.278 38.5 66.611 71.833 107.778 98.555 1.556.945 3.056 1.778 4.556 2.723a423.926 423.926 0 0035.61 20.333c3.556 1.833 7.223 3.5 10.778 5.222 10.5 4.945 21.056 9.556 31.89 13.667 4.722 1.778 9.444 3.555 14.222 5.222 10.222 3.5 20.61 6.556 31.222 9.333 5.278 1.39 10.389 2.89 15.722 4.056 11 2.444 22.167 4.278 33.444 5.944 4.89.667 9.723 1.667 14.723 2.278 16.222 1.778 32.61 2.833 49.333 2.833 16.722 0 33.111-1.055 49.333-2.833 4.945-.611 9.778-1.611 14.723-2.278 11.222-1.666 22.444-3.5 33.444-5.944 5.333-1.167 10.444-2.667 15.722-4.056 10.556-2.777 21-5.833 31.222-9.333 4.723-1.667 9.445-3.444 14.167-5.222 10.889-4.111 21.445-8.722 31.889-13.667 3.611-1.722 7.278-3.389 10.833-5.222a423.926 423.926 0 0035.611-20.333c1.5-.945 3-1.778 4.556-2.723 41.167-26.722 77.5-60.055 107.778-98.555",
  fillRule: "evenodd"
}));

const SvgUserCircleO = React.forwardRef((props, ref) => {
  return React.createElement(_IconBase.default, Object.assign({
    name: "SvgUserCircleO"
  }, props, {
    ref: ref
  }), React.createElement(SvgIcon, null));
});
var _default = SvgUserCircleO;
exports.default = _default;