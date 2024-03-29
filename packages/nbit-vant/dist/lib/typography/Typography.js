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

var _utils = require("../utils");

var _Ellipsis = _interopRequireDefault(require("./Ellipsis"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const [bem] = (0, _utils.createNamespace)('typography');
const ellipsisDefaultValue = {
  rows: 1
};

const TypographyBase = _a => {
  var {
    tag = 'div',
    type,
    size = 'md',
    level = 5,
    center,
    ellipsis,
    className,
    children,
    strong,
    underline,
    disabled,
    renderType,
    delete: del
  } = _a,
      props = (0, _tslib().__rest)(_a, ["tag", "type", "size", "level", "center", "ellipsis", "className", "children", "strong", "underline", "disabled", "renderType", "delete"]);
  const ellipsisNumber = (0, _react().useMemo)(() => {
    if (typeof ellipsis === 'boolean' && ellipsis) return 1;
    if (typeof ellipsis === 'number') return ellipsis;
    if ((0, _utils.isObject)(ellipsis) && ellipsis.rows) return ellipsis.rows;
    return 0;
  }, [ellipsis]);
  const isEllipsis = !!ellipsis;
  const isCssEllipsis = (0, _react().useMemo)(() => {
    if (typeof ellipsis === 'boolean') return true;
    if (typeof ellipsis === 'number') return true;

    if ((0, _utils.isObject)(ellipsis)) {
      const p = Object.assign(Object.assign({}, ellipsisDefaultValue), ellipsis);
      if (!p.collapseText && !p.expandText && !p.suffixCount && !p.suffixText && !p.symbol) return true;
    }

    return false;
  }, [ellipsis]);
  const isEnhanceEllipsis = isEllipsis && !isCssEllipsis;
  const TagElement = (0, _react().useMemo)(() => {
    if (renderType === 'title') {
      if (level === 1) return 'h1';
      if (level === 2) return 'h2';
      if (level === 3) return 'h3';
      if (level === 4) return 'h4';
      if (level === 5) return 'h5';
      return 'h6';
    }

    return tag;
  }, [tag]);
  const measureStyle = (0, _react().useMemo)(() => {
    const propsStyle = Object.assign(Object.assign({}, props.style), {
      '--rv-typography-color': props.color
    });

    if (isEllipsis && isCssEllipsis && ellipsisNumber > 1) {
      return Object.assign(Object.assign({}, propsStyle), {
        '--line-clamp': ellipsisNumber
      });
    }

    return propsStyle;
  }, [props.style, isCssEllipsis]);

  const renderContent = () => {
    if (isEnhanceEllipsis) return (0, _jsxRuntime().jsx)(_Ellipsis.default, Object.assign({
      className: (0, _clsx().default)(className, `rv-typography__${renderType}`, bem([type, size, {
        center,
        strong,
        underline,
        disabled,
        delete: del,
        [`l${level}`]: renderType === 'title' && level
      }]))
    }, props, ellipsis, {
      style: measureStyle
    }, {
      children: children
    }));
    return (0, _jsxRuntime().jsx)(TagElement, Object.assign({
      className: (0, _clsx().default)(className, `rv-typography__${renderType}`, bem([type, size, {
        center,
        strong,
        underline,
        disabled,
        delete: del,
        [`l${level}`]: renderType === 'title' && level
      }]), {
        'rv-ellipsis': isEllipsis && isCssEllipsis && ellipsisNumber === 1,
        'rv-typography__ellipsis--multi': isEllipsis && isCssEllipsis && ellipsisNumber > 1
      })
    }, props, {
      style: measureStyle
    }, {
      children: children
    }));
  };

  return renderContent();
};

var _default = TypographyBase;
exports.default = _default;