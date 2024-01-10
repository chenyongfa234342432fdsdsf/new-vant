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
  d: "M519.254 62.174l305.324 98.016c27.386 9.051 45.688 34.032 45.42 61.99v402.577c0 143.888-268.304 275.044-350.497 311.808A50.581 50.581 0 01498.768 941a50.025 50.025 0 01-19.006-3.79c-82.193-33.57-350.493-155.357-349.76-312.716V222.132c-.24-27.951 18.053-52.92 45.424-61.99l303.596-97.968a65.326 65.326 0 0140.232 0zm-19.997 54.384c-.76.011-1.512.14-2.229.382l-304.9 97.967c-3.097 1.046-5.178 3.851-5.203 7.01V624.54c-.494 102.331 194.186 209.526 311.837 257.806 156.784-70.406 314.312-177.004 314.312-257.806V222.084c.017-3.204-2.067-6.07-5.201-7.152l-306.387-98.016c-.6-.186-1.222-.3-1.85-.342l-.379-.016zm.745 149.363c14.907.077 26.817 12.107 26.74 26.87l-.976 144.127h145.292c14.845 0 26.88 12.03 26.88 26.87 0 14.841-12.035 26.872-26.88 26.872H525.487l-.984 145.382c-.074 14.168-11.584 25.615-25.757 25.615-14.152 0-25.624-11.468-25.624-25.615V490.66H328.947c-14.846 0-26.88-12.03-26.88-26.871 0-14.84 12.034-26.871 26.88-26.871h144.175V292.792c0-14.84 12.035-26.871 26.88-26.871z",
  fillRule: "evenodd"
}));

const SvgShieldO = React.forwardRef((props, ref) => {
  return React.createElement(_IconBase.default, Object.assign({
    name: "SvgShieldO"
  }, props, {
    ref: ref
  }), React.createElement(SvgIcon, null));
});
var _default = SvgShieldO;
exports.default = _default;