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

var _utils = require("../utils");

var _hooks = require("../hooks");

var _ConfigProviderContext = _interopRequireDefault(require("../config-provider/ConfigProviderContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const DEFAULT_DURATION = 200; // 惯性滑动思路:
// 在手指离开屏幕时，如果和上一次 move 时的间隔小于 `MOMENTUM_LIMIT_TIME` 且 move
// 距离大于 `MOMENTUM_LIMIT_DISTANCE` 时，执行惯性滑动

const MOMENTUM_LIMIT_TIME = 300;
const MOMENTUM_LIMIT_DISTANCE = 15;

function getElementTranslateY(element) {
  const style = window.getComputedStyle(element);
  const transform = style.transform || style.webkitTransform;
  const translateY = transform.slice(7, transform.length - 1).split(', ')[5];
  return Number(translateY);
}

const [bem] = (0, _utils.createNamespace)('picker-column');
const PickerColumn = (0, _react().memo)((0, _react().forwardRef)((props, ref) => {
  const {
    locale
  } = (0, _react().useContext)(_ConfigProviderContext.default);
  const {
    valueKey,
    textKey,
    itemHeight,
    visibleItemCount,
    placeholder,
    value
  } = props;
  const options = (0, _react().useMemo)(() => {
    if (Array.isArray(props.options) && !props.options.length) return [];

    if (placeholder) {
      const DEFAULT_OPTION = {
        [valueKey]: undefined,
        [textKey]: placeholder === true ? locale.vanPicker.select : placeholder
      };
      return [DEFAULT_OPTION, ...props.options];
    }

    return props.options;
  }, [props.options]);
  const wrapper = (0, _react().useRef)(null);
  const moving = (0, _react().useRef)(false);
  const startOffset = (0, _react().useRef)(0);
  const transitionEndTrigger = (0, _react().useRef)(null);
  const touchStartTime = (0, _react().useRef)(0);
  const momentumOffset = (0, _react().useRef)(0);
  const [state, updateState, stateRef] = (0, _hooks.useSetState)({
    offset: 0,
    duration: 0
  });
  const touch = (0, _hooks.useTouch)();
  const baseOffset = (0, _react().useMemo)(() => {
    // 默认转入第一个选项的位置
    return itemHeight * (+visibleItemCount - 1) / 2;
  }, [itemHeight, visibleItemCount]);

  const adjustIndex = index => {
    var _a, _b;

    index = (0, _utils.range)(index, 0, options.length);

    for (let i = index; i < options.length; i += 1) {
      if (!((_a = options[i]) === null || _a === void 0 ? void 0 : _a.disabled)) return i;
    }

    for (let i = index - 1; i >= 0; i -= 1) {
      if (!((_b = options[i]) === null || _b === void 0 ? void 0 : _b.disabled)) return i;
    }

    return null;
  };

  const onSelect = val => {
    props.onSelect(val, props.index);
  };

  const setIndex = index => {
    index = adjustIndex(index) || 0;
    const offset = -index * props.itemHeight;

    const trigger = () => {
      if (options[index][valueKey] !== value) {
        onSelect(options[index]);
      }
    }; // trigger the change event after transitionend when moving


    if (moving.current && offset !== stateRef.current.offset) {
      transitionEndTrigger.current = trigger;
    } else {
      trigger();
    }

    updateState({
      offset
    });
  };

  const animate = index => {
    index = adjustIndex(index) || 0;
    const offset = -index * props.itemHeight;
    updateState({
      offset
    });
  };

  (0, _hooks.useIsomorphicLayoutEffect)(() => {
    if (options.length === 0) {
      if (value !== undefined) {
        onSelect(undefined);
      }
    } else {
      let targetIndex = options.findIndex(item => item[valueKey] === value);

      if (targetIndex < 0) {
        targetIndex = 0;
        onSelect(options[0]);
      }

      animate(targetIndex);
    }
  }, [value, JSON.stringify(options)]);

  const onClickItem = index => {
    if (moving.current || props.readOnly) {
      return;
    }

    transitionEndTrigger.current = null;
    updateState({
      duration: DEFAULT_DURATION
    });
    setIndex(index);
  };

  const getIndexByOffset = offset => (0, _utils.range)(Math.round(-offset / props.itemHeight), 0, options.length - 1);

  const momentum = (distance, _duration) => {
    const speed = Math.abs(distance / _duration);
    distance = stateRef.current.offset + speed / 0.003 * (distance < 0 ? -1 : 1);
    const index = getIndexByOffset(distance);
    updateState({
      duration: +props.swipeDuration
    });
    setIndex(index);
  };

  const stopMomentum = () => {
    moving.current = false;
    updateState({
      duration: 0
    });

    if (transitionEndTrigger.current) {
      transitionEndTrigger.current();
      transitionEndTrigger.current = null;
    }
  };

  const onTouchStart = event => {
    if (props.readOnly) {
      return;
    }

    touch.start(event);
    let {
      offset
    } = state;

    if (moving.current) {
      const translateY = getElementTranslateY(wrapper.current);
      offset = Math.min(0, translateY - baseOffset);
      startOffset.current = offset;
    } else {
      startOffset.current = offset;
    }

    updateState({
      duration: 0,
      offset
    });
    touchStartTime.current = Date.now();
    momentumOffset.current = startOffset.current;
    transitionEndTrigger.current = null;
  };

  const onTouchMove = event => {
    if (props.readOnly) {
      return;
    }

    touch.move(event);

    if (touch.isVertical()) {
      moving.current = true;
    }

    const offset = (0, _utils.range)(startOffset.current + touch.deltaY.current, -(options.length * props.itemHeight), props.itemHeight);
    updateState({
      offset
    });
    const now = Date.now();

    if (now - touchStartTime.current > MOMENTUM_LIMIT_TIME) {
      touchStartTime.current = now;
      momentumOffset.current = offset;
    }
  };

  const onTouchEnd = () => {
    if (props.readOnly || !moving.current) {
      return;
    }

    const distance = stateRef.current.offset - momentumOffset.current;
    const duration = Date.now() - touchStartTime.current;
    const allowMomentum = duration < MOMENTUM_LIMIT_TIME && Math.abs(distance) > MOMENTUM_LIMIT_DISTANCE;

    if (allowMomentum) {
      momentum(distance, duration);
      return;
    }

    const index = getIndexByOffset(stateRef.current.offset);
    updateState({
      duration: DEFAULT_DURATION
    });
    setIndex(index); // compatible with desktop scenario
    // use setTimeout to skip the click event triggered after touchstart

    setTimeout(() => {
      moving.current = false;
    }, 0);
  };

  const renderOptions = () => {
    const optionStyle = {
      height: `${props.itemHeight}px`
    };
    return options.map((option, index) => {
      const {
        disabled
      } = option;
      const data = {
        role: 'button',
        style: optionStyle,
        tabIndex: disabled ? -1 : 0,
        className: (0, _clsx().default)(bem('item', {
          disabled,
          selected: option[valueKey] === value
        })),
        onClick: () => {
          onClickItem(index);
        }
      };
      const childData = {
        className: 'rv-ellipsis',
        children: option[textKey]
      };
      return (0, _react().createElement)("li", Object.assign({}, data, {
        key: index
      }), props.optionRender ? props.optionRender(option) : (0, _jsxRuntime().jsx)("div", Object.assign({}, childData)));
    });
  };

  (0, _react().useImperativeHandle)(ref, () => ({
    stopMomentum
  }));
  return (0, _jsxRuntime().jsx)("div", Object.assign({
    className: (0, _clsx().default)(bem(), props.className),
    onTouchStart: onTouchStart,
    onTouchMove: onTouchMove,
    onTouchEnd: onTouchEnd,
    onTouchCancel: onTouchEnd
  }, {
    children: (0, _jsxRuntime().jsx)("ul", Object.assign({
      ref: wrapper,
      style: {
        transform: `translate3d(0, ${state.offset + baseOffset}px, 0)`,
        transitionDuration: `${state.duration}ms`,
        transitionProperty: state.duration ? 'all' : 'none'
      },
      className: (0, _clsx().default)(bem('wrapper')),
      onTransitionEnd: stopMomentum
    }, {
      children: renderOptions()
    }))
  }));
}), (prev, next) => {
  if (prev.index !== next.index) return false;

  if (prev.value !== next.value) {
    return false;
  }

  if (prev.onSelect !== next.onSelect) return false;

  if (JSON.stringify(prev.options) !== JSON.stringify(next.options)) {
    return false;
  }

  return true;
});
var _default = PickerColumn;
exports.default = _default;