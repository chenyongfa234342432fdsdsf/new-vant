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
  d: "M333.223 388.913c16.865-6.098 29.055-11.298 36.57-15.6 21.001-12.024 38.814-28.398 53.438-49.122 22.191-31.447 26.324-45.937 50.41-133.953 1.582-5.784 4.766-13.686 9.55-23.706 22.138-37.106 53.653-55.617 94.544-55.532 39.504 0 71.104 18.51 94.8 55.532 5.906 10.22 10.087 21.634 12.542 34.245 2.456 12.61 2.456 27.09 0 43.44l-43.731 152.608c-.774 2.422-.774 4.191 0 5.309.834 1.204 2.051 1.806 3.652 1.806h132.855l-.147.309h17.324c51.562 0 93.75 40.625 93.75 92.187 0 7.813-1.563 15.625-3.125 23.438l-46.757 298.593c-9.375 40.625-46.875 70.313-90.625 70.313H166.556c-30.683 0-55.556-24.873-55.556-55.556v-388.89c0-30.682 24.873-55.555 55.556-55.555h166.667v.134zm0 61.369v382.942h414.41c14.063 0 26.563-9.375 29.688-23.437 37.269-199.005 55.903-302.934 55.903-311.788 0-17.188-14.062-31.25-31.25-31.25h-53.921l-.274.578H646.59c-22.307 0-40.007-7.664-53.1-22.993-19.639-22.992-18.442-43.203-11.299-68.864 16.27-58.445 30.048-109.04 41.338-151.787-.327-29.99-14.106-46.885-41.338-50.685-27.231-3.8-45.234 11.196-54.009 44.989l-23.293 80.71c-26.646 71.927-78.748 120.472-156.305 145.637l-15.362 5.948zM166.556 833.224h111.111v-388.89H166.556v388.89z",
  fillRule: "nonzero"
}));

const SvgGoodJobO = React.forwardRef((props, ref) => {
  return React.createElement(_IconBase.default, Object.assign({
    name: "SvgGoodJobO"
  }, props, {
    ref: ref
  }), React.createElement(SvgIcon, null));
});
var _default = SvgGoodJobO;
exports.default = _default;