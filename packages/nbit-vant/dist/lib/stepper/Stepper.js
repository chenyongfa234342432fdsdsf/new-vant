"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _jsxRuntime() {
  const data = require("react/jsx-runtime");

  _jsxRuntime = function () {
    return data;
  };

  return data;
}

function _react() {
  const data = _interopRequireWildcard(require("react"));

  _react = function () {
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

var _number = require("../utils/validate/number");

var _utils = require("../utils");

var _hooks = require("../hooks");

var _bound = require("../utils/bound");

var _useRefState = _interopRequireDefault(require("../hooks/use-ref-state"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const LONG_PRESS_INTERVAL = 100;
const LONG_PRESS_START_TIME = 600; // add num and avoid float number

function add(num1, num2) {
  const cardinal = Math.pow(10, 10);
  return Math.round((num1 + num2) * cardinal) / cardinal;
}

const [bem] = (0, _utils.createNamespace)('stepper');

const Stepper = _react().default.forwardRef((props, ref) => {
  const {
    defaultValue = 0
  } = props;
  let actionType;
  const inputRef = (0, _react().useRef)(null);
  const [value, setValue] = (0, _hooks.usePropsValue)(Object.assign(Object.assign({}, props), {
    defaultValue,
    onChange: v => {
      var _a;

      (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, v, {
        name: props.name
      });
    }
  }));

  const format = v => {
    v = +(0, _utils.formatNumber)(String(v), !props.integer);
    if ((0, _number.isNaN)(v)) return;
    let target = (0, _bound.bound)(v, props.min, props.max);

    if (props.decimalLength !== undefined) {
      target = parseFloat(target.toFixed(props.decimalLength));
    }

    return target;
  };

  const setValueWithCheck = v => {
    setValue(format(v));
  };

  const [inputValue, setInputValue, inputValueRef] = (0, _useRefState.default)(() => convertValueToText(value, props.decimalLength));
  const [hasFocus, setHasFocus] = (0, _react().useState)(false);
  (0, _react().useEffect)(() => {
    if (!hasFocus) {
      setInputValue(convertValueToText(value, props.decimalLength));
    }
  }, [hasFocus]);
  (0, _react().useEffect)(() => {
    if (!hasFocus) {
      setInputValue(convertValueToText(value, props.decimalLength));
    }
  }, [value, props.decimalLength]);
  const minusDisabled = (0, _react().useMemo)(() => props.disabled || props.disableMinus || +value <= +props.min, [props.disabled, props.disableMinus, props.min, value]);
  const plusDisabled = (0, _react().useMemo)(() => props.disabled || props.disablePlus || +value >= +props.max, [props.disabled, props.disablePlus, props.max, value]);
  const inputStyle = (0, _react().useMemo)(() => ({
    width: (0, _utils.addUnit)(props.inputWidth),
    height: (0, _utils.addUnit)(props.buttonSize)
  }), [props.inputWidth, props.buttonSize]);
  const buttonStyle = (0, _react().useMemo)(() => (0, _utils.getSizeStyle)(props.buttonSize), [props.buttonSize]);

  const onChange = e => {
    var _a, _b, _c;

    const isMinus = actionType === 'minus';

    if (actionType === 'plus' && plusDisabled || isMinus && minusDisabled) {
      (_a = props.onOverlimit) === null || _a === void 0 ? void 0 : _a.call(props, actionType);
      return;
    }

    const diff = isMinus ? -props.step : +props.step;
    const val = add(+inputValueRef.current, diff);
    setValueWithCheck(val);

    if (isMinus) {
      (_b = props.onMinus) === null || _b === void 0 ? void 0 : _b.call(props, e, val);
    } else {
      (_c = props.onPlus) === null || _c === void 0 ? void 0 : _c.call(props, e, val);
    }
  };

  const onLongPressChange = () => {
    const isMinus = actionType === 'minus';
    const diff = isMinus ? -props.step : +props.step;
    const val = add(+inputValueRef.current, diff);
    setInputValue(`${format(val)}`);
  };

  const onInput = event => {
    const {
      value: inputValue
    } = event.target;
    setInputValue(inputValue);
    const value = convertTextToValue(inputValue);

    if (value === null) {
      if (props.allowEmpty) {
        setValue(null);
      } else {
        setValue(defaultValue);
      }
    } else {
      setValueWithCheck(value);
    }
  };

  const onFocus = event => {
    var _a;

    setHasFocus(true); // readOnly not work in lagacy mobile safari

    if (props.disableInput && inputRef.current) {
      inputRef.current.blur();
    } else {
      (_a = props.onFocus) === null || _a === void 0 ? void 0 : _a.call(props, event);
    }
  };

  const onBlur = event => {
    var _a;

    setHasFocus(false);
    (_a = props.onBlur) === null || _a === void 0 ? void 0 : _a.call(props, event);
    (0, _utils.resetScroll)();
  };

  const isLongPress = (0, _react().useRef)(false);
  const longPressTimer = (0, _react().useRef)(null);

  const longPressStep = () => {
    longPressTimer.current = setTimeout(() => {
      onLongPressChange();
      longPressStep();
    }, LONG_PRESS_INTERVAL);
  };

  const onTouchStart = () => {
    if (props.longPress) {
      isLongPress.current = false;
      clearTimeout(longPressTimer.current);
      longPressTimer.current = setTimeout(() => {
        isLongPress.current = true;
        longPressStep();
      }, LONG_PRESS_START_TIME);
    }
  };

  const onTouchEnd = event => {
    if (props.longPress) {
      clearTimeout(longPressTimer.current);

      if (isLongPress.current) {
        (0, _utils.preventDefault)(event);
      }
    }
  };

  const onMousedown = event => {
    // fix mobile safari page scroll down issue
    // see: https://github.com/youzan/vant/issues/7690
    if (props.disableInput) {
      event.preventDefault();
    }
  };

  const createListeners = type => ({
    onClick: event => {
      // disable double tap scrolling on mobile safari
      event.preventDefault();
      actionType = type;
      onChange(event);
    },
    onTouchStart: () => {
      actionType = type;
      onTouchStart();
    },
    onTouchEnd,
    onTouchCancel: onTouchEnd
  });

  _react().default.useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    blur: () => inputRef.current.blur()
  }));

  return (0, _jsxRuntime().jsxs)("div", Object.assign({
    className: (0, _clsx().default)(props.className, bem([props.theme])),
    style: props.style
  }, {
    children: [props.showMinus && (0, _jsxRuntime().jsx)("button", Object.assign({
      type: 'button',
      "aria-label": 'minus',
      style: buttonStyle,
      className: (0, _clsx().default)(bem('minus', {
        disabled: minusDisabled
      }))
    }, createListeners('minus'))), props.showInput && (0, _jsxRuntime().jsx)("input", {
      ref: inputRef,
      type: props.integer ? 'tel' : 'text',
      role: 'spinbutton',
      className: (0, _clsx().default)(bem('input')),
      value: inputValue,
      style: inputStyle,
      disabled: props.disabled || props.disableInput,
      readOnly: props.disableInput,
      inputMode: props.integer ? 'numeric' : 'decimal',
      placeholder: props.placeholder,
      "aria-valuemax": +props.max,
      "aria-valuemin": +props.min,
      "aria-valuenow": +inputValue,
      onChange: onInput,
      onBlur: onBlur,
      onFocus: onFocus,
      onMouseDown: onMousedown,
      onClick: props.onClick
    }), props.showPlus && (0, _jsxRuntime().jsx)("button", Object.assign({
      type: 'button',
      "aria-label": 'add',
      style: buttonStyle,
      className: (0, _clsx().default)(bem('plus', {
        disabled: plusDisabled
      }))
    }, createListeners('plus')))]
  }));
});

function convertValueToText(value, digits) {
  if (value === null || value === undefined) return '';

  if (digits !== undefined) {
    return value.toFixed(digits);
  } else {
    return value.toString();
  }
}

function convertTextToValue(text) {
  if (text === '') return null;
  return parseFloat(text);
}

Stepper.defaultProps = {
  theme: 'default',
  max: Number.MAX_VALUE,
  step: 1,
  showPlus: true,
  showMinus: true,
  showInput: true,
  longPress: true
};
var _default = Stepper;
exports.default = _default;