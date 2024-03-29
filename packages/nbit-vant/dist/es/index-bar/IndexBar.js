import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { forwardRef, useContext, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import useRefs from '../hooks/use-refs';
import { getRect } from '../hooks/use-rect';
import useScrollParent from '../hooks/use-scroll-parent';
import useEventListener from '../hooks/use-event-listener';
import IndexBarContext from './IndexBarContext';
import PopupContext from '../popup/PopupContext';
import { isDef, isHidden, getScrollTop, preventDefault, setRootScrollTop, getRootScrollTop, setScrollTop, createNamespace } from '../utils';
import { useMount, useTouch } from '../hooks';
import { renderToContainer } from '../utils/dom/renderToContainer';
import { INDEX_ANCHORE_KEY } from './IndexAnchor';
import { COMPONENT_TYPE_KEY } from '../utils/constant';
const [bem] = createNamespace('index-bar');
const IndexBar = forwardRef((props, ref) => {
  const popupContext = useContext(PopupContext);
  const {
    children,
    sticky,
    zIndex,
    highlightColor
  } = props;
  const [activeAnchor, setActiveAnchor] = useState(null);
  const root = useRef(null);
  const sidebar = useRef(null);
  const touchActiveIndex = useRef(null);
  const touch = useTouch();
  const scrollParent = useScrollParent(root);
  const [refs, setRefs] = useRefs();
  const sidebarStyle = useMemo(() => {
    if (isDef(zIndex)) {
      return {
        zIndex: +zIndex + 1
      };
    }

    return {};
  }, [zIndex]);
  const highlightStyle = useMemo(() => {
    if (highlightColor) {
      return {
        color: highlightColor
      };
    }

    return {};
  }, [highlightColor]);

  const getScrollerRect = () => {
    if (scrollParent.getBoundingClientRect) {
      return getRect(scrollParent);
    }

    return {
      top: 0,
      left: 0
    };
  };

  const getActiveAnchor = (scrollTop, rects) => {
    for (let i = rects.length - 1; i >= 0; i -= 1) {
      const prevHeight = i > 0 ? rects[i - 1].height : 0;
      const reachTop = props.sticky ? prevHeight + props.stickyOffsetTop : props.stickyOffsetTop;

      if (scrollTop + reachTop >= rects[i].top) {
        return i;
      }
    }

    return -1;
  };

  const onScroll = () => {
    if (isHidden(root.current) || !scrollParent) {
      return;
    }

    const {
      indexList
    } = props;
    const scrollTop = getScrollTop(scrollParent);
    const scrollParentRect = getScrollerRect();
    const rects = Object.values(refs).map(anchor => {
      return anchor.getRect(scrollParent, scrollParentRect);
    });
    const active = getActiveAnchor(scrollTop, rects);
    setActiveAnchor(indexList[active]);

    if (sticky) {
      Object.values(refs).forEach((item, index) => {
        const {
          updateState
        } = item;

        if (index === active || index === active - 1) {
          const rect = item.root.current.getBoundingClientRect();
          updateState({
            left: rect.left,
            width: rect.width
          });
        } else {
          updateState({
            left: null,
            width: null
          });
        }

        if (index === active) {
          updateState({
            active: true,
            top: Math.max(props.stickyOffsetTop, rects[index].top - scrollTop) + scrollParentRect.top
          });
        } else if (index === active - 1) {
          const activeItemTop = rects[active].top - scrollTop;
          updateState({
            active: activeItemTop > 0,
            top: activeItemTop + scrollParentRect.top - rects[index].height
          });
        } else {
          updateState({
            active: false
          });
        }
      });
    }
  };

  const init = () => setTimeout(onScroll, 0);

  const renderIndexes = () => props.indexList.map(index => {
    const active = index === activeAnchor;
    return _jsx("span", Object.assign({
      className: clsx(bem('index', {
        active
      })),
      style: active ? highlightStyle : null,
      "data-index": index
    }, {
      children: props.itemRender ? props.itemRender(index, active) : index
    }), index);
  });

  const onTouchStart = event => {
    touch.start(event);
  };

  const scrollTo = index => {
    if (!index) {
      return;
    }

    if (refs[index]) {
      refs[index].root.current.scrollIntoView();

      if (props.sticky && props.stickyOffsetTop) {
        if (popupContext.visible) {
          setScrollTop(scrollParent, getScrollTop(scrollParent) - props.stickyOffsetTop);
        } else {
          setRootScrollTop(getRootScrollTop() - props.stickyOffsetTop);
        }
      }

      if (props.onSelect && typeof props.onSelect === 'function') {
        props.onSelect(activeAnchor);
      }
    }
  };

  const scrollToElement = element => {
    const {
      index
    } = element.dataset;
    scrollTo(index);
  };

  const onClickSidebar = event => {
    scrollToElement(event.target);
  };

  const onTouchMove = event => {
    touch.move(event);
    preventDefault(event);

    if (touch.isVertical()) {
      const {
        clientX,
        clientY
      } = event.touches[0];
      const target = document.elementFromPoint(clientX, clientY);

      if (target) {
        const {
          index
        } = target.dataset;
        /* istanbul ignore else */

        if (touchActiveIndex.current !== index) {
          touchActiveIndex.current = index;
          scrollToElement(target);
        }
      }
    }
  };

  useEventListener('scroll', onScroll, {
    target: scrollParent,
    depends: [scrollParent]
  });
  useEventListener('touchmove', onTouchMove, {
    target: sidebar.current,
    depends: [touch.deltaY]
  });
  useEffect(() => {
    if (props.onChange && typeof props.onChange === 'function') {
      props.onChange(activeAnchor);
    }
  }, [activeAnchor]);
  useMount(init);

  const handleMapChildren = $children => {
    return React.Children.toArray($children).filter(Boolean).map(child => {
      var _a, _b;

      if (((_a = child.type) === null || _a === void 0 ? void 0 : _a[COMPONENT_TYPE_KEY]) === INDEX_ANCHORE_KEY) {
        return React.cloneElement(child, {
          ref: setRefs(child.props.index)
        });
      }

      if ((_b = child.props) === null || _b === void 0 ? void 0 : _b.children) {
        const deepMap = handleMapChildren(child.props.children);
        return deepMap.length ? deepMap : child;
      }

      return child;
    });
  };

  useImperativeHandle(ref, () => ({
    scrollTo
  }));
  const memoChildren = useMemo(() => handleMapChildren(children), [children]);
  return _jsx(IndexBarContext.Provider, Object.assign({
    value: {
      zIndex,
      highlightColor,
      sticky
    }
  }, {
    children: _jsxs("div", Object.assign({
      ref: root,
      className: clsx(bem(), props.className),
      style: props.style
    }, {
      children: [renderToContainer(props.teleport, _jsx("div", Object.assign({
        ref: sidebar,
        className: clsx(bem('sidebar')),
        style: sidebarStyle,
        onClick: onClickSidebar,
        onTouchStart: onTouchStart
      }, {
        children: renderIndexes()
      }))), memoChildren]
    }))
  }));
});

function genAlphabet() {
  const indexList = [];
  const charCodeOfA = 'A'.charCodeAt(0);

  for (let i = 0; i < 26; i += 1) {
    indexList.push(String.fromCharCode(charCodeOfA + i));
  }

  return indexList;
}

IndexBar.defaultProps = {
  sticky: true,
  stickyOffsetTop: 0,
  indexList: genAlphabet()
};
export default IndexBar;