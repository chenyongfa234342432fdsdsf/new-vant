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
  d: "M722.222 0c30.683 0 55.556 24.873 55.556 55.556v888.888c0 30.683-24.873 55.556-55.556 55.556H277.778c-30.683 0-55.556-24.873-55.556-55.556V55.556C222.222 24.873 247.095 0 277.778 0h444.444zm-181.92 685.556h-33.64v54.333c-1 9.333-2.998 18.667-5.663 27.667h-54.956l14.655-22.334c-20.65-11.333-43.299-21.333-67.946-29.333l-16.32 24.333c20.317 6.667 40.301 15.667 59.952 27.334h-75.939v33h121.236l-6.994 7c-19.318 16-56.288 29.333-111.577 40.333l18.651 29.667c54.623-11.334 93.925-27.334 117.906-48 39.302 12.333 77.605 28.666 115.241 49.333l19.651-30.333c-34.639-16.334-72.942-30.667-114.575-42.667 1-1.667 1.998-3.333 3.33-5.333h118.24v-33h-105.25c1.999-8.667 3.331-18 3.997-27.667v-54.333zm-22.316-116h-33.973v22.666h-95.257v31.334h95.257v22.333H364.109v31.667h235.145c-4.996 18-10.658 34-17.32 47.666l32.641 9.334c8.327-22 14.988-44.334 19.984-67v-21.667H517.986v-22.333h93.258v-31.334h-93.258v-22.666zM420.73 681.222l-16.32 24c23.314 6.667 45.963 16 67.945 27.667l17.32-26.333c-20.983-10-43.965-18.667-68.945-25.334zm-35.305-325.444c-11.324 23-24.98 42.666-40.301 59l28.644 21c15.32-18.334 28.976-40.334 40.634-66zm215.827-5.667l-28.31 17.667c18.984 24.666 33.972 47 44.964 67l28.976-20.334c-10.658-18.333-25.646-39.666-45.63-64.333zm-132.227 15.333l-32.64 6.667c5.994 18 11.323 38.667 15.32 62.333l34.972-8.333c-5.329-21.667-10.99-42-17.652-60.667zm68.945-4.666l-32.64 7c9.325 19 16.985 41 22.98 66l34.64-8.334c-7.328-23.333-15.655-44.666-24.98-64.666zm6.661-236.334h-33.973v40h-33.973v34h33.973c-.666 14.334-1.998 28-4.33 40.667-6.328-4-12.99-8-19.65-12l-18.32 27.333c9.327 5.334 18.652 11.334 27.978 18.334-9.659 23-23.98 41.666-43.298 56l25.646 23c19.318-15 34.639-34 45.63-57 10.658 9 21.316 19.333 31.974 30.666l19.651-30c-12.656-12.666-25.646-24-39.302-34.666 4.663-18.667 7.328-39.667 7.994-62.334h33.973v34c0 51.334 7.327 85.334 21.65 101.334 7.993 9.333 18.318 14.333 30.974 14.666 5.996 0 10.658-3 14.655-8.666 5.662-8.667 9.326-27.667 10.991-57l-26.312-13c0 10.666-.666 20.666-1.665 29.666-1.332 9.334-2.998 14.334-4.663 14.334-1.332 0-2.998-3-4.996-9-4.663-13.334-6.661-37.334-6.661-72.334v-68H544.63v-40zm-113.909.334H395.75v38h-43.299v34h43.3v48.333a649.573 649.573 0 01-51.96 9l8.327 32.333c14.655-2.666 28.977-5.666 43.632-8.666v28.333c0 7.667-3.33 11.667-9.326 11.667-8.66 0-17.985-1-27.644-2.334l7.993 33.334h31.975c21.316 0 31.974-11.334 31.974-34v-45.334c11.324-3 22.649-6 33.973-9.333v-33.333l-33.973 10v-40h36.637v-34h-36.637v-38z",
  fillRule: "evenodd",
  opacity: 0.9
}));

const SvgHotSale = React.forwardRef((props, ref) => {
  return React.createElement(_IconBase.default, Object.assign({
    name: "SvgHotSale"
  }, props, {
    ref: ref
  }), React.createElement(SvgIcon, null));
});
var _default = SvgHotSale;
exports.default = _default;