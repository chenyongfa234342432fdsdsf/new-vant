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

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const [bem] = (0, _utils.createNamespace)('sku-row');

const SkuRowPropItem = props => {
  var _a;

  const choosed = (0, _react().useMemo)(() => {
    const {
      selectedProp,
      skuKeyStr,
      skuValue
    } = props;

    if (selectedProp && selectedProp[skuKeyStr]) {
      return selectedProp[skuKeyStr].indexOf(skuValue.id) > -1;
    }

    return false;
  }, [JSON.stringify(props.selectedProp), JSON.stringify(props.skuValue), props.skuKeyStr]);

  const onSelect = () => {
    props.onSkuPropSelected(Object.assign(Object.assign({}, props.skuValue), {
      skuKeyStr: props.skuKeyStr,
      multiple: props.multiple
    }));
  };

  return (0, _jsxRuntime().jsx)("span", Object.assign({
    className: (0, _clsx().default)(bem('item', {
      active: choosed
    })),
    onClick: onSelect
  }, {
    children: (0, _jsxRuntime().jsx)("span", Object.assign({
      className: (0, _clsx().default)(bem('item-name'))
    }, {
      children: (_a = props.skuValue) === null || _a === void 0 ? void 0 : _a.name
    }))
  }));
};

var _default = SkuRowPropItem;
exports.default = _default;