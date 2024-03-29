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
  const data = _interopRequireDefault(require("react"));

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

function _rcFieldForm() {
  const data = require("rc-field-form");

  _rcFieldForm = function () {
    return data;
  };

  return data;
}

var _field = _interopRequireDefault(require("../field"));

var _utils = require("../uploader/utils");

var _FormContext = require("./FormContext");

var _devLog = require("../utils/dev-log");

var _utils2 = require("../utils");

var _utils3 = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function undefinedFallback(...items) {
  let i;

  for (i = 0; i < items.length; i++) {
    if (items[i] !== undefined) break;
  }

  return items[i];
}

const MemoInput = _react().default.memo(_a => {
  var {
    children
  } = _a,
      props = (0, _tslib().__rest)(_a, ["children"]);
  return _react().default.cloneElement(children, props);
}, (prev, next) => prev.value === next.value && prev.update === next.update);

const [bem] = (0, _utils2.createNamespace)('form-item');

const FormItemLayout = props => {
  var _a, _b, _c, _d, _e, _f;

  const {
    meta
  } = props,
        fieldProps = (0, _tslib().__rest)(props, ["meta"]);

  const context = _react().default.useContext(_FormContext.FormContext);

  const layout = (_a = props.layout) !== null && _a !== void 0 ? _a : context.layout;
  const border = (_b = props.border) !== null && _b !== void 0 ? _b : context.border;
  const colon = (_c = props.colon) !== null && _c !== void 0 ? _c : context.colon;
  const showValidateMessage = (_d = props.showValidateMessage) !== null && _d !== void 0 ? _d : context.showValidateMessage;
  const labelAlign = (_e = props.labelAlign) !== null && _e !== void 0 ? _e : context.labelAlign;
  const controlAlign = (_f = props.controlAlign) !== null && _f !== void 0 ? _f : context.controlAlign;
  const error = meta && meta.errors.length > 0;
  const errorMessage = showValidateMessage && error ? meta.errors[0] : null;
  const attrs = Object.assign(Object.assign({}, fieldProps), {
    className: (0, _clsx().default)(bem({
      vertical: layout === 'vertical'
    }), props.className),
    colon,
    error: showValidateMessage ? false : error,
    errorMessage,
    labelAlign,
    controlAlign,
    border
  });
  return (0, _jsxRuntime().jsx)(_field.default, Object.assign({}, attrs, {
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
        rcFieldProps = (0, _tslib().__rest)(props // Pick Field props
  , ["name", "noStyle", "rules", "trigger", "validateTrigger", "shouldUpdate", "dependencies", "messageVariables", "label", "required", "disabled", "children", "onClick"]); // Pick Field props

  const fieldProps = (0, _utils2.pick)(props, ['style', 'className', 'tooltip', 'intro', 'colon', 'labelWidth', 'labelAlign', 'labelClass', 'showValidateMessage', 'controlAlign', 'errorMessageAlign', 'border', 'layout', 'isLink', 'size', 'arrowDirection', 'leftIcon', 'rightIcon', 'prefix', 'suffix']);

  const {
    validateTrigger: contextValidateTrigger
  } = _react().default.useContext(_rcFieldForm().FieldContext);

  const mergedValidateTrigger = undefinedFallback(validateTrigger, contextValidateTrigger, trigger);

  const widgetRef = _react().default.useRef(null);

  const updateRef = _react().default.useRef(0);

  updateRef.current += 1;

  function renderLayout(baseChildren, fieldId, meta, isRequired) {
    if (noStyle) {
      return baseChildren;
    }

    return (0, _jsxRuntime().jsx)(FormItemLayout, Object.assign({
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

  return (0, _jsxRuntime().jsx)(_rcFieldForm().Field, Object.assign({}, rcFieldProps, {
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
      const fieldId = ((0, _utils.toArray)(name).length && meta ? meta.name : []).join('_');

      if (shouldUpdate && dependencies) {
        (0, _devLog.devWarning)('Form.Item', "`shouldUpdate` and `dependencies` shouldn't be used together.");
      }

      if (isRenderProps) {
        if ((shouldUpdate || dependencies) && !name) {
          childNode = children(context);
        } else {
          if (!(shouldUpdate || dependencies)) {
            (0, _devLog.devWarning)('Form.Item', '`children` of render props only work with `shouldUpdate` or `dependencies`.');
          }

          if (name) {
            (0, _devLog.devWarning)('Form.Item', "Do not use `name` with `children` of render props since it's not a field.");
          }
        } // not render props

      } else if (dependencies && !name) {
        (0, _devLog.devWarning)('Form.Item', 'Must set `name` or use render props when `dependencies` is set.');
      } else if (_react().default.isValidElement(children)) {
        if (children.props.defaultValue) {
          (0, _devLog.devWarning)('Form.Item', '`defaultValue` will not work on controlled Field. You should use `initialValues` of Form instead.');
        }

        const childProps = Object.assign(Object.assign({}, children.props), control);

        if ((0, _utils3.isSafeSetRefComponent)(children)) {
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


        const triggers = new Set([...(0, _utils.toArray)(trigger), ...(0, _utils.toArray)(mergedValidateTrigger)]);
        triggers.forEach(eventName => {
          childProps[eventName] = (...args) => {
            var _a, _b, _c;

            (_a = control[eventName]) === null || _a === void 0 ? void 0 : _a.call(control, ...args);
            (_c = (_b = children.props)[eventName]) === null || _c === void 0 ? void 0 : _c.call(_b, ...args);
          };
        });
        childNode = (0, _jsxRuntime().jsx)(MemoInput, Object.assign({
          value: control[props.valuePropName || 'value'],
          update: updateRef.current
        }, {
          children: _react().default.cloneElement(children, childProps)
        }));
      } else {
        if (name) {
          (0, _devLog.devWarning)('Form.Item', '`name` is only used for validate React element. If you are using Form.Item as layout display, please remove `name` instead.');
        }

        childNode = children;
      }

      return renderLayout(childNode, fieldId, meta, isRequired);
    }
  }));
};

var _default = FormItem;
exports.default = _default;