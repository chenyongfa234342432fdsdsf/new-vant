"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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

function _icons() {
  const data = require("@react-vant/icons");

  _icons = function () {
    return data;
  };

  return data;
}

var _utils = require("../utils");

var _utils2 = require("./utils");

var _UploaderPreviewItem = require("./UploaderPreviewItem");

var _imagePreview = _interopRequireDefault(require("../image-preview"));

var _hooks = require("../hooks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Utils
// Components
const [bem] = (0, _utils.createNamespace)('uploader');
const Uploader = (0, _react().forwardRef)((props, ref) => {
  var _a;

  const [value, setValue] = (0, _hooks.usePropsValue)(Object.assign(Object.assign({}, props), {
    defaultValue: (_a = props.defaultValue) !== null && _a !== void 0 ? _a : []
  }));
  const imagePreview = (0, _react().useRef)(null);
  const inputRef = (0, _react().useRef)();
  const [tasks, setTasks] = (0, _react().useState)([]);
  const idCountRef = (0, _react().useRef)(0);
  (0, _hooks.useIsomorphicLayoutEffect)(() => {
    if (!Array.isArray(value)) return;
    setTasks(prev => prev.filter(task => {
      if (task.url === undefined) return true;
      return !value.some(fileItem => fileItem.url === task.url);
    }));
  }, [value]);
  const {
    maxCount,
    maxSize,
    resultType,
    beforeRead
  } = props;

  function processFile(file, fileList) {
    return (0, _tslib().__awaiter)(this, void 0, void 0, function* () {
      let transformedFile = file;
      transformedFile = yield beforeRead === null || beforeRead === void 0 ? void 0 : beforeRead(file, fileList);
      return transformedFile;
    });
  }

  const onChange = event => (0, _tslib().__awaiter)(void 0, void 0, void 0, function* () {
    var _b;

    event.persist();
    const {
      files: rawFiles
    } = event.target;
    if (!rawFiles) return;
    let files = [].slice.call(rawFiles);
    event.target.value = '';

    if (props.disabled) {
      return;
    }

    if (props.beforeRead) {
      const postFiles = files.map(file => {
        return processFile(file, files);
      });
      yield Promise.all(postFiles).then(filesList => {
        files = filesList.filter(Boolean);
      });
    }

    if (files.length === 0) {
      return;
    }

    if (maxCount > 0) {
      const exceed = value.length + files.length - maxCount;

      if (exceed > 0) {
        files = files.slice(0, files.length - exceed);
      }

      if ((0, _utils2.isOversize)(files, maxSize)) {
        const result = (0, _utils2.filterFiles)(files, maxSize);
        (_b = props.onOversize) === null || _b === void 0 ? void 0 : _b.call(props, result.invalid);
        return;
      }
    }

    const newTasks = files.map(file => ({
      id: idCountRef.current++,
      status: 'pending',
      file
    }));
    setTasks(prev => [...prev, ...newTasks]);
    yield Promise.all(newTasks.map(currentTask => (0, _tslib().__awaiter)(void 0, void 0, void 0, function* () {
      try {
        let result = {};

        if (props.upload) {
          result = yield props.upload(currentTask.file);
        } else {
          const dataUrl = yield (0, _utils2.readFileContent)(currentTask.file, resultType);
          result.url = dataUrl;
          result.file = currentTask.file;
          result.key = currentTask.id;
        }

        setTasks(prev => {
          return prev.map(task => {
            if (task.id === currentTask.id) {
              return Object.assign(Object.assign({}, task), {
                url: result.url
              });
            }

            return task;
          });
        });
        setValue(prev => {
          const newVal = Object.assign(Object.assign({}, result), {
            file: currentTask.file
          });
          return [...prev, newVal];
        });
      } catch (e) {
        setTasks(prev => {
          return prev.map(task => {
            if (task.id === currentTask.id) {
              return Object.assign(Object.assign({}, task), {
                status: 'failed'
              });
            }

            return task;
          });
        });
        throw e;
      }
    }))).catch(error => console.error(error));
  });

  const previewImage = item => {
    if (props.previewFullImage) {
      const imageFiles = value.filter(v => (0, _utils2.isImageFile)(v));
      const images = imageFiles.map(image => image.url || image.thumbnail).filter(Boolean);
      imagePreview.current = _imagePreview.default.open((0, _utils.extend)({
        images,
        startPosition: imageFiles.indexOf(item),
        onClose: props.onClosePreview
      }, props.previewOptions));
    }
  };

  const closeImagePreview = () => {
    if (imagePreview.current) {
      imagePreview.current.close();
    }
  };

  const renderPreviewItem = (item, index) => {
    var _a, _b;

    return (0, _jsxRuntime().jsx)(_UploaderPreviewItem.UploaderPreviewItem, {
      file: item.file,
      name: props.name,
      url: (_a = item.thumbnail) !== null && _a !== void 0 ? _a : item.url,
      imageFit: props.imageFit,
      deletable: props.deletable,
      previewSize: props.previewSize,
      deleteRender: props.deleteRender,
      previewCoverRender: () => {
        var _a;

        return (_a = props.previewCoverRender) === null || _a === void 0 ? void 0 : _a.call(props, item);
      },
      onClick: () => {
        var _a;

        return (_a = props.onClickPreview) === null || _a === void 0 ? void 0 : _a.call(props, item, index);
      },
      onDelete: () => (0, _tslib().__awaiter)(void 0, void 0, void 0, function* () {
        var _c;

        const canDelete = yield (_c = props.onDelete) === null || _c === void 0 ? void 0 : _c.call(props, item);
        if (canDelete === false) return;
        setValue(value.filter((_, i) => i !== index));
      }),
      onPreview: () => previewImage(item)
    }, (_b = item.key) !== null && _b !== void 0 ? _b : `-${index}`);
  };

  const renderPreviewList = () => {
    if (props.previewImage) {
      return (0, _jsxRuntime().jsxs)(_jsxRuntime().Fragment, {
        children: [value.map(renderPreviewItem), tasks.map(task => {
          if (task.status === 'failed') return null;
          return (0, _jsxRuntime().jsx)(_UploaderPreviewItem.UploaderPreviewItem, {
            file: task.file,
            status: task.status,
            statusTextRender: props.statusTextRender,
            deletable: task.status !== 'pending',
            deleteRender: props.deleteRender,
            imageFit: props.imageFit,
            onDelete: () => {
              setTasks(tasks.filter(x => x.id !== task.id));
            }
          }, task.id);
        })]
      });
    }

    return null;
  };

  const renderUploadIcon = () => {
    if (props.uploadIcon) {
      return _react().default.cloneElement(props.uploadIcon, {
        className: (0, _clsx().default)(bem('upload-icon'))
      });
    }

    return null;
  };

  const renderUpload = () => {
    if (props.showUpload && (maxCount === 0 || value.length + tasks.length < maxCount)) {
      const Input = props.readOnly ? null : (0, _jsxRuntime().jsx)("input", {
        ref: inputRef,
        type: 'file',
        className: (0, _clsx().default)(bem('input')),
        accept: props.accept,
        capture: props.capture,
        multiple: props.multiple,
        disabled: props.disabled,
        onChange: onChange
      });

      if (props.children) {
        return (0, _jsxRuntime().jsxs)("div", Object.assign({
          className: (0, _clsx().default)(bem('input-wrapper')),
          onClick: props.onClickUpload
        }, {
          children: [props.children, Input]
        }));
      }

      return (0, _jsxRuntime().jsxs)("div", Object.assign({
        className: (0, _clsx().default)(bem('upload', {
          readOnly: props.readOnly
        })),
        style: (0, _utils.getSizeStyle)(props.previewSize),
        onClick: props.onClickUpload
      }, {
        children: [renderUploadIcon(), props.uploadText && (0, _jsxRuntime().jsx)("span", Object.assign({
          className: (0, _clsx().default)(bem('upload-text'))
        }, {
          children: props.uploadText
        })), Input]
      }));
    }

    return null;
  };

  const chooseFile = () => {
    if (inputRef.current && !props.disabled) {
      inputRef.current.click();
    }
  };

  (0, _react().useImperativeHandle)(ref, () => ({
    chooseFile,
    closeImagePreview
  }));
  return (0, _jsxRuntime().jsx)("div", Object.assign({
    className: (0, _clsx().default)(bem())
  }, {
    children: (0, _jsxRuntime().jsxs)("div", Object.assign({
      className: (0, _clsx().default)(bem('wrapper', {
        disabled: props.disabled
      }))
    }, {
      children: [renderPreviewList(), renderUpload()]
    }))
  }));
});
Uploader.defaultProps = {
  maxSize: Number.MAX_VALUE,
  maxCount: Number.MAX_VALUE,
  deletable: true,
  showUpload: true,
  previewImage: true,
  previewFullImage: true,
  name: '',
  accept: 'image/*',
  imageFit: 'cover',
  resultType: 'dataUrl',
  uploadIcon: (0, _jsxRuntime().jsx)(_icons().Photograph, {})
};
var _default = Uploader;
exports.default = _default;