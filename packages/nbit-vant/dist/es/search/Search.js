import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react';
import clsx from 'clsx';
import { Search as SearchIco } from '@react-vant/icons';
import { createNamespace, preventDefault } from '../utils'; // Components

import Field from '../field';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';
const [bem] = createNamespace('search');
const Search = forwardRef((props, ref) => {
  const {
    locale
  } = useContext(ConfigProviderContext);
  const filedRef = useRef();
  const innerEffect = useRef(false);
  const [value, setValue] = useState(() => props.value);

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
      preventDefault(event.nativeEvent);
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
      return _jsx("div", Object.assign({
        className: clsx(bem('label'))
      }, {
        children: props.label
      }));
    }

    return null;
  };

  const renderAction = () => {
    if (props.showAction) {
      return _jsx("div", Object.assign({
        className: clsx(bem('action')),
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
    return _jsx(Field, Object.assign({
      ref: filedRef,
      className: clsx(bem('field')),
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

  useEffect(() => {
    if (innerEffect.current) {
      innerEffect.current = false;
      return;
    }

    setValue(props.value);
  }, [props.value]);
  useImperativeHandle(ref, () => ({
    focus,
    blur
  }));
  return _jsxs("div", Object.assign({
    className: clsx(props.className, bem({
      'show-action': props.showAction
    })),
    style: Object.assign(Object.assign({}, props.style), {
      background: props.background
    })
  }, {
    children: [_jsxs("div", Object.assign({
      className: clsx(bem('content', props.shape))
    }, {
      children: [renderLabel(), renderField()]
    })), renderAction()]
  }));
});
Search.defaultProps = {
  shape: 'square',
  leftIcon: _jsx(SearchIco, {})
};
export default Search;