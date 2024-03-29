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
  d: "M861.111 642.558c0-66.735-25.532-130.506-68.479-189.014a459.093 459.093 0 00-46.903-54.382c-19.993 26.262-39.005 44.825-53.328 55.8-20.667 15.838-49.808-2.908-43.965-28.281 28.491-123.725-12.844-215.837-100.727-283.896-24.55-19.013-50.981-34.581-77.4-46.876a462.71 462.71 0 00-2.338-1.08c-15.773 103.573-63.72 161.394-172.462 246.18l-2.73 2.129C175.722 434.402 138.89 487.37 138.89 611.11c0 119.592 79.99 216.337 215.203 278.865-43.746-70.704-57.172-138.59-43.4-202.671 12.043-56.036 43.86-105.003 88.944-147.105 19.999-18.677 41.334-34.773 62.688-48.33 12.934-8.21 23.173-13.836 29.403-16.86 25.638-12.443 51.151 17.18 35.045 40.69-.301.44-1.561 2.819-3.067 6.96-14.856 40.84-.39 96.402 73.867 167.554 56.44 57.67 65.688 128.57 30.058 208.351 157.309-75.226 233.481-161 233.481-256.007zM717.898 342.264c8.942-13.706 27.734-16.75 40.546-6.568 5.35 4.252 14.16 11.967 25.282 22.91a514.143 514.143 0 0153.692 62.064c49.383 67.278 79.249 141.871 79.249 221.888 0 131.126-106.267 239.707-312.352 327.444l-10.88 2.22h-23.922c-22.395 0-35.584-25.14-22.855-43.566 58.75-85.042 60.977-148.732 11.846-198.953-64.362-61.654-92.915-119.757-95.313-170.663a360.515 360.515 0 00-25.637 21.763c-37.446 34.97-63.175 74.566-72.547 118.174-14.442 67.202 10.16 142.307 85.711 226.973 15.975 17.902 3.268 46.272-20.726 46.272h-13.325l-8.784-1.425C209.636 904.715 83.333 778.71 83.333 611.11c0-144.79 46.07-211.041 175.287-311.786l2.729-2.127c109.914-85.7 147.051-135.246 155.4-243.773 1.368-17.786 18.907-29.69 35.942-24.395 8.643 2.687 22.946 8.08 41.06 16.51 29.958 13.944 59.905 31.582 87.974 53.32 81.648 63.231 130.492 146.697 131.229 250.786 1.66-2.416 3.309-4.877 4.944-7.382z",
  fillRule: "nonzero"
}));

const SvgFireO = React.forwardRef((props, ref) => {
  return React.createElement(_IconBase.default, Object.assign({
    name: "SvgFireO"
  }, props, {
    ref: ref
  }), React.createElement(SvgIcon, null));
});
var _default = SvgFireO;
exports.default = _default;