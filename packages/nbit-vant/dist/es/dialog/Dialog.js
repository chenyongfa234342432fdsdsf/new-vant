import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from 'react';
import clsx from 'clsx';
import Popup from '../popup';
import Button from '../button';
import ActionBar from '../action-bar';
import { addUnit, createNamespace, noop } from '../utils'; // import { BORDER_TOP, BORDER_LEFT } from '../utils/constant'

import ConfigProviderContext from '../config-provider/ConfigProviderContext';
const [bem] = createNamespace('dialog');

const Dialog = props => {
  const {
    locale
  } = useContext(ConfigProviderContext);

  const {
    width,
    title,
    theme,
    visible,
    message,
    className,
    messageAlign,
    closeOnClickOverlay,
    onClickCloseIcon
  } = props,
        others = __rest(props, ["width", "title", "theme", "visible", "message", "className", "messageAlign", "closeOnClickOverlay", "onClickCloseIcon"]);

  const renderTitle = () => {
    if (props.title) {
      return _jsx("div", Object.assign({
        className: clsx(bem('header', {
          isolated: !props.message && !props.children
        }))
      }, {
        children: title
      }));
    }

    return null;
  };

  const renderContent = () => {
    if (props.children) {
      return _jsx("div", Object.assign({
        className: clsx(bem('content'))
      }, {
        children: props.children
      }));
    }

    if (message) {
      return _jsx("div", Object.assign({
        className: clsx(bem('content', {
          isolated: !title
        }))
      }, {
        children: _jsx("div", Object.assign({
          className: clsx(bem('message', {
            'has-title': title,
            [messageAlign]: messageAlign
          }))
        }, {
          children: message
        }))
      }));
    }

    return null;
  };

  const renderButtons = () => {
    var _a, _b, _c, _d, _e, _f;

    return _jsxs("div", Object.assign({
      className: clsx(bem('footer'))
    }, {
      children: [props.showCancelButton && _jsx(Button, {
        size: 'large',
        text: props.cancelButtonText || locale.cancel,
        className: clsx(bem('cancel')),
        style: {
          color: props.cancelButtonColor
        },
        loading: (_a = props.cancelProps) === null || _a === void 0 ? void 0 : _a.loading,
        disabled: (_b = props.cancelProps) === null || _b === void 0 ? void 0 : _b.disabled,
        onClick: ((_c = props.cancelProps) === null || _c === void 0 ? void 0 : _c.loading) ? noop : props.onCancel
      }), props.showConfirmButton && _jsx(Button, {
        size: 'large',
        text: props.confirmButtonText || locale.confirm,
        className: clsx(bem('confirm')),
        round: theme === 'round-button',
        style: {
          color: props.confirmButtonColor
        },
        loading: (_d = props.confirmProps) === null || _d === void 0 ? void 0 : _d.loading,
        disabled: (_e = props.confirmProps) === null || _e === void 0 ? void 0 : _e.disabled,
        onClick: ((_f = props.confirmProps) === null || _f === void 0 ? void 0 : _f.loading) ? noop : props.onConfirm
      })]
    }));
  };

  const renderRoundButtons = () => {
    var _a, _b, _c, _d, _e, _f;

    return _jsxs(ActionBar, Object.assign({
      className: clsx(bem('footer'))
    }, {
      children: [props.showCancelButton && _jsx(ActionBar.Button, {
        type: 'warning',
        text: props.cancelButtonText || locale.cancel,
        className: clsx(bem('cancel')),
        color: props.cancelButtonColor,
        loading: (_a = props.cancelProps) === null || _a === void 0 ? void 0 : _a.loading,
        disabled: (_b = props.cancelProps) === null || _b === void 0 ? void 0 : _b.disabled,
        onClick: ((_c = props.cancelProps) === null || _c === void 0 ? void 0 : _c.loading) ? noop : props.onCancel
      }), props.showConfirmButton && _jsx(ActionBar.Button, {
        type: 'danger',
        text: props.confirmButtonText || locale.confirm,
        className: clsx(bem('confirm')),
        color: props.confirmButtonColor,
        loading: (_d = props.confirmProps) === null || _d === void 0 ? void 0 : _d.loading,
        disabled: (_e = props.confirmProps) === null || _e === void 0 ? void 0 : _e.disabled,
        onClick: ((_f = props.confirmProps) === null || _f === void 0 ? void 0 : _f.loading) ? noop : props.onConfirm
      })]
    }));
  };

  const renderFooter = () => {
    if (props.footer) return props.footer;
    return props.theme === 'round-button' ? renderRoundButtons() : renderButtons();
  };

  return _jsxs(Popup, Object.assign({}, others, {
    visible: visible,
    className: clsx(bem([theme]), className),
    style: {
      width: addUnit(width)
    },
    "aria-labelledby": title || message,
    closeOnClickOverlay: closeOnClickOverlay,
    onClickCloseIcon: onClickCloseIcon,
    onClose: props.onClose,
    onClosed: props.onClosed
  }, {
    children: [renderTitle(), renderContent(), renderFooter()]
  }));
};

Dialog.defaultProps = {
  transition: 'rv-dialog-bounce',
  showConfirmButton: true,
  closeOnPopstate: true
};
export default Dialog;