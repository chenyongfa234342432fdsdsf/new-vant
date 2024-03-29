"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UploaderPreviewItem = void 0;

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

var _utils = require("./utils");

var _utils2 = require("../utils");

var _image = _interopRequireDefault(require("../image"));

var _loading = _interopRequireDefault(require("../loading"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Utils
// Components
const [bem] = (0, _utils2.createNamespace)('uploader');

const UploaderPreviewItem = props => {
  const {
    onPreview,
    statusTextRender,
    status,
    file,
    url
  } = props;
  const isImage = (0, _react().useMemo)(() => (0, _utils.isImageFile)({
    file,
    url
  }), [file, url]);
  const imageSrc = (0, _react().useMemo)(() => {
    if (isImage) {
      if (url) return url;

      if (file) {
        return URL.createObjectURL(file);
      }
    }

    return '';
  }, [isImage, file, url]);

  const renderMask = () => {
    if (status === 'failed' || status === 'pending') {
      const MaskIcon = status === 'failed' ? (0, _jsxRuntime().jsx)(_icons().Close, {
        className: (0, _clsx().default)(bem('mask-icon'))
      }) : (0, _jsxRuntime().jsx)(_loading.default, {
        className: (0, _clsx().default)(bem('loading'))
      });
      return (0, _jsxRuntime().jsxs)("div", Object.assign({
        className: (0, _clsx().default)(bem('mask'))
      }, {
        children: [MaskIcon, statusTextRender && (0, _jsxRuntime().jsx)("div", Object.assign({
          className: (0, _clsx().default)(bem('mask-message'))
        }, {
          children: statusTextRender(status)
        }))]
      }));
    }

    return null;
  };

  const renderDeleteIcon = () => {
    if (props.deletable) {
      return props.deleteRender ? props.deleteRender(props.onDelete) : (0, _jsxRuntime().jsx)("div", Object.assign({
        className: (0, _clsx().default)(bem('preview-delete')),
        onClick: props.onDelete
      }, {
        children: (0, _jsxRuntime().jsx)(_icons().Cross, {
          className: (0, _clsx().default)(bem('preview-delete-icon'))
        })
      }));
    }

    return null;
  };

  const renderCover = () => {
    var _a;

    return (_a = props.previewCoverRender) === null || _a === void 0 ? void 0 : _a.call(props);
  };

  const renderPreview = () => {
    if (isImage) {
      return (0, _jsxRuntime().jsx)(_image.default, Object.assign({
        fit: props.imageFit,
        src: imageSrc,
        className: (0, _clsx().default)(bem('preview-image')),
        width: props.previewSize,
        height: props.previewSize,
        onClick: onPreview
      }, {
        children: renderCover()
      }));
    }

    return (0, _jsxRuntime().jsxs)("div", Object.assign({
      className: (0, _clsx().default)(bem('file')),
      style: (0, _utils2.getSizeStyle)(props.previewSize)
    }, {
      children: [(0, _jsxRuntime().jsx)(_icons().Description, {
        className: (0, _clsx().default)(bem('file-icon'))
      }), (0, _jsxRuntime().jsx)("div", Object.assign({
        className: (0, _clsx().default)(bem('file-name'), 'rv-ellipsis')
      }, {
        children: file ? file.name : url
      })), renderCover()]
    }));
  };

  return (0, _jsxRuntime().jsxs)("div", Object.assign({
    className: (0, _clsx().default)(bem('preview')),
    onClick: props.onClick
  }, {
    children: [renderPreview(), renderMask(), renderDeleteIcon()]
  }));
};

exports.UploaderPreviewItem = UploaderPreviewItem;