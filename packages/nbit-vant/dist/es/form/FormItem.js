import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import clsx from 'clsx';
import { Field as RcField } from 'rc-field-form';
import { FieldContext } from 'rc-field-form';
import Field from '../field';
import { toArray } from '../uploader/utils';
import { FormContext } from './FormContext';
import { devWarning } from '../utils/dev-log';
import { createNamespace, pick } from '../utils';
import { isSafeSetRefComponent } from './utils';

function undefinedFallback(...items) {
  let i;

  for (i = 0; i < items.length; i++) {
    if (items[i] !== undefined) break;
  }

  return items[i];
}

const MemoInput = React.memo(_a => {
  var {
    children
  } = _a,
      props = __rest(_a, ["children"]);

  return React.cloneElement(children, props);
}, (prev, next) => prev.value === next.value && prev.update === next.update);
const [bem] = createNamespace('form-item');

const FormItemLayout = props => {
  var _a, _b, _c, _d, _e, _f;

  const {
    meta
  } = props,
        fieldProps = __rest(props, ["meta"]);

  const context = React.useContext(FormContext);
  const layout = (_a = props.layout) !== null && _a !== void 0 ? _a : context.layout;
  const border = (_b = props.border) !== null && _b !== void 0 ? _b : context.border;
  const colon = (_c = props.colon) !== null && _c !== void 0 ? _c : context.colon;
  const showValidateMessage = (_d = props.showValidateMessage) !== null && _d !== void 0 ? _d : context.showValidateMessage;
  const labelAlign = (_e = props.labelAlign) !== null && _e !== void 0 ? _e : context.labelAlign;
  const controlAlign = (_f = props.controlAlign) !== null && _f !== void 0 ? _f : context.controlAlign;
  const error = meta && meta.errors.length > 0;
  const errorMessage = showValidateMessage && error ? meta.errors[0] : null;
  const attrs = Object.assign(Object.assign({}, fieldProps), {
    className: clsx(bem({
      vertical: layout === 'vertical'
    }), props.className),
    colon,
    error: showValidateMessage ? false : error,
    errorMessage,
    labelAlign,
    controlAlign,
    border
  });
  return _jsx(Field, Object.assign({}, attrs, {
    children: props.children
  }));
}; // 移植自antd mobile: https://github.com/ant-design/ant-design-mobile/blob/master/src/components/form/form-item.tsx


const FormItem = props => {
  const {
    // RcFiled props
    name,
    noStyle,
    rules,
    trigger = 'onChange',
    validateTrigger = trigger,
    shouldUpdate,
    dependencies,
    messageVariables,
    // Field props
    label,
    required,
    disabled,
    children,
    onClick
  } = props,
        rcFieldProps = __rest(props // Pick Field props
  , ["name", "noStyle", "rules", "trigger", "validateTrigger", "shouldUpdate", "dependencies", "messageVariables", "label", "required", "disabled", "children", "onClick"]); // Pick Field props


  const fieldProps = pick(props, ['style', 'className', 'tooltip', 'intro', 'colon', 'labelWidth', 'labelAlign', 'labelClass', 'showValidateMessage', 'controlAlign', 'errorMessageAlign', 'border', 'layout', 'isLink', 'size', 'arrowDirection', 'leftIcon', 'rightIcon', 'prefix', 'suffix']);
  const {
    validateTrigger: contextValidateTrigger
  } = React.useContext(FieldContext);
  const mergedValidateTrigger = undefinedFallback(validateTrigger, contextValidateTrigger, trigger);
  const widgetRef = React.useRef(null);
  const updateRef = React.useRef(0);
  updateRef.current += 1;

  function renderLayout(baseChildren, fieldId, meta, isRequired) {
    if (noStyle) {
      return baseChildren;
    }

    return _jsx(FormItemLayout, Object.assign({
      htmlFor: fieldId,
      meta: meta
    }, fieldProps, {
      required: isRequired,
      label: label,
      disabled: disabled,
      onClick: e => onClick === null || onClick === void 0 ? void 0 : onClick(e, widgetRef)
    }, {
      children: baseChildren
    }));
  }

  const isRenderProps = typeof children === 'function';

  if (!name && !isRenderProps && !props.dependencies) {
    return renderLayout(children);
  }

  let variables = {};

  if (typeof label === 'string') {
    variables.label = label;
  }

  if (messageVariables) {
    variables = Object.assign(Object.assign({}, variables), messageVariables);
  }

  return _jsx(RcField, Object.assign({}, rcFieldProps, {
    name: name,
    shouldUpdate: shouldUpdate,
    dependencies: dependencies,
    rules: rules,
    trigger: trigger,
    validateTrigger: mergedValidateTrigger
  }, {
    children: (control, meta, context) => {
      let childNode = null;
      const isRequired = required !== undefined ? required : rules && rules.some(rule => !!(rule && typeof rule === 'object' && rule.required));
      const fieldId = (toArray(name).length && meta ? meta.name : []).join('_');

      if (shouldUpdate && dependencies) {
        devWarning('Form.Item', "`shouldUpdate` and `dependencies` shouldn't be used together.");
      }

      if (isRenderProps) {
        if ((shouldUpdate || dependencies) && !name) {
          childNode = children(context);
        } else {
          if (!(shouldUpdate || dependencies)) {
            devWarning('Form.Item', '`children` of render props only work with `shouldUpdate` or `dependencies`.');
          }

          if (name) {
            devWarning('Form.Item', "Do not use `name` with `children` of render props since it's not a field.");
          }
        } // not render props

      } else if (dependencies && !name) {
        devWarning('Form.Item', 'Must set `name` or use render props when `dependencies` is set.');
      } else if (React.isValidElement(children)) {
        if (children.props.defaultValue) {
          devWarning('Form.Item', '`defaultValue` will not work on controlled Field. You should use `initialValues` of Form instead.');
        }

        const childProps = Object.assign(Object.assign({}, children.props), control);

        if (isSafeSetRefComponent(children)) {
          childProps.ref = instance => {
            const originRef = children.ref;

            if (originRef) {
              if (typeof originRef === 'function') {
                originRef(instance);
              }

              if ('current' in originRef) {
                originRef.current = instance;
              }
            }

            widgetRef.current = instance;
          };
        }

        if (!childProps.id) {
          childProps.id = fieldId;
        }

        if (disabled) {
          childProps.disabled = disabled;
        } // We should keep user origin event handler


        const triggers = new Set([...toArray(trigger), ...toArray(mergedValidateTrigger)]);
        triggers.forEach(eventName => {
          childProps[eventName] = (...args) => {
            var _a, _b, _c;

            (_a = control[eventName]) === null || _a === void 0 ? void 0 : _a.call(control, ...args);
            (_c = (_b = children.props)[eventName]) === null || _c === void 0 ? void 0 : _c.call(_b, ...args);
          };
        });
        childNode = _jsx(MemoInput, Object.assign({
          value: control[props.valuePropName || 'value'],
          update: updateRef.current
        }, {
          children: React.cloneElement(children, childProps)
        }));
      } else {
        if (name) {
          devWarning('Form.Item', '`name` is only used for validate React element. If you are using Form.Item as layout display, please remove `name` instead.');
        }

        childNode = children;
      }

      return renderLayout(childNode, fieldId, meta, isRequired);
    }
  }));
};

export default FormItem;