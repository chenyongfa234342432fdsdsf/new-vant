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
  d: "M722.222 0c30.683 0 55.556 24.873 55.556 55.556v888.888c0 30.683-24.873 55.556-55.556 55.556H277.778c-30.683 0-55.556-24.873-55.556-55.556V55.556C222.222 24.873 247.095 0 277.778 0h444.444zm0 55.556H277.778v888.888h444.444V55.556zm-181.92 630v54.333c-.667 9.667-2 19-3.998 27.667h105.25v33h-118.24c-1.332 2-2.33 3.666-3.33 5.333 41.633 12 79.936 26.333 114.575 42.667l-19.65 30.333c-37.637-20.667-75.94-37-115.242-49.333-23.98 20.666-63.283 36.666-117.906 48l-18.651-29.667c55.289-11 92.259-24.333 111.577-40.333l6.994-7H360.445v-33h75.94c-19.652-11.667-39.636-20.667-59.953-27.334l16.32-24.333c24.647 8 47.296 18 67.946 29.333l-14.655 22.334H501c2.665-9 4.663-18.334 5.662-27.667v-54.333h33.64zm-22.316-116v22.666h93.258v31.334h-93.258v22.333h116.573v21.667c-4.996 22.666-11.657 45-19.984 67l-32.64-9.334c6.66-13.666 12.323-29.666 17.319-47.666H364.109v-31.667h119.904v-22.333h-95.257v-31.334h95.257v-22.666h33.973zM420.73 681.222c24.98 6.667 47.962 15.334 68.945 25.334l-17.32 26.333c-21.982-11.667-44.63-21-67.945-27.667l16.32-24zm-35.305-325.444l28.977 14c-11.658 25.666-25.313 47.666-40.634 66l-28.644-21c15.321-16.334 28.977-36 40.301-59zm215.827-5.667c19.984 24.667 34.972 46 45.63 64.333l-28.976 20.334c-10.992-20-25.98-42.334-44.964-67l28.31-17.667zm-132.227 15.333c6.661 18.667 12.323 39 17.652 60.667l-34.972 8.333c-3.997-23.666-9.326-44.333-15.32-62.333l32.64-6.667zm68.945-4.666c9.325 20 17.652 41.333 24.98 64.666l-34.64 8.334c-5.995-25-13.655-47-22.98-66l32.64-7zm6.661-236.334v40h67.946v68c0 35 1.998 59 6.66 72.334 2 6 3.665 9 4.997 9 1.665 0 3.33-5 4.663-14.334 1-9 1.665-19 1.665-29.666l26.312 13c-1.665 29.333-5.329 48.333-10.99 57-3.998 5.666-8.66 8.666-14.656 8.666-12.656-.333-22.981-5.333-30.975-14.666-14.322-16-21.65-50-21.65-101.334v-34h-33.972c-.666 22.667-3.33 43.667-7.994 62.334 13.656 10.666 26.646 22 39.302 34.666l-19.65 30c-10.659-11.333-21.317-21.666-31.975-30.666-10.991 23-26.312 42-45.63 57l-25.646-23c19.317-14.334 33.64-33 43.298-56-9.326-7-18.651-13-27.977-18.334l18.318-27.333c6.662 4 13.323 8 19.651 12 2.332-12.667 3.664-26.333 4.33-40.667h-33.973v-34h33.973v-40h33.973zm-113.909.334v38h36.637v34h-36.637v40l33.973-10v33.333c-11.324 3.333-22.649 6.333-33.973 9.333v45.334c0 22.666-10.658 34-31.974 34h-31.975l-7.993-33.334c9.659 1.334 18.984 2.334 27.644 2.334 5.995 0 9.326-4 9.326-11.667v-28.333c-14.655 3-28.977 6-43.632 8.666l-8.326-32.333a649.573 649.573 0 0051.958-9v-48.333h-43.299v-34h43.3v-38h34.971z",
  fillRule: "nonzero"
}));

const SvgHotSaleO = React.forwardRef((props, ref) => {
  return React.createElement(_IconBase.default, Object.assign({
    name: "SvgHotSaleO"
  }, props, {
    ref: ref
  }), React.createElement(SvgIcon, null));
});
var _default = SvgHotSaleO;
exports.default = _default;