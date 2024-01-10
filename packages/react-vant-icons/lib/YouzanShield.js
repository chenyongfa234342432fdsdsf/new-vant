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
  d: "M579.338 67.384l309.55 93.828v399.15c0 67.18 0 244.55-361.107 384.082C166.7 804.912 166.667 627.542 166.667 560.363v-399.15l315.906-95.23c2.737-.824 5.387-1.85 7.986-2.912 34.104-13.9 63.686-5.12 75.077-.564 4.466 1.786 9.018 3.46 13.702 4.877zM333.333 502.873v189.198c3.3 6.73 10.403 10.59 18.619 9.217l48.198-8.03v-211.56c-21.808 4.35-53.416 10.376-53.416 10.376-5.75 1.103-10.764 5.385-13.4 10.799zM421 689.786l231.778-38.61c17.057-2.836 29.246-19.504 27.656-37.258 0 0-1.6-6.325-.17-15.273 1.431-8.947 8.485-13.866 9.784-32.616 1.014-14.507-3.65-16.46-2.346-31.97 1.304-15.503 7.673-18.001 9.246-38.147 1.573-20.157-5.859-25.092-4.428-38.998 1.42-13.9 4.034-21.806 4.034-21.806 5.54-23.685-8.983-40.562-32.425-37.703l-77.241 9.448c-11.608 1.413-20.285-7.18-19.386-19.217l6.484-86.977c2.428-32.599-20.98-54.962-52.276-49.96l4.04-.647c-11.806 1.891-22.521 13.337-24.127 25.537 0 0-18.049 182.67-80.623 201.629v212.568z",
  fillRule: "evenodd"
}));

const SvgYouzanShield = React.forwardRef((props, ref) => {
  return React.createElement(_IconBase.default, Object.assign({
    name: "SvgYouzanShield"
  }, props, {
    ref: ref
  }), React.createElement(SvgIcon, null));
});
var _default = SvgYouzanShield;
exports.default = _default;