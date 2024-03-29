"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _react() {
  const data = _interopRequireWildcard(require("react"));

  _react = function () {
    return data;
  };

  return data;
}

function _tslib() {
  const data = require("tslib");

  _tslib = function () {
    return data;
  };

  return data;
}

function _jsxRuntime() {
  const data = require("react/jsx-runtime");

  _jsxRuntime = function () {
    return data;
  };

  return data;
}

function _clsx() {
  const data = _interopRequireDefault(require("clsx"));

  _clsx = function () {
    return data;
  };

  return data;
}

function _rcFieldForm() {
  const data = _interopRequireDefault(require("rc-field-form"));

  _rcFieldForm = function () {
    return data;
  };

  return data;
}

var _FormContext = require("./FormContext");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const [bem] = (0, _utils.createNamespace)('form');
const Form = (0, _react().forwardRef)((props, ref) => {
  const {
    className,
    style,
    layout,
    footer,
    children,
    colon,
    border,
    labelAlign,
    controlAlign,
    showValidateMessage
  } = props,
        formProps = (0, _tslib().__rest)(props, ["className", "style", "layout", "footer", "children", "colon", "border", "labelAlign", "controlAlign", "showValidateMessage"]);
  return (0, _jsxRuntime().jsxs)(_rcFieldForm().default, Object.assign({
    className: (0, _clsx().default)(bem(), className),
    style: style,
    ref: ref
  }, formProps, {
    children: [(0, _jsxRuntime().jsx)(_FormContext.FormContext.Provider, Object.assign({
      value: {
        layout,
        colon,
        border,
        showValidateMessage,
        controlAlign,
        labelAlign
      }
    }, {
      children: children
    })), footer && (0, _jsxRuntime().jsx)("div", Object.assign({
      className: (0, _clsx().default)(bem('footer'))
    }, {
      children: footer
    }))]
  }));
});
Form.defaultProps = {
  showValidateMessage: true
};
var _default = Form;
exports.default = _default;