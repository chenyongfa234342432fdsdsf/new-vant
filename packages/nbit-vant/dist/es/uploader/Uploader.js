import { __awaiter } from "tslib";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import cls from 'clsx';
import { Photograph } from '@react-vant/icons'; // Utils

import { getSizeStyle, extend, createNamespace } from '../utils';
import { isOversize, filterFiles, readFileContent, isImageFile } from './utils';
import { UploaderPreviewItem } from './UploaderPreviewItem'; // Components

import ImagePreview from '../image-preview';
import { useIsomorphicLayoutEffect, usePropsValue } from '../hooks';
const [bem] = createNamespace('uploader');
const Uploader = forwardRef((props, ref) => {
  var _a;

  const [value, setValue] = usePropsValue(Object.assign(Object.assign({}, props), {
    defaultValue: (_a = props.defaultValue) !== null && _a !== void 0 ? _a : []
  }));
  const imagePreview = useRef(null);
  const inputRef = useRef();
  const [tasks, setTasks] = useState([]);
  const idCountRef = useRef(0);
  useIsomorphicLayoutEffect(() => {
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
    return __awaiter(this, void 0, void 0, function* () {
      let transformedFile = file;
      transformedFile = yield beforeRead === null || beforeRead === void 0 ? void 0 : beforeRead(file, fileList);
      return transformedFile;
    });
  }

  const onChange = event => __awaiter(void 0, void 0, void 0, function* () {
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

      if (isOversize(files, maxSize)) {
        const result = filterFiles(files, maxSize);
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
    yield Promise.all(newTasks.map(currentTask => __awaiter(void 0, void 0, void 0, function* () {
      try {
        let result = {};

        if (props.upload) {
          result = yield props.upload(currentTask.file);
        } else {
          const dataUrl = yield readFileContent(currentTask.file, resultType);
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
      const imageFiles = value.filter(v => isImageFile(v));
      const images = imageFiles.map(image => image.url || image.thumbnail).filter(Boolean);
      imagePreview.current = ImagePreview.open(extend({
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

    return _jsx(UploaderPreviewItem, {
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
      onDelete: () => __awaiter(void 0, void 0, void 0, function* () {
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
      return _jsxs(_Fragment, {
        children: [value.map(renderPreviewItem), tasks.map(task => {
          if (task.status === 'failed') return null;
          return _jsx(UploaderPreviewItem, {
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
      return React.cloneElement(props.uploadIcon, {
        className: cls(bem('upload-icon'))
      });
    }

    return null;
  };

  const renderUpload = () => {
    if (props.showUpload && (maxCount === 0 || value.length + tasks.length < maxCount)) {
      const Input = props.readOnly ? null : _jsx("input", {
        ref: inputRef,
        type: 'file',
        className: cls(bem('input')),
        accept: props.accept,
        capture: props.capture,
        multiple: props.multiple,
        disabled: props.disabled,
        onChange: onChange
      });

      if (props.children) {
        return _jsxs("div", Object.assign({
          className: cls(bem('input-wrapper')),
          onClick: props.onClickUpload
        }, {
          children: [props.children, Input]
        }));
      }

      return _jsxs("div", Object.assign({
        className: cls(bem('upload', {
          readOnly: props.readOnly
        })),
        style: getSizeStyle(props.previewSize),
        onClick: props.onClickUpload
      }, {
        children: [renderUploadIcon(), props.uploadText && _jsx("span", Object.assign({
          className: cls(bem('upload-text'))
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

  useImperativeHandle(ref, () => ({
    chooseFile,
    closeImagePreview
  }));
  return _jsx("div", Object.assign({
    className: cls(bem())
  }, {
    children: _jsxs("div", Object.assign({
      className: cls(bem('wrapper', {
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
  uploadIcon: _jsx(Photograph, {})
};
export default Uploader;