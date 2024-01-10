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
  d: "M777.778 111.111c30.682 0 55.555 24.873 55.555 55.556v722.222c0 30.376-24.378 55.057-54.637 55.548l-.918.007H222.222c-30.682 0-55.555-24.873-55.555-55.555V166.667c0-30.683 24.873-55.556 55.555-55.556V888.89h555.556V111.11zm-66.89 279.655l1.608-1.334c.91-.756 2.779-.672 3.376-.062l5.967 6.096c.61.623.557 1.797-.629 3.008l-1.161 1.187c3.48 4.877 2.732 11.643-1.9 16.267L472.58 661.135c-4.321 4.315-10.21 6.082-15.935 5.383-3.013.554-6.37-.443-8.893-3.021l-.888-.905a21.197 21.197 0 01-2.334-2.015L337.485 553.69c-2.045-2.042-3.368-4.561-3.894-7.197a2.995 2.995 0 01-.223-1.65 12.776 12.776 0 012.757-8.93l10.004-12.612c4.1-5.17 11.771-6.468 17.193-2.85l86.587 57.793c4.567 3.049 12.428 2.652 16.692-.808l228.8-185.625c4.38-3.553 10.872-3.823 15.486-1.045zm-322-279.655v55.556H222.223V111.11H388.89zm388.89 0v55.556H611.11V111.11h166.667zm-361.111 0c-15.342 0-27.778 12.437-27.778 27.778s12.436 27.778 27.778 27.778h166.666c15.342 0 27.778-12.437 27.778-27.778s-12.436-27.778-27.778-27.778H416.667zm0-55.555h166.666c46.024 0 83.334 37.31 83.334 83.333 0 46.024-37.31 83.333-83.334 83.333H416.667c-46.024 0-83.334-37.31-83.334-83.333 0-46.024 37.31-83.333 83.334-83.333z",
  fillRule: "nonzero"
}));

const SvgCompleted = React.forwardRef((props, ref) => {
  return React.createElement(_IconBase.default, Object.assign({
    name: "SvgCompleted"
  }, props, {
    ref: ref
  }), React.createElement(SvgIcon, null));
});
var _default = SvgCompleted;
exports.default = _default;