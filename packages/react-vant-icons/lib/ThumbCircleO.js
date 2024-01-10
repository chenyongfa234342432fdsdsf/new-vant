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
  fillRule: "nonzero"
}, React.createElement("path", {
  d: "M578.69 327.564l-5.962 77.831 70.278-8.36c37.332-4.448 63.459 24.7 54.125 63.088-.287.848-.929 3.264-1.637 7.088-.517 2.786-.96 5.825-1.304 9.127-.16 1.519-.044 2.567.565 4.906l.339 1.254.067.246c.125.454.266.956.561 2.009 2.687 9.68 3.7 17.221 2.837 28.083-.812 10.115-2.571 17.009-5.821 25.297-.557 1.408-.557 1.408-1.03 2.598-1.448 3.679-1.914 5.395-2.177 8.44-.339 3.935-.195 5.389.723 9.715 1.618 7.619 2.144 12.518 1.587 20.318-.742 10.412-2.943 18.349-6.666 26.388-.524 1.13-2.574 5.303-2.874 5.997-.612 2.875-.595 4.976-.369 6.532.069.38.069.38.5 3.082 2.535 27.761-17.15 53.48-44.75 57.959l-292.717 47.483c-23.73 3.846-44.363-13.7-44.363-37.833V525.615c0-18.503 13.926-35.205 32.136-38.59a8840.647 8840.647 0 0032.263-6.06l1.746-.33 1.749-.333 1.342-.256c16.87-3.214 28.674-5.54 32.197-6.37 16.078-3.79 33.55-33.608 46.844-80.85 5.7-20.254 10.277-42.113 13.81-63.995 2.12-13.129 3.411-23.281 4.066-29.615 2.574-19.041 17.896-36.11 36.527-41.052.853-.38 1.739-.502 2.621-.61.618-.123 1.24-.234 1.864-.33 41.98-3.952 74.21 27.428 70.923 70.34zM342.27 527.634V684.87l32.73-5.31V521.478a8889.391 8889.391 0 01-32.73 6.156zm170.895-228.92c-2.164.994-4.828 3.924-5.037 5.398-.65 6.412-2.043 17.36-4.304 31.36-3.767 23.335-8.66 46.692-14.835 68.64-16.482 58.567-38.56 97.677-72.32 108.697l-.002 159.993 214.344-34.769c5.886-.955 10.484-6.962 10.523-9.655-.348-1.39-.348-1.39-.834-4.266-.81-5.57-.863-11.914.267-18.794.593-3.623 1.626-6.88 3.09-10.268.785-1.812 3.172-6.67 3.31-6.969 1.697-3.663 2.55-6.742 2.914-11.841.233-3.266.093-4.57-.75-8.545-1.733-8.16-2.256-13.456-1.511-22.1.658-7.637 2.12-13.019 4.92-20.128l1.008-2.548c1.855-4.729 2.623-7.739 3.078-13.398.425-5.363.036-8.266-1.452-13.625-.525-1.869-.525-1.869-1.142-4.158-1.773-6.815-2.427-12.678-1.68-19.749.457-4.389 1.06-8.518 1.774-12.372 1.084-5.85 2.236-10.187 2.62-11.059 1.994-8.273-.606-11.174-9.213-10.148l-74.928 8.913c-24.426 2.885-44.022-16.06-42.162-40.656l6.303-82.286c1.26-16.453-8.407-26.587-23.98-25.668z"
}), React.createElement("path", {
  d: "M500 888.889c214.777 0 388.889-174.112 388.889-388.889 0-214.777-174.112-388.889-388.889-388.889-214.777 0-388.889 174.112-388.889 388.889 0 214.777 174.112 388.889 388.889 388.889zm0 55.555C254.54 944.444 55.556 745.46 55.556 500S254.54 55.556 500 55.556 944.444 254.54 944.444 500 745.46 944.444 500 944.444z"
})));

const SvgThumbCircleO = React.forwardRef((props, ref) => {
  return React.createElement(_IconBase.default, Object.assign({
    name: "SvgThumbCircleO"
  }, props, {
    ref: ref
  }), React.createElement(SvgIcon, null));
});
var _default = SvgThumbCircleO;
exports.default = _default;