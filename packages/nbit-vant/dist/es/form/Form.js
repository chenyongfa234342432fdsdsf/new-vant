import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import clsx from 'clsx';
import RcForm from 'rc-field-form';
import { FormContext } from './FormContext';
import { createNamespace } from '../utils';
const [bem] = createNamespace('form');
const Form = forwardRef((props, ref) => {
  const {
    className,
    style,
    layout,
    footer,
    children,
    colon,
    border,
    labelAlign,
    controlAlign,
    showValidateMessage
  } = props,
        formProps = __rest(props, ["className", "style", "layout", "footer", "children", "colon", "border", "labelAlign", "controlAlign", "showValidateMessage"]);

  return _jsxs(RcForm, Object.assign({
    className: clsx(bem(), className),
    style: style,
    ref: ref
  }, formProps, {
    children: [_jsx(FormContext.Provider, Object.assign({
      value: {
        layout,
        colon,
        border,
        showValidateMessage,
        controlAlign,
        labelAlign
      }
    }, {
      children: children
    })), footer && _jsx("div", Object.assign({
      className: clsx(bem('footer'))
    }, {
      children: footer
    }))]
  }));
});
Form.defaultProps = {
  showValidateMessage: true
};
export default Form;