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
  d: "M583.579 534.542c32.919-6.871 58.965-17.254 72.702-30.2 41.277-38.9 41.277-103.85.59-144.536-19.602-19.603-45.748-30.44-73.47-30.44-19.997 0-39.167 5.635-55.623 16.1v-178.8h-55.556V344.96c-16.275-10.14-35.146-15.595-54.819-15.595-27.722 0-53.867 10.838-73.47 30.44-40.686 40.687-40.686 105.638.59 144.537 13.659 12.871 39.485 23.21 72.136 30.081l-71.939 35.97c-13.721 6.86-19.283 23.546-12.422 37.268 6.86 13.721 23.546 19.283 37.267 12.422l102.657-51.328v264.578h55.556V568.755l102.657 51.328c13.721 6.861 30.407 1.3 37.267-12.422 6.861-13.722 1.3-30.407-12.422-37.268l-71.701-35.85zM111.11 166.667H888.89c30.682 0 55.555 24.873 55.555 55.555v555.556c0 30.682-24.873 55.555-55.555 55.555H111.11c-30.682 0-55.555-24.873-55.555-55.555V222.222c0-30.682 24.873-55.555 55.555-55.555zm438.105 232.422c9.19-9.19 21.198-14.168 34.185-14.168 12.983 0 24.999 4.98 34.187 14.168 18.793 18.794 18.793 47.668.59 64.823-9.058 8.537-44.211 18.186-87.946 22.325 3.51-43.209 11.42-79.649 18.984-87.148zm-97.628 0c7.564 7.5 15.474 43.94 18.985 87.148-43.735-4.139-78.888-13.788-87.947-22.325-18.203-17.155-18.203-46.03.59-64.823 9.188-9.188 21.204-14.168 34.187-14.168 12.987 0 24.994 4.978 34.185 14.168z",
  fillRule: "nonzero"
}));

const SvgGiftCard = React.forwardRef((props, ref) => {
  return React.createElement(_IconBase.default, Object.assign({
    name: "SvgGiftCard"
  }, props, {
    ref: ref
  }), React.createElement(SvgIcon, null));
});
var _default = SvgGiftCard;
exports.default = _default;