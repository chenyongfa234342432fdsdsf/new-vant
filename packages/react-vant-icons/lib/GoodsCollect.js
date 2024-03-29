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
  d: "M804.373 666.667c44.598 0 80.935 38.556 80.935 85.938 0 1.571-.113 2.891-.164 3.872.025.415.05.943.05 1.508 0 7.443-1.654 15.388-4.988 24.339-1.2 3.47-2.729 7.052-4.674 10.886-.084.11-.24.37-.467.78-.278.503-.505 1.006-.745 1.508-.834 1.597-1.743 3.445-2.968 5.343-32.17 56.446-113.13 116.072-116.59 118.838-2.539 2.011-5.545 3.03-8.576 3.03-3.019 0-5.974-.956-8.5-2.942-4.042-3.219-98.997-72.852-123.664-133.383-.126-.314-.24-.654-.378-1.006-3.903-9.83-5.899-19.033-5.899-27.418 0-.415.025-.78.063-1.182a32.004 32.004 0 01-.278-4.173c0-47.407 36.325-85.938 80.935-85.938 22.002 0 42.842 9.743 57.973 26.324 15.056-16.581 35.896-26.324 57.935-26.324zm-330.523-500c-52.783 0-97.355 35.157-111.576 83.332h223.152c-14.22-48.175-58.793-83.332-111.576-83.332zm87.989 638.781l.009.021-.044-.112.035.091-.047-.118.01.027c.237.637.237.637.672 1.743 4.33 10.628 9.8 20.939 16.396 31.289 10.692 16.781 24.26 33.585 40.227 50.5H222.222c-30.682 0-55.555-24.873-55.555-55.556 0-1.156.036-2.311.108-3.465L199.76 302.09c1.83-29.28 26.11-52.09 55.447-52.09h49.93c15.208-78.245 83.496-137.53 165.87-138.866l2.842-.023c83.641 0 153.328 59.746 168.713 138.888l67.29.001c29.336 0 53.617 22.81 55.447 52.09l19.407 310.512c-13.348 2.036-26.245 6.12-38.299 12.036-17.895-8.78-37.63-13.527-57.943-13.527-76.07 0-136.49 64.135-136.49 141.494 0 2.297.058 4.075.217 6.128.108 15.28 3.409 30.699 9.42 46.137l.162.411-.025-.066a35.23 35.23 0 01-.09-.243l-.003-.01c.02.05.112.287.299.776l.03.082-.03-.078-.002-.005-.031-.078-.035-.09-.048-.12z",
  fillRule: "evenodd"
}));

const SvgGoodsCollect = React.forwardRef((props, ref) => {
  return React.createElement(_IconBase.default, Object.assign({
    name: "SvgGoodsCollect"
  }, props, {
    ref: ref
  }), React.createElement(SvgIcon, null));
});
var _default = SvgGoodsCollect;
exports.default = _default;