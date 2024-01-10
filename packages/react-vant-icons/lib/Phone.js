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
  d: "M818.386 630.252a854.628 854.628 0 0110.747 9.133c23.422 20.25 32.808 31.484 33.802 32.7.015.018 2.042 2.486 4.058 4.975a331.072 331.072 0 012.89 3.61c.495.63.904 1.161 1.186 1.542a20.98 20.98 0 011.61 2.524l4.978 7.571v.722c9.807 20.553 2.962 47.657-3.161 61.354-10.802 24.166-31.145 48.673-46.58 63.551-31.067 29.938-73.547 64.302-126.741 64.302-5.558 0-11.217-.38-16.817-1.125-38.744-5.067-97.94-29.434-162.37-66.85-69.939-40.614-137.416-91.721-190.001-143.904-52.591-52.197-104.107-119.205-145.059-188.683-37.8-64.132-62.457-123.19-67.648-162.03-3.413-25.436 2.603-53.727 17.402-81.803 13.219-25.08 32.933-49.276 57.014-69.974 1.424-1.225 2.82-2.43 4.197-3.618 18.517-15.983 34.52-29.797 61.067-40.125 9.327-4.12 18.101-6.124 26.811-6.124 8.014 0 16.04 1.747 23.856 5.193l.355.161c3.526 1.657 9.35 4.828 10.882 5.668 4.568 2.303 29.546 16.083 57.197 54.51 8.83 12.28 22.732 33.007 32.857 51.024 17.035 30.318 28.122 56.516 28.585 57.618l.317.752 2.145 6.742c7.14 19.025 2.946 38.767-11.271 52.953-.824.849-1.785 1.863-1.804 1.882l-1.18 1.246-.892.626c-.604.52-1.802 1.586-2.564 2.264-2.157 1.919-2.812 2.498-3.566 3.07l-.657.476c-9.13 6.27-12.418 8.147-15.897 10.134-2.362 1.349-4.804 2.742-10.08 6.184l-.244.156c-9.005 5.651-17.54 9.209-26.577 12.978-7.113 2.964-15.175 6.325-24.98 11.323-14.067 7.17-14.565 27.57-11.664 34.33 17.352 40.45 48.168 81.385 99.916 132.728 45.62 45.314 90.452 74.318 128.29 96.712 4.597 2.721 9.147 4.043 13.908 4.043 13.37 0 26.2-10.877 31.962-21.62 4.434-8.271 8.59-16.924 12.257-24.557 2.99-6.227 5.815-12.108 8.5-17.209l.065-.12c6.692-12.476 11.599-20.487 14.536-25.01 2.096-3.227 4.142-6.377 6.535-8.934 5.769-8.513 14.853-15.671 24.512-19.148 5.43-1.957 11.714-2.993 18.165-2.993 8.324 0 16.29 1.751 22.427 4.931l16.474 8.617-.011.021c1.254.674 2.544 1.508 4.045 2.479 1.81 1.17 4.444 2.889 7.766 5.08a1617.985 1617.985 0 0126.862 18.147 411.87 411.87 0 015.932 4.17l45.656 35.625z",
  fillRule: "evenodd"
}));

const SvgPhone = React.forwardRef((props, ref) => {
  return React.createElement(_IconBase.default, Object.assign({
    name: "SvgPhone"
  }, props, {
    ref: ref
  }), React.createElement(SvgIcon, null));
});
var _default = SvgPhone;
exports.default = _default;