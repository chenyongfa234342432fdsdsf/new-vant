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
  d: "M467.48 222.222c-11.44-32.366-42.307-55.555-78.591-55.555-36.284 0-67.152 23.189-78.592 55.555H467.48zm-214.702 0c12.869-63.395 68.918-111.11 136.11-111.11 45.434 0 85.772 21.814 111.112 55.541 25.34-33.727 65.678-55.542 111.111-55.542 67.193 0 123.242 47.716 136.11 111.111h86.112c30.683 0 55.556 24.873 55.556 55.556v166.666c0 30.683-24.873 55.556-55.556 55.556v333.333c0 30.683-24.873 55.556-55.555 55.556H222.222c-30.682 0-55.555-24.873-55.555-55.556V500c-30.683 0-55.556-24.873-55.556-55.556V277.778c0-30.683 24.873-55.556 55.556-55.556h86.111zm279.742 0h157.183c-11.44-32.366-42.308-55.555-78.592-55.555s-67.151 23.189-78.591 55.555zm-88.076 0V888.89h111.112V222.222H444.444z",
  fillRule: "evenodd"
}));

const SvgGift = React.forwardRef((props, ref) => {
  return React.createElement(_IconBase.default, Object.assign({
    name: "SvgGift"
  }, props, {
    ref: ref
  }), React.createElement(SvgIcon, null));
});
var _default = SvgGift;
exports.default = _default;