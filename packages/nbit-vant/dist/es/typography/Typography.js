import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import clsx from 'clsx';
import { createNamespace, isObject } from '../utils';
import Ellipsis from './Ellipsis';
const [bem] = createNamespace('typography');
const ellipsisDefaultValue = {
  rows: 1
};

const TypographyBase = _a => {
  var {
    tag = 'div',
    type,
    size = 'md',
    level = 5,
    center,
    ellipsis,
    className,
    children,
    strong,
    underline,
    disabled,
    renderType,
    delete: del
  } = _a,
      props = __rest(_a, ["tag", "type", "size", "level", "center", "ellipsis", "className", "children", "strong", "underline", "disabled", "renderType", "delete"]);

  const ellipsisNumber = useMemo(() => {
    if (typeof ellipsis === 'boolean' && ellipsis) return 1;
    if (typeof ellipsis === 'number') return ellipsis;
    if (isObject(ellipsis) && ellipsis.rows) return ellipsis.rows;
    return 0;
  }, [ellipsis]);
  const isEllipsis = !!ellipsis;
  const isCssEllipsis = useMemo(() => {
    if (typeof ellipsis === 'boolean') return true;
    if (typeof ellipsis === 'number') return true;

    if (isObject(ellipsis)) {
      const p = Object.assign(Object.assign({}, ellipsisDefaultValue), ellipsis);
      if (!p.collapseText && !p.expandText && !p.suffixCount && !p.suffixText && !p.symbol) return true;
    }

    return false;
  }, [ellipsis]);
  const isEnhanceEllipsis = isEllipsis && !isCssEllipsis;
  const TagElement = useMemo(() => {
    if (renderType === 'title') {
      if (level === 1) return 'h1';
      if (level === 2) return 'h2';
      if (level === 3) return 'h3';
      if (level === 4) return 'h4';
      if (level === 5) return 'h5';
      return 'h6';
    }

    return tag;
  }, [tag]);
  const measureStyle = useMemo(() => {
    const propsStyle = Object.assign(Object.assign({}, props.style), {
      '--rv-typography-color': props.color
    });

    if (isEllipsis && isCssEllipsis && ellipsisNumber > 1) {
      return Object.assign(Object.assign({}, propsStyle), {
        '--line-clamp': ellipsisNumber
      });
    }

    return propsStyle;
  }, [props.style, isCssEllipsis]);

  const renderContent = () => {
    if (isEnhanceEllipsis) return _jsx(Ellipsis, Object.assign({
      className: clsx(className, `rv-typography__${renderType}`, bem([type, size, {
        center,
        strong,
        underline,
        disabled,
        delete: del,
        [`l${level}`]: renderType === 'title' && level
      }]))
    }, props, ellipsis, {
      style: measureStyle
    }, {
      children: children
    }));
    return _jsx(TagElement, Object.assign({
      className: clsx(className, `rv-typography__${renderType}`, bem([type, size, {
        center,
        strong,
        underline,
        disabled,
        delete: del,
        [`l${level}`]: renderType === 'title' && level
      }]), {
        'rv-ellipsis': isEllipsis && isCssEllipsis && ellipsisNumber === 1,
        'rv-typography__ellipsis--multi': isEllipsis && isCssEllipsis && ellipsisNumber > 1
      })
    }, props, {
      style: measureStyle
    }, {
      children: children
    }));
  };

  return renderContent();
};

export default TypographyBase;