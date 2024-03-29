import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useRef, useEffect, useImperativeHandle, forwardRef, useContext } from 'react';
import clsx from 'clsx';
import { Arrow, Cross } from '@react-vant/icons';
import { getRect } from '../hooks/use-rect';
import useEventListener from '../hooks/use-event-listener';
import { createNamespace, isDef, noop } from '../utils';
import { raf, doubleRaf } from '../utils/raf';
import { useSetState, useUpdateEffect } from '../hooks';
import PopupContext from '../popup/PopupContext';
const [bem] = createNamespace('notice-bar');
const NoticeBar = forwardRef((props, ref) => {
  const {
    text,
    color,
    background,
    wrapable,
    scrollable,
    speed,
    delay = 1
  } = props;
  const popupContext = useContext(PopupContext);
  const [state, setState] = useSetState({
    show: true,
    offset: 0,
    duration: 0
  });
  const wrapRef = useRef();
  const contentRef = useRef();
  const wrapWidth = useRef(0);
  const contentWidth = useRef(0);
  const startTimer = useRef(null);

  const renderLeftIcon = () => {
    if (props.leftIcon) {
      return React.cloneElement(props.leftIcon, {
        className: clsx(bem('left-icon'))
      });
    }

    return null;
  };

  const getRightIcon = () => {
    if (props.mode === 'closeable') {
      return _jsx(Cross, {});
    }

    if (props.mode === 'link') {
      return _jsx(Arrow, {});
    }

    return null;
  };

  const onClickRightIcon = event => {
    if (props.mode === 'closeable') {
      setState({
        show: false
      });

      if (props.onClose) {
        props.onClose(event);
      }
    }
  }; //  右侧图标


  const renderRightIcon = () => {
    if (props.rightIcon) {
      return props.rightIcon;
    }

    const finalRightIcon = props.rightIcon || getRightIcon();

    if (finalRightIcon) {
      return React.cloneElement(finalRightIcon, {
        className: clsx(bem('right-icon')),
        onClick: onClickRightIcon
      });
    }

    return null;
  }; //  动画结束


  const onTransitionEnd = () => {
    setState({
      offset: wrapWidth.current,
      duration: 0
    });
    raf(() => {
      // use double raf to ensure animation can start
      doubleRaf(() => {
        setState({
          offset: -contentWidth.current,
          duration: (contentWidth.current + wrapWidth.current) / speed
        });

        if (props.onReplay) {
          props.onReplay();
        }
      });
    });
  }; //  文字部分


  const renderMarquee = () => {
    const ellipsis = scrollable === false && !props.wrapable;
    const style = {
      transform: state.offset ? `translateX(${state.offset}px)` : '',
      transitionDuration: `${state.duration}s`
    };
    return _jsx("div", Object.assign({
      className: clsx(bem('wrap')),
      ref: wrapRef
    }, {
      children: _jsx("div", Object.assign({
        className: clsx(bem('content'), {
          'rv-ellipsis': ellipsis
        }),
        ref: contentRef,
        style: style,
        onTransitionEnd: onTransitionEnd
      }, {
        children: props.children || text
      }))
    }));
  };

  const reset = () => {
    const ms = isDef(delay) ? +delay * 1000 : 0;
    wrapWidth.current = 0;
    contentWidth.current = 0;
    setState({
      offset: 0,
      duration: 0
    });
    clearTimeout(startTimer.current);
    startTimer.current = setTimeout(() => {
      if (!wrapRef.current || !contentRef.current || scrollable === false) {
        return;
      }

      const wrapRefWidth = getRect(wrapRef.current).width;
      const contentRefWidth = getRect(contentRef.current).width;

      if (scrollable || contentRefWidth > wrapRefWidth) {
        doubleRaf(() => {
          wrapWidth.current = wrapRefWidth;
          contentWidth.current = contentRefWidth;
          setState({
            offset: -contentWidth.current,
            duration: contentWidth.current / speed
          });
        });
      }
    }, ms);
  }; // fix cache issues with forwards and back history in safari
  // see: https://guwii.com/cache-issues-with-forwards-and-back-history-in-safari/


  useEventListener('pageshow', reset);
  useEffect(() => {
    reset();
  }, [text, scrollable]);
  useUpdateEffect(() => {
    reset();
  }, [popupContext.visible]);
  useImperativeHandle(ref, () => ({
    reset
  }));
  return state.show && _jsxs("div", Object.assign({
    role: 'alert',
    className: clsx(bem({
      wrapable
    }), props.className),
    style: Object.assign({
      color,
      background
    }, props.style),
    onClick: props.onClick
  }, {
    children: [renderLeftIcon(), renderMarquee(), renderRightIcon()]
  }));
});
NoticeBar.defaultProps = {
  delay: 1,
  speed: 60,
  onClick: noop,
  onClose: noop
};
export default NoticeBar;