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
  fillRule: "evenodd"
}, React.createElement("path", {
  d: "M389.05 304.794c0 6.5 1.611 13.667 4.722 21.334.111.278.222.555.334.722 19.722 47.056 95.666 101.111 98.888 103.611 2 1.556 4.39 2.278 6.778 2.278 2.445 0 4.89-.778 6.89-2.333 2.777-2.112 67.555-48.445 93.277-92.278.944-1.5 1.722-2.945 2.389-4.167.222-.389.389-.778.61-1.167l.112-.166c.056-.167.111-.334.222-.445 1.556-3 2.778-5.722 3.778-8.444 2.667-6.945 3.944-13.167 3.944-18.889v-1.222c0-.722.112-1.778.112-2.945 0-36.833-29.056-66.722-64.778-66.722-17.556 0-34.278 7.5-46.334 20.389-12.11-12.889-28.777-20.389-46.333-20.389-35.667 0-64.778 29.889-64.778 66.722 0 1.223.111 2.334.223 3.167 0 .333-.056.611-.056.944"
}), React.createElement("path", {
  d: "M722.222 412.978L520.167 534.2A38.997 38.997 0 01500 539.811a38.997 38.997 0 01-20.167-5.611L277.778 412.978V166.644h444.444v246.334zm111.111-135.222h-55.555V166.644c0-30.666-24.834-55.555-55.556-55.555H277.778c-30.722 0-55.556 24.889-55.556 55.555v111.112h-55.555c-30.723 0-55.556 24.888-55.556 55.555v500c0 30.722 24.833 55.556 55.556 55.556h666.666c30.723 0 55.556-24.834 55.556-55.556v-500c0-30.667-24.833-55.555-55.556-55.555z"
})));

const SvgInvitation = React.forwardRef((props, ref) => {
  return React.createElement(_IconBase.default, Object.assign({
    name: "SvgInvitation"
  }, props, {
    ref: ref
  }), React.createElement(SvgIcon, null));
});
var _default = SvgInvitation;
exports.default = _default;