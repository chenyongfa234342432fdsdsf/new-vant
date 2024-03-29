"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _jsxRuntime() {
  const data = require("react/jsx-runtime");

  _jsxRuntime = function () {
    return data;
  };

  return data;
}

function _react() {
  const data = _interopRequireWildcard(require("react"));

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

var _useRefs = _interopRequireDefault(require("../hooks/use-refs"));

var _useRect = require("../hooks/use-rect");

var _useScrollParent = _interopRequireDefault(require("../hooks/use-scroll-parent"));

var _useEventListener = _interopRequireDefault(require("../hooks/use-event-listener"));

var _IndexBarContext = _interopRequireDefault(require("./IndexBarContext"));

var _PopupContext = _interopRequireDefault(require("../popup/PopupContext"));

var _utils = require("../utils");

var _hooks = require("../hooks");

var _renderToContainer = require("../utils/dom/renderToContainer");

var _IndexAnchor = require("./IndexAnchor");

var _constant = require("../utils/constant");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
const [bem] = (0, _utils.createNamespace)('index-bar');
const IndexBar = (0, _react().forwardRef)((props, ref) => {
  const popupContext = (0, _react().useContext)(_PopupContext.default);
  const {
    children,
    sticky,
    zIndex,
    highlightColor
  } = props;
  const [activeAnchor, setActiveAnchor] = (0, _react().useState)(null);
  const root = (0, _react().useRef)(null);
  const sidebar = (0, _react().useRef)(null);
  const touchActiveIndex = (0, _react().useRef)(null);
  const touch = (0, _hooks.useTouch)();
  const scrollParent = (0, _useScrollParent.default)(root);
  const [refs, setRefs] = (0, _useRefs.default)();
  const sidebarStyle = (0, _react().useMemo)(() => {
    if ((0, _utils.isDef)(zIndex)) {
      return {
        zIndex: +zIndex + 1
      };
    }

    return {};
  }, [zIndex]);
  const highlightStyle = (0, _react().useMemo)(() => {
    if (highlightColor) {
      return {
        color: highlightColor
      };
    }

    return {};
  }, [highlightColor]);

  const getScrollerRect = () => {
    if (scrollParent.getBoundingClientRect) {
      return (0, _useRect.getRect)(scrollParent);
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
    if ((0, _utils.isHidden)(root.current) || !scrollParent) {
      return;
    }

    const {
      indexList
    } = props;
    const scrollTop = (0, _utils.getScrollTop)(scrollParent);
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
    return (0, _jsxRuntime().jsx)("span", Object.assign({
      className: (0, _clsx().default)(bem('index', {
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
          (0, _utils.setScrollTop)(scrollParent, (0, _utils.getScrollTop)(scrollParent) - props.stickyOffsetTop);
        } else {
          (0, _utils.setRootScrollTop)((0, _utils.getRootScrollTop)() - props.stickyOffsetTop);
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
    (0, _utils.preventDefault)(event);

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

  (0, _useEventListener.default)('scroll', onScroll, {
    target: scrollParent,
    depends: [scrollParent]
  });
  (0, _useEventListener.default)('touchmove', onTouchMove, {
    target: sidebar.current,
    depends: [touch.deltaY]
  });
  (0, _react().useEffect)(() => {
    if (props.onChange && typeof props.onChange === 'function') {
      props.onChange(activeAnchor);
    }
  }, [activeAnchor]);
  (0, _hooks.useMount)(init);

  const handleMapChildren = $children => {
    return _react().default.Children.toArray($children).filter(Boolean).map(child => {
      var _a, _b;

      if (((_a = child.type) === null || _a === void 0 ? void 0 : _a[_constant.COMPONENT_TYPE_KEY]) === _IndexAnchor.INDEX_ANCHORE_KEY) {
        return _react().default.cloneElement(child, {
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

  (0, _react().useImperativeHandle)(ref, () => ({
    scrollTo
  }));
  const memoChildren = (0, _react().useMemo)(() => handleMapChildren(children), [children]);
  return (0, _jsxRuntime().jsx)(_IndexBarContext.default.Provider, Object.assign({
    value: {
      zIndex,
      highlightColor,
      sticky
    }
  }, {
    children: (0, _jsxRuntime().jsxs)("div", Object.assign({
      ref: root,
      className: (0, _clsx().default)(bem(), props.className),
      style: props.style
    }, {
      children: [(0, _renderToContainer.renderToContainer)(props.teleport, (0, _jsxRuntime().jsx)("div", Object.assign({
        ref: sidebar,
        className: (0, _clsx().default)(bem('sidebar')),
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
var _default = IndexBar;
exports.default = _default;