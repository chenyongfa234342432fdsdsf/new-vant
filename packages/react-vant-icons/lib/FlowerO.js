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
  d: "M289.86 437.776c7.303 77.307 69.954 137.702 147.476 142.166l57.433 3.307 71.826-3.79c79.64-4.2 143.518-67.368 148.608-146.957 5.037-78.759 7.704-138.816 8.058-179.248-23.564 12.498-34.332 17.553-49.16 21.962-34.186 10.167-68.026 5.319-90.45-26.608-1.67-2.376-14.163-20.38-18.346-26.316-8.004-11.358-15.119-21.11-22.176-30.284-13.795-17.932-26.308-32.202-37.242-42.196-7.406-6.77-12.159-9.805-11.16-10.665.288 1.815-11.506 11.764-25.34 29.468-16.582 21.22-33.538 49.43-44.206 71.894-18.298 38.53-55.179 47.882-91.898 38.099-15.969-4.254-26.487-9.16-54.175-23.519-.499 36.852 2.92 99.778 10.753 182.687zm238.987 199.308V887.35h-55.555V637.66l-39.15-2.255c-104.917-6.041-189.707-87.778-199.59-192.404-13.004-137.651-14.744-218.999-5.222-244.044 19.732-51.894 125.398 60.398 145.667 17.72 20.268-42.68 74.824-132.261 119.638-133.335 44.813-1.073 107.106 94.365 134.477 133.334 27.371 38.97 143.015-89.638 148.727-8.818 2.59 36.65.192 112.713-7.194 228.19-6.89 107.714-93.34 193.204-201.123 198.89l-40.675 2.146zm-108.912 223.88l-52.511 18.137c-37.515-108.613-78.153-158.295-117.339-156.825-10.456-.005-24.077 7.617-38.24 21.311-5.413 5.235-10.465 10.914-15.092 16.735-2.51 3.158-7.373 9.78-7.708 10.18l-42.618-35.639c-17.592 21.038 14.428-19.25 26.8-31.214 23.539-22.76 48.88-36.94 75.814-36.909 71.053-2.702 126.137 64.64 170.894 194.224zm81.127-.141c15.341 0 27.778 12.436 27.778 27.778 0 15.34-12.437 27.777-27.778 27.777s-27.778-12.436-27.778-27.777c0-15.342 12.437-27.778 27.778-27.778zM394.567 844.98c15.342 0 27.778 12.437 27.778 27.778s-12.436 27.778-27.778 27.778c-15.34 0-27.777-12.437-27.777-27.778s12.436-27.778 27.777-27.778zm362.038-178.24c26.933-.031 52.274 14.148 75.813 36.91 11.455 11.076 39.755 46.435 29.922 34.917a27.642 27.642 0 014.661 15.406c0 15.342-12.436 27.778-27.778 27.778-9.218 0-17.387-4.49-22.44-11.402l-.183.153c-.334-.4-5.198-7.022-7.708-10.18-4.627-5.821-9.678-11.5-15.092-16.735-14.163-13.694-27.783-21.316-38.24-21.311-39.186-1.47-79.824 48.212-117.338 156.825l-.013-.004c-3.331 11.606-14.025 20.099-26.703 20.099-15.34 0-27.777-12.437-27.777-27.778a27.7 27.7 0 012.027-10.438l-.046-.016c44.758-129.584 99.842-196.926 170.895-194.224zm-589.938 59.478c15.34 0 27.777 12.436 27.777 27.778 0 15.34-12.436 27.777-27.777 27.777-15.342 0-27.778-12.436-27.778-27.777 0-15.342 12.436-27.778 27.778-27.778z",
  fillRule: "nonzero"
}));

const SvgFlowerO = React.forwardRef((props, ref) => {
  return React.createElement(_IconBase.default, Object.assign({
    name: "SvgFlowerO"
  }, props, {
    ref: ref
  }), React.createElement(SvgIcon, null));
});
var _default = SvgFlowerO;
exports.default = _default;