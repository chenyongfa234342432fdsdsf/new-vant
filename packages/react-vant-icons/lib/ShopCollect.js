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
  d: "M777.292 611.025c61.202 0 110.926 50.008 110.926 111.423l-.057 2.633c-.017.446-.04.837-.08 1.492l.02 1.147c0 10.93-2.404 21.999-6.81 33.18l-.29.782c-1.667 4.44-3.843 9.096-9.02 17.758l1.315-1.766c.095-.132.156-.22.205-.297l1.07-1.85-.654 1.185.077-.115c.023-.025-.093.198-.521 1.017l-.578 1.075c-1.149 2.117-2.245 4.002-3.006 5.053a196.206 196.206 0 01-6.61 10.228c-12.945 18.773-30.582 38.098-51.832 57.804-14.205 13.173-29.268 25.82-44.55 37.742l-3.264 2.53c-9.713 7.474-25.961 19.394-21.314 15.875a41.957 41.957 0 01-25.21 8.419c-8.78 0-17.343-2.697-24.683-8.006l-.484-.354.8.612c1.052.853-14.663-10.677-23.297-17.35-15.964-12.338-31.706-25.472-46.515-39.197-21.907-20.302-39.962-40.223-52.997-59.604-5.951-8.848-10.823-17.547-14.573-26.266l-.381-.934-.04-.1c-5.386-12.872-8.233-25.384-8.233-37.446a58.794 58.794 0 01-.222-5.247c0-61.436 49.708-111.423 110.927-111.423 21.437 0 42.202 6.352 59.935 17.9 17.71-11.549 38.484-17.9 59.946-17.9zm-5.29-419.154c24.98 0 46.753 17 52.811 41.233l34.216 136.862c9.208 19.523 14.068 40.948 14.068 62.977 0 81.602-66.151 147.753-147.753 147.753-47.414 0-89.612-22.333-116.648-57.053-27.036 34.72-69.233 57.053-116.647 57.053s-89.612-22.333-116.648-57.053c-27.036 34.72-69.234 57.053-116.647 57.053-13.457 0-26.494-1.799-38.883-5.17v269.571h299.396c15.031 0 27.217 12.186 27.217 27.218s-12.186 27.218-27.217 27.218H206.262c-22.548 0-40.826-18.279-40.826-40.827V547.504C132.214 520.41 111 479.154 111 432.943c0-22.03 4.86-43.454 14.069-62.977l34.215-136.862c6.059-24.233 27.832-41.233 52.81-41.233h559.909zM764.227 83c15.032 0 27.218 12.186 27.218 27.218s-12.186 27.218-27.218 27.218H219.871c-15.032 0-27.218-12.186-27.218-27.218S204.84 83 219.871 83h544.355z",
  fillRule: "evenodd"
}));

const SvgShopCollect = React.forwardRef((props, ref) => {
  return React.createElement(_IconBase.default, Object.assign({
    name: "SvgShopCollect"
  }, props, {
    ref: ref
  }), React.createElement(SvgIcon, null));
});
var _default = SvgShopCollect;
exports.default = _default;