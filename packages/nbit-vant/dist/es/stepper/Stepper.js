import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { isNaN } from '../utils/validate/number';
import { addUnit, getSizeStyle, formatNumber, resetScroll, preventDefault, createNamespace } from '../utils';
import { usePropsValue } from '../hooks';
import { bound } from '../utils/bound';
import useRefState from '../hooks/use-ref-state';
const LONG_PRESS_INTERVAL = 100;
const LONG_PRESS_START_TIME = 600; // add num and avoid float number

function add(num1, num2) {
  const cardinal = Math.pow(10, 10);
  return Math.round((num1 + num2) * cardinal) / cardinal;
}

const [bem] = createNamespace('stepper');
const Stepper = React.forwardRef((props, ref) => {
  const {
    defaultValue = 0
  } = props;
  let actionType;
  const inputRef = useRef(null);
  const [value, setValue] = usePropsValue(Object.assign(Object.assign({}, props), {
    defaultValue,
    onChange: v => {
      var _a;

      (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, v, {
        name: props.name
      });
    }
  }));

  const format = v => {
    v = +formatNumber(String(v), !props.integer);
    if (isNaN(v)) return;
    let target = bound(v, props.min, props.max);

    if (props.decimalLength !== undefined) {
      target = parseFloat(target.toFixed(props.decimalLength));
    }

    return target;
  };

  const setValueWithCheck = v => {
    setValue(format(v));
  };

  const [inputValue, setInputValue, inputValueRef] = useRefState(() => convertValueToText(value, props.decimalLength));
  const [hasFocus, setHasFocus] = useState(false);
  useEffect(() => {
    if (!hasFocus) {
      setInputValue(convertValueToText(value, props.decimalLength));
    }
  }, [hasFocus]);
  useEffect(() => {
    if (!hasFocus) {
      setInputValue(convertValueToText(value, props.decimalLength));
    }
  }, [value, props.decimalLength]);
  const minusDisabled = useMemo(() => props.disabled || props.disableMinus || +value <= +props.min, [props.disabled, props.disableMinus, props.min, value]);
  const plusDisabled = useMemo(() => props.disabled || props.disablePlus || +value >= +props.max, [props.disabled, props.disablePlus, props.max, value]);
  const inputStyle = useMemo(() => ({
    width: addUnit(props.inputWidth),
    height: addUnit(props.buttonSize)
  }), [props.inputWidth, props.buttonSize]);
  const buttonStyle = useMemo(() => getSizeStyle(props.buttonSize), [props.buttonSize]);

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
    resetScroll();
  };

  const isLongPress = useRef(false);
  const longPressTimer = useRef(null);

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
        preventDefault(event);
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

  React.useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    blur: () => inputRef.current.blur()
  }));
  return _jsxs("div", Object.assign({
    className: clsx(props.className, bem([props.theme])),
    style: props.style
  }, {
    children: [props.showMinus && _jsx("button", Object.assign({
      type: 'button',
      "aria-label": 'minus',
      style: buttonStyle,
      className: clsx(bem('minus', {
        disabled: minusDisabled
      }))
    }, createListeners('minus'))), props.showInput && _jsx("input", {
      ref: inputRef,
      type: props.integer ? 'tel' : 'text',
      role: 'spinbutton',
      className: clsx(bem('input')),
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
    }), props.showPlus && _jsx("button", Object.assign({
      type: 'button',
      "aria-label": 'add',
      style: buttonStyle,
      className: clsx(bem('plus', {
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
export default Stepper;