import { jsx as _jsx } from "react/jsx-runtime";
import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import CollapseContext from './CollapseContext';
import { BORDER_TOP_BOTTOM } from '../utils/constant';
import { useUpdateEffect } from '../hooks';
import { createNamespace } from '../utils';
import { devWarning } from '../utils/dev-log';

function validateModelValue(modelValue, accordion) {
  if (accordion && Array.isArray(modelValue)) {
    devWarning('Collapse', '"value" should not be Array in accordion mode');
    return false;
  }

  if (!accordion && !Array.isArray(modelValue)) {
    devWarning('Collapse', '"value" should be Array in non-accordion mode');
    return false;
  }

  return true;
}

const [bem] = createNamespace('collapse');

const Collapse = props => {
  const {
    accordion
  } = props;
  const initExpandedDefault = accordion ? '' : [];
  const {
    initExpanded = initExpandedDefault
  } = props;
  const innerEffect = useRef(false);
  const [expanded, setExpanded] = useState(() => {
    var _a;

    return (_a = props.value) !== null && _a !== void 0 ? _a : initExpanded;
  });

  const updateName = name => {
    var _a;

    innerEffect.current = true;
    setExpanded(name);
    (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, name);
  };

  const toggle = (name, isExpanded) => {
    if (accordion) {
      if (name === expanded) {
        name = '';
      }
    } else if (isExpanded) {
      name = expanded.concat(name);
    } else {
      name = expanded.filter(activeName => activeName !== name);
    }

    updateName(name);
  };

  const isExpanded = name => {
    if (process.env.NODE_ENV !== 'production' && !validateModelValue(expanded, accordion)) {
      return false;
    }

    return accordion ? expanded === name : expanded === null || expanded === void 0 ? void 0 : expanded.includes(name);
  };

  useUpdateEffect(() => {
    var _a;

    if (innerEffect.current) {
      innerEffect.current = false;
      return;
    }

    setExpanded((_a = props.value) !== null && _a !== void 0 ? _a : initExpanded);
  }, [props.value]);
  return _jsx(CollapseContext.Provider, Object.assign({
    value: {
      isExpanded,
      toggle
    }
  }, {
    children: _jsx("div", Object.assign({
      style: props.style,
      ref: props.nativeRef,
      className: clsx(bem(), props.className, {
        [BORDER_TOP_BOTTOM]: props.border
      })
    }, {
      children: React.Children.toArray(props.children).filter(Boolean).map((child, index) => React.cloneElement(child, {
        index
      }))
    }))
  }));
};

Collapse.defaultProps = {
  border: true
};
export default Collapse;