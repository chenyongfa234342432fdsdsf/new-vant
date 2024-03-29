import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import cls from 'clsx';
import { Close, Cross, Description } from '@react-vant/icons'; // Utils

import { isImageFile } from './utils';
import { getSizeStyle, createNamespace } from '../utils'; // Components

import Image from '../image';
import Loading from '../loading';
const [bem] = createNamespace('uploader');
export const UploaderPreviewItem = props => {
  const {
    onPreview,
    statusTextRender,
    status,
    file,
    url
  } = props;
  const isImage = useMemo(() => isImageFile({
    file,
    url
  }), [file, url]);
  const imageSrc = useMemo(() => {
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
      const MaskIcon = status === 'failed' ? _jsx(Close, {
        className: cls(bem('mask-icon'))
      }) : _jsx(Loading, {
        className: cls(bem('loading'))
      });
      return _jsxs("div", Object.assign({
        className: cls(bem('mask'))
      }, {
        children: [MaskIcon, statusTextRender && _jsx("div", Object.assign({
          className: cls(bem('mask-message'))
        }, {
          children: statusTextRender(status)
        }))]
      }));
    }

    return null;
  };

  const renderDeleteIcon = () => {
    if (props.deletable) {
      return props.deleteRender ? props.deleteRender(props.onDelete) : _jsx("div", Object.assign({
        className: cls(bem('preview-delete')),
        onClick: props.onDelete
      }, {
        children: _jsx(Cross, {
          className: cls(bem('preview-delete-icon'))
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
      return _jsx(Image, Object.assign({
        fit: props.imageFit,
        src: imageSrc,
        className: cls(bem('preview-image')),
        width: props.previewSize,
        height: props.previewSize,
        onClick: onPreview
      }, {
        children: renderCover()
      }));
    }

    return _jsxs("div", Object.assign({
      className: cls(bem('file')),
      style: getSizeStyle(props.previewSize)
    }, {
      children: [_jsx(Description, {
        className: cls(bem('file-icon'))
      }), _jsx("div", Object.assign({
        className: cls(bem('file-name'), 'rv-ellipsis')
      }, {
        children: file ? file.name : url
      })), renderCover()]
    }));
  };

  return _jsxs("div", Object.assign({
    className: cls(bem('preview')),
    onClick: props.onClick
  }, {
    children: [renderPreview(), renderMask(), renderDeleteIcon()]
  }));
};