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

var _popup = _interopRequireDefault(require("../popup"));

var _button = _interopRequireDefault(require("../button"));

var _actionBar = _interopRequireDefault(require("../action-bar"));

var _utils = require("../utils");

var _ConfigProviderContext = _interopRequireDefault(require("../config-provider/ConfigProviderContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// import { BORDER_TOP, BORDER_LEFT } from '../utils/constant'
const [bem] = (0, _utils.createNamespace)('dialog');

const Dialog = props => {
  const {
    locale
  } = (0, _react().useContext)(_ConfigProviderContext.default);
  const {
    width,
    title,
    theme,
    visible,
    message,
    className,
    messageAlign,
    closeOnClickOverlay,
    onClickCloseIcon
  } = props,
        others = (0, _tslib().__rest)(props, ["width", "title", "theme", "visible", "message", "className", "messageAlign", "closeOnClickOverlay", "onClickCloseIcon"]);

  const renderTitle = () => {
    if (props.title) {
      return (0, _jsxRuntime().jsx)("div", Object.assign({
        className: (0, _clsx().default)(bem('header', {
          isolated: !props.message && !props.children
        }))
      }, {
        children: title
      }));
    }

    return null;
  };

  const renderContent = () => {
    if (props.children) {
      return (0, _jsxRuntime().jsx)("div", Object.assign({
        className: (0, _clsx().default)(bem('content'))
      }, {
        children: props.children
      }));
    }

    if (message) {
      return (0, _jsxRuntime().jsx)("div", Object.assign({
        className: (0, _clsx().default)(bem('content', {
          isolated: !title
        }))
      }, {
        children: (0, _jsxRuntime().jsx)("div", Object.assign({
          className: (0, _clsx().default)(bem('message', {
            'has-title': title,
            [messageAlign]: messageAlign
          }))
        }, {
          children: message
        }))
      }));
    }

    return null;
  };

  const renderButtons = () => {
    var _a, _b, _c, _d, _e, _f;

    return (0, _jsxRuntime().jsxs)("div", Object.assign({
      className: (0, _clsx().default)(bem('footer'))
    }, {
      children: [props.showCancelButton && (0, _jsxRuntime().jsx)(_button.default, {
        size: 'large',
        text: props.cancelButtonText || locale.cancel,
        className: (0, _clsx().default)(bem('cancel')),
        style: {
          color: props.cancelButtonColor
        },
        loading: (_a = props.cancelProps) === null || _a === void 0 ? void 0 : _a.loading,
        disabled: (_b = props.cancelProps) === null || _b === void 0 ? void 0 : _b.disabled,
        onClick: ((_c = props.cancelProps) === null || _c === void 0 ? void 0 : _c.loading) ? _utils.noop : props.onCancel
      }), props.showConfirmButton && (0, _jsxRuntime().jsx)(_button.default, {
        size: 'large',
        text: props.confirmButtonText || locale.confirm,
        className: (0, _clsx().default)(bem('confirm')),
        round: theme === 'round-button',
        style: {
          color: props.confirmButtonColor
        },
        loading: (_d = props.confirmProps) === null || _d === void 0 ? void 0 : _d.loading,
        disabled: (_e = props.confirmProps) === null || _e === void 0 ? void 0 : _e.disabled,
        onClick: ((_f = props.confirmProps) === null || _f === void 0 ? void 0 : _f.loading) ? _utils.noop : props.onConfirm
      })]
    }));
  };

  const renderRoundButtons = () => {
    var _a, _b, _c, _d, _e, _f;

    return (0, _jsxRuntime().jsxs)(_actionBar.default, Object.assign({
      className: (0, _clsx().default)(bem('footer'))
    }, {
      children: [props.showCancelButton && (0, _jsxRuntime().jsx)(_actionBar.default.Button, {
        type: 'warning',
        text: props.cancelButtonText || locale.cancel,
        className: (0, _clsx().default)(bem('cancel')),
        color: props.cancelButtonColor,
        loading: (_a = props.cancelProps) === null || _a === void 0 ? void 0 : _a.loading,
        disabled: (_b = props.cancelProps) === null || _b === void 0 ? void 0 : _b.disabled,
        onClick: ((_c = props.cancelProps) === null || _c === void 0 ? void 0 : _c.loading) ? _utils.noop : props.onCancel
      }), props.showConfirmButton && (0, _jsxRuntime().jsx)(_actionBar.default.Button, {
        type: 'danger',
        text: props.confirmButtonText || locale.confirm,
        className: (0, _clsx().default)(bem('confirm')),
        color: props.confirmButtonColor,
        loading: (_d = props.confirmProps) === null || _d === void 0 ? void 0 : _d.loading,
        disabled: (_e = props.confirmProps) === null || _e === void 0 ? void 0 : _e.disabled,
        onClick: ((_f = props.confirmProps) === null || _f === void 0 ? void 0 : _f.loading) ? _utils.noop : props.onConfirm
      })]
    }));
  };

  const renderFooter = () => {
    if (props.footer) return props.footer;
    return props.theme === 'round-button' ? renderRoundButtons() : renderButtons();
  };

  return (0, _jsxRuntime().jsxs)(_popup.default, Object.assign({}, others, {
    visible: visible,
    className: (0, _clsx().default)(bem([theme]), className),
    style: {
      width: (0, _utils.addUnit)(width)
    },
    "aria-labelledby": title || message,
    closeOnClickOverlay: closeOnClickOverlay,
    onClickCloseIcon: onClickCloseIcon,
    onClose: props.onClose,
    onClosed: props.onClosed
  }, {
    children: [renderTitle(), renderContent(), renderFooter()]
  }));
};

Dialog.defaultProps = {
  transition: 'rv-dialog-bounce',
  showConfirmButton: true,
  closeOnPopstate: true
};
var _default = Dialog;
exports.default = _default;