import { jsx as _jsx } from "react/jsx-runtime";
import { useContext, useMemo } from 'react';
import clsx from 'clsx';
import Button from '../button';
import ActionBarContext from './ActionBarContext';
import { createNamespace } from '../utils';
const [bem] = createNamespace('action-bar-button');

const ActionBarButton = props => {
  const {
    type,
    icon,
    text,
    color,
    loading,
    disabled,
    index
  } = props;
  const {
    parent
  } = useContext(ActionBarContext);
  const isFirst = useMemo(() => {
    if (parent) {
      const prev = parent.children[index - 1];
      return !(prev && 'isButton' in prev.type);
    }

    return false;
  }, [index, parent]);
  const isLast = useMemo(() => {
    if (parent) {
      const next = parent.children[index + 1];
      return !(next && 'isButton' in next.type);
    }

    return false;
  }, [index, parent]);
  return _jsx(Button, Object.assign({
    className: clsx(props.className, bem([type, {
      last: isLast,
      first: isFirst
    }])),
    style: props.style,
    size: 'large',
    type: type,
    icon: icon,
    color: color,
    loading: loading,
    disabled: disabled,
    onClick: props.onClick
  }, {
    children: props.children ? props.children : text
  }));
};

const ActionBarButtonNameSpace = Object.assign(ActionBarButton, {
  isButton: true
});
export default ActionBarButtonNameSpace;