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

function _icons() {
  const data = require("@react-vant/icons");

  _icons = function () {
    return data;
  };

  return data;
}

var _utils = require("../utils");

var _field = _interopRequireDefault(require("../field"));

var _ConfigProviderContext = _interopRequireDefault(require("../config-provider/ConfigProviderContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Components
const [bem] = (0, _utils.createNamespace)('search');
const Search = (0, _react().forwardRef)((props, ref) => {
  const {
    locale
  } = (0, _react().useContext)(_ConfigProviderContext.default);
  const filedRef = (0, _react().useRef)();
  const innerEffect = (0, _react().useRef)(false);
  const [value, setValue] = (0, _react().useState)(() => props.value);

  const blur = () => {
    var _a;

    (_a = filedRef.current) === null || _a === void 0 ? void 0 : _a.blur();
  };

  const focus = () => {
    var _a;

    (_a = filedRef.current) === null || _a === void 0 ? void 0 : _a.focus();
  };

  const change = v => {
    var _a;

    innerEffect.current = true;
    (_a = props === null || props === void 0 ? void 0 : props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, v);
    setValue(v);
  };

  const onCancel = () => {
    var _a;

    change('');
    (_a = props === null || props === void 0 ? void 0 : props.onCancel) === null || _a === void 0 ? void 0 : _a.call(props);
  };

  const onKeypress = event => {
    var _a;

    if (event.key === 'Enter') {
      (0, _utils.preventDefault)(event.nativeEvent);
      (_a = props === null || props === void 0 ? void 0 : props.onSearch) === null || _a === void 0 ? void 0 : _a.call(props, value);
    }
  };

  const onClear = event => {
    var _a;

    change('');
    (_a = props === null || props === void 0 ? void 0 : props.onClear) === null || _a === void 0 ? void 0 : _a.call(props, event);
  };

  const onClickInput = event => {
    var _a;

    (_a = props === null || props === void 0 ? void 0 : props.onClickInput) === null || _a === void 0 ? void 0 : _a.call(props, event);
  };

  const renderLabel = () => {
    if (props.label) {
      return (0, _jsxRuntime().jsx)("div", Object.assign({
        className: (0, _clsx().default)(bem('label'))
      }, {
        children: props.label
      }));
    }

    return null;
  };

  const renderAction = () => {
    if (props.showAction) {
      return (0, _jsxRuntime().jsx)("div", Object.assign({
        className: (0, _clsx().default)(bem('action')),
        role: 'button',
        tabIndex: 0,
        onClick: onCancel
      }, {
        children: props.actionText || locale.cancel
      }));
    }

    return null;
  };

  const {
    autoFocus,
    align,
    disabled = false,
    maxLength,
    leftIcon,
    rightIcon,
    clearable = true,
    clearTrigger,
    placeholder,
    readOnly,
    error,
    errorMessage,
    formatter,
    formatTrigger,
    clearIcon
  } = props;
  const fieldPropNames = {
    align,
    leftIcon,
    rightIcon,
    clearable,
    clearTrigger,
    placeholder,
    disabled,
    maxLength,
    readOnly,
    autoFocus,
    error,
    errorMessage,
    formatter,
    formatTrigger,
    clearIcon
  };

  const renderField = () => {
    return (0, _jsxRuntime().jsx)(_field.default, Object.assign({
      ref: filedRef,
      className: (0, _clsx().default)(bem('field')),
      type: 'search',
      rows: 1,
      value: value || '',
      border: false,
      onKeyPress: onKeypress,
      onFocus: props.onFocus,
      onBlur: props.onBlur,
      onChange: change,
      onClear: onClear,
      onClickInput: onClickInput
    }, fieldPropNames));
  };

  (0, _react().useEffect)(() => {
    if (innerEffect.current) {
      innerEffect.current = false;
      return;
    }

    setValue(props.value);
  }, [props.value]);
  (0, _react().useImperativeHandle)(ref, () => ({
    focus,
    blur
  }));
  return (0, _jsxRuntime().jsxs)("div", Object.assign({
    className: (0, _clsx().default)(props.className, bem({
      'show-action': props.showAction
    })),
    style: Object.assign(Object.assign({}, props.style), {
      background: props.background
    })
  }, {
    children: [(0, _jsxRuntime().jsxs)("div", Object.assign({
      className: (0, _clsx().default)(bem('content', props.shape))
    }, {
      children: [renderLabel(), renderField()]
    })), renderAction()]
  }));
});
Search.defaultProps = {
  shape: 'square',
  leftIcon: (0, _jsxRuntime().jsx)(_icons().Search, {})
};
var _default = Search;
exports.default = _default;