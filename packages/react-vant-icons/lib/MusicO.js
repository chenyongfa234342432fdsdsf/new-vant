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
  d: "M500 888.889c-214.389 0-388.889-174.5-388.889-388.889S285.611 111.111 500 111.111 888.889 285.611 888.889 500 714.389 888.889 500 888.889m0-833.333c-245.444 0-444.444 199-444.444 444.444 0 245.444 199 444.444 444.444 444.444 245.444 0 444.444-199 444.444-444.444 0-245.444-199-444.444-444.444-444.444m-48.611 666.666h-69.445c-26.777 0-48.61-21.833-48.61-48.61 0-26.779 21.833-48.612 48.61-48.612h69.445C478.167 625 500 646.833 500 673.611s-21.833 48.611-48.611 48.611M657.889 293l-113.722-65.611c-4.278-3-9.167-5.167-14.834-5.167H526.222c-13.444 0-24 10.222-25.61 23.111-.056.667-.279 1.167-.334 1.834-.056.444-.278.833-.278 1.277v333.612c-14.611-7.778-30.944-12.612-48.611-12.612h-69.445c-57.5 0-104.166 46.667-104.166 104.167s46.666 104.167 104.166 104.167h69.445c57.5 0 104.167-46.667 104.167-104.167 0-2.389-.556-4.611-.723-6.944h.723V298.11l74.555 43.056a27.663 27.663 0 0013.833 3.722c9.612 0 18.945-5 24.056-13.889 7.722-13.278 3.167-30.278-10.111-38",
  fillRule: "evenodd"
}));

const SvgMusicO = React.forwardRef((props, ref) => {
  return React.createElement(_IconBase.default, Object.assign({
    name: "SvgMusicO"
  }, props, {
    ref: ref
  }), React.createElement(SvgIcon, null));
});
var _default = SvgMusicO;
exports.default = _default;