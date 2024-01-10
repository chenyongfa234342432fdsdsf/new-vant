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
  d: "M718.526 833.225l-3.465.108c1.156 0 2.312-.036 3.465-.108zm0 0c-1.153.072-2.309.108-3.465.108l3.465-.108zM749.98 500l-10.72-225.688c-1.83-29.28-26.111-52.09-55.448-52.09H253.472c-29.337 0-53.617 22.81-55.447 52.09l-31.25 500a55.556 55.556 0 00-.108 3.466c0 30.682 24.873 55.555 55.555 55.555H500v-55.555H222.222l31.25-500h430.339l10.675 224.858L749.979 500zm0 0l-10.72-225.688c-1.83-29.28-26.111-52.09-55.448-52.09H253.472c-29.337 0-53.617 22.81-55.447 52.09l-31.25 500a55.556 55.556 0 00-.108 3.466c0 30.682 24.873 55.555 55.555 55.555H500v-55.555H222.222l31.25-500h430.339l10.675 224.858L749.979 500z"
}), React.createElement("path", {
  d: "M780.176 583.333c60.331 0 108.713 51.362 108.713 113.716-.042 2.533-.043 2.63-.133 4.178l.016.988.003.215c0 10.965-2.292 22.106-6.514 33.416l-.092.264-.186.528c-1.598 4.493-3.689 9.214-8.669 18.003 1.358-1.91 1.405-1.977 1.584-2.3l.018-.034-.001.002c.01-.022.147-.273.889-1.632l-.623 1.192c.124-.199.124-.199-.435.93-1.306 2.59-2.598 4.987-3.458 6.24a201.646 201.646 0 01-6.382 10.427c-12.522 19.168-29.597 38.916-50.17 59.053-14.38 14.077-29.668 27.564-45.158 40.234a697.775 697.775 0 01-7.262 5.84l-.68.541c-8.514 6.758-17.338 13.572-13.821 10.761-7.402 5.865-16.474 9.036-25.826 9.036-9.072 0-17.881-2.931-25.32-8.615l-.462-.357.117.093c3.048 2.433-4.37-3.274-12.222-9.466l-1.026-.81a749.72 749.72 0 01-8.64-6.914c-15.459-12.612-30.702-26.037-45.043-40.066-21.208-20.746-38.687-41.104-51.294-60.89-5.743-9.013-10.44-17.866-14.048-26.72l-.25-.637-.051-.136-.097-.259c-5.165-13.031-7.883-25.638-7.883-37.75-.158-2.117-.214-3.482-.214-5.355 0-62.376 48.365-113.716 108.712-113.716 20.736 0 40.776 6.301 57.948 17.725 17.15-11.424 37.201-17.725 57.96-17.725zm0 55.556c-13.857 0-27.34 6.173-37.37 17.22l-20.513 22.593-20.57-22.543c-10.12-11.088-23.627-17.27-37.455-17.27-28.899 0-53.157 25.75-53.157 58.16 0 .104.052 2.363.156 6.779.03-.316.031-.339.053-1.202.006 4.383 1.254 10.17 3.964 16.999.256.67.346.904.397 1.042 2.206 5.344 5.31 11.171 9.27 17.386 9.995 15.685 24.868 33.007 43.291 51.03 13.038 12.754 27.063 25.105 41.314 36.732 3.4 2.774 8.18 6.555 12.402 9.86 4.223-3.317 9.017-7.12 12.446-9.924 14.296-11.694 28.38-24.118 41.47-36.932 17.929-17.55 32.513-34.417 42.521-49.737a161.58 161.58 0 003.154-5.03l.528-.88c.54-.902 1.112-1.875 1.739-2.95.266-.412.413-.684 1.237-2.243.507-1.084.507-1.084.993-2.014l.922-1.688a61.703 61.703 0 003.01-7.206c2.196-5.894 3.178-10.51 3.239-14.268l.003-.373v.041l.001.046.001.01v-.265l-.016-2.77c.05-.87.05-.87.084-1.42.024-.448.034-.62.038-.756l.003-.098.002-.169c0-32.39-24.275-58.16-53.157-58.16zM500 777.778c15.341 0 27.778 12.436 27.778 27.778 0 15.34-12.437 27.777-27.778 27.777s-27.778-12.436-27.778-27.777c0-15.342 12.437-27.778 27.778-27.778zm222.222-305.556C737.563 472.222 750 484.66 750 500s-12.437 27.778-27.778 27.778S694.444 515.34 694.444 500s12.437-27.778 27.778-27.778zm-250-416.666c94.924 0 171.875 76.95 171.875 171.875h-55.555c0-64.242-52.078-116.32-116.32-116.32-64.241 0-116.32 52.078-116.32 116.32h-55.555c0-94.924 76.951-171.875 171.875-171.875z"
})));

const SvgGoodsCollectO = React.forwardRef((props, ref) => {
  return React.createElement(_IconBase.default, Object.assign({
    name: "SvgGoodsCollectO"
  }, props, {
    ref: ref
  }), React.createElement(SvgIcon, null));
});
var _default = SvgGoodsCollectO;
exports.default = _default;