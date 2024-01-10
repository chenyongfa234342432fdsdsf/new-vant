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
  d: "M500 888.889c214.777 0 388.889-174.112 388.889-388.889 0-214.777-174.112-388.889-388.889-388.889-214.777 0-388.889 174.112-388.889 388.889 0 214.777 174.112 388.889 388.889 388.889zm0 55.555C254.54 944.444 55.556 745.46 55.556 500S254.54 55.556 500 55.556 944.444 254.54 944.444 500 745.46 944.444 500 944.444z"
}), React.createElement("path", {
  d: "M424.637 385.957c-5.88-11.14-14.05-24.352-22.897-36.991-8.742-12.49-17.897-24.134-26.313-32.862-7.953-8.248-11.739-10.548-11.342-10.548-4.51 0-20.957 15.064-32.707 30.729-14.685 19.583-25.822 42.224-25.822 59.164 0 17.823 11.983 46.263 31 77.126 20.357 33.035 48.78 68.956 79.593 100.58l10.44 10.443c31.88 31.066 67.8 59.49 100.836 79.846 30.847 19.013 59.3 31 77.123 31 16.945 0 39.592-11.139 59.165-25.82 15.667-11.752 30.731-28.198 30.731-32.71 0 .398-2.3-3.387-10.544-11.337-8.732-8.42-20.376-17.574-32.864-26.316-12.651-8.854-25.86-17.021-36.989-22.895-12.709-6.707-18.068-8.4-19.894-8.435.34.005.273.123-1.436 2.6-2.262 3.276-4.17 7.178-8.277 16.683-1.353 3.127-1.353 3.127-3.104 7.02-.894 1.933-.894 1.933-1.864 3.937-2.254 4.588-4.25 8.082-6.832 11.322l-10.971 13.764-17.131-4.043c-10.148-2.395-24.785-9.9-42.996-22.303-18.456-12.571-38.284-28.688-53.982-43.99-14.785-15.181-30.902-35.01-43.471-53.465-12.4-18.204-19.906-32.844-22.302-42.993l-4.046-17.135 13.769-10.972c3.24-2.583 6.735-4.579 11.327-6.834 1.998-.967 1.998-.967 3.926-1.858 3.898-1.752 3.898-1.752 7.034-3.109 9.506-4.11 13.402-6.015 16.685-8.28 2.458-1.695 2.579-1.765 2.584-1.43-.034-1.829-1.725-7.184-8.429-19.888zm-37.075 237.178l-10.95-10.952c-33.828-34.716-64.781-73.834-87.353-110.463C265.134 462.567 250 426.65 250 395.449c0-32.38 15.534-63.96 36.933-92.497C310.208 271.922 334.141 250 364.085 250c18.342 0 33.884 9.446 51.335 27.542 10.786 11.187 21.572 24.906 31.833 39.565 10.122 14.46 19.5 29.627 26.517 42.92 10.634 20.151 14.852 33.744 14.852 45.88 0 19.201-9.832 35.535-26.596 47.1-4.963 3.423-9.292 5.86-15.583 8.813a276.228 276.228 0 003.562 5.36c10.779 15.827 24.856 33.147 36.836 45.46 12.83 12.497 30.151 26.576 45.975 37.355 1.87 1.272 3.66 2.46 5.361 3.562 2.953-6.292 5.396-10.628 8.82-15.586 11.565-16.762 27.895-26.596 47.1-26.596 12.131 0 25.726 4.222 45.88 14.858 13.28 7.008 28.443 16.385 42.916 26.514 14.66 10.261 28.378 21.048 39.569 31.837 18.092 17.447 27.538 32.99 27.538 51.33 0 29.945-21.922 53.878-52.952 77.152-28.522 21.395-60.113 36.934-92.5 36.934-31.2 0-67.136-15.14-106.27-39.26-36.628-22.571-75.745-53.525-110.716-87.605z"
})));

const SvgPhoneCircleO = React.forwardRef((props, ref) => {
  return React.createElement(_IconBase.default, Object.assign({
    name: "SvgPhoneCircleO"
  }, props, {
    ref: ref
  }), React.createElement(SvgIcon, null));
});
var _default = SvgPhoneCircleO;
exports.default = _default;