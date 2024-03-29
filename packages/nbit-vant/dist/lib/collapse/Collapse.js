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

var _CollapseContext = _interopRequireDefault(require("./CollapseContext"));

var _constant = require("../utils/constant");

var _hooks = require("../hooks");

var _utils = require("../utils");

var _devLog = require("../utils/dev-log");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function validateModelValue(modelValue, accordion) {
  if (accordion && Array.isArray(modelValue)) {
    (0, _devLog.devWarning)('Collapse', '"value" should not be Array in accordion mode');
    return false;
  }

  if (!accordion && !Array.isArray(modelValue)) {
    (0, _devLog.devWarning)('Collapse', '"value" should be Array in non-accordion mode');
    return false;
  }

  return true;
}

const [bem] = (0, _utils.createNamespace)('collapse');

const Collapse = props => {
  const {
    accordion
  } = props;
  const initExpandedDefault = accordion ? '' : [];
  const {
    initExpanded = initExpandedDefault
  } = props;
  const innerEffect = (0, _react().useRef)(false);
  const [expanded, setExpanded] = (0, _react().useState)(() => {
    var _a;

    return (_a = props.value) !== null && _a !== void 0 ? _a : initExpanded;
  });

  const updateName = name => {
    var _a;

    innerEffect.current = true;
    setExpanded(name);
    (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, name);
  };

  const toggle = (name, isExpanded) => {
    if (accordion) {
      if (name === expanded) {
        name = '';
      }
    } else if (isExpanded) {
      name = expanded.concat(name);
    } else {
      name = expanded.filter(activeName => activeName !== name);
    }

    updateName(name);
  };

  const isExpanded = name => {
    if (process.env.NODE_ENV !== 'production' && !validateModelValue(expanded, accordion)) {
      return false;
    }

    return accordion ? expanded === name : expanded === null || expanded === void 0 ? void 0 : expanded.includes(name);
  };

  (0, _hooks.useUpdateEffect)(() => {
    var _a;

    if (innerEffect.current) {
      innerEffect.current = false;
      return;
    }

    setExpanded((_a = props.value) !== null && _a !== void 0 ? _a : initExpanded);
  }, [props.value]);
  return (0, _jsxRuntime().jsx)(_CollapseContext.default.Provider, Object.assign({
    value: {
      isExpanded,
      toggle
    }
  }, {
    children: (0, _jsxRuntime().jsx)("div", Object.assign({
      style: props.style,
      ref: props.nativeRef,
      className: (0, _clsx().default)(bem(), props.className, {
        [_constant.BORDER_TOP_BOTTOM]: props.border
      })
    }, {
      children: _react().default.Children.toArray(props.children).filter(Boolean).map((child, index) => _react().default.cloneElement(child, {
        index
      }))
    }))
  }));
};

Collapse.defaultProps = {
  border: true
};
var _default = Collapse;
exports.default = _default;