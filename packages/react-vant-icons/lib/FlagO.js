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
  d: "M698.394 376.237c-38.342-10.104-68.934-26.99-105.894-54.64-7.005-5.24-13.757-10.465-26.564-20.438-41.789-32.385-65.875-46.556-101.391-56.29-38.868-10.654-79.545-14.963-122.281-12.877l-73.558 274.521c46.43-1.4 90.66 3.051 132.6 13.472 43.07 10.701 74.73 29.312 114.792 61.935 4.837 3.94 9.706 7.983 18.813 15.572 41.073 34.104 64.078 47.857 101.506 56.541 30.656 7.113 53.331 8.304 68.723 5.44l72.698-271.314c-26.523-.988-53.034-4.963-79.444-11.922zm-447.07 196.016l-69.14 252.476c-4.727 17.262-22.554 27.424-39.816 22.697-17.263-4.727-27.425-22.554-22.697-39.816l61.946-226.208-.083.016 98.124-366.202c7.29-27.205 31.314-46.588 59.445-47.962 49.495-2.416 97.02 2.619 142.575 15.105 108.989 29.873 145.918 108.194 233.232 131.202 49.97 13.168 99.923 13.369 149.857.6L759.883 705.595c-30.597 21.983-76.635 25.842-138.115 11.577-115.819-26.873-143.627-111.31-236.091-134.284-41.684-10.357-86.469-13.902-134.353-10.634z",
  fillRule: "nonzero"
}));

const SvgFlagO = React.forwardRef((props, ref) => {
  return React.createElement(_IconBase.default, Object.assign({
    name: "SvgFlagO"
  }, props, {
    ref: ref
  }), React.createElement(SvgIcon, null));
});
var _default = SvgFlagO;
exports.default = _default;