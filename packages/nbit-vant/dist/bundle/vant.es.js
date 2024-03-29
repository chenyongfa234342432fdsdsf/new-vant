import React, { useRef, useEffect, useState, useMemo, useCallback, useContext, createContext, forwardRef, useImperativeHandle, version, memo, isValidElement, Children, cloneElement } from "react";
import clsx from "clsx";
import { ArrowLeft, ArrowUp, ArrowDown, Arrow, Cross, Clear, QuestionO, PhotoFail, Photo, Checked, Success, Search as Search$1, Star, StarO, Close, Description, Photograph, ExpandO } from "@react-vant/icons";
import { CSSTransition } from "react-transition-group";
import * as ReactDOM from "react-dom";
import { createPortal, version as version$1 } from "react-dom";
import { createUseGesture, dragAction, pinchAction, useDrag } from "@use-gesture/react";
import { useSpring, animated } from "@react-spring/web";
import { createPopper, offsetModifier } from "@vant/popperjs";
import RcForm, { useWatch, FieldContext, Field as Field$1, useForm, List as List$1 } from "rc-field-form";
import { isForwardRef, isFragment, isMemo } from "react-is";
var base$1 = "";
function getTargetElement(target, defaultElement) {
  if (!target) {
    return defaultElement;
  }
  let targetElement;
  if (typeof target === "function") {
    targetElement = target();
  } else if ("current" in target) {
    targetElement = target.current;
  } else {
    targetElement = target;
  }
  return targetElement;
}
const defaultEvent = "click";
function useClickAway(target, onClickAway, eventName = defaultEvent) {
  const onClickAwayRef = useRef(onClickAway);
  onClickAwayRef.current = onClickAway;
  useEffect(() => {
    const handler = (event) => {
      const targets = Array.isArray(target) ? target : [target];
      if (targets.some((targetItem) => {
        const targetElement = getTargetElement(targetItem);
        return !targetElement || (targetElement == null ? void 0 : targetElement.contains(event.target));
      })) {
        return;
      }
      onClickAwayRef.current(event);
    };
    document.addEventListener(eventName, handler);
    return () => {
      document.removeEventListener(eventName, handler);
    };
  }, [target, eventName]);
}
function noop() {
}
const extend = Object.assign;
const inBrowser = typeof window !== "undefined";
function isDef(val) {
  return val !== void 0 && val !== null;
}
function isFunction(val) {
  return typeof val === "function";
}
function isPromise(val) {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
}
function isObject(val) {
  return val !== null && typeof val === "object";
}
function pick(obj, keys, ignoreUndefined) {
  return keys.reduce((ret, key) => {
    if (!ignoreUndefined || obj[key] !== void 0) {
      ret[key] = obj[key];
    }
    return ret;
  }, {});
}
function once(fn) {
  return (...args) => {
    if (!fn)
      return;
    fn(...args);
    fn = null;
  };
}
function gen(name, mods) {
  if (!mods) {
    return "";
  }
  if (typeof mods === "string") {
    return ` ${name}--${mods}`;
  }
  if (Array.isArray(mods)) {
    return mods.reduce((ret, item) => ret + gen(name, item), "");
  }
  return Object.keys(mods).reduce(
    (ret, key) => ret + (mods[key] ? gen(name, key) : ""),
    ""
  );
}
function createBEM(name) {
  return (el, mods) => {
    if (el && typeof el !== "string") {
      mods = el;
      el = "";
    }
    el = el ? `${name}__${el}` : name;
    return `${el}${gen(el, mods)}`;
  };
}
function createNamespace(name, prefix2) {
  name = `${prefix2 || "rv"}-${name}`;
  return [createBEM(name), name];
}
function stopPropagation(event) {
  event.stopPropagation();
}
function preventDefault(event, isStopPropagation) {
  if (typeof event.cancelable !== "boolean" || event.cancelable) {
    event.preventDefault();
  }
  if (isStopPropagation) {
    stopPropagation(event);
  }
}
const eventToPropRecord = {
  "click": "onClick"
};
function withStopPropagation(events, element) {
  const props = { ...element.props };
  for (const key of events) {
    const prop = eventToPropRecord[key];
    props[prop] = function(e) {
      var _a, _b;
      e.stopPropagation();
      (_b = (_a = element.props)[prop]) == null ? void 0 : _b.call(_a, e);
    };
  }
  return React.cloneElement(element, props);
}
const root = inBrowser ? window : global;
let prev = Date.now();
function rafPolyfill(fn) {
  const curr = Date.now();
  const ms = Math.max(0, 16 - (curr - prev));
  const id = setTimeout(fn, ms);
  prev = curr + ms;
  return id;
}
function raf(fn) {
  const requestAnimationFrame = root.requestAnimationFrame || rafPolyfill;
  return requestAnimationFrame.call(root, fn);
}
function cancelRaf(id) {
  const cancelAnimationFrame = root.cancelAnimationFrame || root.clearTimeout;
  cancelAnimationFrame.call(root, id);
}
function doubleRaf(fn) {
  raf(() => {
    raf(fn);
  });
}
function isIOS$1() {
  return inBrowser ? /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) : false;
}
function isWindow$2(val) {
  return val === window;
}
function getScrollTop$1(el) {
  const top = "scrollTop" in el ? el.scrollTop : el.pageYOffset;
  return Math.max(top, 0);
}
function getRootScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}
function setRootScrollTop(value) {
  setScrollTop(window, value);
}
function getElementTop(el, scroller) {
  if (isWindow$2(el)) {
    return 0;
  }
  const scrollTop = scroller ? getScrollTop$1(scroller) : getRootScrollTop();
  return el.getBoundingClientRect().top + scrollTop;
}
function getVisibleHeight(el) {
  if (isWindow$2(el)) {
    return el.innerHeight;
  }
  return el.getBoundingClientRect().height;
}
function getVisibleTop(el) {
  if (isWindow$2(el)) {
    return 0;
  }
  return el.getBoundingClientRect().top;
}
function setScrollTop(el, value) {
  if ("scrollTop" in el) {
    el.scrollTop = value;
  } else {
    el.scrollTo(el.scrollX, value);
  }
}
let rafId;
function scrollLeftTo(scroller, to, duration) {
  cancelRaf(rafId);
  let count = 0;
  const from = scroller.scrollLeft;
  const frames = duration === 0 ? 1 : Math.round(duration / 16);
  function animate() {
    scroller.scrollLeft += (to - from) / frames;
    if (++count < frames) {
      rafId = raf(animate);
    }
  }
  animate();
}
function scrollTopTo(scroller, to, duration, callback) {
  let current = getScrollTop$1(scroller);
  const isDown = current < to;
  const frames = duration === 0 ? 1 : Math.round(duration / 16);
  const step = (to - current) / frames;
  function animate() {
    current += step;
    if (isDown && current > to || !isDown && current < to) {
      current = to;
    }
    setScrollTop(scroller, current);
    if (isDown && current < to || !isDown && current > to) {
      raf(animate);
    } else if (callback) {
      raf(callback);
    }
  }
  animate();
}
const isIOS = isIOS$1();
function resetScroll() {
  if (isIOS) {
    setRootScrollTop(getRootScrollTop());
  }
}
function isHidden(elementRef) {
  const el = elementRef;
  if (!el) {
    return false;
  }
  const style = window.getComputedStyle(el);
  const hidden = style.display === "none";
  const parentHidden = el.offsetParent === null && style.position !== "fixed";
  return hidden || parentHidden;
}
function parseChildList(children) {
  return React.Children.toArray(children).map((node) => {
    if (React.isValidElement(node)) {
      const key = node.key !== void 0 ? String(node.key) : void 0;
      return {
        key,
        ...node.props,
        node
      };
    }
    return null;
  }).filter((child) => child);
}
function isNumeric(val) {
  return /^\d+(\.\d+)?$/.test(val);
}
function isNaN(val) {
  if (Number.isNaN) {
    return Number.isNaN(val);
  }
  return val !== val;
}
function addUnit(value) {
  if (!isDef(value)) {
    return void 0;
  }
  value = String(value);
  return isNumeric(value) ? `${value}px` : value;
}
function getSizeStyle(originSize) {
  if (isDef(originSize)) {
    const size = addUnit(originSize);
    return {
      width: size,
      height: size
    };
  }
  return {};
}
function getZIndexStyle(zIndex) {
  const style = {};
  if (zIndex !== void 0) {
    style.zIndex = +zIndex;
  }
  return style;
}
let rootFontSize;
function getRootFontSize() {
  if (!rootFontSize) {
    const doc = document.documentElement;
    const fontSize = doc.style.fontSize || window.getComputedStyle(doc).fontSize;
    rootFontSize = parseFloat(fontSize);
  }
  return rootFontSize;
}
function convertRem(value) {
  value = value.replace(/rem/g, "");
  return +value * getRootFontSize();
}
function convertVw(value) {
  value = value.replace(/vw/g, "");
  return +value * window.innerWidth / 100;
}
function convertVh(value) {
  value = value.replace(/vh/g, "");
  return +value * window.innerHeight / 100;
}
function unitToPx(value) {
  if (typeof value === "number") {
    return value;
  }
  if (inBrowser) {
    if (value.indexOf("rem") !== -1) {
      return convertRem(value);
    }
    if (value.indexOf("vw") !== -1) {
      return convertVw(value);
    }
    if (value.indexOf("vh") !== -1) {
      return convertVh(value);
    }
  }
  return parseFloat(value);
}
function kebabCase(str) {
  return str.replace(/([A-Z])/g, "-$1").toLowerCase().replace(/^-/, "");
}
function range(num, min, max) {
  return Math.min(Math.max(num, min), max);
}
function trimExtraChar(value, char, regExp) {
  const index2 = value.indexOf(char);
  if (index2 === -1) {
    return value;
  }
  if (char === "-" && index2 !== 0) {
    return value.slice(0, index2);
  }
  return value.slice(0, index2 + 1) + value.slice(index2).replace(regExp, "");
}
function formatNumber(value, allowDot = true, allowMinus = true) {
  if (allowDot) {
    value = trimExtraChar(value, ".", /\./g);
  } else {
    value = value.split(".")[0];
  }
  if (allowMinus) {
    value = trimExtraChar(value, "-", /-/g);
  } else {
    value = value.replace(/-/, "");
  }
  const regExp = allowDot ? /[^-0-9.]/g : /[^-0-9]/g;
  return value.replace(regExp, "");
}
function addNumber(num1, num2) {
  const cardinal = 10 ** 10;
  return Math.round((num1 + num2) * cardinal) / cardinal;
}
function padZero(num, targetLength = 2) {
  let str = `${num}`;
  while (str.length < targetLength) {
    str = `0${str}`;
  }
  return str;
}
const SECOND = 1e3;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
function parseTime(time) {
  const days = Math.floor(time / DAY);
  const hours = Math.floor(time % DAY / HOUR);
  const minutes = Math.floor(time % HOUR / MINUTE);
  const seconds = Math.floor(time % MINUTE / SECOND);
  const milliseconds = Math.floor(time % SECOND);
  return {
    total: time,
    days,
    hours,
    minutes,
    seconds,
    milliseconds
  };
}
function isSameSecond(time1, time2) {
  return Math.floor(time1 / 1e3) === Math.floor(time2 / 1e3);
}
function useCountDown(options) {
  const rafId2 = useRef(0);
  const endTime = useRef(0);
  const counting = useRef(false);
  const [remain, updateRemain] = useState(() => options.time);
  const remainRef = useRef(0);
  const currentRef = useRef({});
  const current = useMemo(() => parseTime(remain), [remain]);
  currentRef.current = current;
  remainRef.current = remain;
  const pause = () => {
    counting.current = false;
    cancelRaf(rafId2.current);
  };
  const getCurrentRemain = () => Math.max(endTime.current - Date.now(), 0);
  const setRemain = (value) => {
    var _a, _b;
    remainRef.current = value;
    updateRemain(value);
    (_a = options.onChange) == null ? void 0 : _a.call(options, currentRef.current);
    if (value === 0) {
      pause();
      (_b = options.onFinish) == null ? void 0 : _b.call(options);
    }
  };
  const microTick = () => {
    rafId2.current = raf(() => {
      if (counting.current) {
        setRemain(getCurrentRemain());
        if (remainRef.current > 0) {
          microTick();
        }
      }
    });
  };
  const macroTick = () => {
    rafId2.current = raf(() => {
      if (counting.current) {
        const remainRemain = getCurrentRemain();
        if (!isSameSecond(remainRemain, remainRef.current) || remainRemain === 0) {
          setRemain(remainRemain);
        }
        if (remainRef.current > 0) {
          macroTick();
        }
      }
    });
  };
  const tick = () => {
    if (!inBrowser) {
      return;
    }
    if (options.millisecond) {
      microTick();
    } else {
      macroTick();
    }
  };
  const start = () => {
    if (!counting.current) {
      endTime.current = Date.now() + remainRef.current;
      counting.current = true;
      tick();
    }
  };
  const reset = (totalTime = options.time) => {
    pause();
    remainRef.current = totalTime;
    updateRemain(totalTime);
  };
  useEffect(() => {
    if (options.autostart) {
      start();
    }
  }, []);
  return {
    start,
    pause,
    reset,
    current
  };
}
let supportsPassive$1 = false;
if (inBrowser) {
  try {
    const opts = {};
    Object.defineProperty(opts, "passive", {
      get() {
        supportsPassive$1 = true;
      }
    });
    window.addEventListener("test-passive", null, opts);
  } catch (e) {
  }
}
function useEventListener(type, listener, options = {}) {
  if (!inBrowser) {
    return;
  }
  const {
    target = window,
    passive = false,
    capture = false,
    depends = []
  } = options;
  let attached;
  const add2 = () => {
    const element = getTargetElement(target);
    if (element && !attached) {
      element.addEventListener(
        type,
        listener,
        supportsPassive$1 ? { capture, passive } : capture
      );
      attached = true;
    }
  };
  const remove = () => {
    const element = getTargetElement(target);
    if (element && attached) {
      element.removeEventListener(type, listener, capture);
      attached = false;
    }
  };
  useEffect(() => {
    add2();
    return () => remove();
  }, [target, ...depends]);
}
function isEmpty(val) {
  if (isObject(val)) {
    return JSON.stringify(val) === "{}";
  }
  return true;
}
function useFormSmart(option = {}) {
  const { value, sync } = option;
  const ref = useRef(null);
  const [once2, setOnce] = useState(false);
  const set = useCallback((values) => {
    var _a;
    (_a = ref == null ? void 0 : ref.current) == null ? void 0 : _a.setFieldsValue(values);
  }, []);
  const get = useCallback((name) => {
    var _a;
    return (_a = ref == null ? void 0 : ref.current) == null ? void 0 : _a.getFieldValue(name);
  }, []);
  const submit = useCallback(() => {
    var _a;
    (_a = ref == null ? void 0 : ref.current) == null ? void 0 : _a.submit();
  }, []);
  const clear2 = useCallback(() => {
    var _a;
    (_a = ref == null ? void 0 : ref.current) == null ? void 0 : _a.resetFields();
  }, []);
  const getAll = useCallback(() => {
    var _a;
    return (_a = ref == null ? void 0 : ref.current) == null ? void 0 : _a.getFieldsValue();
  }, []);
  useEffect(() => {
    if (!isEmpty(value)) {
      if (sync) {
        set(value);
      } else if (!once2) {
        set(value);
        setOnce(true);
      }
    }
  }, [value]);
  const methods = { set, get, submit, clear: clear2, getAll };
  return [ref, methods];
}
function useRefState(initialState) {
  const [state, setState] = useState(initialState);
  const ref = useRef(state);
  const setRafState = useCallback(
    (patch) => {
      setState((prevState) => {
        return ref.current = isFunction(patch) ? patch(prevState) : patch;
      });
    },
    [state]
  );
  return [state, setRafState, ref];
}
const useUnmountedRef = () => {
  const unmountedRef = useRef(false);
  useEffect(() => {
    unmountedRef.current = false;
    return () => {
      unmountedRef.current = true;
    };
  }, []);
  return unmountedRef;
};
const useSetState = (initialState = {}) => {
  const unmountedRef = useUnmountedRef();
  const [state, setState, ref] = useRefState(initialState);
  const setMergeState = useCallback((patch) => {
    if (unmountedRef.current)
      return;
    setState((prevState) => ({
      ...prevState,
      ...isFunction(patch) ? patch(prevState) : patch
    }));
  }, []);
  return [state, setMergeState, ref];
};
const useUpdateEffect = (effect, deps) => {
  const isMounted = useRef(false);
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      return effect();
    }
    return void 0;
  }, deps);
};
const useMount = (fn) => {
  useEffect(() => {
    fn();
  }, []);
};
function usePageVisibility() {
  const [visibility, _setVisibility] = useState("visible");
  const setVisibility = () => {
    if (inBrowser) {
      _setVisibility(document.hidden ? "hidden" : "visible");
    }
  };
  useEffect(() => {
    setVisibility();
  }, []);
  useEventListener("visibilitychange", setVisibility, { depends: [visibility] });
  return visibility;
}
function useVisibilityChange(target, onChange) {
  const [state, setState] = useState();
  useEffect(() => {
    if (!inBrowser || !window.IntersectionObserver) {
      return null;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        onChange == null ? void 0 : onChange(entries[0].intersectionRatio > 0);
        for (const entry of entries) {
          setState(entry.isIntersecting);
        }
      },
      { root: document.body }
    );
    const observe = () => {
      if (target.current) {
        observer.observe(target.current);
      }
    };
    const unobserve = () => {
      if (target.current) {
        observer.unobserve(target.current);
      }
    };
    observe();
    return unobserve;
  }, [target.current]);
  return [state];
}
function useLatest(value) {
  const ref = useRef(value);
  ref.current = value;
  return ref;
}
const useUnmount = (fn) => {
  const fnRef = useLatest(fn);
  useEffect(
    () => () => {
      fnRef.current();
    },
    []
  );
};
function depsAreSame(oldDeps, deps) {
  if (oldDeps === deps)
    return true;
  for (let i = 0; i < oldDeps.length; i++) {
    if (!Object.is(oldDeps[i], deps[i]))
      return false;
  }
  return true;
}
const createEffectWithTarget = (useEffectType) => {
  const useEffectWithTarget2 = (effect, deps, target) => {
    const hasInitRef = useRef(false);
    const lastElementRef = useRef([]);
    const lastDepsRef = useRef([]);
    const unLoadRef = useRef();
    useEffectType(() => {
      var _a;
      const targets = Array.isArray(target) ? target : [target];
      const els = targets.map((item) => getTargetElement(item));
      if (!hasInitRef.current) {
        hasInitRef.current = true;
        lastElementRef.current = els;
        lastDepsRef.current = deps;
        unLoadRef.current = effect();
        return;
      }
      if (els.length !== lastElementRef.current.length || !depsAreSame(els, lastElementRef.current) || !depsAreSame(deps, lastDepsRef.current)) {
        (_a = unLoadRef.current) == null ? void 0 : _a.call(unLoadRef);
        lastElementRef.current = els;
        lastDepsRef.current = deps;
        unLoadRef.current = effect();
      }
    });
    useUnmount(() => {
      var _a;
      (_a = unLoadRef.current) == null ? void 0 : _a.call(unLoadRef);
      hasInitRef.current = false;
    });
  };
  return useEffectWithTarget2;
};
const useEffectWithTarget = createEffectWithTarget(useEffect);
function useInViewport(target, options) {
  const [state, setState] = useState();
  const [ratio, setRatio] = useState();
  useEffectWithTarget(
    () => {
      const el = getTargetElement(target);
      if (!el) {
        return;
      }
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            setRatio(entry.intersectionRatio);
            setState(entry.isIntersecting);
          }
        },
        {
          ...options,
          root: getTargetElement(options == null ? void 0 : options.root)
        }
      );
      observer.observe(el);
      return () => {
        observer.disconnect();
      };
    },
    [],
    target
  );
  return [state, ratio];
}
const MIN_DISTANCE = 10;
function getDirection$1(x, y) {
  if (x > y && x > MIN_DISTANCE) {
    return "horizontal";
  }
  if (y > x && y > MIN_DISTANCE) {
    return "vertical";
  }
  return "";
}
function useTouch() {
  const startX = useRef(0);
  const startY = useRef(0);
  const deltaX = useRef(0);
  const deltaY = useRef(0);
  const offsetX = useRef(0);
  const offsetY = useRef(0);
  const direction = useRef("");
  const isVertical = () => direction.current === "vertical";
  const isHorizontal = () => direction.current === "horizontal";
  const reset = () => {
    deltaX.current = 0;
    deltaY.current = 0;
    offsetX.current = 0;
    offsetY.current = 0;
    direction.current = "";
  };
  const start = (event) => {
    reset();
    startX.current = event.touches[0].clientX;
    startY.current = event.touches[0].clientY;
  };
  const move = (event) => {
    const touch = event.touches[0];
    deltaX.current = touch.clientX < 0 ? 0 : touch.clientX - startX.current;
    deltaY.current = touch.clientY - startY.current;
    offsetX.current = Math.abs(deltaX.current);
    offsetY.current = Math.abs(deltaY.current);
    if (!direction.current) {
      direction.current = getDirection$1(offsetX.current, offsetY.current);
    }
  };
  return {
    move,
    start,
    reset,
    startX,
    startY,
    deltaX,
    deltaY,
    offsetX,
    offsetY,
    direction,
    isVertical,
    isHorizontal
  };
}
const overflowScrollReg = /scroll|auto/i;
const defaultRoot = inBrowser ? window : void 0;
function isElement(node) {
  const ELEMENT_NODE_TYPE = 1;
  return node.tagName !== "HTML" && node.tagName !== "BODY" && node.nodeType === ELEMENT_NODE_TYPE;
}
function getScrollParent(el, root2 = defaultRoot) {
  if (root2 === void 0) {
    root2 = window;
  }
  let node = el;
  while (node && node !== root2 && isElement(node)) {
    const { overflowY } = window.getComputedStyle(node);
    if (overflowScrollReg.test(overflowY)) {
      if (node.tagName !== "BODY") {
        return node;
      }
      const htmlOverflowY = window.getComputedStyle(
        node.parentNode
      ).overflowY;
      if (overflowScrollReg.test(htmlOverflowY)) {
        return node;
      }
    }
    node = node.parentNode;
  }
  return root2;
}
function useScrollParent(el) {
  const [scrollParent, setScrollParent] = useState();
  useEffect(() => {
    if (el) {
      const element = getTargetElement(el);
      setScrollParent(getScrollParent(element));
    }
  }, []);
  return scrollParent;
}
function useWindowSize() {
  const [width, setWidth] = useState(inBrowser ? window.innerWidth : 0);
  const [height, setHeight] = useState(inBrowser ? window.innerHeight : 0);
  const onResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  useEventListener("resize", onResize);
  useEventListener("orientationchange", onResize);
  return { width, height };
}
const createUpdateEffect = (hook) => (effect, deps) => {
  const isMounted = useRef(false);
  hook(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  hook(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      return effect();
    }
  }, deps);
};
const useIsomorphicLayoutEffect = inBrowser ? React.useLayoutEffect : React.useEffect;
const useIsomorphicUpdateLayoutEffect = createUpdateEffect(
  useIsomorphicLayoutEffect
);
const useUpdate = () => {
  const [, setState] = useState({});
  return useCallback(() => setState({}), []);
};
function useMemoizedFn(fn) {
  const fnRef = useRef(fn);
  fnRef.current = useMemo(() => fn, [fn]);
  const memoizedFn = useRef();
  if (!memoizedFn.current) {
    memoizedFn.current = function(...args) {
      return fnRef.current.apply(this, args);
    };
  }
  return memoizedFn.current;
}
function usePropsValue(options) {
  const { value, defaultValue, onChange } = options;
  const update = useUpdate();
  const stateRef = useRef(value !== void 0 ? value : defaultValue);
  if (value !== void 0) {
    stateRef.current = value;
  }
  const setState = useMemoizedFn(
    (v, forceTrigger) => {
      const nextValue = typeof v === "function" ? v(stateRef.current) : v;
      if (!forceTrigger && nextValue === stateRef.current)
        return;
      stateRef.current = nextValue;
      update();
      onChange == null ? void 0 : onChange(nextValue);
    }
  );
  return [stateRef.current, setState];
}
var index$14 = {
  useClickAway,
  useCountDown,
  useEventListener,
  useFormSmart,
  useSetState,
  useUpdateEffect,
  useMount,
  usePageVisibility,
  useVisibilityChange,
  useInViewport,
  useTouch,
  useScrollParent,
  useWindowSize,
  useIsomorphicLayoutEffect,
  useUpdate,
  useMemoizedFn,
  usePropsValue
};
var index$13 = "";
var index$12 = "";
const SpinIcon = ({ bem: bem2 }) => /* @__PURE__ */ React.createElement(React.Fragment, null, Array(12).fill(null).map((_, index2) => /* @__PURE__ */ React.createElement("i", {
  key: index2,
  className: clsx(bem2("line", String(index2 + 1)))
})));
const CircularIcon = ({ bem: bem2 }) => /* @__PURE__ */ React.createElement("svg", {
  className: clsx(bem2("circular")),
  viewBox: "25 25 50 50"
}, /* @__PURE__ */ React.createElement("circle", {
  cx: "50",
  cy: "50",
  r: "20",
  fill: "none"
}));
const BallIcon = ({ bem: bem2 }) => /* @__PURE__ */ React.createElement("div", {
  className: clsx(bem2("ball"))
}, /* @__PURE__ */ React.createElement("div", null), /* @__PURE__ */ React.createElement("div", null), /* @__PURE__ */ React.createElement("div", null));
const Icon = (bem2) => ({
  spinner: /* @__PURE__ */ React.createElement(SpinIcon, {
    bem: bem2
  }),
  circular: /* @__PURE__ */ React.createElement(CircularIcon, {
    bem: bem2
  }),
  ball: /* @__PURE__ */ React.createElement(BallIcon, {
    bem: bem2
  })
});
const [bem$1C] = createNamespace("loading");
const Loading = (props) => {
  const {
    className,
    type,
    vertical,
    color,
    size,
    textColor,
    children,
    textSize
  } = props;
  const spinnerStyle = useMemo(
    () => ({
      color,
      ...getSizeStyle(size)
    }),
    [color, size]
  );
  const renderText = () => {
    if (children) {
      return /* @__PURE__ */ React.createElement("span", {
        className: clsx(bem$1C("text")),
        style: {
          fontSize: addUnit(textSize),
          color: textColor != null ? textColor : color
        }
      }, children);
    }
    return null;
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: clsx(className, bem$1C([type, { vertical }])),
    style: props.style
  }, /* @__PURE__ */ React.createElement("span", {
    className: clsx(bem$1C("spinner", type)),
    style: spinnerStyle
  }, Icon(bem$1C)[type]), renderText());
};
Loading.defaultProps = {
  type: "circular"
};
const WHITE = "#fff";
const BORDER = "rv-hairline";
const BORDER_TOP = `${BORDER}--top`;
const BORDER_LEFT = `${BORDER}--left`;
const BORDER_BOTTOM = `${BORDER}--bottom`;
const BORDER_SURROUND = `${BORDER}--surround`;
const BORDER_TOP_BOTTOM = `${BORDER}--top-bottom`;
const BORDER_UNSET_TOP_BOTTOM = `${BORDER}-unset--top-bottom`;
const SHADOW = "rv-shadow";
const COMPONENT_TYPE_KEY = "__REACT_VANT_COMPONENT";
const ButtonContext = React.createContext({});
const [bem$1B] = createNamespace("button");
const Button$1 = (props) => {
  const { color, loading, className, hairline, loadingText } = props;
  const { parent } = useContext(ButtonContext);
  const size = React.useMemo(
    () => props.size || (parent == null ? void 0 : parent.size) || "normal",
    [parent == null ? void 0 : parent.size, props.size]
  );
  const type = React.useMemo(
    () => props.type || (parent == null ? void 0 : parent.type) || "default",
    [parent == null ? void 0 : parent.type, props.type]
  );
  const plain = React.useMemo(
    () => {
      var _a;
      return (_a = props.plain) != null ? _a : parent == null ? void 0 : parent.plain;
    },
    [parent == null ? void 0 : parent.plain, props.plain]
  );
  const block = React.useMemo(
    () => {
      var _a;
      return (_a = props.block) != null ? _a : parent == null ? void 0 : parent.block;
    },
    [parent == null ? void 0 : parent.block, props.block]
  );
  const iconPosition = React.useMemo(
    () => props.iconPosition || (parent == null ? void 0 : parent.iconPosition) || "left",
    [parent == null ? void 0 : parent.iconPosition, props.iconPosition]
  );
  const disabled = React.useMemo(
    () => {
      var _a;
      return (_a = props.disabled) != null ? _a : parent == null ? void 0 : parent.disabled;
    },
    [parent == null ? void 0 : parent.disabled, props.disabled]
  );
  const nativeType = React.useMemo(
    () => props.nativeType || (parent == null ? void 0 : parent.nativeType) || "button",
    [parent == null ? void 0 : parent.nativeType, props.nativeType]
  );
  const tag = React.useMemo(
    () => props.tag || (parent == null ? void 0 : parent.tag) || "button",
    [parent == null ? void 0 : parent.tag, props.tag]
  );
  const TagElement = tag;
  const classes = clsx(
    className,
    bem$1B([
      type,
      size,
      {
        plain,
        loading,
        disabled,
        hairline,
        block,
        round: props.round,
        square: props.square
      }
    ]),
    { [BORDER_SURROUND]: hairline },
    props.shadow && `${SHADOW}--${+props.shadow}`
  );
  const style = { ...props.style };
  if (color) {
    style.color = plain ? color : WHITE;
    if (!plain) {
      style.background = color;
    }
    if (color.indexOf("gradient") !== -1) {
      style.border = 0;
    } else {
      style.borderColor = color;
    }
  }
  const onClick = (event) => {
    if (!loading && !disabled && props.onClick) {
      props.onClick(event);
    }
  };
  const renderLoadingIcon = () => {
    if (loading) {
      const { loadingSize = "20px", loadingType } = props;
      return /* @__PURE__ */ React.createElement(Loading, {
        className: clsx(bem$1B("loading")),
        size: loadingSize,
        type: loadingType,
        color: type === "default" ? void 0 : ""
      });
    }
    return null;
  };
  const renderIcon = () => {
    if (props.loading) {
      return renderLoadingIcon();
    }
    if (props.icon) {
      return React.cloneElement(props.icon, {
        className: clsx(bem$1B("icon"))
      });
    }
    return null;
  };
  const renderText = () => {
    let text;
    if (loading) {
      text = loadingText;
    } else {
      text = props.children || props.text;
    }
    if (text) {
      return /* @__PURE__ */ React.createElement("span", {
        key: "text",
        className: clsx(bem$1B("text"))
      }, text);
    }
    return null;
  };
  const renderContent = () => /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$1B("content"))
  }, iconPosition === "left" && renderIcon(), renderText(), iconPosition === "right" && renderIcon());
  return /* @__PURE__ */ React.createElement(TagElement, {
    disabled,
    className: classes,
    style,
    type: nativeType,
    onClick
  }, renderContent());
};
const [bem$1A] = createNamespace("button-group");
const ButtonGroup = ({
  className,
  style,
  children,
  onClick,
  ...props
}) => {
  const internalClick = (e) => {
    if (props.disabled)
      return;
    onClick == null ? void 0 : onClick(e);
  };
  return /* @__PURE__ */ React.createElement("div", {
    onClick: internalClick,
    style,
    className: clsx(
      className,
      bem$1A([
        props.type,
        {
          round: props.round,
          plain: props.plain,
          disabled: props.disabled
        }
      ]),
      props.shadow && `${SHADOW}--${+props.shadow}`
    )
  }, /* @__PURE__ */ React.createElement(ButtonContext.Provider, {
    value: { parent: props }
  }, children));
};
const Button = Object.assign(Button$1, { Group: ButtonGroup });
var index$11 = "";
const [bem$1z] = createNamespace("badge");
const Badge = (props) => {
  const { content, max, dot, showZero, tag = "div" } = props;
  const TagElement = tag;
  const hasContent = () => {
    if (props.content) {
      return true;
    }
    return isDef(content) && content !== "" && (showZero || +content !== 0);
  };
  const renderContent = () => {
    if (!dot && hasContent()) {
      if (isDef(max) && isNumeric(content == null ? void 0 : content.toString()) && +content > max) {
        return `${max}+`;
      }
      return content;
    }
    return null;
  };
  const renderBadge = () => {
    if (hasContent() || props.dot) {
      let style = {
        background: props.color
      };
      if (props.offset) {
        const [x, y] = props.offset;
        if (props.children) {
          style.top = addUnit(y);
          style.right = addUnit(x);
        } else {
          style.marginTop = addUnit(y);
          style.marginLeft = addUnit(x);
        }
      }
      if (!props.children) {
        style = { ...props.style, ...style };
      }
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(
          {
            [props.className]: props.className && !props.children
          },
          bem$1z({ dot: props.dot, fixed: !!props.children })
        ),
        style
      }, renderContent());
    }
    return null;
  };
  if (props.children) {
    return /* @__PURE__ */ React.createElement(TagElement, {
      className: clsx(bem$1z("wrapper"), props.className),
      style: props.style,
      onClick: props.onClick,
      onTouchStart: props.onTouchStart
    }, props.children, renderBadge());
  }
  return renderBadge();
};
Badge.defaultProps = {
  tag: "div",
  showZero: true
};
var index$10 = "";
var index$$ = "";
const [bem$1y] = createNamespace("cell-group");
const CellGroup = (props) => {
  const { title, border, inset: insetP, card } = props;
  const inset = card || insetP;
  const renderGroup = () => /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$1y({ inset }), {
      [BORDER_TOP_BOTTOM]: !inset && border
    })
  }, props.children);
  const renderTitle = () => {
    if (title)
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$1y("title"))
      }, title);
    return null;
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: props.className,
    style: props.style
  }, renderTitle(), renderGroup());
};
CellGroup.defaultProps = {
  border: true
};
const [bem$1x] = createNamespace("cell");
const Cell$1 = (props) => {
  const renderLabel = () => {
    const showLabel = isDef(props.label);
    if (showLabel) {
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$1x("label"), props.labelClass)
      }, props.label);
    }
    return null;
  };
  const renderTitle = () => {
    if (isDef(props.title)) {
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$1x("title"), props.titleClass),
        style: props.titleStyle
      }, props.title, renderLabel());
    }
    return null;
  };
  const renderValue = () => {
    const hasTitle = isDef(props.title);
    const hasValue = props.children || isDef(props.value);
    if (hasValue) {
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$1x("value", { alone: !hasTitle }), props.valueClass)
      }, props.children ? props.children : /* @__PURE__ */ React.createElement("span", null, props.value));
    }
    return null;
  };
  const renderLeftIcon = () => {
    if (props.icon) {
      return React.cloneElement(props.icon, {
        className: clsx(bem$1x("left-icon"))
      });
    }
    return null;
  };
  const renderRightIcon = () => {
    if (props.rightIcon) {
      return props.rightIcon;
    }
    if (props.isLink) {
      const className2 = clsx(bem$1x("right-icon"));
      if (props.arrowDirection === "left")
        return /* @__PURE__ */ React.createElement(ArrowLeft, {
          className: className2
        });
      if (props.arrowDirection === "up")
        return /* @__PURE__ */ React.createElement(ArrowUp, {
          className: className2
        });
      if (props.arrowDirection === "down")
        return /* @__PURE__ */ React.createElement(ArrowDown, {
          className: className2
        });
      return /* @__PURE__ */ React.createElement(Arrow, {
        className: className2
      });
    }
    return null;
  };
  const {
    className,
    style,
    size,
    center,
    border = true,
    isLink,
    required,
    onClick
  } = props;
  const clickable = isLink || props.clickable;
  const classes = {
    center,
    required,
    clickable,
    borderless: !border
  };
  if (size) {
    classes[size] = !!size;
  }
  return /* @__PURE__ */ React.createElement("div", {
    style,
    className: clsx(bem$1x(classes), className),
    role: clickable ? "button" : void 0,
    onClick
  }, renderLeftIcon(), renderTitle(), renderValue(), renderRightIcon(), props.extra);
};
const Cell = Object.assign(Cell$1, { Group: CellGroup });
var index$_ = "";
var index$Z = "";
var index$Y = "";
const [bem$1w] = createNamespace("overlay");
const Overlay = (props) => {
  const nodeRef = useRef(null);
  const { visible, duration } = props;
  const preventTouchMove = (event) => {
    if (!props.lockScroll)
      return;
    preventDefault(event, true);
  };
  const renderOverlay = () => {
    const style = {
      zIndex: props.zIndex !== void 0 ? +props.zIndex : void 0,
      touchAction: props.lockScroll && "none",
      ...props.style,
      ...props.customStyle
    };
    if (isDef(duration)) {
      style.animationDuration = `${duration}ms`;
    }
    return withStopPropagation(
      props.stopPropagation,
      /* @__PURE__ */ React.createElement("div", {
        ref: nodeRef,
        style,
        onClick: (e) => {
          var _a;
          if (e.target === e.currentTarget) {
            (_a = props.onClick) == null ? void 0 : _a.call(props, e);
          }
        },
        className: clsx(bem$1w(), props.className)
      }, props.children)
    );
  };
  useEventListener("touchmove", preventTouchMove, { target: nodeRef });
  return /* @__PURE__ */ React.createElement(CSSTransition, {
    nodeRef,
    mountOnEnter: true,
    unmountOnExit: true,
    in: visible,
    timeout: duration,
    classNames: "rv-fade"
  }, renderOverlay());
};
Overlay.defaultProps = {
  stopPropagation: ["click"],
  lockScroll: true,
  duration: 300
};
function callInterceptor(options) {
  const { interceptor, args, done, canceled } = options;
  if (interceptor) {
    const returnVal = interceptor.apply(null, args || []);
    if (isPromise(returnVal)) {
      returnVal.then((value) => {
        if (value) {
          done();
        } else if (canceled) {
          canceled();
        }
      }).catch(noop);
    } else if (returnVal) {
      done();
    } else if (canceled) {
      canceled();
    }
  } else {
    done();
  }
}
function resolveContainer(getContainer) {
  const container = typeof getContainer === "function" ? getContainer() : getContainer;
  return container || document.body;
}
function canUseDom() {
  return !!(typeof window !== "undefined" && window.document && window.document.createElement);
}
function renderToContainer(getContainer, node) {
  if (canUseDom() && getContainer) {
    const container = resolveContainer(getContainer);
    return createPortal(node, container);
  }
  return node;
}
const PopupContext = createContext({});
let supportsPassive = false;
if (canUseDom()) {
  try {
    const opts = {};
    Object.defineProperty(opts, "passive", {
      get() {
        supportsPassive = true;
      }
    });
    window.addEventListener("test-passive", null, opts);
  } catch (e) {
  }
}
let totalLockCount = 0;
const BODY_LOCK_CLASS = "rv-overflow-hidden";
function useLockScroll(rootRef, shouldLock) {
  const touch = useTouch();
  const onTouchMove = (event) => {
    touch.move(event);
    const direction = touch.deltaY.current > 0 ? "10" : "01";
    const el = getScrollParent(
      event.target,
      rootRef.current
    );
    if (!el)
      return;
    const { scrollHeight, offsetHeight, scrollTop } = el;
    let status = "11";
    if (scrollTop === 0) {
      status = offsetHeight >= scrollHeight ? "00" : "01";
    } else if (scrollTop + offsetHeight >= scrollHeight) {
      status = "10";
    }
    if (status !== "11" && touch.isVertical() && !(parseInt(status, 2) & parseInt(direction, 2))) {
      if (event.cancelable) {
        event.preventDefault();
      }
    }
  };
  const lock = () => {
    document.addEventListener("touchstart", touch.start);
    document.addEventListener(
      "touchmove",
      onTouchMove,
      supportsPassive ? { passive: false } : false
    );
    if (!totalLockCount) {
      document.body.classList.add(BODY_LOCK_CLASS);
    }
    totalLockCount++;
  };
  const unlock = () => {
    if (totalLockCount) {
      document.removeEventListener("touchstart", touch.start);
      document.removeEventListener("touchmove", onTouchMove);
      totalLockCount--;
      if (!totalLockCount) {
        document.body.classList.remove(BODY_LOCK_CLASS);
      }
    }
  };
  useEffect(() => {
    if (shouldLock) {
      lock();
      return () => {
        unlock();
      };
    }
  }, [shouldLock]);
}
const sharedPopupProps = [
  "round",
  "zIndex",
  "closeable",
  "overlay",
  "overlayClass",
  "overlayStyle",
  "destroyOnClose",
  "forceRender",
  "lockScroll",
  "duration",
  "transition",
  "closeOnClickOverlay",
  "closeOnPopstate",
  "onClickOverlay",
  "safeAreaInsetBottom",
  "onOpen",
  "onClose",
  "onOpened",
  "onClosed",
  "beforeClose"
];
let globalZIndex = 2e3;
const [bem$1v] = createNamespace("popup");
const Popup = forwardRef((props, ref) => {
  var _a;
  const {
    round,
    closeable,
    title,
    description,
    children,
    duration,
    closeIcon,
    position
  } = props;
  const opened = useRef(false);
  const zIndex = useRef((_a = props.zIndex) != null ? _a : globalZIndex);
  const popupRef = useRef();
  const [visible, setVisible] = useState(props.visible);
  const [animatedVisible, setAnimatedVisible] = useState(visible);
  const style = useMemo(() => {
    const initStyle = {
      zIndex: zIndex.current,
      ...props.style
    };
    if (isDef(props.duration)) {
      const key = props.position === "center" ? "animationDuration" : "transitionDuration";
      initStyle[key] = `${props.duration}ms`;
    }
    return initStyle;
  }, [zIndex.current, props.position, props.style, props.duration]);
  const open2 = () => {
    var _a2;
    if (props.zIndex !== void 0) {
      zIndex.current = +props.zIndex;
    } else {
      zIndex.current = globalZIndex++;
    }
    opened.current = true;
    (_a2 = props.onOpen) == null ? void 0 : _a2.call(props);
  };
  const close = () => {
    callInterceptor({
      interceptor: props.beforeClose,
      args: ["close"],
      done: () => {
        var _a2;
        opened.current = false;
        (_a2 = props.onClose) == null ? void 0 : _a2.call(props);
      }
    });
  };
  const onClickOverlay = (event) => {
    var _a2;
    (_a2 = props.onClickOverlay) == null ? void 0 : _a2.call(props, event);
    if (props.closeOnClickOverlay) {
      close();
    }
  };
  const renderOverlay = () => {
    if (props.overlay) {
      return /* @__PURE__ */ React.createElement(Overlay, {
        visible,
        className: props.overlayClass,
        customStyle: props.overlayStyle,
        zIndex: zIndex.current,
        duration,
        onClick: onClickOverlay
      });
    }
    return null;
  };
  const onClickCloseIcon = (e) => {
    if (props.onClickCloseIcon) {
      props.onClickCloseIcon(e);
    }
    close();
  };
  const renderCloseIcon = () => {
    if (closeable) {
      const { closeIconPosition } = props;
      if (closeIcon) {
        return /* @__PURE__ */ React.createElement("div", {
          className: clsx(bem$1v("close-icon", closeIconPosition)),
          onClick: onClickCloseIcon
        }, closeIcon);
      }
      return null;
    }
    return null;
  };
  const renderTitle = () => {
    if (title) {
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$1v("title"))
      }, title);
    }
    return null;
  };
  const renderDescription = () => {
    if (description) {
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$1v("description"))
      }, description);
    }
    return null;
  };
  const renderPopup = () => {
    const { safeAreaInsetBottom } = props;
    return withStopPropagation(
      props.stopPropagation,
      /* @__PURE__ */ React.createElement("div", {
        ref: popupRef,
        style: {
          ...style,
          display: !visible && !animatedVisible ? "none" : void 0
        },
        className: clsx(
          bem$1v({
            round,
            [position]: position
          }),
          { "rv-safe-area-bottom": safeAreaInsetBottom },
          props.className
        ),
        onClick: props.onClick
      }, renderTitle(), renderDescription(), children, renderCloseIcon())
    );
  };
  const renderTransition = () => {
    const { transition, destroyOnClose, forceRender } = props;
    const name = position === "center" ? "rv-fade" : `rv-popup-slide-${position}`;
    return /* @__PURE__ */ React.createElement(CSSTransition, {
      in: visible,
      nodeRef: popupRef,
      timeout: duration,
      classNames: transition || name,
      mountOnEnter: !forceRender,
      unmountOnExit: destroyOnClose,
      onEnter: open2,
      onEntered: props.onOpened,
      onExited: () => {
        var _a2;
        setAnimatedVisible(false);
        (_a2 = props.onClosed) == null ? void 0 : _a2.call(props);
      }
    }, renderPopup());
  };
  useEventListener("popstate", () => {
    if (props.closeOnPopstate) {
      close();
    }
  });
  useIsomorphicLayoutEffect(() => {
    if (visible) {
      setAnimatedVisible(true);
    }
  }, [visible]);
  useIsomorphicLayoutEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);
  useLockScroll(popupRef, visible && props.lockScroll);
  useImperativeHandle(ref, () => ({
    popupRef
  }));
  return renderToContainer(
    props.teleport,
    /* @__PURE__ */ React.createElement(PopupContext.Provider, {
      value: { visible }
    }, renderOverlay(), renderTransition())
  );
});
Popup.defaultProps = {
  duration: 300,
  overlay: true,
  lockScroll: true,
  position: "center",
  closeIcon: /* @__PURE__ */ React.createElement(Cross, null),
  closeIconPosition: "top-right",
  closeOnClickOverlay: true,
  stopPropagation: ["click"],
  teleport: () => document.body
};
var index$X = "";
const ActionButtonContext = createContext({});
const [bem$1u] = createNamespace("action-bar");
const ActionBar$1 = (props) => {
  const children = useMemo(
    () => React.Children.toArray(props.children),
    [props.children]
  );
  return /* @__PURE__ */ React.createElement(ActionButtonContext.Provider, {
    value: { parent: { children } }
  }, /* @__PURE__ */ React.createElement("div", {
    className: clsx(props.className, bem$1u(), {
      "rv-safe-area-bottom": props.safeAreaInsetBottom
    }),
    style: props.style
  }, React.Children.toArray(props.children).filter(Boolean).map(
    (child, index2) => React.cloneElement(child, {
      index: index2
    })
  )));
};
ActionBar$1.defaultProps = {
  safeAreaInsetBottom: true
};
const [bem$1t] = createNamespace("action-bar-icon");
const ActionBarIcon = (props) => {
  const renderIcon = () => {
    const { badge, icon } = props;
    if (icon) {
      return /* @__PURE__ */ React.createElement(Badge, {
        ...badge,
        className: clsx(bem$1t("icon"))
      }, icon);
    }
    return null;
  };
  return /* @__PURE__ */ React.createElement("div", {
    role: "button",
    className: clsx(props.className, bem$1t()),
    style: props.style,
    tabIndex: 0,
    onClick: props.onClick
  }, renderIcon(), props.children || props.text);
};
const [bem$1s] = createNamespace("action-bar-button");
const ActionBarButton = (props) => {
  const { type, icon, text, color, loading, disabled, index: index2 } = props;
  const { parent } = useContext(ActionButtonContext);
  const isFirst = useMemo(() => {
    if (parent) {
      const prev2 = parent.children[index2 - 1];
      return !(prev2 && "isButton" in prev2.type);
    }
    return false;
  }, [index2, parent]);
  const isLast = useMemo(() => {
    if (parent) {
      const next = parent.children[index2 + 1];
      return !(next && "isButton" in next.type);
    }
    return false;
  }, [index2, parent]);
  return /* @__PURE__ */ React.createElement(Button, {
    className: clsx(
      props.className,
      bem$1s([
        type,
        {
          last: isLast,
          first: isFirst
        }
      ])
    ),
    style: props.style,
    size: "large",
    type,
    icon,
    color,
    loading,
    disabled,
    onClick: props.onClick
  }, props.children ? props.children : text);
};
const ActionBarButtonNameSpace = Object.assign(ActionBarButton, {
  isButton: true
});
const ActionBar = Object.assign(ActionBar$1, {
  Icon: ActionBarIcon,
  Button: ActionBarButtonNameSpace
});
function assignKey(to, from, key) {
  const val = from[key];
  if (!isDef(val)) {
    return;
  }
  if (!Object.prototype.hasOwnProperty.call(to, key) || !isObject(val)) {
    to[key] = val;
  } else {
    to[key] = deepAssign(Object(to[key]), from[key]);
  }
}
function deepAssign(to, from) {
  Object.keys(from).forEach((key) => {
    assignKey(to, from, key);
  });
  return to;
}
const base = {
  name: "\u59D3\u540D",
  tel: "\u7535\u8BDD",
  save: "\u4FDD\u5B58",
  confirm: "\u786E\u8BA4",
  cancel: "\u53D6\u6D88",
  delete: "\u5220\u9664",
  loading: "\u52A0\u8F7D\u4E2D...",
  noCoupon: "\u6682\u65E0\u4F18\u60E0\u5238",
  nameEmpty: "\u8BF7\u586B\u5199\u59D3\u540D",
  telInvalid: "\u8BF7\u586B\u5199\u6B63\u786E\u7684\u7535\u8BDD",
  vanCalendar: {
    end: "\u7ED3\u675F",
    start: "\u5F00\u59CB",
    title: "\u65E5\u671F\u9009\u62E9",
    confirm: "\u786E\u5B9A",
    startEnd: "\u5F00\u59CB/\u7ED3\u675F",
    weekdays: ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"],
    monthTitle: (year, month) => `${year}\u5E74${month}\u6708`,
    rangePrompt: (maxRange) => `\u6700\u591A\u9009\u62E9 ${maxRange} \u5929`
  },
  vanPicker: {
    select: "\u8BF7\u9009\u62E9"
  },
  vanContactCard: {
    addText: "\u6DFB\u52A0\u8054\u7CFB\u4EBA"
  },
  vanContactList: {
    addText: "\u65B0\u5EFA\u8054\u7CFB\u4EBA"
  },
  vanPagination: {
    prev: "\u4E0A\u4E00\u9875",
    next: "\u4E0B\u4E00\u9875"
  },
  vanPullRefresh: {
    pulling: "\u4E0B\u62C9\u5373\u53EF\u5237\u65B0...",
    loosing: "\u91CA\u653E\u5373\u53EF\u5237\u65B0...",
    loading: "\u52A0\u8F7D\u4E2D..."
  },
  vanSubmitBar: {
    label: "\u5408\u8BA1\uFF1A"
  },
  vanCoupon: {
    unlimited: "\u65E0\u4F7F\u7528\u95E8\u69DB",
    discount: (discount) => `${discount}\u6298`,
    condition: (condition) => `\u6EE1${condition}\u5143\u53EF\u7528`
  },
  vanCouponCell: {
    title: "\u4F18\u60E0\u5238",
    count: (count) => `${count}\u5F20\u53EF\u7528`
  },
  vanCouponList: {
    exchange: "\u5151\u6362",
    close: "\u4E0D\u4F7F\u7528\u4F18\u60E0\u5238",
    enable: "\u53EF\u7528",
    disabled: "\u4E0D\u53EF\u7528",
    placeholder: "\u8BF7\u8F93\u5165\u4F18\u60E0\u7801"
  },
  vanAddressEdit: {
    area: "\u5730\u533A",
    postal: "\u90AE\u653F\u7F16\u7801",
    areaEmpty: "\u8BF7\u9009\u62E9\u5730\u533A",
    addressEmpty: "\u8BF7\u586B\u5199\u8BE6\u7EC6\u5730\u5740",
    postalEmpty: "\u90AE\u653F\u7F16\u7801\u4E0D\u6B63\u786E",
    defaultAddress: "\u8BBE\u4E3A\u9ED8\u8BA4\u6536\u8D27\u5730\u5740"
  },
  vanAddressEditDetail: {
    label: "\u8BE6\u7EC6\u5730\u5740",
    placeholder: "\u8857\u9053\u95E8\u724C\u4FE1\u606F"
  },
  vanAddressList: {
    add: "\u65B0\u589E\u5730\u5740"
  }
};
const zhCN = deepAssign(base, {});
const INITIAL_STATE$1 = {
  locale: zhCN
};
const ConfigProvider$1 = createContext(INITIAL_STATE$1);
const [bem$1r] = createNamespace("dialog");
const Dialog$1 = (props) => {
  const { locale } = useContext(ConfigProvider$1);
  const {
    width,
    title,
    theme,
    visible,
    message,
    className,
    messageAlign,
    closeOnClickOverlay,
    onClickCloseIcon,
    ...others
  } = props;
  const renderTitle = () => {
    if (props.title) {
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(
          bem$1r("header", {
            isolated: !props.message && !props.children
          })
        )
      }, title);
    }
    return null;
  };
  const renderContent = () => {
    if (props.children) {
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$1r("content"))
      }, props.children);
    }
    if (message) {
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$1r("content", { isolated: !title }))
      }, /* @__PURE__ */ React.createElement("div", {
        className: clsx(
          bem$1r("message", {
            "has-title": title,
            [messageAlign]: messageAlign
          })
        )
      }, message));
    }
    return null;
  };
  const renderButtons = () => {
    var _a, _b, _c, _d, _e, _f;
    return /* @__PURE__ */ React.createElement("div", {
      className: clsx(bem$1r("footer"))
    }, props.showCancelButton && /* @__PURE__ */ React.createElement(Button, {
      size: "large",
      text: props.cancelButtonText || locale.cancel,
      className: clsx(bem$1r("cancel")),
      style: { color: props.cancelButtonColor },
      loading: (_a = props.cancelProps) == null ? void 0 : _a.loading,
      disabled: (_b = props.cancelProps) == null ? void 0 : _b.disabled,
      onClick: ((_c = props.cancelProps) == null ? void 0 : _c.loading) ? noop : props.onCancel
    }), props.showConfirmButton && /* @__PURE__ */ React.createElement(Button, {
      size: "large",
      text: props.confirmButtonText || locale.confirm,
      className: clsx(bem$1r("confirm")),
      round: theme === "round-button",
      style: { color: props.confirmButtonColor },
      loading: (_d = props.confirmProps) == null ? void 0 : _d.loading,
      disabled: (_e = props.confirmProps) == null ? void 0 : _e.disabled,
      onClick: ((_f = props.confirmProps) == null ? void 0 : _f.loading) ? noop : props.onConfirm
    }));
  };
  const renderRoundButtons = () => {
    var _a, _b, _c, _d, _e, _f;
    return /* @__PURE__ */ React.createElement(ActionBar, {
      className: clsx(bem$1r("footer"))
    }, props.showCancelButton && /* @__PURE__ */ React.createElement(ActionBar.Button, {
      type: "warning",
      text: props.cancelButtonText || locale.cancel,
      className: clsx(bem$1r("cancel")),
      color: props.cancelButtonColor,
      loading: (_a = props.cancelProps) == null ? void 0 : _a.loading,
      disabled: (_b = props.cancelProps) == null ? void 0 : _b.disabled,
      onClick: ((_c = props.cancelProps) == null ? void 0 : _c.loading) ? noop : props.onCancel
    }), props.showConfirmButton && /* @__PURE__ */ React.createElement(ActionBar.Button, {
      type: "danger",
      text: props.confirmButtonText || locale.confirm,
      className: clsx(bem$1r("confirm")),
      color: props.confirmButtonColor,
      loading: (_d = props.confirmProps) == null ? void 0 : _d.loading,
      disabled: (_e = props.confirmProps) == null ? void 0 : _e.disabled,
      onClick: ((_f = props.confirmProps) == null ? void 0 : _f.loading) ? noop : props.onConfirm
    }));
  };
  const renderFooter = () => {
    if (props.footer)
      return props.footer;
    return props.theme === "round-button" ? renderRoundButtons() : renderButtons();
  };
  return /* @__PURE__ */ React.createElement(Popup, {
    ...others,
    visible,
    className: clsx(bem$1r([theme]), className),
    style: { width: addUnit(width) },
    "aria-labelledby": title || message,
    closeOnClickOverlay,
    onClickCloseIcon,
    onClose: props.onClose,
    onClosed: props.onClosed
  }, renderTitle(), renderContent(), renderFooter());
};
Dialog$1.defaultProps = {
  transition: "rv-dialog-bounce",
  showConfirmButton: true,
  closeOnPopstate: true
};
Number((version || "").split(".")[0]);
const reactDomVersion = Number((version$1 || "").split(".")[0]);
const fullClone = {
  ...ReactDOM
};
const { render: reactRender, unmountComponentAtNode } = fullClone;
let createRoot;
try {
  if (reactDomVersion >= 18 && fullClone.createRoot) {
    createRoot = fullClone.createRoot;
  }
} catch (e) {
}
function toggleWarning(skip) {
  const { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } = fullClone;
  if (__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED && typeof __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED === "object") {
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.usingClientEntryPoint = skip;
  }
}
const MARK = "__react_vant_root__";
function legacyRender(node, container) {
  reactRender(node, container);
}
function concurrentRender(node, container) {
  toggleWarning(true);
  const root2 = container[MARK] || createRoot(container);
  toggleWarning(false);
  root2.render(node);
  container[MARK] = root2;
}
function render(node, container) {
  if (createRoot) {
    concurrentRender(node, container);
    return;
  }
  legacyRender(node, container);
}
function legacyUnmount(container) {
  return unmountComponentAtNode(container);
}
async function concurrentUnmount(container) {
  return Promise.resolve().then(() => {
    var _a;
    (_a = container[MARK]) == null ? void 0 : _a.unmount();
    delete container[MARK];
  });
}
function unmount(container) {
  if (createRoot) {
    return concurrentUnmount(container);
  }
  return legacyUnmount(container);
}
const Dialog = Dialog$1;
Dialog.show = (props) => {
  if (!canUseDom())
    return null;
  const defaultOptions2 = {
    overlay: true,
    closeable: false,
    closeIcon: /* @__PURE__ */ React.createElement(Cross, null),
    lockScroll: true,
    transition: "rv-dialog-bounce",
    showConfirmButton: true,
    showCancelButton: false,
    closeOnClickOverlay: false
  };
  const {
    onClosed,
    onCancel = noop,
    onConfirm = noop,
    onClose = noop,
    cancelProps,
    confirmProps,
    ...restProps
  } = props;
  const userContainer = resolveContainer(props.teleport);
  const container = document.createElement("div");
  userContainer.appendChild(container);
  let destroy = noop;
  const TempDialog = () => {
    const [visible, setVisible] = useState(false);
    const [cancelLoading, setCancelLoading] = useState(false);
    const [okLoading, setOkLoading] = useState(false);
    useEffect(() => {
      setVisible(true);
    }, []);
    destroy = () => {
      setVisible(false);
      if (onClose)
        onClose();
    };
    const _afterClose = () => {
      if (onClosed) {
        onClosed();
      }
      const unmountResult = unmount(container);
      if (unmountResult && container.parentNode) {
        container.parentNode.removeChild(container);
      }
    };
    const _onConfirm = async (e) => {
      const i = setTimeout(() => setOkLoading(true));
      if (await onConfirm(e) !== false) {
        clearTimeout(i);
        destroy();
      } else {
        clearTimeout(i);
        setOkLoading(false);
      }
    };
    const _onCancel = async (e, clickOverlay) => {
      if (clickOverlay) {
        destroy();
        return;
      }
      const i = setTimeout(() => setCancelLoading(true));
      if (await onCancel(e) !== false) {
        clearTimeout(i);
        destroy();
      } else {
        clearTimeout(i);
        setCancelLoading(false);
      }
    };
    return /* @__PURE__ */ React.createElement(Dialog$1, {
      ...defaultOptions2,
      ...restProps,
      visible,
      teleport: () => container,
      cancelProps: { loading: cancelLoading, ...cancelProps },
      confirmProps: { loading: okLoading, ...confirmProps },
      onClose: destroy,
      onCancel: _onCancel,
      onConfirm: _onConfirm,
      onClosed: _afterClose
    });
  };
  render(/* @__PURE__ */ React.createElement(TempDialog, null), container);
  return destroy;
};
Dialog.alert = (props) => {
  const { onConfirm = noop } = props;
  return new Promise((resolve) => {
    Dialog.show({
      ...props,
      onConfirm: (e) => {
        onConfirm(e);
        resolve(e);
      }
    });
  });
};
Dialog.confirm = (props) => {
  const { onCancel = noop, onConfirm = noop } = props;
  return new Promise((resolve, reject) => {
    Dialog.show({
      showCancelButton: true,
      ...props,
      onCancel: (e) => {
        onCancel(e);
        reject();
      },
      onConfirm: (e) => {
        onConfirm(e);
        resolve(true);
      }
    });
  });
};
const [bem$1q] = createNamespace("input");
const Input$1 = forwardRef((props, ref) => {
  const inputRef = useRef();
  const [inputFocus, setInputFocus] = useState(false);
  const compositionStartRef = useRef(false);
  const [value, setValue] = usePropsValue(props);
  const {
    className,
    style,
    align,
    type,
    name,
    placeholder,
    disabled,
    readOnly,
    maxLength,
    autoFocus
  } = props;
  const focus = () => {
    if (inputRef == null ? void 0 : inputRef.current) {
      inputRef.current.focus();
    }
  };
  const blur = () => {
    if (inputRef == null ? void 0 : inputRef.current) {
      inputRef.current.blur();
    }
  };
  useImperativeHandle(ref, () => ({
    clear: () => {
      setValue("");
    },
    focus,
    blur,
    get nativeElement() {
      return inputRef.current;
    }
  }));
  const showClear = useMemo(() => {
    if (props.clearable && !readOnly) {
      const hasValue = value !== "";
      const trigger = props.clearTrigger === "always" || props.clearTrigger === "focus" && inputFocus;
      return hasValue && trigger;
    }
    return false;
  }, [value, props.clearTrigger, inputFocus]);
  const handleChange = (e) => {
    var _a, _b;
    const inputValue = (_a = e == null ? void 0 : e.currentTarget) == null ? void 0 : _a.value;
    let finalValue = inputValue;
    if (isDef(maxLength) && finalValue.length > +maxLength) {
      finalValue = finalValue.slice(0, maxLength);
      (_b = props.onOverlimit) == null ? void 0 : _b.call(props);
    }
    if (type === "number" || type === "digit") {
      const isNumber = type === "number";
      finalValue = formatNumber(finalValue, isNumber, isNumber);
    }
    setValue(finalValue);
  };
  const handleFocus = (e) => {
    var _a;
    setInputFocus(true);
    (_a = props.onFocus) == null ? void 0 : _a.call(props, e);
    if (readOnly) {
      blur();
    }
  };
  const handleBulr = (e) => {
    var _a;
    setInputFocus(false);
    (_a = props.onBlur) == null ? void 0 : _a.call(props, e);
    resetScroll();
  };
  const handleKeyPress = (e) => {
    var _a;
    if (e.key === "Enter" || +e.charCode === 13) {
      preventDefault(e);
      if (props.type === "search") {
        blur();
      }
    }
    (_a = props.onKeyPress) == null ? void 0 : _a.call(props, e);
  };
  const renderInput = () => {
    let inputType = type;
    let inputMode;
    if (type === "number") {
      inputType = "text";
      inputMode = "decimal";
    }
    if (type === "digit") {
      inputType = "tel";
      inputMode = "numeric";
    }
    return /* @__PURE__ */ React.createElement("input", {
      value,
      type: inputType,
      inputMode,
      ref: inputRef,
      name,
      className: clsx(bem$1q("control")),
      disabled,
      autoFocus,
      readOnly,
      placeholder: placeholder || "",
      onBlur: handleBulr,
      onFocus: handleFocus,
      onChange: handleChange,
      onKeyPress: handleKeyPress,
      autoCapitalize: props.autoCapitalize,
      autoCorrect: props.autoCorrect,
      onKeyDown: props.onKeyDown,
      onKeyUp: props.onKeyUp,
      onCompositionStart: (e) => {
        var _a;
        compositionStartRef.current = true;
        (_a = props.onCompositionStart) == null ? void 0 : _a.call(props, e);
      },
      onCompositionEnd: (e) => {
        var _a;
        compositionStartRef.current = false;
        (_a = props.onCompositionEnd) == null ? void 0 : _a.call(props, e);
      },
      onClick: props.onClick
    });
  };
  const handleClear = (e) => {
    var _a;
    setValue("");
    (_a = props.onClear) == null ? void 0 : _a.call(props, e);
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$1q([align]), className),
    style
  }, props.prefix && /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$1q("prefix"))
  }, props.prefix), renderInput(), showClear && React.cloneElement(props.clearIcon, {
    className: clsx(bem$1q("clear")),
    onTouchStart: handleClear
  }), props.suffix && /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$1q("suffix"))
  }, props.suffix));
});
Input$1.defaultProps = {
  clearIcon: /* @__PURE__ */ React.createElement(Clear, null),
  clearTrigger: "focus",
  defaultValue: ""
};
const [bem$1p] = createNamespace("textarea");
const TextArea = forwardRef((props, ref) => {
  const [hasFocus, setHasFocus] = useState(false);
  const nativeTextAreaRef = useRef();
  const compositionStartRef = useRef(false);
  const [value, setValue] = usePropsValue(props);
  const {
    className,
    style,
    name,
    rows,
    placeholder,
    disabled,
    readOnly,
    maxLength,
    showWordLimit,
    autoFocus
  } = props;
  const focus = () => {
    if (nativeTextAreaRef == null ? void 0 : nativeTextAreaRef.current) {
      nativeTextAreaRef.current.focus();
    }
  };
  const blur = () => {
    if (nativeTextAreaRef == null ? void 0 : nativeTextAreaRef.current) {
      nativeTextAreaRef.current.blur();
    }
  };
  useImperativeHandle(ref, () => ({
    clear: () => {
      setValue("");
    },
    focus,
    blur,
    get nativeElement() {
      return nativeTextAreaRef.current;
    }
  }));
  const adjustSize = () => {
    const input = nativeTextAreaRef.current;
    if (!input)
      return;
    input.style.height = "auto";
    let height = input.scrollHeight;
    if (isObject(props.autoSize)) {
      const { maxHeight, minHeight } = props.autoSize;
      if (maxHeight) {
        height = Math.min(height, maxHeight);
      }
      if (minHeight) {
        height = Math.max(height, minHeight);
      }
    }
    if (height) {
      input.style.height = `${height}px`;
    }
  };
  useEffect(() => {
    adjustSize();
  }, [value]);
  const controlClass = React.useMemo(() => {
    return bem$1p("control", [
      {
        "min-height": !props.autoSize,
        clear: props.clearable
      }
    ]);
  }, [props.autoSize]);
  const handleChange = (e) => {
    var _a;
    const inputValue = (_a = e == null ? void 0 : e.currentTarget) == null ? void 0 : _a.value;
    let finalValue = inputValue;
    if (isDef(maxLength) && finalValue.length > +maxLength) {
      finalValue = finalValue.slice(0, maxLength);
    }
    setValue(finalValue);
  };
  const handleFocus = (e) => {
    var _a;
    setHasFocus(true);
    (_a = props.onFocus) == null ? void 0 : _a.call(props, e);
    if (readOnly) {
      blur();
    }
  };
  const handleBulr = (e) => {
    var _a;
    setHasFocus(false);
    (_a = props.onBlur) == null ? void 0 : _a.call(props, e);
    resetScroll();
  };
  const renderWordLimit = () => {
    if (showWordLimit) {
      const currentCount = (value ? `${value}` : "").length;
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$1p("word-limit"))
      }, typeof showWordLimit === "function" ? showWordLimit({ currentCount, maxLength }) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", {
        className: clsx(bem$1p("word-num"))
      }, currentCount), maxLength ? `/${maxLength}` : false));
    }
    return null;
  };
  const handleClear = (e) => {
    var _a;
    setValue("");
    (_a = props.onClear) == null ? void 0 : _a.call(props, e);
  };
  const showClear = useMemo(() => {
    if (props.clearable && !readOnly) {
      const hasValue = value !== "";
      const trigger = props.clearTrigger === "always" || props.clearTrigger === "focus" && hasFocus;
      return hasValue && trigger;
    }
    return false;
  }, [value, props.clearTrigger, hasFocus]);
  return /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$1p(), className),
    style
  }, /* @__PURE__ */ React.createElement("textarea", {
    ref: nativeTextAreaRef,
    name,
    rows,
    className: clsx(controlClass),
    value,
    disabled,
    autoFocus,
    readOnly,
    placeholder: placeholder || "",
    onBlur: handleBulr,
    onFocus: handleFocus,
    onChange: handleChange,
    onKeyPress: props.onKeyPress,
    onKeyDown: props.onKeyDown,
    onKeyUp: props.onKeyUp,
    autoComplete: props.autoComplete,
    onCompositionStart: (e) => {
      var _a;
      compositionStartRef.current = true;
      (_a = props.onCompositionStart) == null ? void 0 : _a.call(props, e);
    },
    onCompositionEnd: (e) => {
      var _a;
      compositionStartRef.current = false;
      (_a = props.onCompositionEnd) == null ? void 0 : _a.call(props, e);
    },
    onClick: props.onClick
  }), showClear && React.cloneElement(props.clearIcon, {
    className: clsx(bem$1p("clear")),
    onTouchStart: handleClear
  }), renderWordLimit());
});
TextArea.defaultProps = {
  rows: 2,
  clearIcon: /* @__PURE__ */ React.createElement(Clear, null),
  clearTrigger: "focus",
  defaultValue: ""
};
var index$W = "";
var index$V = "";
const Input = Object.assign(Input$1, { TextArea });
const [bem$1o] = createNamespace("field");
const Field = forwardRef((props, ref) => {
  var _a;
  const inputRef = useRef(null);
  const textareaRef = useRef(null);
  const elementRef = props.type === "textarea" ? textareaRef : inputRef;
  const focus = () => {
    if (elementRef.current) {
      elementRef.current.focus();
    }
  };
  const blur = () => {
    if (elementRef.current) {
      elementRef.current.blur();
    }
  };
  const clear2 = () => {
    if (elementRef.current) {
      elementRef.current.clear();
    }
  };
  useImperativeHandle(ref, () => ({
    focus,
    blur,
    clear: clear2,
    get nativeElement() {
      return elementRef.current.nativeElement;
    }
  }));
  const getProp = (key) => {
    if (isDef(props[key])) {
      return props[key];
    }
    return null;
  };
  const labelStyle = () => {
    const labelW = getProp("labelWidth");
    if (labelW) {
      return { width: addUnit(labelW) };
    }
    return {};
  };
  const formatValue2 = (inputValue, trigger = "onChange") => {
    const { formatTrigger, formatter } = props;
    if (formatter && trigger === formatTrigger) {
      return formatter(inputValue);
    }
    return inputValue;
  };
  const onChange = (val) => {
    var _a2;
    (_a2 = props.onChange) == null ? void 0 : _a2.call(props, formatValue2(val));
  };
  const renderInput = () => {
    const {
      value,
      defaultValue,
      align,
      type,
      placeholder,
      name,
      maxLength,
      disabled: disabled2,
      readOnly,
      clearable,
      clearIcon,
      clearTrigger,
      autoFocus,
      onClear,
      onBlur,
      onFocus,
      onKeyPress,
      onOverlimit
    } = props;
    if (props.children) {
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$1o("children"))
      }, props.children);
    }
    const commonProps = {
      value,
      onChange,
      placeholder,
      name,
      defaultValue,
      disabled: disabled2,
      clearable,
      clearIcon,
      clearTrigger,
      onClear,
      onBlur,
      onFocus,
      onKeyPress,
      onOverlimit,
      autoFocus,
      readOnly,
      maxLength,
      onClick: props.onClickInput
    };
    if (type === "textarea") {
      return /* @__PURE__ */ React.createElement(Input.TextArea, {
        ref: textareaRef,
        autoSize: props.autoSize,
        showWordLimit: props.showWordLimit,
        rows: props.rows,
        ...commonProps
      });
    }
    return /* @__PURE__ */ React.createElement(Input, {
      ref: inputRef,
      type,
      align,
      ...commonProps
    });
  };
  const renderLeftIcon = () => {
    const { leftIcon, onClickLeftIcon } = props;
    if (!leftIcon)
      return null;
    return /* @__PURE__ */ React.createElement("div", {
      className: clsx(bem$1o("left-icon")),
      onClick: onClickLeftIcon
    }, leftIcon);
  };
  const renderRightIcon = () => {
    const { rightIcon, onClickRightIcon } = props;
    if (!rightIcon)
      return null;
    return /* @__PURE__ */ React.createElement("div", {
      className: clsx(bem$1o("right-icon")),
      onClick: onClickRightIcon
    }, rightIcon);
  };
  const renderMessage = () => {
    const message = props.errorMessage;
    if (message) {
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$1o("error-message"))
      }, message);
    }
    return null;
  };
  const renderIntro = () => {
    if (props.intro) {
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$1o("intro"))
      }, props.intro);
    }
    return null;
  };
  const renderTooltip = () => {
    const { tooltip } = props;
    if (tooltip) {
      let icon = /* @__PURE__ */ React.createElement(QuestionO, null);
      let dialogProps = { message: tooltip };
      if (!(React.isValidElement(tooltip) || typeof tooltip === "string")) {
        const { icon: customIcon, ...customDialogProps } = tooltip;
        icon = customIcon || icon;
        dialogProps = customDialogProps;
      }
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$1o("tooltip")),
        onClick: () => Dialog.show(dialogProps)
      }, icon);
    }
    return null;
  };
  const renderLabel = () => {
    const { label, colon } = props;
    if (label) {
      return /* @__PURE__ */ React.createElement(React.Fragment, null, label, !!colon && ":", renderTooltip());
    }
    return null;
  };
  const {
    size,
    center,
    border,
    isLink,
    required,
    clickable,
    labelAlign,
    className,
    labelClass,
    valueClass,
    controlAlign,
    arrowDirection,
    disabled,
    titleStyle,
    error
  } = props;
  const suffix = (_a = props.suffix) != null ? _a : props.button;
  return /* @__PURE__ */ React.createElement(Cell, {
    title: renderLabel(),
    size,
    icon: renderLeftIcon(),
    center,
    border,
    isLink,
    required,
    clickable,
    extra: props.extra,
    titleStyle: { ...labelStyle(), ...titleStyle },
    valueClass: clsx(bem$1o("value", [controlAlign]), valueClass),
    titleClass: clsx(bem$1o("label", labelAlign), labelClass),
    arrowDirection,
    onClick: props.onClick,
    style: props.style,
    className: clsx(
      bem$1o({
        error,
        disabled,
        [`label-${labelAlign}`]: labelAlign
      }),
      className
    )
  }, /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$1o("body"))
  }, props.prefix && /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$1o("prefix"))
  }, props.prefix), /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$1o("control-wrapper"))
  }, renderInput()), renderRightIcon(), suffix && /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$1o("suffix"))
  }, suffix)), renderMessage(), renderIntro());
});
Field.defaultProps = {
  clearIcon: /* @__PURE__ */ React.createElement(Clear, null),
  clearTrigger: "focus",
  formatTrigger: "onChange",
  defaultValue: ""
};
const FIELD_KEY = Symbol("field");
const FieldNamespace = Object.assign(Field, { [COMPONENT_TYPE_KEY]: FIELD_KEY });
var index$U = "";
const FlexContext = createContext({});
const [bem$1n] = createNamespace("flexbox");
const Flex$1 = (props) => {
  const {
    direction,
    wrap,
    justify,
    align,
    gutter,
    style,
    className,
    children,
    ...rest
  } = props;
  const getGutter = useMemo(
    () => Array.isArray(gutter) ? gutter : [gutter, 0],
    [gutter]
  );
  const rowStyle = {
    ...getGutter[0] > 0 ? {
      marginLeft: getGutter[0] / -2,
      marginRight: getGutter[0] / -2
    } : {},
    ...getGutter[1] > 0 ? {
      marginTop: getGutter[1] / -2,
      marginBottom: getGutter[1] / 2
    } : {},
    ...style
  };
  const wrapCls = clsx(
    className,
    bem$1n([
      direction,
      wrap,
      justify ? `justify-${justify}` : false,
      align ? `align-${align}` : false
    ])
  );
  return /* @__PURE__ */ React.createElement(FlexContext.Provider, {
    value: { gutter: getGutter }
  }, /* @__PURE__ */ React.createElement("div", {
    className: wrapCls,
    style: rowStyle,
    ...rest
  }, children));
};
Flex$1.defaultProps = {
  gutter: 0
};
const [bem$1m] = createNamespace("flexitem");
const FlexItem = (props) => {
  const { style, className, span, children, flex, ...others } = props;
  const classes = clsx(bem$1m([span == null ? void 0 : span.toString()]), className);
  const parseFlex = (_flex) => {
    if (typeof _flex === "number") {
      return `${_flex} ${_flex} auto`;
    }
    if (/^\d+(\.\d+)?(px|em|rem|%)$/.test(_flex)) {
      return `0 0 ${_flex}`;
    }
    return _flex;
  };
  return /* @__PURE__ */ React.createElement(FlexContext.Consumer, null, ({ gutter }) => {
    let mergedStyle = { ...style };
    if (gutter) {
      mergedStyle = {
        ...gutter[0] > 0 ? {
          paddingLeft: gutter[0] / 2,
          paddingRight: gutter[0] / 2
        } : {},
        ...gutter[1] > 0 ? {
          paddingTop: gutter[1] / 2,
          paddingBottom: gutter[1] / 2
        } : {},
        ...mergedStyle
      };
    }
    if (flex) {
      mergedStyle.flex = parseFlex(flex);
    }
    return /* @__PURE__ */ React.createElement("div", {
      ...others,
      style: mergedStyle,
      className: classes
    }, children);
  });
};
const Flex = Object.assign(Flex$1, { Item: FlexItem });
var index$T = "";
const formatGap = (gap) => typeof gap === "number" ? `${gap}px` : gap;
const [bem$1l] = createNamespace("space");
const Space = (props) => {
  const { wrap, block, direction, align, justify } = props;
  const style = React.useMemo(() => {
    if (props.gap) {
      if (Array.isArray(props.gap)) {
        const [gapV, gapH] = props.gap;
        return {
          ...props.style,
          "--gap": `${formatGap(gapV)} ${formatGap(gapH)}`
        };
      }
      return {
        ...props.style,
        "--gap": formatGap(props.gap)
      };
    }
    return props.style;
  }, [props.style, props.gap]);
  const childList = useMemo(
    () => React.Children.map(props.children, (c) => c).filter(
      (c) => c !== null && c !== void 0
    ),
    [props.children]
  );
  return /* @__PURE__ */ React.createElement("div", {
    className: clsx(
      props.className,
      bem$1l({
        wrap,
        block,
        [`${direction}`]: !!direction,
        [`align-${align}`]: !!align,
        [`justify-${justify}`]: !!justify
      })
    ),
    style,
    onClick: props.onClick
  }, childList.map((child, idx) => {
    return /* @__PURE__ */ React.createElement(React.Fragment, {
      key: idx
    }, /* @__PURE__ */ React.createElement("div", {
      className: clsx(bem$1l("item"))
    }, child), !!props.divider && idx !== childList.length - 1 && /* @__PURE__ */ React.createElement("div", {
      className: clsx(bem$1l("item-divider"))
    }, props.divider));
  }));
};
Space.defaultProps = {
  direction: "horizontal"
};
var index$S = "";
const CheckMark = memo(() => {
  return /* @__PURE__ */ React.createElement("svg", {
    width: "17px",
    height: "13px",
    viewBox: "0 0 17 13",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg"
  }, /* @__PURE__ */ React.createElement("g", {
    stroke: "none",
    strokeWidth: "1",
    fill: "none",
    fillRule: "evenodd",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /* @__PURE__ */ React.createElement("g", {
    transform: "translate(-2832.000000, -1103.000000)",
    stroke: "#FFFFFF",
    strokeWidth: "3"
  }, /* @__PURE__ */ React.createElement("g", {
    transform: "translate(2610.000000, 955.000000)"
  }, /* @__PURE__ */ React.createElement("g", {
    transform: "translate(24.000000, 91.000000)"
  }, /* @__PURE__ */ React.createElement("g", {
    transform: "translate(179.177408, 36.687816)"
  }, /* @__PURE__ */ React.createElement("polyline", {
    points: "34.2767388 22 24.797043 31.4796958 21 27.6826527"
  })))))));
});
const [bem$1k] = createNamespace("selector");
const defaultProps = {
  multiple: false,
  defaultValue: [],
  showCheckMark: true
};
const Selector = (p) => {
  const props = { ...defaultProps, ...p };
  const [value, setValue] = usePropsValue({
    value: props.value,
    defaultValue: props.defaultValue,
    onChange: (val) => {
      var _a;
      const extend2 = {
        get items() {
          return props.options.filter((option) => val.includes(option.value));
        }
      };
      (_a = props.onChange) == null ? void 0 : _a.call(props, val, extend2);
    }
  });
  const items = props.options.map((option) => {
    const active = (value || []).includes(option.value);
    const disabled = option.disabled || props.disabled;
    const itemCls = clsx(
      bem$1k("item", {
        active: active && !props.multiple,
        "multiple-active": active && props.multiple,
        disabled
      })
    );
    return /* @__PURE__ */ React.createElement("div", {
      key: option.value,
      className: itemCls,
      onClick: () => {
        if (disabled) {
          return;
        }
        if (props.multiple) {
          const val = active ? value.filter((v) => v !== option.value) : [...value, option.value];
          setValue(val);
        } else {
          const val = active ? [] : [option.value];
          setValue(val);
        }
      }
    }, option.label, option.description && /* @__PURE__ */ React.createElement("div", {
      className: clsx(bem$1k("item-description"))
    }, option.description), active && props.showCheckMark && /* @__PURE__ */ React.createElement("div", {
      className: clsx(bem$1k("check-mark-wrapper"))
    }, /* @__PURE__ */ React.createElement(CheckMark, null)));
  });
  return /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$1k(), props.className),
    style: props.style
  }, items);
};
var index$R = "";
function useResizeEffect(effect, targetRef) {
  const fn = useMemoizedFn(effect);
  useIsomorphicLayoutEffect(() => {
    const target = targetRef.current;
    if (!target)
      return;
    if (window.ResizeObserver) {
      const observer = new ResizeObserver(() => {
        fn(target);
      });
      observer.observe(target);
      return () => {
        observer.disconnect();
      };
    } else {
      fn(target);
    }
  }, [targetRef]);
}
const Ellipsis = (props) => {
  const rootRef = useRef(null);
  const [ellipsised, setEllipsised] = useState({});
  const [expanded, setExpanded] = useState(false);
  const [exceeded, setExceeded] = useState(false);
  const suffixStr = useMemo(() => {
    if (props.suffixText)
      return props.suffixText;
    if (props.suffixCount > 0) {
      return props.children.slice(-props.suffixCount).trim();
    }
    return "";
  }, [props.suffixCount, props.suffixText]);
  function calcEllipsised() {
    const root2 = rootRef.current;
    if (!root2)
      return;
    const originStyle = window.getComputedStyle(root2);
    const container = document.createElement("div");
    const styleNames = Array.prototype.slice.apply(originStyle);
    styleNames.forEach((name) => {
      container.style.setProperty(name, originStyle.getPropertyValue(name));
    });
    container.style.position = "fixed";
    container.style.left = "999999px";
    container.style.top = "999999px";
    container.style.zIndex = "-1000";
    container.style.height = "auto";
    container.style.minHeight = "auto";
    container.style.maxHeight = "auto";
    container.style.textOverflow = "clip";
    container.style.whiteSpace = "normal";
    container.style.webkitLineClamp = "unset";
    container.style.display = "block";
    const lineHeight = pxToNumber(originStyle.lineHeight);
    const maxHeight = Math.floor(
      lineHeight * (props.rows + 0.5) + pxToNumber(originStyle.paddingTop) + pxToNumber(originStyle.paddingBottom)
    );
    container.innerHTML = props.children;
    document.body.appendChild(container);
    if (container.offsetHeight <= maxHeight) {
      setExceeded(false);
    } else {
      let check = function(left, right) {
        if (right - left <= 1) {
          return {
            leading: props.children.slice(0, left) + props.symbol
          };
        }
        const middle = Math.round((left + right) / 2);
        container.innerHTML = props.children.slice(0, middle) + props.symbol + suffixStr + actionText;
        if (container.offsetHeight <= maxHeight) {
          return check(middle, right);
        }
        return check(left, middle);
      };
      setExceeded(true);
      const end = props.children.length;
      const actionText = expanded ? props.collapseText : props.expandText;
      const ellipsised2 = check(0, end);
      setEllipsised(ellipsised2);
    }
    document.body.removeChild(container);
  }
  useResizeEffect(calcEllipsised, rootRef);
  useIsomorphicLayoutEffect(() => {
    calcEllipsised();
  }, [
    props.children,
    props.rows,
    suffixStr,
    props.expandText,
    props.collapseText
  ]);
  const onExpandClick = (isExpend) => {
    var _a;
    (_a = props.onExpend) == null ? void 0 : _a.call(props, isExpend);
    setExpanded(isExpend);
  };
  const expandActionElement = exceeded && props.expandText ? withStopPropagation(
    props.stopPropagationForActionButtons,
    /* @__PURE__ */ React.createElement("a", {
      onClick: () => {
        onExpandClick(true);
      }
    }, props.expandText)
  ) : null;
  const collapseActionElement = exceeded && props.expandText ? withStopPropagation(
    props.stopPropagationForActionButtons,
    /* @__PURE__ */ React.createElement("a", {
      onClick: () => {
        onExpandClick(false);
      }
    }, props.collapseText)
  ) : null;
  const renderContent = () => {
    if (!exceeded) {
      return props.children;
    }
    if (expanded) {
      return /* @__PURE__ */ React.createElement(React.Fragment, null, props.children, collapseActionElement);
    } else {
      return /* @__PURE__ */ React.createElement(React.Fragment, null, ellipsised.leading, suffixStr, expandActionElement);
    }
  };
  return /* @__PURE__ */ React.createElement("div", {
    ref: rootRef,
    className: clsx("rv-typography__ellipsis", props.className),
    style: props.style
  }, renderContent());
};
function pxToNumber(value) {
  if (!value)
    return 0;
  const match = value.match(/^\d*(\.\d*)?/);
  return match ? Number(match[0]) : 0;
}
Ellipsis.defaultProps = {
  rows: 1,
  expandText: "",
  collapseText: "",
  suffixText: "",
  symbol: "...",
  stopPropagationForActionButtons: []
};
const [bem$1j] = createNamespace("typography");
const ellipsisDefaultValue = {
  rows: 1
};
const TypographyBase = ({
  tag = "div",
  type,
  size = "md",
  level = 5,
  center,
  ellipsis,
  className,
  children,
  strong,
  underline,
  disabled,
  renderType,
  delete: del,
  ...props
}) => {
  const ellipsisNumber = useMemo(() => {
    if (typeof ellipsis === "boolean" && ellipsis)
      return 1;
    if (typeof ellipsis === "number")
      return ellipsis;
    if (isObject(ellipsis) && ellipsis.rows)
      return ellipsis.rows;
    return 0;
  }, [ellipsis]);
  const isEllipsis = !!ellipsis;
  const isCssEllipsis = useMemo(() => {
    if (typeof ellipsis === "boolean")
      return true;
    if (typeof ellipsis === "number")
      return true;
    if (isObject(ellipsis)) {
      const p = { ...ellipsisDefaultValue, ...ellipsis };
      if (!p.collapseText && !p.expandText && !p.suffixCount && !p.suffixText && !p.symbol)
        return true;
    }
    return false;
  }, [ellipsis]);
  const isEnhanceEllipsis = isEllipsis && !isCssEllipsis;
  const TagElement = useMemo(() => {
    if (renderType === "title") {
      if (level === 1)
        return "h1";
      if (level === 2)
        return "h2";
      if (level === 3)
        return "h3";
      if (level === 4)
        return "h4";
      if (level === 5)
        return "h5";
      return "h6";
    }
    return tag;
  }, [tag]);
  const measureStyle = useMemo(() => {
    const propsStyle = { ...props.style, "--rv-typography-color": props.color };
    if (isEllipsis && isCssEllipsis && ellipsisNumber > 1) {
      return { ...propsStyle, "--line-clamp": ellipsisNumber };
    }
    return propsStyle;
  }, [props.style, isCssEllipsis]);
  const renderContent = () => {
    if (isEnhanceEllipsis)
      return /* @__PURE__ */ React.createElement(Ellipsis, {
        className: clsx(
          className,
          `rv-typography__${renderType}`,
          bem$1j([
            type,
            size,
            {
              center,
              strong,
              underline,
              disabled,
              delete: del,
              [`l${level}`]: renderType === "title" && level
            }
          ])
        ),
        ...props,
        ...ellipsis,
        style: measureStyle
      }, children);
    return /* @__PURE__ */ React.createElement(TagElement, {
      className: clsx(
        className,
        `rv-typography__${renderType}`,
        bem$1j([
          type,
          size,
          {
            center,
            strong,
            underline,
            disabled,
            delete: del,
            [`l${level}`]: renderType === "title" && level
          }
        ]),
        {
          "rv-ellipsis": isEllipsis && isCssEllipsis && ellipsisNumber === 1,
          "rv-typography__ellipsis--multi": isEllipsis && isCssEllipsis && ellipsisNumber > 1
        }
      ),
      ...props,
      style: measureStyle
    }, children);
  };
  return renderContent();
};
const Text = (props) => /* @__PURE__ */ React.createElement(TypographyBase, {
  renderType: "text",
  tag: "span",
  ...props
});
const Title = (props) => /* @__PURE__ */ React.createElement(TypographyBase, {
  renderType: "title",
  tag: "h1",
  ...props
});
const Link = (props) => /* @__PURE__ */ React.createElement(TypographyBase, {
  renderType: "link",
  tag: "a",
  ...props
});
const TypographyNamespace = Object.assign(TypographyBase, { Text, Title, Link });
var index$Q = "";
function parseFormat(format2, currentTime) {
  const { days } = currentTime;
  let { hours, minutes, seconds, milliseconds } = currentTime;
  if (format2.includes("DD")) {
    format2 = format2.replace("DD", padZero(days));
  } else {
    hours += days * 24;
  }
  if (format2.includes("HH")) {
    format2 = format2.replace("HH", padZero(hours));
  } else {
    minutes += hours * 60;
  }
  if (format2.includes("mm")) {
    format2 = format2.replace("mm", padZero(minutes));
  } else {
    seconds += minutes * 60;
  }
  if (format2.includes("ss")) {
    format2 = format2.replace("ss", padZero(seconds));
  } else {
    milliseconds += seconds * 1e3;
  }
  if (format2.includes("S")) {
    const ms = padZero(milliseconds, 3);
    if (format2.includes("SSS")) {
      format2 = format2.replace("SSS", ms);
    } else if (format2.includes("SS")) {
      format2 = format2.replace("SS", ms.slice(0, 2));
    } else {
      format2 = format2.replace("S", ms.charAt(0));
    }
  }
  return format2;
}
const [bem$1i] = createNamespace("count-down");
const CountDown = forwardRef(
  (props, ref) => {
    const { start, pause, reset, current } = useCountDown({
      time: +props.time,
      millisecond: props.millisecond,
      onChange: props.onChange,
      onFinish: props.onFinish
    });
    const timeText = useMemo(
      () => parseFormat(props.format, current),
      [current]
    );
    const resetTime = () => {
      reset(+props.time);
      if (props.autoStart) {
        start();
      }
    };
    useEffect(() => {
      resetTime();
      return () => {
        pause();
      };
    }, [props.time]);
    useImperativeHandle(ref, () => ({
      start,
      pause,
      reset: resetTime
    }));
    return /* @__PURE__ */ React.createElement("div", {
      className: clsx(props.className, bem$1i()),
      style: props.style
    }, props.children ? props.children(current) : timeText);
  }
);
CountDown.defaultProps = {
  autoStart: true,
  time: 0,
  format: "HH:mm:ss",
  onChange: noop,
  onFinish: noop
};
var index$P = "";
const [bem$1h] = createNamespace("divider");
const Divider = ({
  children,
  className,
  hairline,
  dashed,
  type,
  contentPosition,
  ...props
}) => {
  return /* @__PURE__ */ React.createElement("div", {
    role: "separator",
    className: clsx(
      className,
      bem$1h({
        dashed,
        hairline,
        "vertical": type === "vertical",
        [`content-${contentPosition}`]: !!children
      })
    ),
    ...props
  }, children);
};
Divider.defaultProps = {
  hairline: true,
  type: "horizontal",
  contentPosition: "center"
};
var index$O = "";
const [bem$1g] = createNamespace("image");
const Image$1 = (props) => {
  const [status, setStatus] = useSetState({ loading: true, error: false });
  const imgRef = useRef(null);
  const { fit, errorIcon, loadingIcon, showError, showLoading, block } = props;
  const style = useMemo(() => {
    const internalStyle = { ...props.style };
    if (isDef(props.width)) {
      internalStyle.width = addUnit(props.width);
    }
    if (isDef(props.height)) {
      internalStyle.height = addUnit(props.height);
    }
    if (isDef(props.radius)) {
      internalStyle.overflow = "hidden";
      internalStyle.borderRadius = addUnit(props.radius);
    }
    return internalStyle;
  }, [props.style]);
  useEffect(() => {
    const payload = { error: false, loading: true };
    if (imgRef.current) {
      if (imgRef.current.complete) {
        payload.loading = false;
      } else {
        payload.loading = true;
      }
    }
    setStatus(payload);
  }, [props.src]);
  const onLoad = (e) => {
    var _a;
    setStatus({ loading: false });
    (_a = props.onLoad) == null ? void 0 : _a.call(props, e);
  };
  const onError = (e) => {
    var _a;
    setStatus({ error: true, loading: false });
    (_a = props.onLoad) == null ? void 0 : _a.call(props, e);
  };
  const renderLoadingIcon = () => {
    if (loadingIcon)
      return React.cloneElement(loadingIcon, {
        className: clsx(bem$1g("loading-icon")),
        fontSize: props.iconSize
      });
    return null;
  };
  const renderErrorIcon = () => {
    if (errorIcon) {
      return React.cloneElement(errorIcon, {
        className: clsx(bem$1g("error-icon")),
        fontSize: props.iconSize
      });
    }
    return null;
  };
  const renderPlaceholder = () => {
    if (status.loading && showLoading) {
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$1g("loading")),
        onClick: props.onClick
      }, renderLoadingIcon());
    }
    if (status.error && showError) {
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$1g("error")),
        onClick: props.onClick
      }, renderErrorIcon());
    }
    return null;
  };
  const renderImage = () => {
    if (status.error || !props.src) {
      return null;
    }
    const attrs = {
      className: clsx(bem$1g("img")),
      style: {
        objectFit: fit
      }
    };
    return /* @__PURE__ */ React.createElement("img", {
      ref: imgRef,
      alt: props.alt || "img",
      src: props.src,
      onLoad,
      onError,
      ...attrs
    });
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: clsx(
      props.className,
      bem$1g({
        block,
        round: props.round
      })
    ),
    style,
    onClick: props.onClick
  }, renderImage(), renderPlaceholder(), props.children);
};
var index$N = "";
var index$M = "";
const DEFAULT_ROW_WIDTH = "100%";
const DEFAULT_LAST_ROW_WIDTH = "60%";
const [bem$1f] = createNamespace("skeleton");
const Skeleton = ({
  children,
  className,
  style,
  ...props
}) => {
  const getRowWidth = (index2) => {
    const { rowWidth } = props;
    if (rowWidth === DEFAULT_ROW_WIDTH && index2 === +props.row - 1 && index2 !== 0) {
      return DEFAULT_LAST_ROW_WIDTH;
    }
    if (Array.isArray(rowWidth)) {
      return rowWidth[index2];
    }
    return rowWidth;
  };
  const getRowHeight = (index2) => {
    const { rowHeight } = props;
    if (Array.isArray(rowHeight)) {
      return rowHeight[index2];
    }
    return rowHeight;
  };
  const renderAvatar = () => {
    if (props.avatar) {
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$1f("avatar", props.avatarShape)),
        style: getSizeStyle(props.avatarSize)
      });
    }
    return null;
  };
  const renderTitle = () => {
    if (props.title) {
      const width = addUnit(props.titleWidth);
      const height = addUnit(getRowHeight(0));
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$1f("title")),
        style: { width, height }
      });
    }
    return null;
  };
  const renderRows = () => Array(props.row).fill("").map((_, i) => {
    const width = addUnit(getRowWidth(i));
    const height = addUnit(getRowHeight(i));
    return /* @__PURE__ */ React.createElement("div", {
      key: i,
      className: clsx(bem$1f("row")),
      style: { width, height }
    });
  });
  if (!props.loading)
    return /* @__PURE__ */ React.createElement(React.Fragment, null, children);
  return /* @__PURE__ */ React.createElement("div", {
    className: clsx(
      className,
      bem$1f({ animate: props.animate, round: props.round })
    ),
    style
  }, renderAvatar(), /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$1f("content"))
  }, renderTitle(), renderRows()));
};
Skeleton.defaultProps = {
  loading: true,
  animate: true,
  round: true,
  row: 3,
  avatarShape: "round",
  rowWidth: DEFAULT_ROW_WIDTH
};
const [bem$1e] = createNamespace("lazyload");
const Lazyload = (props) => {
  const ref = useRef();
  const [inViewPort] = useInViewport(ref);
  const { height, placeholder, children, className, style } = props;
  return inViewPort ? /* @__PURE__ */ React.createElement(React.Fragment, null, children) : /* @__PURE__ */ React.createElement("div", {
    ref,
    className: clsx(bem$1e(), className),
    style: { height, ...style }
  }, placeholder);
};
Lazyload.defaultProps = {
  placeholder: /* @__PURE__ */ React.createElement(Skeleton, {
    title: true
  })
};
const getLazyImagePlaceholder = (bem2) => /* @__PURE__ */ React.createElement("div", {
  className: clsx(bem2("loading"))
}, /* @__PURE__ */ React.createElement(Photo, {
  className: clsx(bem2("loading-icon"))
}));
const [bem$1d] = createNamespace("image");
const LazyImage = (props) => {
  const { lazyload, ...imageProps } = props;
  const renderPlaceholder = () => {
    if (typeof lazyload === "boolean")
      return getLazyImagePlaceholder(bem$1d);
    return lazyload.placeholder || getLazyImagePlaceholder(bem$1d);
  };
  if (lazyload) {
    const { className, style, height, width } = imageProps;
    const attrs = {
      className: clsx(className, bem$1d({ block: imageProps.block })),
      style: { ...style, height, width }
    };
    return /* @__PURE__ */ React.createElement(Lazyload, {
      ...attrs,
      placeholder: renderPlaceholder()
    }, /* @__PURE__ */ React.createElement(Image$1, {
      ...imageProps
    }));
  }
  return /* @__PURE__ */ React.createElement(Image$1, {
    ...imageProps
  });
};
LazyImage.defaultProps = {
  fit: "fill",
  errorIcon: /* @__PURE__ */ React.createElement(PhotoFail, null),
  loadingIcon: /* @__PURE__ */ React.createElement(Photo, null),
  showError: true,
  showLoading: true,
  block: true
};
const IMAGE_KEY = Symbol("image");
const ImageNamespace = Object.assign(LazyImage, {
  [COMPONENT_TYPE_KEY]: IMAGE_KEY
});
var index$L = "";
const useDragAndPinch = createUseGesture([dragAction, pinchAction]);
function bound(position, min, max) {
  let ret = position;
  if (min !== void 0) {
    ret = Math.max(position, min);
  }
  if (max !== void 0) {
    ret = Math.min(ret, max);
  }
  return ret;
}
function rubberband(distance, dimension, constant) {
  return distance * dimension * constant / (dimension + constant * distance);
}
function rubberbandIfOutOfBounds(position, min, max, dimension, constant = 0.15) {
  if (constant === 0)
    return bound(position, min, max);
  if (position < min)
    return -rubberband(min - position, dimension, constant) + min;
  if (position > max)
    return +rubberband(position - max, dimension, constant) + max;
  return position;
}
const [bem$1c] = createNamespace("image-preview");
const Slide = (props) => {
  const { dragLockRef } = props;
  const controlRef = useRef(null);
  const imgRef = useRef(null);
  const [{ zoom, x, y }, api] = useSpring(() => ({
    zoom: 1,
    x: 0,
    y: 0,
    config: { tension: 200 }
  }));
  const pinchLockRef = useRef(false);
  function boundXY([x2, y2], rubberband2) {
    const currentZoom = zoom.get();
    let xOffset = 0, yOffset = 0;
    if (imgRef.current && controlRef.current) {
      xOffset = ((currentZoom * imgRef.current.width || 0) - controlRef.current.clientWidth) / 2;
      yOffset = ((currentZoom * imgRef.current.height || 0) - controlRef.current.clientHeight) / 2;
    }
    xOffset = xOffset > 0 ? xOffset : 0;
    yOffset = yOffset > 0 ? yOffset : 0;
    const bounds = {
      left: -xOffset,
      right: xOffset,
      top: -yOffset,
      bottom: yOffset
    };
    if (rubberband2) {
      return [
        rubberbandIfOutOfBounds(x2, bounds.left, bounds.right, currentZoom * 50),
        rubberbandIfOutOfBounds(y2, bounds.top, bounds.bottom, currentZoom * 50)
      ];
    } else {
      return [
        bound(x2, bounds.left, bounds.right),
        bound(y2, bounds.top, bounds.bottom)
      ];
    }
  }
  useDragAndPinch(
    {
      onDrag: (state) => {
        if (state.tap && state.elapsedTime > 0 && state.elapsedTime < 1e3) {
          props.onTap();
          return;
        }
        const currentZoom = zoom.get();
        if (dragLockRef) {
          dragLockRef.current = currentZoom !== 1;
        }
        if (!pinchLockRef.current && currentZoom <= 1) {
          api.start({
            x: 0,
            y: 0
          });
        } else {
          if (state.last) {
            const [x2, y2] = boundXY(
              [
                state.offset[0] + state.velocity[0] * state.direction[0] * 200,
                state.offset[1] + state.velocity[1] * state.direction[1] * 200
              ],
              false
            );
            api.start({
              x: x2,
              y: y2
            });
          } else {
            const [x2, y2] = boundXY(state.offset, true);
            api.start({
              x: x2,
              y: y2,
              immediate: true
            });
          }
        }
      },
      onPinch: (state) => {
        var _a;
        pinchLockRef.current = !state.last;
        const [d] = state.offset;
        if (d < 0)
          return;
        const nextZoom = state.last ? bound(d, 1, props.maxZoom) : d;
        api.start({
          zoom: nextZoom,
          immediate: !state.last
        });
        (_a = props.onZoomChange) == null ? void 0 : _a.call(props, nextZoom);
        if (state.last && nextZoom <= 1) {
          api.start({
            x: 0,
            y: 0
          });
          if (dragLockRef) {
            dragLockRef.current = false;
          }
        } else {
          if (dragLockRef) {
            dragLockRef.current = true;
          }
        }
      }
    },
    {
      target: controlRef,
      drag: {
        from: () => [x.get(), y.get()],
        pointer: { touch: true }
      },
      pinch: {
        from: () => [zoom.get(), 0],
        pointer: { touch: true }
      }
    }
  );
  return /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$1c("slide")),
    onPointerMove: (e) => {
      if (zoom.get() !== 1) {
        e.stopPropagation();
      }
    }
  }, /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$1c("control")),
    ref: controlRef
  }, /* @__PURE__ */ React.createElement(animated.div, {
    className: clsx(bem$1c("image-wrapper")),
    style: {
      translateX: x,
      translateY: y,
      scale: zoom
    }
  }, /* @__PURE__ */ React.createElement("img", {
    ref: imgRef,
    src: props.image,
    draggable: false,
    alt: props.image
  }))));
};
const [bem$1b] = createNamespace("image-preview");
const Slides = forwardRef((props, ref) => {
  const slideWidth = window.innerWidth + unitToPx(16);
  const [{ x }, api] = useSpring(() => ({
    x: props.defaultIndex * slideWidth,
    config: { tension: 250, clamp: true }
  }));
  const count = props.images.length;
  useUpdateEffect(() => {
    swipeTo(props.defaultIndex, true);
  }, [props.defaultIndex]);
  function swipeTo(index2, immediate = false) {
    var _a;
    const i = bound(index2, 0, count - 1);
    (_a = props.onIndexChange) == null ? void 0 : _a.call(props, i);
    api.start({
      x: i * slideWidth,
      immediate
    });
  }
  useImperativeHandle(ref, () => ({
    swipeTo
  }));
  const dragLockRef = useRef(false);
  const bind = useDrag(
    (state) => {
      if (dragLockRef.current)
        return;
      const [offsetX] = state.offset;
      if (state.last) {
        const minIndex = Math.floor(offsetX / slideWidth);
        const maxIndex = minIndex + 1;
        const velocityOffset = Math.min(state.velocity[0] * 2e3, slideWidth) * state.direction[0];
        swipeTo(
          bound(
            Math.round((offsetX + velocityOffset) / slideWidth),
            minIndex,
            maxIndex
          )
        );
      } else {
        api.start({
          x: offsetX,
          immediate: true
        });
      }
    },
    {
      transform: ([x2, y]) => [-x2, y],
      from: () => [x.get(), 0],
      bounds: () => {
        return {
          left: 0,
          right: (count - 1) * slideWidth
        };
      },
      rubberband: true,
      axis: "x",
      pointer: { touch: true }
    }
  );
  return /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$1b("slides")),
    ...bind()
  }, /* @__PURE__ */ React.createElement(animated.div, {
    className: clsx(bem$1b("slides-inner")),
    style: { x: x.to((x2) => -x2) }
  }, props.images.map((image, idx) => /* @__PURE__ */ React.createElement(Slide, {
    key: `${image}${idx}`,
    image,
    onTap: props.onTap,
    maxZoom: props.maxZoom,
    onZoomChange: (zoom) => {
      if (zoom !== 1) {
        const index2 = Math.round(x.get() / slideWidth);
        api.start({
          x: index2 * slideWidth
        });
      }
    },
    dragLockRef
  }))));
});
const [bem$1a] = createNamespace("indicator");
const SwiperPagIndicator = React.memo(
  ({ vertical, ...props }) => {
    const dots = [];
    for (let i = 0; i < props.total; i++) {
      dots.push(
        /* @__PURE__ */ React.createElement("div", {
          key: i,
          className: clsx(
            bem$1a("dot", {
              active: props.current === i
            })
          )
        })
      );
    }
    return /* @__PURE__ */ React.createElement("div", {
      className: clsx(props.className, bem$1a({ vertical })),
      style: props.style
    }, dots);
  }
);
const [bem$19] = createNamespace("image-preview");
const ImagePreview$1 = React.forwardRef(
  (props, ref) => {
    const slidesRef = useRef(null);
    const [active, setActive] = useState(() => props.startPosition);
    const currentImage = React.useMemo(
      () => props.images[active],
      [active, props.images]
    );
    const onSwipeChange = (idx) => {
      var _a;
      if (active !== idx) {
        setActive(idx);
        (_a = props.onChange) == null ? void 0 : _a.call(props, idx);
      }
    };
    const onClose = () => {
      var _a;
      (_a = props.onClose) == null ? void 0 : _a.call(props, { url: currentImage, index: active });
    };
    const renderContent = () => /* @__PURE__ */ React.createElement("div", {
      className: clsx(bem$19("content"))
    }, props.images && /* @__PURE__ */ React.createElement(Slides, {
      ref: slidesRef,
      defaultIndex: props.startPosition,
      onIndexChange: onSwipeChange,
      images: props.images,
      onTap: () => {
        if (!props.closeOnlyClickCloseIcon) {
          onClose();
        }
      },
      maxZoom: props.maxZoom
    }));
    const renderClose = () => {
      if (props.closeable) {
        return React.cloneElement(props.closeIcon, {
          className: clsx(bem$19("close-icon", props.closeIconPosition)),
          onClick: onClose
        });
      }
      return null;
    };
    const renderIndex = () => {
      if (props.showIndex) {
        return /* @__PURE__ */ React.createElement("div", {
          className: clsx(bem$19("index"))
        }, props.indexRender ? props.indexRender({ index: active, len: props.images.length }) : `${active + 1} / ${props.images.length}`);
      }
      return null;
    };
    const renderIndicator = () => {
      if (props.showIndicators) {
        return /* @__PURE__ */ React.createElement("div", {
          className: clsx(bem$19("indicator"))
        }, /* @__PURE__ */ React.createElement(SwiperPagIndicator, {
          total: props.images.length,
          current: active
        }));
      }
      return null;
    };
    React.useImperativeHandle(ref, () => ({
      swipeTo: (index2, immediate) => {
        var _a;
        setActive(index2);
        (_a = slidesRef.current) == null ? void 0 : _a.swipeTo(index2, immediate);
      }
    }));
    return /* @__PURE__ */ React.createElement(Popup, {
      className: clsx(bem$19(), props.className),
      overlayClass: clsx(bem$19("overlay")),
      ...pick(props, [
        "visible",
        "overlayStyle",
        "closeOnPopstate",
        "onClosed",
        "beforeClose",
        "teleport"
      ])
    }, renderClose(), renderContent(), renderIndex(), renderIndicator());
  }
);
ImagePreview$1.defaultProps = {
  overlay: true,
  showIndex: true,
  images: [],
  swipeDuration: 300,
  startPosition: 0,
  closeIconPosition: "top-right",
  showIndicators: false,
  closeOnlyClickCloseIcon: false,
  maxZoom: 3
};
const defaultConfig = {
  images: [],
  className: "",
  showIndex: true,
  closeable: false,
  closeIcon: /* @__PURE__ */ React.createElement(Clear, null),
  startPosition: 0,
  swipeDuration: 300,
  closeOnPopstate: true,
  closeIconPosition: "top-right"
};
const open = (props) => {
  if (!canUseDom())
    return null;
  const { onClose = noop, beforeClose, ...restProps } = props;
  const userContainer = resolveContainer(props.teleport);
  const container = document.createElement("div");
  userContainer.appendChild(container);
  let destroy = noop;
  const TempDialog = () => {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
      setVisible(true);
    }, []);
    destroy = (p) => {
      setVisible(false);
      if (onClose)
        onClose(p);
    };
    const _afterClose = async (p) => {
      if (await (beforeClose == null ? void 0 : beforeClose(0)) !== false) {
        destroy(p);
        const unmountResult = unmount(container);
        if (unmountResult && container.parentNode) {
          container.parentNode.removeChild(container);
        }
        return true;
      }
      return false;
    };
    return /* @__PURE__ */ React.createElement(ImagePreview$1, {
      ...defaultConfig,
      ...restProps,
      visible,
      teleport: () => container,
      onClose: destroy,
      beforeClose: _afterClose
    });
  };
  render(/* @__PURE__ */ React.createElement(TempDialog, null), container);
  return destroy;
};
const ImagePreview = Object.assign(ImagePreview$1, {
  open
});
var index$K = "";
const prefix = "rv-empty-network-";
const renderStop = (color, offset, opacity) => /* @__PURE__ */ React.createElement("stop", {
  stopColor: color,
  offset: `${offset}%`,
  stopOpacity: opacity
});
const Network = /* @__PURE__ */ React.createElement("svg", {
  viewBox: "0 0 160 160"
}, /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("linearGradient", {
  id: `${prefix}1`,
  x1: "64.022%",
  y1: "100%",
  x2: "64.022%",
  y2: "0%"
}, renderStop("#FFF", 0, 0.5), renderStop("#F2F3F5", 100)), /* @__PURE__ */ React.createElement("linearGradient", {
  id: `${prefix}2`,
  x1: "50%",
  y1: "0%",
  x2: "50%",
  y2: "84.459%"
}, renderStop("#EBEDF0", 0), renderStop("#DCDEE0", 100, 0)), /* @__PURE__ */ React.createElement("linearGradient", {
  id: `${prefix}3`,
  x1: "100%",
  y1: "0%",
  x2: "100%",
  y2: "100%"
}, renderStop("#EAEDF0", 0), renderStop("#DCDEE0", 100)), /* @__PURE__ */ React.createElement("linearGradient", {
  id: `${prefix}4`,
  x1: "100%",
  y1: "100%",
  x2: "100%",
  y2: "0%"
}, renderStop("#EAEDF0", 0), renderStop("#DCDEE0", 100)), /* @__PURE__ */ React.createElement("linearGradient", {
  id: `${prefix}5`,
  x1: "0%",
  y1: "43.982%",
  x2: "100%",
  y2: "54.703%"
}, renderStop("#EAEDF0", 0), renderStop("#DCDEE0", 100)), /* @__PURE__ */ React.createElement("linearGradient", {
  id: `${prefix}6`,
  x1: "94.535%",
  y1: "43.837%",
  x2: "5.465%",
  y2: "54.948%"
}, renderStop("#EAEDF0", 0), renderStop("#DCDEE0", 100)), /* @__PURE__ */ React.createElement("radialGradient", {
  id: `${prefix}7`,
  cx: "50%",
  cy: "0%",
  fx: "50%",
  fy: "0%",
  r: "100%",
  gradientTransform: "matrix(0 1 -.54835 0 .5 -.5)"
}, renderStop("#EBEDF0", 0), renderStop("#FFF", 100, 0))), /* @__PURE__ */ React.createElement("g", {
  fill: "none",
  fillRule: "evenodd"
}, /* @__PURE__ */ React.createElement("g", {
  opacity: ".8"
}, /* @__PURE__ */ React.createElement("path", {
  d: "M0 124V46h20v20h14v58H0z",
  fill: `url(#${prefix}1)`,
  transform: "matrix(-1 0 0 1 36 7)"
}), /* @__PURE__ */ React.createElement("path", {
  d: "M121 8h22.231v14H152v77.37h-31V8z",
  fill: `url(#${prefix}1)`,
  transform: "translate(2 7)"
})), /* @__PURE__ */ React.createElement("path", {
  fill: `url(#${prefix}7)`,
  d: "M0 139h160v21H0z"
}), /* @__PURE__ */ React.createElement("path", {
  d: "M37 18a7 7 0 013 13.326v26.742c0 1.23-.997 2.227-2.227 2.227h-1.546A2.227 2.227 0 0134 58.068V31.326A7 7 0 0137 18z",
  fill: `url(#${prefix}2)`,
  fillRule: "nonzero",
  transform: "translate(43 36)"
}), /* @__PURE__ */ React.createElement("g", {
  opacity: ".6",
  strokeLinecap: "round",
  strokeWidth: "7"
}, /* @__PURE__ */ React.createElement("path", {
  d: "M20.875 11.136a18.868 18.868 0 00-5.284 13.121c0 5.094 2.012 9.718 5.284 13.12",
  stroke: `url(#${prefix}3)`,
  transform: "translate(43 36)"
}), /* @__PURE__ */ React.createElement("path", {
  d: "M9.849 0C3.756 6.225 0 14.747 0 24.146c0 9.398 3.756 17.92 9.849 24.145",
  stroke: `url(#${prefix}3)`,
  transform: "translate(43 36)"
}), /* @__PURE__ */ React.createElement("path", {
  d: "M57.625 11.136a18.868 18.868 0 00-5.284 13.121c0 5.094 2.012 9.718 5.284 13.12",
  stroke: `url(#${prefix}4)`,
  transform: "rotate(-180 76.483 42.257)"
}), /* @__PURE__ */ React.createElement("path", {
  d: "M73.216 0c-6.093 6.225-9.849 14.747-9.849 24.146 0 9.398 3.756 17.92 9.849 24.145",
  stroke: `url(#${prefix}4)`,
  transform: "rotate(-180 89.791 42.146)"
})), /* @__PURE__ */ React.createElement("g", {
  transform: "translate(31 105)",
  fillRule: "nonzero"
}, /* @__PURE__ */ React.createElement("rect", {
  fill: `url(#${prefix}5)`,
  width: "98",
  height: "34",
  rx: "2"
}), /* @__PURE__ */ React.createElement("rect", {
  fill: "#FFF",
  x: "9",
  y: "8",
  width: "80",
  height: "18",
  rx: "1.114"
}), /* @__PURE__ */ React.createElement("rect", {
  fill: `url(#${prefix}6)`,
  x: "15",
  y: "12",
  width: "18",
  height: "6",
  rx: "1.114"
}))));
const PRESET_IMAGES = ["error", "search", "default"];
const [bem$18] = createNamespace("empty");
const Empty = (props) => {
  const renderImage = () => {
    let { image } = props;
    if (isValidElement(image)) {
      return image;
    }
    if (image === "network") {
      return Network;
    }
    if (PRESET_IMAGES.includes(image)) {
      image = `https://img.yzcdn.cn/vant/empty-image-${image}.png`;
    }
    return /* @__PURE__ */ React.createElement("img", {
      src: image,
      alt: ""
    });
  };
  const renderDescription = () => {
    if (props.description) {
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$18("description"))
      }, props.description);
    }
    return null;
  };
  const renderBottom = () => {
    if (props.children) {
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$18("bottom"))
      }, props.children);
    }
    return null;
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: clsx(props.className, bem$18()),
    style: props.style
  }, /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$18("image")),
    style: getSizeStyle(props.imageSize)
  }, renderImage()), renderDescription(), renderBottom());
};
Empty.defaultProps = {
  image: "default"
};
var index$J = "";
const [bem$17] = createNamespace("notify");
const Notify = ({
  children,
  ...props
}) => {
  const style = {
    color: props.color,
    background: props.background
  };
  return /* @__PURE__ */ React.createElement(Popup, {
    visible: props.visible,
    style,
    overlay: false,
    position: "top",
    lockScroll: props.lockScroll,
    onClick: props.onClick,
    onClose: props.onClose,
    onClosed: props.onClosed,
    teleport: props.teleport
  }, /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$17([props.type]), props.className)
  }, children || props.message));
};
Notify.defaultProps = {
  type: "danger",
  duration: 3e3,
  color: "white",
  lockScroll: false
};
let lockCount = 0;
function lockClick(lock) {
  if (lock) {
    if (!lockCount) {
      document.body.classList.add("rv-toast--unclickable");
    }
    lockCount += 1;
  } else if (lockCount) {
    lockCount -= 1;
    if (!lockCount) {
      document.body.classList.remove("rv-toast--unclickable");
    }
  }
}
const NotifyNamespace = {};
function parseOptions$1(message) {
  return isObject(message) ? message : { message };
}
const notifyArray = [];
function syncClear$1() {
  let fn = notifyArray.pop();
  while (fn) {
    fn();
    lockClick(false);
    fn = notifyArray.pop();
  }
}
function nextTickClear$1() {
  setTimeout(syncClear$1);
}
const show = (p) => {
  if (!canUseDom())
    return null;
  const props = parseOptions$1(p);
  const interProps = { ...NotifyNamespace.currentOptions, ...props };
  const { onClose = noop, duration, ...restProps } = interProps;
  let timer = 0;
  const userContainer = resolveContainer(props.teleport);
  const container = document.createElement("div");
  userContainer.appendChild(container);
  let destroy = noop;
  const TempNotify = () => {
    const [visible, setVisible] = useState(false);
    destroy = () => {
      setVisible(false);
      if (onClose)
        onClose();
    };
    const internalOnClosed = () => {
      const unmountResult = unmount(container);
      if (unmountResult && container.parentNode) {
        container.parentNode.removeChild(container);
      }
    };
    const internalAfterClose = once(() => {
      internalOnClosed();
    });
    useEffect(() => {
      setVisible(true);
      syncClear$1();
      notifyArray.push(internalAfterClose);
      if (duration && +duration > 0) {
        timer = window.setTimeout(destroy, duration);
      }
      return () => {
        if (timer !== 0) {
          window.clearTimeout(timer);
        }
      };
    }, []);
    return /* @__PURE__ */ React.createElement(Notify, {
      ...restProps,
      visible,
      teleport: () => container,
      onClose,
      onClosed: internalOnClosed
    });
  };
  render(/* @__PURE__ */ React.createElement(TempNotify, null), container);
  return destroy;
};
function defaultOptions$1() {
  return {
    type: "danger",
    color: void 0,
    message: "",
    onClose: void 0,
    onClick: void 0,
    duration: 3e3,
    className: "",
    lockScroll: false,
    background: void 0
  };
}
NotifyNamespace.currentOptions = defaultOptions$1();
const setDefaultOptions$1 = (options) => {
  extend(NotifyNamespace.currentOptions, options);
};
const resetDefaultOptions = () => {
  NotifyNamespace.currentOptions = defaultOptions$1();
};
const clear = nextTickClear$1;
const exportNotifyNamespace = Object.assign(Notify, {
  show,
  setDefaultOptions: setDefaultOptions$1,
  resetDefaultOptions,
  clear
});
var index$I = "";
const DEFAULT_HEAD_HEIGHT = 50;
const TEXT_STATUS = ["pulling", "loosing", "success"];
const [bem$16] = createNamespace("pull-refresh");
const PullRefresh = (props) => {
  const { locale } = useContext(ConfigProvider$1);
  const { disabled, animationDuration } = props;
  const root2 = useRef();
  const [state, updateState] = useSetState({
    refreshing: false,
    status: "normal",
    distance: 0,
    duration: 0
  });
  const track = useRef();
  const reachTop = useRef(null);
  const touch = useTouch();
  const getHeadStyle = () => {
    if (props.headHeight !== DEFAULT_HEAD_HEIGHT) {
      return {
        height: `${props.headHeight}px`
      };
    }
    return null;
  };
  const isTouchable = useCallback(() => {
    return state.status !== "loading" && state.status !== "success" && !disabled;
  }, [state.status, disabled]);
  const ease = (distance) => {
    const pullDistance = +(props.pullDistance || props.headHeight);
    if (distance > pullDistance) {
      if (distance < pullDistance * 2) {
        distance = pullDistance + (distance - pullDistance) / 2;
      } else {
        distance = pullDistance * 1.5 + (distance - pullDistance * 2) / 4;
      }
    }
    return Math.round(distance);
  };
  const setStatus = (distance, isLoading) => {
    const pullDistance = +(props.pullDistance || props.headHeight);
    const newState = { distance };
    if (isLoading) {
      newState.status = "loading";
    } else if (distance === 0) {
      newState.status = "normal";
    } else if (distance < pullDistance) {
      newState.status = "pulling";
    } else {
      newState.status = "loosing";
    }
    updateState(newState);
  };
  const getStatusText = () => {
    if (state.status === "normal") {
      return "";
    }
    return props[`${state.status}Text`] || locale.vanPullRefresh[state.status];
  };
  const renderStatus = () => {
    var _a;
    const { status, distance } = state;
    if (typeof props[`${state.status}Text`] === "function") {
      return (_a = props[`${state.status}Text`]) == null ? void 0 : _a.call(props, { distance });
    }
    const nodes = [];
    if (TEXT_STATUS.includes(status)) {
      nodes.push(
        /* @__PURE__ */ React.createElement("div", {
          key: "text",
          className: clsx(bem$16("text"))
        }, getStatusText())
      );
    }
    if (status === "loading") {
      nodes.push(
        /* @__PURE__ */ React.createElement(Loading, {
          key: "loading",
          className: clsx(bem$16("loading"))
        }, getStatusText())
      );
    }
    return nodes;
  };
  const showSuccessTip = () => {
    updateState({ status: "success" });
    setTimeout(() => {
      setStatus(0);
    }, +props.successDuration);
  };
  const onRefresh = async () => {
    try {
      updateState({ refreshing: true });
      await props.onRefresh();
      updateState({ refreshing: false });
    } catch (error) {
      updateState({ refreshing: false });
    }
  };
  const checkPosition = (event) => {
    const scrollTarget = getScrollParent(event.target);
    reachTop.current = getScrollTop$1(scrollTarget) === 0;
    if (reachTop.current) {
      updateState({ duration: 0 });
      touch.start(event);
    }
  };
  const onTouchStart = (event) => {
    if (isTouchable()) {
      checkPosition(event.nativeEvent);
    }
  };
  const onTouchMove = useCallback(
    (event) => {
      if (isTouchable()) {
        if (!reachTop.current) {
          checkPosition(event);
        }
        touch.move(event);
        if (reachTop.current && touch.deltaY.current >= 0 && touch.isVertical()) {
          setStatus(ease(touch.deltaY.current));
          preventDefault(event);
        } else {
          setStatus(0);
        }
      }
    },
    [reachTop.current, touch.deltaY.current, isTouchable]
  );
  const onTouchEnd = async () => {
    if (reachTop.current && touch.deltaY && isTouchable()) {
      updateState({ duration: +animationDuration });
      if (state.status === "loosing") {
        setStatus(+props.headHeight, true);
        await onRefresh();
        setTimeout(() => {
          var _a;
          return (_a = props.onRefreshEnd) == null ? void 0 : _a.call(props);
        });
      } else {
        setStatus(0);
      }
    }
  };
  useEventListener("touchmove", onTouchMove, {
    target: track.current,
    depends: [reachTop.current, isTouchable(), touch.deltaY]
  });
  useUpdateEffect(() => {
    updateState({ duration: +animationDuration });
    if (state.refreshing) {
      setStatus(+props.headHeight, true);
    } else if (props.successText) {
      showSuccessTip();
    } else {
      setStatus(0, false);
    }
  }, [state.refreshing]);
  const trackStyle = useMemo(
    () => ({
      transitionDuration: `${state.duration}ms`,
      transform: state.distance ? `translate3d(0,${state.distance}px, 0)` : ""
    }),
    [state.duration, state.distance]
  );
  return /* @__PURE__ */ React.createElement("div", {
    ref: root2,
    className: clsx(props.className, bem$16()),
    style: props.style
  }, /* @__PURE__ */ React.createElement("div", {
    ref: track,
    className: clsx(bem$16("track")),
    style: trackStyle,
    onTouchStart,
    onTouchEnd,
    onTouchCancel: onTouchEnd
  }, /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$16("head")),
    style: getHeadStyle()
  }, renderStatus()), props.children));
};
PullRefresh.defaultProps = {
  headHeight: 50,
  animationDuration: 300,
  successDuration: 500
};
var index$H = "";
function isWindow$1(val) {
  return val === window;
}
const useRect = (elementRef) => {
  const element = elementRef;
  if (isWindow$1(element)) {
    const width = element.innerWidth;
    const height = element.innerHeight;
    return {
      top: 0,
      left: 0,
      right: width,
      bottom: height,
      width,
      height
    };
  }
  if (element && element.getBoundingClientRect) {
    return element.getBoundingClientRect();
  }
  return {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 0,
    height: 0
  };
};
const [bem$15] = createNamespace("swipe-cell");
const SwipeCell = forwardRef(
  (props, instanceRef) => {
    const opened = useRef(false);
    const lockClick2 = useRef(false);
    const startOffset = useRef(0);
    const [state, setState] = useState({
      offset: 0,
      dragging: false
    });
    const [actionWidth, setActionWidth] = useState({
      left: 0,
      right: 0
    });
    const root2 = useRef();
    const getWidthByNode = (node) => node ? useRect(node).width : 0;
    const leftRef = useCallback((node) => {
      if (node !== null) {
        setActionWidth((v) => ({ ...v, left: getWidthByNode(node) }));
      }
    }, []);
    const rightRef = useCallback((node) => {
      if (node !== null) {
        setActionWidth((v) => ({ ...v, right: getWidthByNode(node) }));
      }
    }, []);
    const touch = useTouch();
    const leftWidth = useMemo(
      () => isDef(props.leftWidth) ? +props.leftWidth : actionWidth.left,
      [props.leftWidth, actionWidth.left]
    );
    const rightWidth = useMemo(
      () => isDef(props.rightWidth) ? +props.rightWidth : actionWidth.right,
      [props.rightWidth, actionWidth.right]
    );
    const open2 = (side) => {
      var _a;
      opened.current = true;
      const offset = side === "left" ? leftWidth : -rightWidth;
      (_a = props.onOpen) == null ? void 0 : _a.call(props, { name: props.name, position: side });
      setState((v) => ({ ...v, offset }));
    };
    const close = (position) => {
      var _a;
      if (opened.current) {
        opened.current = false;
        (_a = props.onClose) == null ? void 0 : _a.call(props, { name: props.name, position });
      }
      setState((v) => ({ ...v, offset: 0 }));
    };
    const toggle = (side) => {
      const offset = Math.abs(state.offset);
      const THRESHOLD = 0.15;
      const threshold = opened ? 1 - THRESHOLD : THRESHOLD;
      const width = side === "left" ? leftWidth : rightWidth;
      if (width && offset > width * threshold) {
        open2(side);
      } else {
        close(side);
      }
    };
    const onTouchStart = (event) => {
      if (!props.disabled) {
        startOffset.current = state.offset;
        touch.start(event);
      }
    };
    const onTouchMove = (event) => {
      if (props.disabled) {
        return;
      }
      touch.move(event);
      if (touch.isHorizontal()) {
        lockClick2.current = true;
        const newState = { ...state, dragging: true };
        const isEdge = !opened || touch.deltaX.current * startOffset.current < 0;
        if (isEdge) {
          preventDefault(event, props.stopPropagation);
        }
        newState.offset = range(
          touch.deltaX.current + startOffset.current,
          -rightWidth,
          leftWidth
        );
        setState(newState);
      }
    };
    const onTouchEnd = () => {
      if (state.dragging) {
        setState((v) => ({ ...v, dragging: false }));
        toggle(state.offset > 0 ? "left" : "right");
        setTimeout(() => {
          lockClick2.current = false;
        }, 0);
      }
    };
    const onClick = (position = "outside") => {
      var _a;
      (_a = props.onClick) == null ? void 0 : _a.call(props, position);
      if (opened.current && !lockClick2.current) {
        callInterceptor({
          interceptor: props.beforeClose,
          args: [
            {
              name: props.name,
              position
            }
          ],
          done: () => close(position)
        });
      }
    };
    const getClickHandler = (position, stop) => (event) => {
      if (stop) {
        event.stopPropagation();
      }
      onClick(position);
    };
    const renderSideContent = (side, measuredRef) => {
      if (props[`${side}Action`]) {
        return /* @__PURE__ */ React.createElement("div", {
          ref: measuredRef,
          className: clsx(bem$15(side)),
          onClick: getClickHandler(side, true)
        }, props[`${side}Action`]);
      }
      return null;
    };
    useClickAway(root2, () => onClick("outside"), "touchstart");
    useImperativeHandle(instanceRef, () => ({
      open: open2,
      close: () => close("outside")
    }));
    const wrapperStyle = {
      transform: `translate3d(${state.offset}px, 0, 0)`,
      transitionDuration: state.dragging ? "0s" : ".6s"
    };
    useEventListener("touchmove", onTouchMove, {
      target: root2.current,
      depends: [touch.deltaX]
    });
    return /* @__PURE__ */ React.createElement("div", {
      ref: root2,
      className: clsx(bem$15()),
      onClick: getClickHandler("cell"),
      onTouchStart,
      onTouchEnd,
      onTouchCancel: onTouchEnd
    }, /* @__PURE__ */ React.createElement("div", {
      className: clsx(bem$15("wrapper")),
      style: wrapperStyle
    }, renderSideContent("left", leftRef), props.children, renderSideContent("right", rightRef)));
  }
);
SwipeCell.defaultProps = {
  name: ""
};
var index$G = "";
const PRESET_ICONS = [
  "qq",
  "link",
  "weibo",
  "wechat",
  "poster",
  "qrcode",
  "weapp-qrcode",
  "wechat-moments"
];
function getIconURL(icon) {
  if (PRESET_ICONS.includes(icon)) {
    return `https://img.yzcdn.cn/vant/share-sheet-${icon}.png`;
  }
  return icon;
}
const [bem$14] = createNamespace("share-sheet");
const ShareSheet = (props) => {
  const { locale } = useContext(ConfigProvider$1);
  const onCancel = () => {
    var _a;
    (_a = props.onCancel) == null ? void 0 : _a.call(props);
  };
  const onSelect = (option, index2) => {
    var _a;
    (_a = props.onSelect) == null ? void 0 : _a.call(props, option, index2);
  };
  const renderHeader = () => {
    const { title, description } = props;
    if (title || description) {
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$14("header"))
      }, title && /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$14("title"))
      }, title), description && /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$14("description"))
      }, description));
    }
    return null;
  };
  const renderOption = (option, index2) => {
    const { name, icon, className, description } = option;
    return /* @__PURE__ */ React.createElement("div", {
      key: index2,
      role: "button",
      tabIndex: 0,
      className: clsx([bem$14("option"), className]),
      onClick: () => onSelect(option, index2)
    }, typeof icon === "string" ? /* @__PURE__ */ React.createElement("img", {
      alt: "share sheet icon",
      src: getIconURL(icon),
      className: clsx(bem$14("icon"))
    }) : icon, name && /* @__PURE__ */ React.createElement("span", {
      className: clsx(bem$14("name"))
    }, name), description && /* @__PURE__ */ React.createElement("span", {
      className: clsx(bem$14("option-description"))
    }, description));
  };
  const renderOptions = (options, border, key) => /* @__PURE__ */ React.createElement("div", {
    key,
    className: clsx(bem$14("options", { border }))
  }, options.map(renderOption));
  const renderRows = () => {
    const { options } = props;
    if (Array.isArray(options[0])) {
      return options.map(
        (item, index2) => renderOptions(item, index2 !== 0, index2)
      );
    }
    return renderOptions(options);
  };
  const renderCancelButton = () => {
    const { cancelText = locale.cancel } = props;
    if (cancelText) {
      return /* @__PURE__ */ React.createElement("button", {
        type: "button",
        className: clsx(bem$14("cancel")),
        onClick: onCancel
      }, cancelText);
    }
    return null;
  };
  return /* @__PURE__ */ React.createElement(Popup, {
    round: true,
    className: clsx(bem$14()),
    position: "bottom",
    onClose: onCancel,
    ...pick(props, [
      "closeOnPopstate",
      "safeAreaInsetBottom",
      "visible",
      "overlay",
      "duration",
      "lockScroll",
      "overlayStyle",
      "overlayClass",
      "closeOnClickOverlay"
    ])
  }, renderHeader(), renderRows(), renderCancelButton());
};
ShareSheet.defaultProps = {
  options: [],
  closeOnPopstate: true,
  safeAreaInsetBottom: true,
  closeOnClickOverlay: true
};
var index$F = "";
const [bem$13] = createNamespace("notice-bar");
const NoticeBar = forwardRef(
  (props, ref) => {
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
          className: clsx(bem$13("left-icon"))
        });
      }
      return null;
    };
    const getRightIcon = () => {
      if (props.mode === "closeable") {
        return /* @__PURE__ */ React.createElement(Cross, null);
      }
      if (props.mode === "link") {
        return /* @__PURE__ */ React.createElement(Arrow, null);
      }
      return null;
    };
    const onClickRightIcon = (event) => {
      if (props.mode === "closeable") {
        setState({ show: false });
        if (props.onClose) {
          props.onClose(event);
        }
      }
    };
    const renderRightIcon = () => {
      if (props.rightIcon) {
        return props.rightIcon;
      }
      const finalRightIcon = props.rightIcon || getRightIcon();
      if (finalRightIcon) {
        return React.cloneElement(finalRightIcon, {
          className: clsx(bem$13("right-icon")),
          onClick: onClickRightIcon
        });
      }
      return null;
    };
    const onTransitionEnd = () => {
      setState({
        offset: wrapWidth.current,
        duration: 0
      });
      raf(() => {
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
    };
    const renderMarquee = () => {
      const ellipsis = scrollable === false && !props.wrapable;
      const style = {
        transform: state.offset ? `translateX(${state.offset}px)` : "",
        transitionDuration: `${state.duration}s`
      };
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$13("wrap")),
        ref: wrapRef
      }, /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$13("content"), { "rv-ellipsis": ellipsis }),
        ref: contentRef,
        style,
        onTransitionEnd
      }, props.children || text));
    };
    const reset = () => {
      const ms = isDef(delay) ? +delay * 1e3 : 0;
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
        const wrapRefWidth = useRect(wrapRef.current).width;
        const contentRefWidth = useRect(contentRef.current).width;
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
    };
    useEventListener("pageshow", reset);
    useEffect(() => {
      reset();
    }, [text, scrollable]);
    useUpdateEffect(() => {
      reset();
    }, [popupContext.visible]);
    useImperativeHandle(ref, () => ({
      reset
    }));
    return state.show && /* @__PURE__ */ React.createElement("div", {
      role: "alert",
      className: clsx(bem$13({ wrapable }), props.className),
      style: { color, background, ...props.style },
      onClick: props.onClick
    }, renderLeftIcon(), renderMarquee(), renderRightIcon());
  }
);
NoticeBar.defaultProps = {
  delay: 1,
  speed: 60,
  onClick: noop,
  onClose: noop
};
var index$E = "";
const useLazyEffect = (effect, deps) => {
  const [c, setC] = useState(0);
  useEffect(() => {
    setC((v) => v + 1);
  }, deps);
  useEffect(() => {
    return effect();
  }, [c]);
};
const popupProps = [
  "overlay",
  "duration",
  "overlayStyle",
  "overlayClass",
  "closeOnClickOverlay",
  "teleport",
  "onClose",
  "onOpen",
  "onClosed",
  "onOpened",
  "onClickOverlay"
];
const [bem$12] = createNamespace("popover");
const Popover = forwardRef(
  ({ children, className, ...props }, ref) => {
    const [visible, updateShow] = useState(false);
    const popper = useRef(null);
    const wrapperRef = useRef();
    const popoverRef = useRef();
    const createPopperInstance = () => createPopper(wrapperRef.current, popoverRef.current.popupRef.current, {
      placement: props.placement,
      modifiers: [
        {
          name: "computeStyles",
          options: {
            adaptive: false,
            gpuAcceleration: false
          }
        },
        extend({}, offsetModifier, {
          options: {
            offset: props.offset
          }
        })
      ]
    });
    const updateLocation = () => {
      var _a;
      if (!visible) {
        return;
      }
      if (!popper.current) {
        popper.current = createPopperInstance();
      } else {
        (_a = popper.current) == null ? void 0 : _a.setOptions({
          placement: props.placement
        });
      }
    };
    const onClickWrapper = () => {
      if (props.trigger === "click") {
        updateShow(!visible);
      }
    };
    const onClickAction = (action, index2) => {
      var _a;
      if (action.disabled) {
        return;
      }
      (_a = props.onSelect) == null ? void 0 : _a.call(props, action, index2);
      if (props.closeOnClickAction) {
        updateShow(false);
      }
    };
    const onClickAway = () => {
      if (props.closeOnClickOutside && (!props.overlay || props.closeOnClickOverlay)) {
        updateShow(false);
      }
    };
    const renderAction = (action, index2) => {
      const { icon, text, color, disabled, className: actionClassname } = action;
      return /* @__PURE__ */ React.createElement("div", {
        key: index2,
        className: clsx(
          bem$12("action", { disabled, "with-icon": icon }),
          actionClassname
        ),
        style: { color },
        onClick: () => onClickAction(action, index2)
      }, icon ? React.cloneElement(icon, {
        className: clsx(bem$12("action-icon"))
      }) : null, /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$12("action-text"), BORDER_BOTTOM)
      }, text));
    };
    useEffect(() => {
      return () => {
        var _a;
        if (popper.current) {
          (_a = popper.current) == null ? void 0 : _a.destroy();
          popper.current = null;
        }
      };
    }, []);
    useLazyEffect(() => {
      updateLocation();
    }, [visible, props.placement]);
    useEffect(() => {
      let popupTarget;
      const prevent = (e) => e.stopPropagation();
      if (popoverRef.current && popoverRef.current.popupRef.current) {
        popupTarget = popoverRef.current.popupRef.current;
        popupTarget.addEventListener("touchstart", prevent);
      }
      return () => {
        if (popupTarget)
          popupTarget.removeEventListener("touchstart", prevent);
      };
    }, [popoverRef.current]);
    useImperativeHandle(ref, () => ({
      show: () => {
        if (visible) {
          updateShow(false);
          setTimeout(() => updateShow(true), 0);
          return;
        }
        updateShow(true);
      },
      hide: () => updateShow(false)
    }));
    useClickAway(wrapperRef, onClickAway, "touchstart");
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", {
      ref: wrapperRef,
      className: clsx(bem$12("wrapper")),
      onClick: onClickWrapper
    }, props.reference), /* @__PURE__ */ React.createElement(Popup, {
      ref: popoverRef,
      visible,
      className: clsx(className, bem$12([props.theme])),
      position: "",
      transition: "rv-zoom",
      lockScroll: false,
      ...pick(props, popupProps)
    }, /* @__PURE__ */ React.createElement("div", {
      className: clsx(bem$12("arrow"))
    }), /* @__PURE__ */ React.createElement("div", {
      role: "menu",
      className: clsx(bem$12("content"))
    }, children || props.actions.map(renderAction))));
  }
);
Popover.defaultProps = {
  overlay: false,
  duration: 300,
  closeOnClickAction: true,
  closeOnClickOverlay: true,
  closeOnClickOutside: true,
  offset: [0, 8],
  theme: "light",
  trigger: "click",
  actions: [],
  placement: "bottom"
};
var index$D = "";
function useLockFn(fn) {
  const lockRef = useRef(false);
  return useCallback(
    async (...args) => {
      if (lockRef.current)
        return;
      lockRef.current = true;
      try {
        const ret = await fn(...args);
        lockRef.current = false;
        return ret;
      } catch (e) {
        lockRef.current = false;
        throw e;
      }
    },
    [fn]
  );
}
function debounce(func, wait, options) {
  let lastArgs, lastThis, maxWait, result, timerId, lastCallTime;
  let lastInvokeTime = 0;
  let leading = false;
  let maxing = false;
  let trailing = true;
  const useRAF = !wait && wait !== 0 && typeof root.requestAnimationFrame === "function";
  if (typeof func !== "function") {
    throw new TypeError("Expected a function");
  }
  wait = +wait || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = "maxWait" in options;
    maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : maxWait;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  function invokeFunc(time) {
    const args = lastArgs;
    const thisArg = lastThis;
    lastArgs = lastThis = void 0;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }
  function startTimer(pendingFunc, wait2) {
    if (useRAF) {
      root.cancelAnimationFrame(timerId);
      return root.requestAnimationFrame(pendingFunc);
    }
    return setTimeout(() => pendingFunc(), wait2);
  }
  function cancelTimer(id) {
    if (useRAF) {
      return root.cancelAnimationFrame(id);
    }
    clearTimeout(id);
  }
  function leadingEdge(time) {
    lastInvokeTime = time;
    timerId = startTimer(timerExpired, wait);
    return leading ? invokeFunc(time) : result;
  }
  function remainingWait(time) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    const timeWaiting = wait - timeSinceLastCall;
    return maxing ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
  }
  function shouldInvoke(time) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }
  function timerExpired() {
    const time = Date.now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    timerId = startTimer(timerExpired, remainingWait(time));
  }
  function trailingEdge(time) {
    timerId = void 0;
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = void 0;
    return result;
  }
  function cancel() {
    if (timerId !== void 0) {
      cancelTimer(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = void 0;
  }
  function flush() {
    return timerId === void 0 ? result : trailingEdge(Date.now());
  }
  function pending() {
    return timerId !== void 0;
  }
  function debounced(...args) {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);
    lastArgs = args;
    lastThis = this;
    lastCallTime = time;
    if (isInvoking) {
      if (timerId === void 0) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        timerId = startTimer(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === void 0) {
      timerId = startTimer(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  debounced.pending = pending;
  return debounced;
}
function throttle(func, wait, options) {
  let leading = true;
  let trailing = true;
  if (typeof func !== "function") {
    throw new TypeError("Expected a function");
  }
  if (isObject(options)) {
    leading = "leading" in options ? !!options.leading : leading;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    leading,
    trailing,
    "maxWait": wait
  });
}
function useThrottleFn(fn, options) {
  var _a;
  const fnRef = useLatest(fn);
  const wait = (_a = options == null ? void 0 : options.wait) != null ? _a : 1e3;
  const throttled = useMemo(
    () => throttle(
      (...args) => {
        return fnRef.current(...args);
      },
      wait,
      options
    ),
    []
  );
  useUnmount(() => {
    throttled.cancel();
  });
  return {
    run: throttled,
    cancel: throttled.cancel,
    flush: throttled.flush
  };
}
const [bem$11] = createNamespace("list");
function isWindow(element) {
  return element === window;
}
const LoadMore = React.forwardRef(
  (props, ref) => {
    const { locale } = React.useContext(ConfigProvider$1);
    const [failed, setFailed] = React.useState(false);
    const doLoadMore = useLockFn(async (isRetry) => {
      try {
        await props.onLoad(isRetry);
      } catch (e) {
        setFailed(true);
        throw e;
      }
    });
    const elementRef = React.useRef(null);
    const [flag, setFlag] = React.useState({});
    const nextFlagRef = React.useRef(flag);
    const [scrollParent, setScrollParent] = React.useState();
    const { run: check } = useThrottleFn(
      async () => {
        if (nextFlagRef.current !== flag)
          return;
        if (props.finished)
          return;
        const element = elementRef.current;
        if (!element)
          return;
        if (!element.offsetParent)
          return;
        const parent = getScrollParent(element);
        setScrollParent(parent);
        if (!parent)
          return;
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top;
        const current = isWindow(parent) ? window.innerHeight : parent.getBoundingClientRect().bottom;
        const isReachEdge = current >= elementTop - props.threshold;
        if (isReachEdge) {
          const nextFlag = {};
          nextFlagRef.current = nextFlag;
          await doLoadMore(false);
          setFlag(nextFlag);
        }
      },
      {
        wait: 100,
        leading: true,
        trailing: true
      }
    );
    React.useEffect(() => {
      check();
    });
    React.useEffect(() => {
      const element = elementRef.current;
      if (!element)
        return;
      if (!scrollParent)
        return;
      function onScroll() {
        check();
      }
      scrollParent.addEventListener("scroll", onScroll);
      return () => {
        scrollParent.removeEventListener("scroll", onScroll);
      };
    }, [scrollParent]);
    async function retry() {
      setFailed(false);
      await doLoadMore(true);
      setFlag(nextFlagRef.current);
    }
    const renderDone = () => {
      if (props.finishedText) {
        return /* @__PURE__ */ React.createElement("div", {
          className: clsx(bem$11("finished"))
        }, props.finishedText);
      }
      return null;
    };
    const renderFailed = () => {
      if (props.errorText) {
        if (typeof props.errorText === "function")
          return props.errorText(retry);
        return /* @__PURE__ */ React.createElement("div", {
          onClick: retry,
          className: clsx(bem$11("error"))
        }, props.errorText);
      }
      return null;
    };
    const renderLoading = () => {
      return /* @__PURE__ */ React.createElement(Loading, {
        className: clsx(bem$11("loading")),
        size: 16
      }, props.loadingText || locale.loading);
    };
    const renderPlaceholder = () => {
      if (props.finished)
        return renderDone();
      if (failed)
        return renderFailed();
      return renderLoading();
    };
    React.useImperativeHandle(ref, () => ({ check }));
    return /* @__PURE__ */ React.createElement("div", {
      className: clsx(props.className, bem$11()),
      style: props.style
    }, props.children, /* @__PURE__ */ React.createElement("div", {
      className: clsx(props.className, bem$11("loadmore")),
      ref: elementRef
    }, renderPlaceholder()));
  }
);
LoadMore.defaultProps = {
  threshold: 300
};
const List = forwardRef((props, ref) => {
  return /* @__PURE__ */ React.createElement(LoadMore, {
    ref,
    className: clsx(props.className),
    style: props.style,
    onLoad: props.onLoad,
    threshold: props.offset,
    finished: props.finished,
    finishedText: props.finishedText,
    loadingText: props.loadingText,
    errorText: props.errorText
  }, props.children);
});
List.defaultProps = {
  offset: 300
};
var index$C = "";
const [bem$10] = createNamespace("steps");
const Steps$1 = ({
  children,
  className,
  style,
  ...props
}) => {
  return /* @__PURE__ */ React.createElement("div", {
    className: clsx(className, bem$10([props.direction])),
    style
  }, /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$10("items"))
  }, React.Children.toArray(children).filter(Boolean).map(
    (child, index2) => React.cloneElement(child, {
      index: index2,
      parent: props
    })
  )));
};
Steps$1.defaultProps = {
  active: 0,
  direction: "horizontal",
  activeIcon: /* @__PURE__ */ React.createElement(Checked, null)
};
const [bem$$] = createNamespace("step");
const StepsItem = ({ children, ...props }) => {
  const { index: index2, parent: parentProps } = props;
  const getStatus = () => {
    const active = +parentProps.active;
    if (index2 < active) {
      return "finish";
    }
    return index2 === active ? "process" : "waiting";
  };
  const isActive = () => getStatus() === "process";
  const lineStyle = useMemo(
    () => ({
      background: getStatus() === "finish" ? parentProps.activeColor : parentProps.inactiveColor
    }),
    [
      index2,
      parentProps.active,
      parentProps.activeColor,
      parentProps.inactiveColor
    ]
  );
  const titleStyle = useMemo(() => {
    if (isActive()) {
      return { color: parentProps.activeColor };
    }
    if (!getStatus()) {
      return { color: parentProps.inactiveColor };
    }
    return {};
  }, [
    index2,
    parentProps.active,
    parentProps.activeColor,
    parentProps.inactiveColor
  ]);
  const onClickStep = () => {
    if (parentProps.onClickStep)
      parentProps.onClickStep(index2);
  };
  const renderCircle = () => {
    var _a, _b, _c;
    const { activeColor } = parentProps;
    const finishIcon = (_a = props.finishIcon) != null ? _a : parentProps.finishIcon;
    const activeIcon = (_b = props.activeIcon) != null ? _b : parentProps.activeIcon;
    const inactiveIcon = (_c = props.inactiveIcon) != null ? _c : parentProps.inactiveIcon;
    if (isActive()) {
      if (activeIcon) {
        return React.cloneElement(activeIcon, {
          className: clsx(bem$$("icon", "active")),
          color: activeColor,
          style: {
            color: activeColor
          }
        });
      }
    }
    if (getStatus() === "finish" && finishIcon) {
      return React.cloneElement(finishIcon, {
        className: clsx(bem$$("icon", "finish")),
        color: activeColor,
        style: {
          color: activeColor
        }
      });
    }
    if (inactiveIcon) {
      return React.cloneElement(inactiveIcon, {
        className: clsx(bem$$("icon")),
        color: activeColor,
        style: {
          color: activeColor
        }
      });
    }
    return /* @__PURE__ */ React.createElement("i", {
      className: clsx(bem$$("circle")),
      style: lineStyle
    });
  };
  const status = getStatus();
  return /* @__PURE__ */ React.createElement("div", {
    style: props.style,
    className: clsx(
      props.className,
      BORDER,
      bem$$([parentProps.direction, { [status]: status }])
    )
  }, /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$$("title", { active: isActive() })),
    style: titleStyle,
    onClick: onClickStep
  }, children), /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$$("circle-container")),
    onClick: onClickStep
  }, renderCircle()), /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$$("line")),
    style: lineStyle
  }));
};
const Steps = Object.assign(Steps$1, { Item: StepsItem });
var index$B = "";
const [bem$_] = createNamespace("toast");
const Toast$1 = (props) => {
  let clickable = false;
  const toggleClickable = () => {
    const newValue = props.visible && props.forbidClick;
    if (clickable !== newValue) {
      clickable = newValue;
      lockClick(clickable);
    }
    if (!props.visible) {
      lockClick(false);
    }
  };
  const onClick = () => {
    if (props.closeOnClick) {
      props.onClose();
    }
  };
  useEffect(() => {
    toggleClickable();
  }, [props.visible, props.forbidClick]);
  const renderIcon = () => {
    const { icon, type, iconSize, loadingType } = props;
    const hasIcon = icon || type === "success" || type === "fail";
    if (hasIcon) {
      const buildInIcon = type === "fail" ? /* @__PURE__ */ React.createElement(Cross, null) : /* @__PURE__ */ React.createElement(Success, null);
      return React.cloneElement(icon || buildInIcon, {
        className: clsx(bem$_("icon")),
        fontSize: iconSize
      });
    }
    if (type === "loading") {
      return /* @__PURE__ */ React.createElement(Loading, {
        className: clsx(bem$_("loading")),
        type: loadingType
      });
    }
    return null;
  };
  const renderMessage = () => {
    const { message } = props;
    if (isDef(message) && message !== "") {
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$_("info"))
      }, message);
    }
    return null;
  };
  return /* @__PURE__ */ React.createElement(Popup, {
    className: clsx([
      bem$_([props.position, { [props.type]: !props.icon }]),
      props.className
    ]),
    visible: props.visible,
    overlay: props.overlay,
    transition: props.transition,
    overlayClass: props.overlayClass,
    overlayStyle: props.overlayStyle,
    closeOnClickOverlay: props.closeOnClickOverlay,
    lockScroll: false,
    onClick,
    onClose: props.onClose,
    onClosed: props.onClosed,
    onOpened: props.onOpened,
    teleport: props.teleport
  }, renderIcon(), renderMessage());
};
Toast$1.defaultProps = {
  type: "info",
  duration: 2e3,
  position: "middle",
  transition: "rv-fade",
  loadingType: "circular",
  overlay: false
};
const defaultOptions = {
  message: "",
  className: "",
  type: "info",
  position: "middle",
  forbidClick: false,
  duration: 2e3,
  teleport: () => document.body
};
const toastArray = [];
let allowMultiple = false;
let currentOptions = extend({}, defaultOptions);
const defaultOptionsMap = /* @__PURE__ */ new Map();
function syncClear() {
  let fn = toastArray.pop();
  while (fn) {
    fn();
    fn = toastArray.pop();
  }
}
function nextTickClear() {
  setTimeout(syncClear);
}
const ToastObj = (p) => {
  if (!canUseDom())
    return null;
  const props = parseOptions(p);
  const update = {
    config: () => {
    },
    clear: () => null
  };
  let timer = 0;
  const { onClose, teleport } = props;
  const container = document.createElement("div");
  const bodyContainer = resolveContainer(teleport);
  bodyContainer.appendChild(container);
  const TempToast = () => {
    const options = {
      duration: 2e3,
      ...props
    };
    const [visible, setVisible] = useState(false);
    const [state, setState] = useState({ ...options });
    const internalOnClosed = useCallback(() => {
      if (state.forbidClick) {
        lockClick(false);
      }
      const unmountResult = unmount(container);
      if (unmountResult && container.parentNode) {
        container.parentNode.removeChild(container);
      }
    }, [container]);
    const destroy = useCallback(() => {
      setVisible(false);
      if (onClose)
        onClose();
    }, []);
    update.clear = internalOnClosed;
    update.config = useCallback(
      (nextState) => {
        setState(
          (prev2) => typeof nextState === "function" ? { ...prev2, ...nextState(prev2) } : { ...prev2, ...nextState }
        );
      },
      [setState]
    );
    useEffect(() => {
      setVisible(true);
      if (!allowMultiple)
        syncClear();
      toastArray.push(internalOnClosed);
      if (state.duration !== 0 && "duration" in state) {
        timer = window.setTimeout(destroy, +state.duration);
      }
      return () => {
        if (timer !== 0) {
          window.clearTimeout(timer);
        }
      };
    }, []);
    return /* @__PURE__ */ React.createElement(Toast$1, {
      ...state,
      visible,
      teleport: () => container,
      onClose: destroy,
      onClosed: internalOnClosed
    });
  };
  render(/* @__PURE__ */ React.createElement(TempToast, null), container);
  return update;
};
function parseOptions(message) {
  if (isObject(message)) {
    return message;
  }
  return { message };
}
const createMethod = (type) => (options) => ToastObj({
  ...currentOptions,
  ...defaultOptionsMap.get(type),
  ...parseOptions(options),
  type
});
["info", "loading", "success", "fail"].forEach((method) => {
  ToastObj[method] = createMethod(method);
});
ToastObj.allowMultiple = (value = true) => {
  allowMultiple = value;
};
ToastObj.clear = nextTickClear;
function setDefaultOptions(type, options) {
  if (typeof type === "string") {
    defaultOptionsMap.set(type, options);
  } else {
    extend(currentOptions, type);
  }
}
ToastObj.setDefaultOptions = setDefaultOptions;
ToastObj.resetDefaultOptions = (type) => {
  if (typeof type === "string") {
    defaultOptionsMap.delete(type);
  } else {
    currentOptions = extend({}, defaultOptions);
    defaultOptionsMap.clear();
  }
};
const Toast = ToastObj;
var index$A = "";
const [bem$Z] = createNamespace("action-sheet");
const ActionSheet = (props) => {
  const onCancel = () => {
    var _a, _b;
    (_a = props.onClose) == null ? void 0 : _a.call(props);
    (_b = props.onCancel) == null ? void 0 : _b.call(props);
  };
  const renderHeader = () => {
    if (!props.title)
      return null;
    return /* @__PURE__ */ React.createElement("div", {
      className: clsx(bem$Z("header"))
    }, props.title, props.closeable && React.cloneElement(props.closeIcon, {
      className: clsx(bem$Z("clear")),
      onClick: onCancel
    }));
  };
  const renderCancel = () => {
    if (!props.cancelText)
      return null;
    return [
      /* @__PURE__ */ React.createElement("div", {
        key: "cancel-gap",
        className: clsx(bem$Z("gap"))
      }),
      /* @__PURE__ */ React.createElement("button", {
        key: "cancel-btn",
        type: "button",
        className: clsx(bem$Z("cancel")),
        onClick: onCancel
      }, props.cancelText)
    ];
  };
  const renderOption = (item, index2) => {
    const {
      name,
      color,
      subname,
      loading,
      callback,
      disabled,
      className,
      style
    } = item;
    const Content = loading ? /* @__PURE__ */ React.createElement(Loading, {
      className: clsx(bem$Z("loading-icon"))
    }) : [
      /* @__PURE__ */ React.createElement("span", {
        key: `${index2}-1`,
        className: clsx(bem$Z("name"))
      }, name),
      subname && /* @__PURE__ */ React.createElement("div", {
        key: `${index2}-2`,
        className: clsx(bem$Z("subname"))
      }, subname)
    ];
    const onClick = () => {
      if (disabled || loading) {
        return;
      }
      if (callback) {
        callback(item);
      }
      if (props.closeOnClickAction) {
        onCancel();
      }
      setTimeout(() => {
        var _a;
        (_a = props.onSelect) == null ? void 0 : _a.call(props, item, index2);
      }, 0);
    };
    return /* @__PURE__ */ React.createElement("button", {
      key: index2,
      type: "button",
      style: { color, ...style },
      className: clsx(bem$Z("item", { loading, disabled }), className),
      onClick
    }, Content);
  };
  const renderDescription = () => {
    if (props.description) {
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$Z("description"))
      }, props.description);
    }
    return null;
  };
  const renderOptions = () => {
    if (props.actions) {
      return props.actions.map(renderOption);
    }
    return null;
  };
  return /* @__PURE__ */ React.createElement(Popup, {
    visible: props.visible,
    className: clsx(bem$Z("wrapper")),
    position: "bottom",
    ...pick(props, sharedPopupProps),
    onClose: onCancel,
    closeable: false
  }, /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$Z(), props.className),
    style: props.style
  }, renderHeader(), renderDescription(), /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$Z("content"))
  }, renderOptions(), props.children), renderCancel()));
};
ActionSheet.defaultProps = {
  closeable: true,
  safeAreaInsetBottom: true,
  round: true,
  lockScroll: true,
  overlay: true,
  closeOnClickOverlay: true,
  closeIcon: /* @__PURE__ */ React.createElement(Cross, null)
};
var index$z = "";
function useRefs() {
  const refs = React.useRef([]);
  const setRefs = React.useCallback(
    (index2) => (el) => {
      if (el)
        refs.current[index2] = el;
    },
    []
  );
  const reset = React.useCallback(() => {
    refs.current = [];
  }, []);
  return [refs.current, setRefs, reset];
}
const DropdownMenu$2 = createContext({});
const useMergedState = (option) => {
  const { defaultValue, value } = option || {};
  const [innerValue, setInnerValue] = useState(() => {
    if (value !== void 0) {
      return value;
    }
    if (defaultValue !== void 0) {
      return typeof defaultValue === "function" ? defaultValue() : defaultValue;
    }
    return void 0;
  });
  const mergedValue = value !== void 0 ? value : innerValue;
  function triggerChange(newValue) {
    setInnerValue(newValue);
  }
  return [mergedValue, triggerChange];
};
const [bem$Y] = createNamespace("dropdown-menu");
const DropdownMenu$1 = forwardRef(
  (props, ref) => {
    const [innerValue = {}, setInnerValue] = useMergedState({
      value: props.value,
      defaultValue: props.defaultValue
    });
    const [childrenRefs, setChildrenRefs] = useRefs();
    const [showPopupIndex, setShowPopupIndex] = useState(null);
    const showPopupIndexRef = useRef();
    const root2 = useRef();
    const barRef = useRef();
    const offset = useRef(0);
    const isToggleEvent = useRef(false);
    const rect = useRef({ bottom: 0, top: 0 });
    const innerEffect = useRef(false);
    const opened = useMemo(() => showPopupIndex !== null, [showPopupIndex]);
    const barStyle = () => {
      if (opened && isDef(props.zIndex)) {
        return {
          zIndex: +props.zIndex + 1
        };
      }
      return {};
    };
    const updateShowPopupIndex = (current) => {
      showPopupIndexRef.current = current;
      setShowPopupIndex(current);
    };
    const closeAll = () => {
      childrenRefs.forEach((item) => {
        item.toggle(false);
      });
      updateShowPopupIndex(null);
    };
    const onClickAway = () => {
      if (props.closeOnClickOutside && !isToggleEvent.current) {
        closeAll();
      } else {
        isToggleEvent.current = false;
      }
    };
    const updateOffset = () => {
      if (barRef.current) {
        rect.current = useRect(barRef.current);
        if (props.direction === "down") {
          offset.current = rect.current.bottom;
        } else {
          offset.current = window.innerHeight - rect.current.top;
        }
      }
    };
    const onScroll = () => {
      if (opened) {
        updateOffset();
      }
    };
    const showItem = (index2) => {
      const item = childrenRefs[index2];
      isToggleEvent.current = true;
      updateOffset();
      updateShowPopupIndex(index2);
      item.toggle(true);
    };
    const toggleItem = (active) => {
      childrenRefs.forEach((item, index2) => {
        if (index2 === active) {
          if (active === showPopupIndexRef.current) {
            updateShowPopupIndex(null);
            item.toggle();
            return;
          }
          showItem(active);
        }
      });
    };
    const close = () => {
      updateShowPopupIndex(null);
    };
    const renderTitle = (item, index2) => {
      const showPopup = showPopupIndex === index2;
      const { titleClass } = item;
      const disabled = props.disabled || item.disabled;
      return /* @__PURE__ */ React.createElement("div", {
        key: index2,
        role: "button",
        tabIndex: disabled ? -1 : 0,
        className: clsx(bem$Y("item", { disabled })),
        onClick: () => {
          if (!disabled) {
            toggleItem(index2);
          }
        }
      }, /* @__PURE__ */ React.createElement("span", {
        className: clsx(
          bem$Y("title", {
            down: showPopup === (props.direction === "down"),
            active: showPopup
          }),
          titleClass
        ),
        style: { color: showPopup ? props.activeColor : "" }
      }, /* @__PURE__ */ React.createElement("div", {
        className: "rv-ellipsis"
      }, item.renderTitle(innerValue[item.name]))));
    };
    useUpdateEffect(() => {
      if (innerEffect.current) {
        innerEffect.current = false;
        return;
      }
      if (!props.value) {
        setInnerValue(void 0);
        return;
      }
      setInnerValue(props.value);
    }, [props.value]);
    useEffect(() => {
      if (barRef.current) {
        updateOffset();
      }
    }, [barRef.current]);
    const onInnerChange = (v) => {
      innerEffect.current = true;
      const newValue = { ...innerValue, ...v };
      setInnerValue(newValue);
      if (props.onChange)
        props.onChange(newValue);
    };
    const scrollParent = useScrollParent(root2);
    useEventListener("scroll", onScroll, { target: scrollParent });
    useClickAway(root2, onClickAway);
    useImperativeHandle(ref, () => ({
      toggleItem,
      showItem,
      close: closeAll
    }));
    return /* @__PURE__ */ React.createElement(DropdownMenu$2.Provider, {
      value: { props, value: innerValue, onChange: onInnerChange, close }
    }, /* @__PURE__ */ React.createElement("div", {
      ref: root2,
      className: clsx(bem$Y(), props.className),
      style: { ...props.style }
    }, /* @__PURE__ */ React.createElement("div", {
      ref: barRef,
      style: barStyle(),
      className: clsx(bem$Y("bar", { opened }))
    }, childrenRefs.map(renderTitle)), Children.toArray(props.children).filter(Boolean).map(
      (child, index2) => cloneElement(child, {
        ref: setChildrenRefs(index2),
        offset: offset.current,
        showPopup: showPopupIndex === index2
      })
    )));
  }
);
DropdownMenu$1.defaultProps = {
  duration: 200,
  overlay: true,
  closeOnClickOutside: true,
  closeOnClickOverlay: true,
  direction: "down",
  defaultValue: {}
};
const inheritPropsKey = [
  "overlay",
  "overlayClass",
  "overlayStyle",
  "disabled",
  "placeholder",
  "onOpen",
  "onClosed",
  "onOpened",
  "teleport",
  "closeOnClickOverlay"
];
function inheritProps(parentProps, props) {
  return { ...parentProps, ...props };
}
const [bem$X] = createNamespace("dropdown-item");
const DropdownMenuItem = forwardRef((props, ref) => {
  var _a;
  const [state, setState] = useSetState({
    transition: true,
    showWrapper: false
  });
  const parent = useContext(DropdownMenu$2);
  const currentValue = (_a = parent.value) == null ? void 0 : _a[props.name];
  const onClosed = () => {
    var _a2, _b;
    setState({ showWrapper: false });
    (_b = (_a2 = props.onClosed) != null ? _a2 : parent.props.onClosed) == null ? void 0 : _b();
  };
  const onClickWrapper = (event) => {
    if (props.teleport) {
      event.stopPropagation();
    }
  };
  const onClose = () => {
    var _a2, _b;
    parent.close();
    (_b = (_a2 = props.onClose) != null ? _a2 : parent.props.onClose) == null ? void 0 : _b();
  };
  const toggle = (show2 = !props.showPopup, options = {}) => {
    if (show2 === props.showPopup) {
      return;
    }
    const newState = {};
    newState.transition = !options.immediate;
    if (show2) {
      newState.showWrapper = true;
    } else {
      onClose();
    }
    setState(newState);
  };
  const renderTitle = (itemValue) => {
    if (props.title) {
      return props.title;
    }
    const match = props.options.find((option) => option.value === itemValue);
    return match ? match.text : props.placeholder;
  };
  const renderOption = (option) => {
    const { activeColor } = parent.props;
    const active = option.value === currentValue;
    const onClick = () => {
      if (option.value !== currentValue) {
        parent.onChange({ [props.name]: option.value });
      }
      onClose();
    };
    return /* @__PURE__ */ React.createElement(Cell, {
      clickable: true,
      key: option.value,
      icon: option.icon,
      title: option.text,
      className: clsx(bem$X("option", { active })),
      style: { color: active ? activeColor : "" },
      onClick
    }, active && /* @__PURE__ */ React.createElement(Success, {
      className: clsx(bem$X("icon")),
      color: activeColor
    }));
  };
  const renderContent = () => {
    var _a2;
    const { offset } = props;
    const { zIndex, overlayStyle, duration, direction } = parent.props;
    const style = getZIndexStyle(zIndex);
    if (direction === "down") {
      style.top = `${offset}px`;
    } else {
      style.bottom = `${offset}px`;
    }
    const attrs = pick(inheritProps(parent.props, props), inheritPropsKey);
    return /* @__PURE__ */ React.createElement("div", {
      style: { ...style, display: state.showWrapper ? "block" : "none" },
      className: clsx(bem$X([direction])),
      onClick: onClickWrapper
    }, /* @__PURE__ */ React.createElement(Popup, {
      ...attrs,
      teleport: null,
      visible: props.showPopup,
      className: clsx(bem$X("content")),
      position: direction === "down" ? "top" : "bottom",
      duration: state.transition ? +duration : 0,
      overlayStyle: { position: "absolute", ...overlayStyle },
      onClose,
      onClosed
    }, (_a2 = props.options) == null ? void 0 : _a2.map(renderOption), props.children));
  };
  useImperativeHandle(ref, () => ({
    toggle,
    renderTitle,
    state,
    titleClass: props.titleClass,
    disabled: props.disabled,
    name: props.name,
    options: props.options
  }));
  if (props.teleport)
    return renderToContainer(props.teleport, renderContent());
  return renderContent();
});
DropdownMenuItem.defaultProps = {
  placeholder: "\u8BF7\u9009\u62E9",
  options: []
};
const DropdownMenu = Object.assign(DropdownMenu$1, { Item: DropdownMenuItem });
var index$y = "";
const [bem$W] = createNamespace("search");
const Search = forwardRef((props, ref) => {
  const { locale } = useContext(ConfigProvider$1);
  const filedRef = useRef();
  const innerEffect = useRef(false);
  const [value, setValue] = useState(() => props.value);
  const blur = () => {
    var _a;
    (_a = filedRef.current) == null ? void 0 : _a.blur();
  };
  const focus = () => {
    var _a;
    (_a = filedRef.current) == null ? void 0 : _a.focus();
  };
  const change = (v) => {
    var _a;
    innerEffect.current = true;
    (_a = props == null ? void 0 : props.onChange) == null ? void 0 : _a.call(props, v);
    setValue(v);
  };
  const onCancel = () => {
    var _a;
    change("");
    (_a = props == null ? void 0 : props.onCancel) == null ? void 0 : _a.call(props);
  };
  const onKeypress = (event) => {
    var _a;
    if (event.key === "Enter") {
      preventDefault(event.nativeEvent);
      (_a = props == null ? void 0 : props.onSearch) == null ? void 0 : _a.call(props, value);
    }
  };
  const onClear = (event) => {
    var _a;
    change("");
    (_a = props == null ? void 0 : props.onClear) == null ? void 0 : _a.call(props, event);
  };
  const onClickInput = (event) => {
    var _a;
    (_a = props == null ? void 0 : props.onClickInput) == null ? void 0 : _a.call(props, event);
  };
  const renderLabel = () => {
    if (props.label) {
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$W("label"))
      }, props.label);
    }
    return null;
  };
  const renderAction = () => {
    if (props.showAction) {
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$W("action")),
        role: "button",
        tabIndex: 0,
        onClick: onCancel
      }, props.actionText || locale.cancel);
    }
    return null;
  };
  const {
    autoFocus,
    align,
    disabled = false,
    maxLength,
    leftIcon,
    rightIcon,
    clearable = true,
    clearTrigger,
    placeholder,
    readOnly,
    error,
    errorMessage,
    formatter,
    formatTrigger,
    clearIcon
  } = props;
  const fieldPropNames = {
    align,
    leftIcon,
    rightIcon,
    clearable,
    clearTrigger,
    placeholder,
    disabled,
    maxLength,
    readOnly,
    autoFocus,
    error,
    errorMessage,
    formatter,
    formatTrigger,
    clearIcon
  };
  const renderField = () => {
    return /* @__PURE__ */ React.createElement(FieldNamespace, {
      ref: filedRef,
      className: clsx(bem$W("field")),
      type: "search",
      rows: 1,
      value: value || "",
      border: false,
      onKeyPress: onKeypress,
      onFocus: props.onFocus,
      onBlur: props.onBlur,
      onChange: change,
      onClear,
      onClickInput,
      ...fieldPropNames
    });
  };
  useEffect(() => {
    if (innerEffect.current) {
      innerEffect.current = false;
      return;
    }
    setValue(props.value);
  }, [props.value]);
  useImperativeHandle(ref, () => ({
    focus,
    blur
  }));
  return /* @__PURE__ */ React.createElement("div", {
    className: clsx(
      props.className,
      bem$W({ "show-action": props.showAction })
    ),
    style: { ...props.style, background: props.background }
  }, /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$W("content", props.shape))
  }, renderLabel(), renderField()), renderAction());
});
Search.defaultProps = {
  shape: "square",
  leftIcon: /* @__PURE__ */ React.createElement(Search$1, null)
};
var index$x = "";
const [bem$V] = createNamespace("sidebar-item");
const SidebarItem = (props) => {
  const { parent, index: index2 } = props;
  const onClick = () => {
    var _a;
    if (props.disabled) {
      return;
    }
    (_a = props.onClick) == null ? void 0 : _a.call(props, index2);
    parent.setActive(index2);
  };
  const { dot, badge, title, disabled } = props;
  const selected = index2 === parent.getActive();
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("a", {
    className: clsx(bem$V({ select: selected, disabled })),
    onClick
  }, /* @__PURE__ */ React.createElement(Badge, {
    dot,
    content: badge,
    className: clsx(bem$V("text"))
  }, title)));
};
const [bem$U] = createNamespace("sidebar");
const Sidebar$1 = ({
  children,
  className,
  style,
  ...props
}) => {
  const [active, updateActive] = useMergedState({
    value: props.value,
    defaultValue: props.defaultValue
  });
  const getActive = () => active;
  const setActive = (value) => {
    var _a;
    if (value !== getActive()) {
      updateActive(value);
      (_a = props.onChange) == null ? void 0 : _a.call(props, value);
    }
  };
  const validChildren = useMemo(
    () => React.Children.toArray(children).filter(Boolean).map((child) => {
      if (!React.isValidElement(child))
        return null;
      if (child.type !== SidebarItem) {
        return null;
      }
      return child;
    }),
    [children]
  );
  return /* @__PURE__ */ React.createElement("div", {
    className: clsx(className, bem$U("wrapper")),
    style
  }, /* @__PURE__ */ React.createElement("div", {
    className: clsx(props.sideClassName, bem$U()),
    style: props.sideStyle
  }, validChildren.map(
    (child, index2) => React.cloneElement(child, {
      index: index2,
      parent: {
        setActive,
        getActive
      }
    })
  )), validChildren.map(
    (child, index2) => {
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(child.props.contentClassName, bem$U("content")),
        key: child.key,
        style: {
          ...child.props.contentStyle,
          display: index2 === getActive() ? void 0 : "none"
        }
      }, child.props.children);
    }
  ));
};
Sidebar$1.defaultProps = {
  defaultValue: 0
};
const Sidebar = Object.assign(Sidebar$1, { Item: SidebarItem });
var index$w = "";
var index$v = "";
const [bem$T] = createNamespace("sticky");
const Sticky = (props) => {
  const [state, updateState] = useSetState({
    fixed: false,
    width: 0,
    height: 0,
    transform: 0
  });
  const root2 = useRef(null);
  const scrollParent = useScrollParent(root2);
  const offset = useMemo(
    () => unitToPx(props.position === "top" ? props.offsetTop : props.offsetBottom),
    [props.position, props.offsetTop, props.offsetBottom]
  );
  const rootStyle = useMemo(() => {
    const { fixed, height, width } = state;
    if (fixed) {
      return {
        width: `${width}px`,
        height: `${height}px`
      };
    }
    return null;
  }, [state.fixed, state.height, state.width]);
  const stickyStyle = useMemo(() => {
    if (!state.fixed) {
      return null;
    }
    const style = extend(getZIndexStyle(props.zIndex), {
      width: `${state.width}px`,
      height: `${state.height}px`,
      [props.position]: `${offset}px`
    });
    if (state.transform) {
      style.transform = `translate3d(0, ${state.transform}px, 0)`;
    }
    return style;
  }, [
    props.position,
    state.fixed,
    offset,
    state.width,
    state.height,
    state.transform
  ]);
  const emitScroll = (scrollTop, isFixed) => {
    if (props.onScroll) {
      props.onScroll({
        scrollTop,
        isFixed
      });
    }
  };
  const onScroll = () => {
    if (!root2.current || isHidden(root2.current)) {
      return;
    }
    const { container, position } = props;
    const rootRect = useRect(root2.current);
    const scrollTop = getScrollTop$1(window);
    const newState = {};
    newState.width = rootRect.width;
    newState.height = rootRect.height;
    if (position === "top") {
      if (container) {
        const containerRect = useRect(container.current);
        const difference = containerRect.bottom - offset - newState.height;
        newState.fixed = offset > rootRect.top && containerRect.bottom > 0;
        newState.transform = difference < 0 ? difference : 0;
      } else {
        newState.fixed = offset > rootRect.top;
      }
    } else {
      const { clientHeight } = document.documentElement;
      if (container) {
        const containerRect = useRect(container.current);
        const difference = clientHeight - containerRect.top - offset - newState.height;
        newState.fixed = clientHeight - offset < rootRect.bottom && clientHeight > containerRect.top;
        newState.transform = difference < 0 ? -difference : 0;
      } else {
        newState.fixed = clientHeight - offset < rootRect.bottom;
      }
    }
    updateState(newState);
    emitScroll(scrollTop, newState.fixed);
  };
  useEventListener("scroll", onScroll, { target: scrollParent });
  useVisibilityChange(root2, onScroll);
  useUpdateEffect(() => {
    var _a;
    (_a = props.onChange) == null ? void 0 : _a.call(props, state.fixed);
  }, [state.fixed]);
  return /* @__PURE__ */ React.createElement("div", {
    ref: root2,
    style: rootStyle
  }, /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$T({ fixed: state.fixed })),
    style: stickyStyle
  }, props.children));
};
Sticky.defaultProps = {
  offsetTop: 0,
  offsetBottom: 0,
  position: "top"
};
const [bem$S] = createNamespace("tab");
const TabsTitle = forwardRef((props, ref) => {
  const {
    type,
    color,
    isActive,
    activeColor,
    inactiveColor,
    disabled,
    className
  } = props;
  const customStyle = useMemo(() => {
    const style = { ...props.style };
    const isCard = type === "card";
    if (color) {
      if (isCard) {
        style.borderColor = color;
      }
      if (!disabled) {
        if (isCard) {
          if (isActive) {
            style.backgroundColor = color;
          } else {
            style.color = color;
          }
        }
        if ((props.type === "line" || props.type === "jumbo") && isActive) {
          style.color = color;
        }
      }
    }
    const titleColor = isActive ? activeColor : inactiveColor;
    if (titleColor) {
      style.color = titleColor;
    }
    return style;
  }, [type, color, disabled, isActive, activeColor, inactiveColor]);
  const renderText = () => {
    const Title2 = /* @__PURE__ */ React.createElement("span", {
      className: clsx(
        bem$S("text", { ellipsis: !props.scrollable && props.type !== "jumbo" })
      ),
      style: {
        backgroundColor: props.type === "capsule" && isActive && color
      }
    }, (() => {
      if (typeof props.title === "function") {
        return props.title(isActive);
      }
      return props.title;
    })());
    const Description2 = props.type === "jumbo" && !!props.description ? /* @__PURE__ */ React.createElement("div", {
      className: clsx(bem$S("description")),
      style: { backgroundColor: isActive && color }
    }, (() => {
      if (typeof props.description === "function") {
        return props.description(isActive);
      }
      return props.description;
    })()) : null;
    const measureContent = /* @__PURE__ */ React.createElement(React.Fragment, null, Title2, Description2);
    if (props.badge) {
      const badgeProps = isObject(props.badge) ? props.badge : { content: props.badge };
      return /* @__PURE__ */ React.createElement(Badge, {
        ...badgeProps
      }, measureContent);
    }
    return measureContent;
  };
  return /* @__PURE__ */ React.createElement("div", {
    ref,
    className: clsx([
      bem$S({
        active: props.isActive,
        disabled: props.disabled
      }),
      className
    ]),
    style: customStyle,
    "aria-selected": props.isActive,
    onClick: props.onClick
  }, renderText());
});
var index$u = "";
const [bem$R] = createNamespace("swiper-item");
const SwiperItem = React.forwardRef(
  (props, ref) => {
    const wrapperRef = React.useRef(null);
    React.useImperativeHandle(ref, () => ({
      self: wrapperRef.current
    }));
    const [show2] = useInViewport(wrapperRef, {
      rootMargin: "-0.1px",
      threshold: 0,
      root: () => {
        var _a;
        return (_a = props.trackRef) == null ? void 0 : _a.current;
      }
    });
    return /* @__PURE__ */ React.createElement("div", {
      ref: wrapperRef,
      className: clsx(
        props.className,
        bem$R({
          hidden: props.autoHeight && show2 === false
        })
      ),
      onClick: props.onClick,
      style: props.style
    }, props.children);
  }
);
const [bem$Q] = createNamespace("swiper");
const Swiper$1 = forwardRef((props, ref) => {
  const { loop: outerLoop, autoplay, vertical, duration, autoHeight } = props;
  const axis = vertical ? "y" : "x";
  const slideRatio = props.slideSize / 100;
  const offsetRatio = props.trackOffset / 100;
  const { validChildren, count } = useMemo(() => {
    let innerCount = 0;
    const innerValidChildren = React.Children.map(props.children, (child) => {
      if (!React.isValidElement(child))
        return null;
      if (child.type !== SwiperItem) {
        return null;
      }
      innerCount++;
      return child;
    });
    return {
      validChildren: innerValidChildren,
      count: innerCount
    };
  }, [props.children]);
  const trackRef = useRef(null);
  const [childrenRefs, setChildrenRefs] = useRefs();
  const [enabled, setEnabled] = useState(() => props.enabled);
  const [current, setCurrent] = useState(props.initialSwipe);
  const [dragging, setDragging, draggingRef] = useRefState(false);
  const computedStyle = useMemo(() => {
    return {
      [`--rv-swipe-slide-size`]: `${props.slideSize}%`,
      [`--rv-swipe-track-offset`]: `${props.trackOffset}%`,
      ...props.style
    };
  }, [props.slideSize, props.trackOffset, props.style]);
  const loop = useMemo(() => {
    if (slideRatio * (count - 1) < 1)
      return false;
    return outerLoop;
  }, [count, outerLoop, slideRatio]);
  const getSlidePixels = () => {
    const track = trackRef.current;
    if (!track)
      return 0;
    const trackPixels = vertical ? track.offsetHeight : track.offsetWidth;
    return trackPixels * props.slideSize / 100;
  };
  const boundIndex = (cur) => {
    let min = 0;
    let max = count - 1;
    if (props.stuckAtBoundary) {
      min += (1 - slideRatio - offsetRatio) / slideRatio;
      max -= (1 - slideRatio - offsetRatio) / slideRatio;
    }
    return bound(cur, min, max);
  };
  const [{ position }, api] = useSpring(
    () => ({
      position: boundIndex(current) * 100,
      config: {
        tension: 200,
        friction: 30,
        duration
      },
      onRest: () => {
        if (draggingRef.current)
          return;
        if (!loop)
          return;
        const rawX = position.get();
        const totalWidth = 100 * count;
        const standardPosition = modulus(rawX, totalWidth);
        if (standardPosition === rawX)
          return;
        api.start({
          position: standardPosition,
          immediate: true
        });
      }
    }),
    [count]
  );
  const bind = useDrag(
    (state) => {
      var _a;
      const slidePixels = getSlidePixels();
      if (!slidePixels)
        return;
      if (!props.preventScroll && isScrollTarget(state.target, (_a = childrenRefs[current]) == null ? void 0 : _a.self)) {
        return;
      }
      const paramIndex = vertical ? 1 : 0;
      const offset = state.offset[paramIndex];
      const direction = state.direction[paramIndex];
      const velocity = state.velocity[paramIndex];
      setDragging(true);
      if (!state.last) {
        api.start({
          position: offset * 100 / slidePixels,
          immediate: true
        });
      } else {
        const index2 = Math.round(
          (offset + Math.min(velocity * 2e3, slidePixels) * direction) / slidePixels
        );
        swipeTo(index2);
        window.setTimeout(() => {
          setDragging(false);
        });
      }
    },
    {
      enabled,
      transform: ([x, y]) => [-x, -y],
      from: () => {
        const slidePixels = getSlidePixels();
        return [
          position.get() / 100 * slidePixels,
          position.get() / 100 * slidePixels
        ];
      },
      bounds: () => {
        if (loop)
          return {};
        const slidePixels = getSlidePixels();
        const lowerBound = boundIndex(0) * slidePixels;
        const upperBound = boundIndex(count - 1) * slidePixels;
        return vertical ? {
          top: lowerBound,
          bottom: upperBound
        } : {
          left: lowerBound,
          right: upperBound
        };
      },
      rubberband: props.rubberband,
      axis,
      preventScroll: axis === "x" ? props.preventScroll : false,
      pointer: {
        touch: true
      }
    }
  );
  const renderIndicator = () => {
    if (props.indicator === void 0 || props.indicator === true) {
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$Q("indicator", { vertical }))
      }, /* @__PURE__ */ React.createElement(SwiperPagIndicator, {
        ...props.indicatorProps,
        vertical,
        total: count,
        current
      }));
    }
    if (typeof props.indicator === "function") {
      return props.indicator(count, current);
    }
    return null;
  };
  function swipeTo(index2, immediate = false) {
    const roundedIndex = Math.round(index2);
    const targetIndex = loop ? modulus(roundedIndex, count) : bound(roundedIndex, 0, count - 1);
    setCurrent(targetIndex);
    api.start({
      position: (loop ? roundedIndex : boundIndex(roundedIndex)) * 100,
      immediate
    });
  }
  const swipeNext = () => {
    swipeTo(Math.round(position.get() / 100) + 1);
  };
  const swipePrev = () => {
    swipeTo(Math.round(position.get() / 100) - 1);
  };
  useImperativeHandle(ref, () => ({
    activeIndex: current,
    swipeTo,
    swipeNext,
    swipePrev,
    enable: () => {
      setEnabled(true);
    },
    disable: () => {
      setEnabled(false);
    }
  }));
  useIsomorphicLayoutEffect(() => {
    const maxIndex = validChildren.length - 1;
    if (current > maxIndex) {
      swipeTo(maxIndex, true);
    }
  });
  useUpdateEffect(() => {
    var _a;
    (_a = props.onChange) == null ? void 0 : _a.call(props, current);
  }, [current]);
  useEffect(() => {
    if (!autoplay || dragging)
      return noop;
    const autoplayInterval = typeof autoplay === "boolean" ? 5e3 : autoplay;
    const interval = window.setInterval(() => {
      swipeNext();
    }, autoplayInterval);
    return () => {
      window.clearInterval(interval);
    };
  }, [autoplay, dragging]);
  const renderTrackInner = () => {
    if (loop) {
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(
          bem$Q("track-inner", {
            vertical
          })
        )
      }, React.Children.map(validChildren, (child, index2) => {
        return /* @__PURE__ */ React.createElement(animated.div, {
          className: clsx(bem$Q("slide")),
          style: {
            [axis]: position.to((pos) => {
              let finalPosition = -pos + index2 * 100;
              const totalWidth = count * 100;
              const flagWidth = totalWidth / 2;
              finalPosition = modulus(finalPosition + flagWidth, totalWidth) - flagWidth;
              return `${finalPosition}%`;
            }),
            [vertical ? "top" : "left"]: `-${index2 * 100}%`
          }
        }, React.cloneElement(child, {
          ref: setChildrenRefs(index2),
          autoHeight,
          trackRef
        }));
      }));
    }
    return /* @__PURE__ */ React.createElement(animated.div, {
      className: clsx(bem$Q("track-inner")),
      style: {
        [axis]: position.to((position2) => `${-position2}%`)
      }
    }, React.Children.map(validChildren, (child, index2) => {
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$Q("slide"))
      }, React.cloneElement(child, {
        ref: setChildrenRefs(index2),
        autoHeight
      }));
    }));
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: clsx(props.className, bem$Q({ vertical })),
    style: computedStyle
  }, /* @__PURE__ */ React.createElement("div", {
    ref: trackRef,
    className: clsx(
      bem$Q("track", {
        "allow-touch-move": props.touchable
      })
    ),
    onClickCapture: (e) => {
      if (draggingRef.current) {
        e.stopPropagation();
      }
    },
    ...props.touchable ? bind() : {}
  }, renderTrackInner()), renderIndicator());
});
Swiper$1.defaultProps = {
  initialSwipe: 0,
  loop: true,
  touchable: true,
  enabled: true,
  rubberband: true,
  autoplay: false,
  slideSize: 100,
  trackOffset: 0,
  stuckAtBoundary: false,
  preventScroll: true
};
function modulus(value, division) {
  const remainder = value % division;
  return remainder < 0 ? remainder + division : remainder;
}
function isScrollTarget(element, parent) {
  if (!parent)
    return false;
  if (element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight) {
    return true;
  }
  if (element.parentElement && element.parentElement !== parent) {
    return isScrollTarget(element.parentElement, parent);
  }
  return false;
}
const Swiper = Object.assign(Swiper$1, { Item: SwiperItem });
const [bem$P] = createNamespace("tabs");
const TabsContent = (props) => {
  const innerEffect = useRef(false);
  const { animated: animated2, swipeable, duration, swiperRef } = props;
  const swiperProps = typeof swipeable === "boolean" ? {} : swipeable;
  const renderChildren = () => {
    if (animated2 || swipeable) {
      return /* @__PURE__ */ React.createElement(Swiper, {
        ...swiperProps,
        ref: swiperRef,
        rubberband: false,
        stuckAtBoundary: true,
        loop: false,
        autoplay: false,
        touchable: !!swipeable,
        className: clsx(bem$P("track")),
        duration: +duration,
        indicator: false,
        onChange: (idx) => {
          var _a;
          if (innerEffect.current) {
            innerEffect.current = false;
            return;
          }
          (_a = props.onChange) == null ? void 0 : _a.call(props, idx);
        }
      }, React.Children.map(props.children, (child) => /* @__PURE__ */ React.createElement(Swiper.Item, {
        style: { cursor: !swipeable ? "auto" : void 0 },
        className: clsx(bem$P("pane-wrapper"))
      }, child)));
    }
    return props.children;
  };
  const swipeToCurrentTab = (index2) => {
    const swipe = swiperRef.current;
    if (!swipe)
      return;
    if (swipe.activeIndex !== index2) {
      innerEffect.current = true;
      swipe.swipeTo(index2);
    }
  };
  useEffect(() => {
    swipeToCurrentTab(props.currentIndex);
  }, [props.currentIndex]);
  return /* @__PURE__ */ React.createElement("div", {
    className: clsx(
      bem$P("content", {
        animated: animated2 || swipeable
      })
    )
  }, renderChildren());
};
const TabsContext = createContext({});
function getScrollTop() {
  let scrollTop = 0;
  let bodyScrollTop = 0;
  let documentScrollTop = 0;
  if (document.body) {
    bodyScrollTop = document.body.scrollTop;
  }
  if (document.documentElement) {
    documentScrollTop = document.documentElement.scrollTop;
  }
  scrollTop = bodyScrollTop - documentScrollTop > 0 ? bodyScrollTop : documentScrollTop;
  return scrollTop;
}
function getScrollHeight() {
  let scrollHeight = 0;
  let bodyScrollHeight = 0;
  let documentScrollHeight = 0;
  if (document.body) {
    bodyScrollHeight = document.body.scrollHeight;
  }
  if (document.documentElement) {
    documentScrollHeight = document.documentElement.scrollHeight;
  }
  scrollHeight = bodyScrollHeight - documentScrollHeight > 0 ? bodyScrollHeight : documentScrollHeight;
  return scrollHeight;
}
function getWindowHeight() {
  let windowHeight = 0;
  if (document.compatMode === "CSS1Compat") {
    windowHeight = document.documentElement.clientHeight;
  } else {
    windowHeight = document.body.clientHeight;
  }
  return windowHeight;
}
function isReachBottom(offset = 0) {
  return getScrollTop() + getWindowHeight() + offset >= getScrollHeight();
}
const [bem$O] = createNamespace("tabs");
const getTabName = (tab, index2) => {
  var _a;
  return (_a = tab == null ? void 0 : tab.name) != null ? _a : index2;
};
const Tabs$1 = forwardRef((props, ref) => {
  const { children, color, align, background } = props;
  const root2 = useRef(null);
  const swiperRef = useRef(null);
  const wrapRef = useRef(null);
  const lockScroll = useRef(false);
  const stickyFixed = useRef(false);
  const immediateRef = useRef(true);
  const navRef = useRef(null);
  const scroller = useScrollParent(root2);
  const [titleRefs, setTitleRefs] = useRefs();
  const [contentRefs, setContentRefs] = useRefs();
  const wrapHeight = useMemo(() => {
    if (!wrapRef.current)
      return 0;
    return getVisibleHeight(wrapRef.current);
  }, [wrapRef.current]);
  const childrenList = useMemo(
    () => parseChildList(props.children),
    [props.children]
  );
  const defaultIndex = useMemo(() => {
    if (props.scrollspy)
      return 0;
    const ac = props.active === void 0 ? props.defaultActive : props.active;
    let idx = childrenList.findIndex(
      (tab, index22) => getTabName(tab, index22) === ac
    );
    if (idx < 0)
      idx = 0;
    return idx;
  }, [props.scrollspy, props.active, props.defaultActive]);
  const [index2, setIndex] = useRefState(defaultIndex);
  const scrollable = useMemo(
    () => childrenList.length > props.swipeThreshold || !props.ellipsis,
    [childrenList.length, props.swipeThreshold, props.ellipsis]
  );
  const navStyle = useMemo(
    () => ({
      borderColor: props.type === "card" && color,
      background
    }),
    [color, background]
  );
  const currentName = useMemo(() => {
    const activeTab = childrenList == null ? void 0 : childrenList[index2];
    return activeTab ? getTabName(activeTab, index2) : 0;
  }, [childrenList, index2]);
  const offsetTopPx = useMemo(
    () => unitToPx(props.offsetTop),
    [props.offsetTop]
  );
  const lineTranslateLeft = useMemo(() => {
    const hidden = isHidden(root2.current);
    const title = titleRefs == null ? void 0 : titleRefs[index2];
    if (!title || hidden || props.type !== "line") {
      return;
    }
    return title.offsetLeft + title.offsetWidth / 2;
  }, [root2.current, titleRefs, props.type, index2]);
  const lineStyle = useMemo(() => {
    const { lineWidth, lineHeight } = props;
    const measureStyle = {
      width: addUnit(lineWidth),
      backgroundColor: color,
      transitionDuration: `${immediateRef.current ? 0 : props.duration}ms`
    };
    if (lineTranslateLeft) {
      measureStyle.transform = `translateX(${lineTranslateLeft}px) translateX(-50%)`;
    }
    if (lineHeight) {
      const height = addUnit(lineHeight);
      measureStyle.height = height;
      measureStyle.borderRadius = height;
    }
    return measureStyle;
  }, [
    color,
    props.lineHeight,
    props.lineWidth,
    lineTranslateLeft,
    immediateRef.current
  ]);
  const getAvailableTab = (targetIndex) => {
    var _a;
    const diff = targetIndex < index2 ? -1 : 1;
    while (targetIndex >= 0 && targetIndex < childrenList.length) {
      if (!((_a = childrenList[targetIndex]) == null ? void 0 : _a.disabled)) {
        return targetIndex;
      }
      targetIndex += diff;
    }
    return null;
  };
  const setCurrentIndex = (currentIndex) => {
    var _a;
    const availableIndex = getAvailableTab(currentIndex);
    if (availableIndex === null)
      return;
    const newTab = childrenList[availableIndex];
    const newName = getTabName(newTab, availableIndex);
    setIndex(availableIndex);
    (_a = props.onChange) == null ? void 0 : _a.call(props, newName, availableIndex);
  };
  const scrollToCurrentContent = (current) => {
    var _a, _b;
    if (!props.scrollspy)
      return;
    const contentTarget = contentRefs[current != null ? current : index2];
    if (contentTarget && scroller) {
      const immediate = isObject(props.scrollspy) ? (_b = (_a = props.scrollspy) == null ? void 0 : _a.scrollImmediate) != null ? _b : true : true;
      const to = Math.ceil(
        getElementTop(contentTarget, scroller) - (offsetTopPx + wrapHeight)
      );
      lockScroll.current = true;
      scrollTopTo(scroller, to, immediate ? 0 : +props.duration, () => {
        lockScroll.current = false;
      });
    }
  };
  const onClickTab = (item, targetIndex, event) => {
    var _a;
    const { disabled = false } = item;
    const name = getTabName(item, targetIndex);
    (_a = props.onClickTab) == null ? void 0 : _a.call(props, {
      name,
      event,
      disabled,
      index: targetIndex
    });
    if (disabled)
      return;
    callInterceptor({
      interceptor: props.beforeChange,
      args: [name],
      done: () => {
        if (targetIndex !== index2) {
          setCurrentIndex(targetIndex);
          scrollToCurrentContent(targetIndex);
        }
      }
    });
  };
  const scrollIntoView = (immediate) => {
    const nav = navRef.current;
    const title = titleRefs == null ? void 0 : titleRefs[index2];
    if (!scrollable || !nav || !title) {
      return;
    }
    const to = title.offsetLeft - (nav.offsetWidth - title.offsetWidth) / 2;
    scrollLeftTo(nav, to, immediate ? 0 : +props.duration);
  };
  const getCurrentIndexOnScroll = () => {
    const scrollOffset = offsetTopPx + wrapHeight;
    for (let index22 = 0; index22 < contentRefs.length; index22++) {
      const $el = contentRefs[index22];
      const top = getVisibleTop($el);
      if (top > scrollOffset) {
        return index22 === 0 ? 0 : index22 - 1;
      }
    }
    return titleRefs.length - 1;
  };
  const onScroll = () => {
    if (!props.scrollspy || lockScroll.current)
      return;
    let currentIndex = getCurrentIndexOnScroll();
    if (typeof props.scrollspy === "object") {
      if (props.scrollspy.autoFocusLast && isReachBottom(props.scrollspy.reachBottomThreshold)) {
        currentIndex = titleRefs.length - 1;
      }
    }
    if (currentIndex !== index2) {
      setCurrentIndex(currentIndex);
    }
  };
  const onStickyScroll = (params) => {
    var _a;
    stickyFixed.current = params.isFixed;
    (_a = props.onScroll) == null ? void 0 : _a.call(props, params);
  };
  const renderNav = () => {
    return childrenList.map((item, itemIndex) => {
      return /* @__PURE__ */ React.createElement(TabsTitle, {
        ref: setTitleRefs(itemIndex),
        key: item.key,
        type: props.type,
        badge: item.badge,
        title: item.title,
        description: item.description,
        color,
        style: item.titleStyle,
        className: item.titleClass,
        isActive: itemIndex === index2,
        disabled: item.disabled,
        scrollable,
        activeColor: props.titleActiveColor,
        inactiveColor: props.titleInactiveColor,
        onClick: (event) => {
          onClickTab(item, itemIndex, event);
        }
      });
    });
  };
  const renderHeader = () => {
    const { type, border } = props;
    return /* @__PURE__ */ React.createElement("div", {
      ref: wrapRef,
      className: clsx([
        bem$O("wrap", { scrollable }),
        { [BORDER_TOP_BOTTOM]: type !== "card" && border }
      ])
    }, /* @__PURE__ */ React.createElement("div", {
      ref: navRef,
      role: "tablist",
      className: clsx(
        bem$O("nav", [
          type,
          { complete: scrollable, start: align === "start" }
        ])
      ),
      style: navStyle
    }, props.navLeft, renderNav(), type === "line" && !immediateRef.current && /* @__PURE__ */ React.createElement("div", {
      className: clsx(bem$O("line")),
      style: lineStyle
    }), props.navRight));
  };
  useUpdateEffect(() => {
    if (props.active === void 0)
      return;
    if (props.active !== currentName) {
      const currentIndex = childrenList.findIndex(
        (tab, index22) => getTabName(tab, index22) === props.active
      );
      if (currentIndex > -1 && currentIndex !== index2) {
        setIndex(currentIndex);
        scrollToCurrentContent(currentIndex);
      }
    }
  }, [props.active]);
  useUpdateEffect(() => {
    scrollIntoView();
    if (stickyFixed.current && props.stickyInitScrollbar && !props.scrollspy) {
      setRootScrollTop(Math.ceil(getElementTop(root2.current) - offsetTopPx));
    }
  }, [index2]);
  useEffect(() => {
    immediateRef.current = false;
    scrollIntoView(true);
  }, []);
  useEventListener("scroll", onScroll, {
    target: scroller,
    depends: [index2]
  });
  useImperativeHandle(ref, () => {
    var _a, _b;
    return {
      scrollTo: (name) => {
        const currentIndex = childrenList.findIndex(
          (tab, index22) => getTabName(tab, index22) === name
        );
        if (currentIndex > -1 && currentIndex !== index2) {
          setIndex(currentIndex);
          scrollToCurrentContent(currentIndex);
        }
      },
      swiper: swiperRef.current ? {
        enable: (_a = swiperRef.current) == null ? void 0 : _a.enable,
        disable: (_b = swiperRef.current) == null ? void 0 : _b.disable
      } : void 0
    };
  });
  return /* @__PURE__ */ React.createElement(TabsContext.Provider, {
    value: { props, currentName, scrollIntoView }
  }, /* @__PURE__ */ React.createElement("div", {
    ref: root2,
    className: clsx(props.className, bem$O([props.type]))
  }, props.sticky ? /* @__PURE__ */ React.createElement(Sticky, {
    container: root2,
    offsetTop: offsetTopPx,
    onScroll: onStickyScroll
  }, renderHeader(), props.navBottom) : /* @__PURE__ */ React.createElement(React.Fragment, null, renderHeader(), props.navBottom), /* @__PURE__ */ React.createElement(TabsContent, {
    swiperRef,
    count: childrenList.length,
    animated: props.animated,
    duration: props.duration,
    swipeable: props.swipeable,
    lazyRender: props.lazyRender,
    currentIndex: index2,
    onChange: setCurrentIndex
  }, React.Children.toArray(children).filter(Boolean).map(
    (node, index22) => React.cloneElement(node, {
      index: index22,
      ref: setContentRefs(index22)
    })
  ))));
});
Tabs$1.defaultProps = {
  type: "line",
  duration: 300,
  swipeThreshold: 5,
  offsetTop: 0,
  ellipsis: true,
  lazyRender: true,
  stickyInitScrollbar: true,
  defaultActive: 0,
  align: "center"
};
const [bem$N] = createNamespace("tab");
const TabPane = forwardRef((props, ref) => {
  const parent = useContext(TabsContext);
  const { animated: animated2, swipeable, scrollspy, lazyRender, lazyRenderPlaceholder } = parent.props;
  const { index: index2 } = props;
  const name = useMemo(() => {
    var _a;
    return (_a = props.name) != null ? _a : index2;
  }, [index2, props.name]);
  const active = useMemo(
    () => name === parent.currentName,
    [name, parent.currentName]
  );
  const [inited, setInited] = useState(() => active);
  const init = () => {
    setInited(true);
  };
  const isActive = useMemo(() => {
    if (active && !inited) {
      init();
    }
    return active;
  }, [active, inited]);
  const show2 = scrollspy || isActive;
  const shouldRender = inited || scrollspy || !lazyRender;
  const Content = shouldRender ? props.children : lazyRenderPlaceholder;
  if (animated2 || swipeable) {
    return /* @__PURE__ */ React.createElement("div", {
      ref,
      role: "tabpanel",
      className: clsx(bem$N("pane"))
    }, Content);
  }
  return /* @__PURE__ */ React.createElement("div", {
    ref,
    style: { display: show2 ? "block" : "none" },
    role: "tabpanel",
    className: clsx(bem$N("pane"))
  }, Content);
});
const Tabs = Object.assign(Tabs$1, { TabPane });
var index$t = "";
const useHeight = (element) => {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (element.current) {
      setHeight(useRect(element.current).height);
    }
  }, [element.current]);
  return height;
};
const [bem$M] = createNamespace("nav-bar");
const NavBar = (props) => {
  const navBarRef = useRef(null);
  const navBarHeight = useHeight(navBarRef);
  const onClickLeft = (event) => {
    if (props.onClickLeft)
      props.onClickLeft(event);
  };
  const onClickRight = (event) => {
    if (props.onClickRight)
      props.onClickRight(event);
  };
  const renderLeft = () => {
    if (typeof props.leftText !== "string" && isValidElement(props.leftText)) {
      return props.leftText;
    }
    return [
      props.leftArrow && React.cloneElement(props.leftArrow, {
        key: "arroe",
        className: clsx(bem$M("arrow"))
      }),
      props.leftText && /* @__PURE__ */ React.createElement("span", {
        key: "text",
        className: clsx(bem$M("text"))
      }, props.leftText)
    ];
  };
  const renderRight = () => {
    if (typeof props.rightText !== "string" && isValidElement(props.rightText)) {
      return props.rightText;
    }
    return /* @__PURE__ */ React.createElement("span", {
      className: clsx(bem$M("text"))
    }, props.rightText);
  };
  const renderNavBar = () => {
    const { title, fixed, border, zIndex } = props;
    const style = {
      zIndex: zIndex !== void 0 ? +zIndex : void 0,
      ...props.style
    };
    const hasLeft = props.leftArrow || props.leftText;
    const hasRight = props.rightText;
    return /* @__PURE__ */ React.createElement("div", {
      ref: navBarRef,
      style,
      className: clsx(
        bem$M({ fixed, "safe-area-inset-top": props.safeAreaInsetTop }),
        {
          [BORDER_BOTTOM]: border
        },
        props.className
      )
    }, /* @__PURE__ */ React.createElement("div", {
      className: clsx(bem$M("content"))
    }, hasLeft && /* @__PURE__ */ React.createElement("div", {
      className: clsx(bem$M("left")),
      onClick: onClickLeft
    }, renderLeft()), /* @__PURE__ */ React.createElement("div", {
      className: clsx(bem$M("title"), "rv-ellipsis")
    }, title), hasRight && /* @__PURE__ */ React.createElement("div", {
      className: clsx(bem$M("right")),
      onClick: onClickRight
    }, renderRight())));
  };
  const renderPlaceholder = () => {
    if (props.fixed && props.placeholder) {
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$M("placeholder")),
        style: { height: navBarHeight ? `${navBarHeight}px` : void 0 }
      });
    }
    return null;
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, renderPlaceholder(), renderNavBar());
};
NavBar.defaultProps = {
  border: true,
  leftArrow: /* @__PURE__ */ React.createElement(ArrowLeft, null)
};
var index$s = "";
const [bem$L] = createNamespace("tag");
const Tag = (props) => {
  const nodeRef = useRef(null);
  const onClose = (event) => {
    event.stopPropagation();
    if (props.onClose) {
      props.onClose(event);
    }
  };
  const getStyle = useMemo(() => {
    if (props.plain) {
      return {
        color: props.textColor || props.color,
        borderColor: props.color
      };
    }
    return {
      color: props.textColor,
      background: props.color
    };
  }, [props.textColor, props.color, props.plain]);
  const renderTag = () => {
    const { type, mark, plain, round, size, closeable } = props;
    const classes = {
      mark,
      plain,
      round
    };
    if (size) {
      classes[size] = size;
    }
    const CloseIcon = closeable && /* @__PURE__ */ React.createElement(Cross, {
      className: clsx(bem$L("close")),
      onClick: onClose
    });
    return /* @__PURE__ */ React.createElement("span", {
      ref: nodeRef,
      style: { ...getStyle, ...props.style },
      className: clsx(props.className, bem$L([classes, type])),
      onClick: props.onClick
    }, props.children, CloseIcon);
  };
  return /* @__PURE__ */ React.createElement(CSSTransition, {
    nodeRef,
    classNames: "rv-fade",
    in: props.show,
    timeout: 300,
    unmountOnExit: true
  }, renderTag());
};
Tag.defaultProps = {
  show: true,
  type: "default"
};
var index$r = "";
const [bem$K] = createNamespace("grid");
const Grid = ({
  children,
  className,
  style,
  ...props
}) => {
  return /* @__PURE__ */ React.createElement("div", {
    style: { paddingLeft: addUnit(props.gutter), ...style },
    className: clsx(className, bem$K(), {
      [BORDER_TOP]: props.border && !props.gutter
    })
  }, React.Children.toArray(children).filter(Boolean).map(
    (child, index2) => React.cloneElement(child, {
      index: index2,
      parent: props
    })
  ));
};
Grid.defaultProps = {
  center: true,
  border: true,
  columnNum: 4
};
const [bem$J] = createNamespace("grid-item");
const GridItem = ({
  children,
  className,
  style,
  ...props
}) => {
  const { index: index2, parent } = props;
  const rootStyle = useMemo(() => {
    const { square: square2, gutter: gutter2, columnNum } = parent;
    const percent = `${100 / +columnNum}%`;
    const internalStyle = {
      ...style,
      flexBasis: percent
    };
    if (square2) {
      internalStyle.paddingTop = percent;
    } else if (gutter2) {
      const gutterValue = addUnit(gutter2);
      internalStyle.paddingRight = gutterValue;
      if (index2 >= columnNum) {
        internalStyle.marginTop = gutterValue;
      }
    }
    return internalStyle;
  }, [parent.style, parent.gutter, parent.columnNum]);
  const contentStyle = useMemo(() => {
    const { square: square2, gutter: gutter2 } = parent;
    if (square2 && gutter2) {
      const gutterValue = addUnit(gutter2);
      return {
        ...props.contentStyle,
        right: gutterValue,
        bottom: gutterValue,
        height: "auto"
      };
    }
    return props.contentStyle;
  }, [parent.gutter, parent.columnNum, props.contentStyle]);
  const renderIcon = () => {
    if (props.icon) {
      return /* @__PURE__ */ React.createElement(Badge, {
        ...props.badge
      }, React.cloneElement(props.icon, {
        className: clsx(bem$J("icon")),
        color: props.iconColor,
        fontSize: parent.iconSize
      }));
    }
    return null;
  };
  const renderText = () => {
    if (React.isValidElement(props.text)) {
      return props.text;
    }
    if (props.text) {
      return /* @__PURE__ */ React.createElement("span", {
        className: clsx(bem$J("text"))
      }, props.text);
    }
    return null;
  };
  const renderContent = () => {
    if (children) {
      return children;
    }
    return /* @__PURE__ */ React.createElement(React.Fragment, null, renderIcon(), renderText());
  };
  const { center, border, square, gutter, reverse, direction } = parent;
  const classes = clsx(
    props.contentClassName,
    bem$J("content", [
      direction,
      {
        center,
        square,
        reverse,
        clickable: !!props.onClick,
        surround: border && gutter
      }
    ]),
    { [BORDER]: border }
  );
  return /* @__PURE__ */ React.createElement("div", {
    className: clsx(className, bem$J({ square })),
    style: rootStyle
  }, /* @__PURE__ */ React.createElement("div", {
    role: props.onClick ? "button" : void 0,
    className: classes,
    style: contentStyle,
    onClick: props.onClick
  }, renderContent()));
};
GridItem.defaultProps = {
  index: 0,
  parent: {}
};
const GridNamespace = Object.assign(Grid, { Item: GridItem });
var index$q = "";
const IndexBarContext = createContext({});
const INDEX_ANCHORE_KEY = Symbol("index-anchor");
const [bem$I] = createNamespace("index-anchor");
const IndexAnchor = forwardRef((props, ref) => {
  const root2 = useRef();
  const height = useHeight(root2);
  const context = useContext(IndexBarContext);
  const [state, updateState] = useSetState({
    top: 0,
    left: 0,
    rect: { top: 0, height: 0 },
    width: 0,
    active: false
  });
  const [rect, setRect] = useState({ top: 0, height: 0 });
  const isSticky = useCallback(
    () => state.active && context.sticky,
    [state.active, context.sticky]
  );
  const anchorStyle = useMemo(() => {
    const { zIndex, highlightColor } = context;
    if (isSticky()) {
      return {
        zIndex: `${zIndex}`,
        left: state.left ? `${state.left}px` : null,
        width: state.width ? `${state.width}px` : null,
        transform: state.top ? `translate3d(0, ${state.top}px, 0)` : null,
        color: highlightColor
      };
    }
    return null;
  }, [isSticky(), state.width, state.left, state.top]);
  const getRect = (scrollParent, scrollParentRect) => {
    const rootRect = useRect(root2.current);
    const newState = { ...state };
    newState.rect.height = rootRect.height;
    if (scrollParent === window || scrollParent === document.body) {
      newState.rect.top = rootRect.top + getRootScrollTop();
    } else {
      newState.rect.top = rootRect.top + getScrollTop$1(scrollParent) - scrollParentRect.top;
    }
    updateState(newState);
    return newState.rect;
  };
  useEffect(() => {
    setRect({ top: rect.top, height });
  }, [height]);
  useImperativeHandle(ref, () => ({
    getRect,
    state,
    updateState,
    root: root2
  }));
  const sticky = isSticky();
  return /* @__PURE__ */ React.createElement("div", {
    className: props.className,
    ref: root2,
    style: {
      ...props.style,
      height: sticky ? `${state.rect.height}px` : void 0
    }
  }, /* @__PURE__ */ React.createElement("div", {
    style: anchorStyle,
    className: clsx(bem$I({ sticky }), { [BORDER_BOTTOM]: sticky })
  }, props.children || props.index));
});
IndexAnchor[COMPONENT_TYPE_KEY] = INDEX_ANCHORE_KEY;
const [bem$H] = createNamespace("index-bar");
const IndexBar$1 = forwardRef((props, ref) => {
  const popupContext = useContext(PopupContext);
  const { children, sticky, zIndex, highlightColor } = props;
  const [activeAnchor, setActiveAnchor] = useState(null);
  const root2 = useRef(null);
  const sidebar = useRef(null);
  const touchActiveIndex = useRef(null);
  const touch = useTouch();
  const scrollParent = useScrollParent(root2);
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
      return useRect(scrollParent);
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
    if (isHidden(root2.current) || !scrollParent) {
      return;
    }
    const { indexList } = props;
    const scrollTop = getScrollTop$1(scrollParent);
    const scrollParentRect = getScrollerRect();
    const rects = Object.values(refs).map((anchor) => {
      return anchor.getRect(scrollParent, scrollParentRect);
    });
    const active = getActiveAnchor(scrollTop, rects);
    setActiveAnchor(indexList[active]);
    if (sticky) {
      Object.values(refs).forEach((item, index2) => {
        const { updateState } = item;
        if (index2 === active || index2 === active - 1) {
          const rect = item.root.current.getBoundingClientRect();
          updateState({ left: rect.left, width: rect.width });
        } else {
          updateState({ left: null, width: null });
        }
        if (index2 === active) {
          updateState({
            active: true,
            top: Math.max(props.stickyOffsetTop, rects[index2].top - scrollTop) + scrollParentRect.top
          });
        } else if (index2 === active - 1) {
          const activeItemTop = rects[active].top - scrollTop;
          updateState({
            active: activeItemTop > 0,
            top: activeItemTop + scrollParentRect.top - rects[index2].height
          });
        } else {
          updateState({ active: false });
        }
      });
    }
  };
  const init = () => setTimeout(onScroll, 0);
  const renderIndexes = () => props.indexList.map((index2) => {
    const active = index2 === activeAnchor;
    return /* @__PURE__ */ React.createElement("span", {
      key: index2,
      className: clsx(bem$H("index", { active })),
      style: active ? highlightStyle : null,
      "data-index": index2
    }, props.itemRender ? props.itemRender(index2, active) : index2);
  });
  const onTouchStart = (event) => {
    touch.start(event);
  };
  const scrollTo = (index2) => {
    if (!index2) {
      return;
    }
    if (refs[index2]) {
      refs[index2].root.current.scrollIntoView();
      if (props.sticky && props.stickyOffsetTop) {
        if (popupContext.visible) {
          setScrollTop(
            scrollParent,
            getScrollTop$1(scrollParent) - props.stickyOffsetTop
          );
        } else {
          setRootScrollTop(getRootScrollTop() - props.stickyOffsetTop);
        }
      }
      if (props.onSelect && typeof props.onSelect === "function") {
        props.onSelect(activeAnchor);
      }
    }
  };
  const scrollToElement = (element) => {
    const { index: index2 } = element.dataset;
    scrollTo(index2);
  };
  const onClickSidebar = (event) => {
    scrollToElement(event.target);
  };
  const onTouchMove = (event) => {
    touch.move(event);
    preventDefault(event);
    if (touch.isVertical()) {
      const { clientX, clientY } = event.touches[0];
      const target = document.elementFromPoint(clientX, clientY);
      if (target) {
        const { index: index2 } = target.dataset;
        if (touchActiveIndex.current !== index2) {
          touchActiveIndex.current = index2;
          scrollToElement(target);
        }
      }
    }
  };
  useEventListener("scroll", onScroll, {
    target: scrollParent,
    depends: [scrollParent]
  });
  useEventListener("touchmove", onTouchMove, {
    target: sidebar.current,
    depends: [touch.deltaY]
  });
  useEffect(() => {
    if (props.onChange && typeof props.onChange === "function") {
      props.onChange(activeAnchor);
    }
  }, [activeAnchor]);
  useMount(init);
  const handleMapChildren = ($children) => {
    return React.Children.toArray($children).filter(Boolean).map((child) => {
      var _a, _b;
      if (((_a = child.type) == null ? void 0 : _a[COMPONENT_TYPE_KEY]) === INDEX_ANCHORE_KEY) {
        return React.cloneElement(child, {
          ref: setRefs(child.props.index)
        });
      }
      if ((_b = child.props) == null ? void 0 : _b.children) {
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
  return /* @__PURE__ */ React.createElement(IndexBarContext.Provider, {
    value: { zIndex, highlightColor, sticky }
  }, /* @__PURE__ */ React.createElement("div", {
    ref: root2,
    className: clsx(bem$H(), props.className),
    style: props.style
  }, renderToContainer(
    props.teleport,
    /* @__PURE__ */ React.createElement("div", {
      ref: sidebar,
      className: clsx(bem$H("sidebar")),
      style: sidebarStyle,
      onClick: onClickSidebar,
      onTouchStart
    }, renderIndexes())
  ), memoChildren));
});
function genAlphabet() {
  const indexList = [];
  const charCodeOfA = "A".charCodeAt(0);
  for (let i = 0; i < 26; i += 1) {
    indexList.push(String.fromCharCode(charCodeOfA + i));
  }
  return indexList;
}
IndexBar$1.defaultProps = {
  sticky: true,
  stickyOffsetTop: 0,
  indexList: genAlphabet()
};
const IndexBar = Object.assign(IndexBar$1, { Anchor: IndexAnchor });
var index$p = "";
const CollapseContext = createContext({});
const [bem$G] = createNamespace("collapse");
const Collapse$1 = (props) => {
  const { accordion } = props;
  const initExpandedDefault = accordion ? "" : [];
  const { initExpanded = initExpandedDefault } = props;
  const innerEffect = useRef(false);
  const [expanded, setExpanded] = useState(() => {
    var _a;
    return (_a = props.value) != null ? _a : initExpanded;
  });
  const updateName = (name) => {
    var _a;
    innerEffect.current = true;
    setExpanded(name);
    (_a = props.onChange) == null ? void 0 : _a.call(props, name);
  };
  const toggle = (name, isExpanded2) => {
    if (accordion) {
      if (name === expanded) {
        name = "";
      }
    } else if (isExpanded2) {
      name = expanded.concat(name);
    } else {
      name = expanded.filter((activeName) => activeName !== name);
    }
    updateName(name);
  };
  const isExpanded = (name) => {
    return accordion ? expanded === name : expanded == null ? void 0 : expanded.includes(name);
  };
  useUpdateEffect(() => {
    var _a;
    if (innerEffect.current) {
      innerEffect.current = false;
      return;
    }
    setExpanded((_a = props.value) != null ? _a : initExpanded);
  }, [props.value]);
  return /* @__PURE__ */ React.createElement(CollapseContext.Provider, {
    value: { isExpanded, toggle }
  }, /* @__PURE__ */ React.createElement("div", {
    style: props.style,
    ref: props.nativeRef,
    className: clsx(bem$G(), props.className, {
      [BORDER_TOP_BOTTOM]: props.border
    })
  }, React.Children.toArray(props.children).filter(Boolean).map(
    (child, index2) => React.cloneElement(child, {
      index: index2
    })
  )));
};
Collapse$1.defaultProps = {
  border: true
};
function useLazyRender(show2) {
  const [inited, setInited] = useState(false);
  useEffect(() => {
    if (show2) {
      setInited(show2);
    }
  }, [show2]);
  return (render2) => () => inited ? render2() : null;
}
const [bem$F] = createNamespace("collapse-item");
const CollapseItem = forwardRef(
  ({ className, style, ...props }, ref) => {
    const { index: index2 } = props;
    const parent = useContext(CollapseContext);
    const wrapperRef = useRef(null);
    const contentRef = useRef(null);
    const name = useMemo(() => {
      var _a;
      return (_a = props.name) != null ? _a : index2;
    }, [index2, props.name]);
    const expanded = useMemo(() => {
      if (parent) {
        return parent.isExpanded(name);
      }
      return null;
    }, [parent, name]);
    const [show2, setShow] = useState(() => expanded);
    const lazyRender = useLazyRender(show2);
    const onTransitionEnd = () => {
      if (!expanded) {
        setShow(false);
      } else {
        wrapperRef.current.style.height = "";
      }
    };
    useUpdateEffect(() => {
      if (expanded) {
        setShow(true);
      }
      raf(() => {
        if (!contentRef.current || !wrapperRef.current) {
          return;
        }
        const { offsetHeight } = contentRef.current;
        if (offsetHeight) {
          const contentHeight = `${offsetHeight}px`;
          wrapperRef.current.style.height = expanded ? 0 : contentHeight;
          doubleRaf(() => {
            wrapperRef.current.style.height = expanded ? contentHeight : 0;
          });
        } else {
          onTransitionEnd();
        }
      });
    }, [expanded]);
    const toggle = (value = !expanded) => {
      parent.toggle(name, value);
    };
    const onClickTitle = () => {
      if (!props.disabled && !props.readOnly) {
        toggle();
      }
    };
    const renderTitle = () => {
      const { border, disabled, children, readOnly, ...others } = props;
      return /* @__PURE__ */ React.createElement(Cell, {
        className: clsx(
          bem$F("title", {
            disabled,
            expanded,
            borderless: !border
          })
        ),
        "aria-expanded": String(expanded),
        onClick: onClickTitle,
        ...others,
        isLink: readOnly ? false : others.isLink,
        clickable: disabled || readOnly ? false : others.clickable
      });
    };
    const renderContent = lazyRender(() => /* @__PURE__ */ React.createElement("div", {
      ref: wrapperRef,
      className: clsx(bem$F("wrapper")),
      onTransitionEnd
    }, /* @__PURE__ */ React.createElement("div", {
      ref: contentRef,
      className: clsx(bem$F("content"))
    }, props.children)));
    useImperativeHandle(ref, () => ({
      toggle
    }));
    return /* @__PURE__ */ React.createElement("div", {
      style,
      className: clsx(className, bem$F({ border: index2 && props.border }))
    }, renderTitle(), renderContent());
  }
);
CollapseItem.defaultProps = {
  isLink: true,
  border: true
};
const Collapse = Object.assign(Collapse$1, { Item: CollapseItem });
var index$o = "";
const RadioContext = createContext({});
const [bem$E] = createNamespace("radio-group");
function RadioGroup(props) {
  const [checked, setChecked] = useMergedState({
    value: props.value,
    defaultValue: props.defaultValue
  });
  const toggle = (name) => {
    var _a;
    setChecked(name);
    (_a = props.onChange) == null ? void 0 : _a.call(props, name);
  };
  return /* @__PURE__ */ React.createElement(RadioContext.Provider, {
    value: { parent: { props }, toggle, checked }
  }, /* @__PURE__ */ React.createElement("div", {
    className: clsx(props.className, bem$E([props.direction])),
    style: props.style,
    role: "radiogroup"
  }, props.children));
}
const Checker = (props) => {
  const iconRef = useRef(null);
  const getParentProp = (name) => {
    if (props.parent && props.bindGroup) {
      return props.parent.props[name];
    }
    return null;
  };
  const disabled = useMemo(
    () => getParentProp("disabled") || props.disabled,
    [props.parent, props.disabled]
  );
  const direction = useMemo(
    () => getParentProp("direction") || null,
    [props.parent]
  );
  const iconStyle = useMemo(() => {
    const checkedColor = props.checkedColor || getParentProp("checkedColor");
    if (checkedColor && props.checked && !disabled) {
      return {
        borderColor: checkedColor,
        backgroundColor: checkedColor
      };
    }
    return {};
  }, [props.checkedColor, props.checked, disabled]);
  const onClick = (event) => {
    const { target } = event;
    const icon = iconRef.current;
    const iconClicked = icon === target || (icon == null ? void 0 : icon.contains(target));
    if (!disabled && (iconClicked || !props.labelDisabled)) {
      if (props.onToggle) {
        props.onToggle();
      }
    }
    if (props.onClick) {
      props.onClick(event);
    }
  };
  const renderIcon = () => {
    const { bem: bem2, shape, checked } = props;
    const iconSize = props.iconSize || getParentProp("iconSize");
    return /* @__PURE__ */ React.createElement("div", {
      ref: iconRef,
      className: clsx(bem2("icon", [shape, { disabled, checked }])),
      style: { fontSize: addUnit(iconSize) }
    }, props.iconRender ? props.iconRender({ checked, disabled }) : /* @__PURE__ */ React.createElement(Success, {
      style: iconStyle
    }));
  };
  const renderLabel = () => {
    if (props.children) {
      return /* @__PURE__ */ React.createElement("span", {
        className: props.bem("label", [props.labelPosition, { disabled }])
      }, props.children);
    }
    return null;
  };
  return /* @__PURE__ */ React.createElement("div", {
    role: props.role,
    className: clsx(
      props.bem([
        {
          disabled,
          "label-disabled": props.labelDisabled
        },
        direction
      ]),
      props.className
    ),
    style: props.style,
    tabIndex: disabled ? -1 : 0,
    "aria-checked": props.checked,
    onClick
  }, props.labelPosition === "left" && renderLabel(), renderIcon(), props.labelPosition !== "left" && renderLabel());
};
Checker.defaultProps = {
  shape: "round",
  bindGroup: true
};
const [bem$D] = createNamespace("radio");
function Radio$1(props) {
  const { parent, ...context } = useContext(RadioContext);
  const checked = useMemo(() => {
    return parent ? context.checked === props.name : props.checked;
  }, [context.checked]);
  const toggle = () => {
    const emitter = parent ? context.toggle : () => {
    };
    emitter(props.name);
  };
  return /* @__PURE__ */ React.createElement(Checker, {
    ...props,
    bem: bem$D,
    role: "radio",
    parent,
    checked,
    onToggle: toggle
  });
}
const Radio = Object.assign(Radio$1, { Group: RadioGroup });
var index$n = "";
function getRateStatus(value, index2, allowHalf, readOnly) {
  if (value >= index2) {
    return { status: "full", value: 1 };
  }
  if (value + 0.5 >= index2 && allowHalf && !readOnly) {
    return { status: "half", value: 0.5 };
  }
  if (value + 1 >= index2 && allowHalf && readOnly) {
    const cardinal = 10 ** 10;
    return {
      status: "half",
      value: Math.round((value - index2 + 1) * cardinal) / cardinal
    };
  }
  return { status: "void", value: 0 };
}
const [bem$C] = createNamespace("rate");
const Rate = ({
  count,
  touchable,
  onChange,
  ...props
}) => {
  const [value, setValue] = useMergedState({
    value: props.value,
    defaultValue: props.defaultValue
  });
  const root2 = useRef(null);
  const touch = useTouch();
  const [itemRefs, setItemRefs] = useRefs();
  const untouchable = () => props.readOnly || props.disabled || !touchable;
  const list = useMemo(
    () => Array(count).fill("").map(
      (_, i) => getRateStatus(value, i + 1, props.allowHalf, props.readOnly)
    ),
    [count, value, props.allowHalf, props.readOnly]
  );
  const ranges = useRef();
  const updateRanges = () => {
    const rects = itemRefs.map((item) => item.getBoundingClientRect());
    ranges.current = [];
    rects.forEach((rect, index2) => {
      if (props.allowHalf) {
        ranges.current.push(
          { score: index2 + 0.5, left: rect.left },
          { score: index2 + 1, left: rect.left + rect.width / 2 }
        );
      } else {
        ranges.current.push({ score: index2 + 1, left: rect.left });
      }
    });
  };
  const getScoreByPosition = (x) => {
    for (let i = ranges.current.length - 1; i > 0; i--) {
      if (x > ranges.current[i].left) {
        return ranges.current[i].score;
      }
    }
    return props.allowHalf ? 0.5 : 1;
  };
  const select = (index2) => {
    if (!props.disabled && !props.readOnly && index2 !== value) {
      setValue(index2);
      onChange == null ? void 0 : onChange(index2);
    }
  };
  const onTouchStart = (event) => {
    if (untouchable()) {
      return;
    }
    touch.start(event.nativeEvent);
    updateRanges();
  };
  const onTouchMove = (event) => {
    if (untouchable()) {
      return;
    }
    touch.move(event);
    if (touch.isHorizontal()) {
      const { clientX } = event.touches[0];
      preventDefault(event);
      select(getScoreByPosition(clientX));
    }
  };
  const renderStar = (item, index2) => {
    const {
      icon,
      size,
      color,
      gutter,
      voidIcon,
      disabled,
      voidColor,
      allowHalf,
      disabledColor
    } = props;
    const score = index2 + 1;
    const isFull = item.status === "full";
    const isVoid = item.status === "void";
    const renderHalf = allowHalf && item.value > 0 && item.value < 1;
    let style;
    if (gutter && score !== +count) {
      style = {
        marginRight: addUnit(gutter)
      };
    }
    const onClickItem = (event) => {
      updateRanges();
      select(allowHalf ? getScoreByPosition(event.clientX) : score);
    };
    return /* @__PURE__ */ React.createElement("div", {
      key: index2,
      ref: setItemRefs(index2),
      role: "radio",
      style,
      className: clsx(bem$C("item")),
      tabIndex: 0,
      "aria-setsize": parseInt(count == null ? void 0 : count.toString(), 10),
      "aria-posinset": score,
      "aria-checked": !isVoid,
      onClick: onClickItem
    }, React.cloneElement(isFull ? icon : voidIcon, {
      className: clsx(bem$C("icon", { disabled, full: isFull })),
      style: {
        color: disabled ? disabledColor : isFull ? color : voidColor,
        fontSize: size
      }
    }), renderHalf && /* @__PURE__ */ React.createElement("div", {
      className: clsx(bem$C("icon", ["half"])),
      style: { width: `${item.value * 100}%` }
    }, React.cloneElement(
      isVoid ? voidIcon : icon,
      {
        className: clsx(bem$C("icon", [{ disabled, full: !isVoid }])),
        style: {
          color: disabled ? disabledColor : isVoid ? voidColor : color,
          fontSize: size
        }
      }
    )));
  };
  useEventListener("touchmove", onTouchMove, {
    target: root2.current,
    depends: [touch.deltaY.current]
  });
  return /* @__PURE__ */ React.createElement("div", {
    ref: root2,
    role: "radiogroup",
    className: clsx(
      bem$C({
        readOnly: props.readOnly,
        disabled: props.disabled
      })
    ),
    tabIndex: 0,
    onTouchStart
  }, list.map(renderStar));
};
Rate.defaultProps = {
  size: 20,
  count: 5,
  gutter: 4,
  icon: /* @__PURE__ */ React.createElement(Star, null),
  voidIcon: /* @__PURE__ */ React.createElement(StarO, null),
  touchable: true
};
var index$m = "";
function formatMonthTitle(date) {
  return [date.getFullYear(), date.getMonth() + 1];
}
function compareMonth(date1, date2) {
  const year1 = date1.getFullYear();
  const year2 = date2.getFullYear();
  if (year1 === year2) {
    const month1 = date1.getMonth();
    const month2 = date2.getMonth();
    return month1 === month2 ? 0 : month1 > month2 ? 1 : -1;
  }
  return year1 > year2 ? 1 : -1;
}
function compareDay(day1, day2) {
  const compareMonthResult = compareMonth(day1, day2);
  if (compareMonthResult === 0) {
    const date1 = day1.getDate();
    const date2 = day2.getDate();
    return date1 === date2 ? 0 : date1 > date2 ? 1 : -1;
  }
  return compareMonthResult;
}
const cloneDate = (date) => new Date(date);
const cloneDates = (dates) => Array.isArray(dates) ? dates.map(cloneDate) : cloneDate(dates);
function getDayByOffset(date, offset) {
  const cloned = cloneDate(date);
  cloned.setDate(cloned.getDate() + offset);
  return cloned;
}
const getPrevDay = (date) => getDayByOffset(date, -1);
const getNextDay = (date) => getDayByOffset(date, 1);
const getToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};
function calcDateNum(date) {
  const day1 = date[0].getTime();
  const day2 = date[1].getTime();
  return (day2 - day1) / (1e3 * 60 * 60 * 24) + 1;
}
function times(n, iteratee) {
  let index2 = -1;
  const result = Array(n);
  while (++index2 < n) {
    result[index2] = iteratee(index2);
  }
  return result;
}
function getTrueValue(value) {
  if (!value) {
    return 0;
  }
  while (isNaN(parseInt(value, 10))) {
    if (value.length > 1) {
      value = value.slice(1);
    } else {
      return 0;
    }
  }
  return parseInt(value, 10);
}
function getMonthEndDay(year, month) {
  return 32 - new Date(year, month - 1, 32).getDate();
}
const [bem$B] = createNamespace("calendar");
const CalenderDay = (props) => {
  const style = useMemo(() => {
    const { item, index: index2, color, offset, rowHeight } = props;
    const iternalStyle = {
      height: rowHeight
    };
    if (item.type === "placeholder") {
      iternalStyle.width = "100%";
      return iternalStyle;
    }
    if (index2 === 0) {
      iternalStyle.marginLeft = `${100 * offset / 7}%`;
    }
    if (color) {
      switch (item.type) {
        case "end":
        case "start":
        case "start-end":
        case "multiple-middle":
        case "multiple-selected":
          iternalStyle.background = color;
          break;
        case "middle":
          iternalStyle.color = color;
          break;
      }
    }
    return iternalStyle;
  }, [props.item, props.index, props.color, props.offset, props.rowHeight]);
  const onClick = () => {
    var _a;
    if (props.item.type !== "disabled") {
      (_a = props.onClick) == null ? void 0 : _a.call(props, props.item);
    }
  };
  const renderTopInfo = () => {
    const { topInfo } = props.item;
    if (topInfo || props.topInfoRender) {
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$B("top-info"))
      }, props.topInfoRender ? props.topInfoRender(props.item) : topInfo);
    }
    return null;
  };
  const renderBottomInfo = () => {
    const { bottomInfo } = props.item;
    if (bottomInfo || props.bottomInfoRender) {
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$B("bottom-info"))
      }, props.bottomInfoRender ? props.bottomInfoRender(props.item) : bottomInfo);
    }
    return null;
  };
  const renderContent = () => {
    const { item, color, rowHeight } = props;
    const { type: type2, text } = item;
    const Nodes = /* @__PURE__ */ React.createElement(React.Fragment, null, renderTopInfo(), text, renderBottomInfo());
    if (type2 === "selected") {
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$B("selected-day")),
        style: {
          width: rowHeight,
          height: rowHeight,
          background: color
        }
      }, Nodes);
    }
    return Nodes;
  };
  const { type, className } = props.item;
  if (type === "placeholder") {
    return /* @__PURE__ */ React.createElement("div", {
      className: clsx(bem$B("day")),
      style
    });
  }
  return /* @__PURE__ */ React.createElement("div", {
    role: "gridcell",
    style,
    className: clsx(bem$B("day", type), className),
    tabIndex: type === "disabled" ? void 0 : -1,
    onClick
  }, renderContent());
};
CalenderDay.defaultProps = {
  offset: 0
};
const [bem$A] = createNamespace("calendar");
const CalenderMonth = forwardRef((props, ref) => {
  const [visible, setVisible] = useState();
  const daysRef = useRef();
  const [monthRef, setMonthRef] = useState();
  const height = useRef(0);
  const { locale } = useContext(ConfigProvider$1);
  useEffect(() => {
    if (monthRef) {
      height.current = useRect(monthRef).height;
    }
  }, [monthRef]);
  const title = useMemo(() => {
    return props.formatMonthTitle ? props.formatMonthTitle(props.date) : locale.vanCalendar.monthTitle(...formatMonthTitle(props.date));
  }, [props.date, props.formatMonthTitle]);
  const rowHeight = useMemo(() => addUnit(props.rowHeight), [props.rowHeight]);
  const offset = useMemo(() => {
    const realDay = props.date.getDay();
    if (props.firstDayOfWeek) {
      return (realDay + 7 - props.firstDayOfWeek) % 7;
    }
    return realDay;
  }, [props.date, props.firstDayOfWeek]);
  const totalDay = useMemo(
    () => getMonthEndDay(props.date.getFullYear(), props.date.getMonth() + 1),
    [props.date]
  );
  const shouldRender = useMemo(() => visible || !props.lazyRender, [visible]);
  const getTitle = () => title;
  const scrollIntoView = (body) => {
    const el = props.showSubtitle ? daysRef.current : monthRef;
    const scrollTop = (el == null ? void 0 : el.getBoundingClientRect().top) - body.getBoundingClientRect().top + body.scrollTop;
    setScrollTop(body, scrollTop);
  };
  const getMultipleDayType = (day) => {
    const isSelected = (date) => props.currentDate.some((item) => compareDay(item, date) === 0);
    if (isSelected(day)) {
      const prevDay = getPrevDay(day);
      const nextDay = getNextDay(day);
      const prevSelected = isSelected(prevDay);
      const nextSelected = isSelected(nextDay);
      if (prevSelected && nextSelected) {
        return "multiple-middle";
      }
      if (prevSelected) {
        return "end";
      }
      if (nextSelected) {
        return "start";
      }
      return "multiple-selected";
    }
    return "";
  };
  const getRangeDayType = (day) => {
    const [startDay, endDay] = props.currentDate;
    if (!startDay) {
      return "";
    }
    const compareToStart = compareDay(day, startDay);
    if (!endDay) {
      return compareToStart === 0 ? "start" : "";
    }
    const compareToEnd = compareDay(day, endDay);
    if (props.allowSameDay && compareToStart === 0 && compareToEnd === 0) {
      return "start-end";
    }
    if (compareToStart === 0) {
      return "start";
    }
    if (compareToEnd === 0) {
      return "end";
    }
    if (compareToStart > 0 && compareToEnd < 0) {
      return "middle";
    }
    return "";
  };
  const getDayType = (day) => {
    const { type, minDate, maxDate, currentDate } = props;
    if (compareDay(day, minDate) < 0 || compareDay(day, maxDate) > 0) {
      return "disabled";
    }
    if (currentDate === null) {
      return "";
    }
    if (Array.isArray(currentDate)) {
      if (type === "multiple") {
        return getMultipleDayType(day);
      }
      if (type === "range") {
        return getRangeDayType(day);
      }
    } else if (type === "single") {
      return compareDay(day, currentDate) === 0 ? "selected" : "";
    }
    return "";
  };
  const getBottomInfo = (dayType) => {
    if (props.type === "range") {
      if (dayType === "start") {
        return locale.vanCalendar.start;
      }
      if (dayType === "end") {
        return locale.vanCalendar.end;
      }
      if (dayType === "start-end") {
        return locale.vanCalendar.startEnd;
      }
    }
    return null;
  };
  const renderTitle = () => {
    if (props.showMonthTitle) {
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$A("month-title"))
      }, title);
    }
    return null;
  };
  const renderMark = () => {
    if (props.showMark && shouldRender) {
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$A("month-mark"))
      }, props.date.getMonth() + 1);
    }
    return null;
  };
  const placeholders = useMemo(() => {
    const count = Math.ceil((totalDay + offset) / 7);
    return Array(count).fill({ type: "placeholder" });
  }, [totalDay, offset]);
  const days = useMemo(() => {
    const internalDays = [];
    const year = props.date.getFullYear();
    const month = props.date.getMonth();
    for (let day = 1; day <= totalDay; day++) {
      const date = new Date(year, month, day);
      const type = getDayType(date);
      let config = {
        date,
        type,
        text: day,
        bottomInfo: getBottomInfo(type)
      };
      if (props.formatter) {
        config = props.formatter(config);
      }
      internalDays.push(config);
    }
    return internalDays;
  }, [getDayType, props.date, props.formatter]);
  const renderDay = (item, index2) => /* @__PURE__ */ React.createElement(CalenderDay, {
    key: index2,
    item,
    index: index2,
    color: props.color,
    offset,
    rowHeight,
    onClick: props.onClick,
    topInfoRender: props.topInfoRender,
    bottomInfoRender: props.bottomInfoRender
  });
  const renderDays = () => /* @__PURE__ */ React.createElement("div", {
    ref: daysRef,
    role: "grid",
    className: clsx(bem$A("days"))
  }, renderMark(), (shouldRender ? days : placeholders).map(renderDay));
  useImperativeHandle(ref, () => ({
    getTitle,
    getHeight: () => height.current,
    setVisible,
    scrollIntoView
  }));
  return /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$A("month")),
    ref: setMonthRef
  }, renderTitle(), renderDays());
});
const [bem$z] = createNamespace("calendar");
const CalenderHeader = (props) => {
  const { locale } = useContext(ConfigProvider$1);
  const renderTitle = () => {
    if (props.showTitle) {
      const text = props.title || locale.vanCalendar.title;
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$z("header-title"))
      }, text);
    }
    return null;
  };
  const onClickSubtitle = (event) => {
    var _a;
    (_a = props.onClickSubtitle) == null ? void 0 : _a.call(props, event);
  };
  const renderSubtitle = () => {
    if (props.showSubtitle) {
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$z("header-subtitle")),
        onClick: onClickSubtitle
      }, props.subtitle);
    }
    return null;
  };
  const renderWeekDays = () => {
    const { weekdays: customWeekdays, firstDayOfWeek } = props;
    const defaultWeekdays = locale.vanCalendar.weekdays;
    const weekdays = customWeekdays ? defaultWeekdays.map((wk, i) => customWeekdays[i] || wk) : defaultWeekdays;
    const renderWeekDaysContent = [
      ...weekdays.slice(firstDayOfWeek, 7),
      ...weekdays.slice(0, firstDayOfWeek)
    ];
    return /* @__PURE__ */ React.createElement("div", {
      className: clsx(bem$z("weekdays"))
    }, renderWeekDaysContent.map((text, i) => /* @__PURE__ */ React.createElement("span", {
      key: i,
      className: clsx(bem$z("weekday"))
    }, text)));
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$z("header"))
  }, renderTitle(), renderSubtitle(), renderWeekDays());
};
const [bem$y] = createNamespace("calendar");
const Calendar = forwardRef(
  ({ className, style, ...props }, ref) => {
    var _a;
    const { locale } = useContext(ConfigProvider$1);
    const [visible, setVisible] = usePropsValue({
      value: props.visible,
      defaultValue: false,
      onChange: (v) => {
        var _a2;
        if (v === false) {
          (_a2 = props.onClose) == null ? void 0 : _a2.call(props);
        }
      }
    });
    const limitDateRange = (date, minDate = props.minDate, maxDate = props.maxDate) => {
      if (compareDay(date, minDate) === -1) {
        return minDate;
      }
      if (compareDay(date, maxDate) === 1) {
        return maxDate;
      }
      return date;
    };
    const getInitialDate = (defaultDate = props.defaultValue) => {
      const { type, minDate, maxDate } = props;
      if (defaultDate === null) {
        return defaultDate;
      }
      const now = getToday();
      if (type === "range") {
        if (!Array.isArray(defaultDate)) {
          defaultDate = [];
        }
        const start = limitDateRange(
          defaultDate[0] || now,
          minDate,
          getPrevDay(maxDate)
        );
        const end = limitDateRange(defaultDate[1] || now, getNextDay(minDate));
        return [start, end];
      }
      if (type === "multiple") {
        if (Array.isArray(defaultDate)) {
          return defaultDate.map((date) => limitDateRange(date));
        }
        return [limitDateRange(now)];
      }
      if (!defaultDate || Array.isArray(defaultDate)) {
        defaultDate = now;
      }
      return limitDateRange(defaultDate);
    };
    const bodyRef = useRef();
    const bodyHeightRef = useRef(0);
    const [value, setValue] = React.useState(
      getInitialDate(
        props.value === void 0 ? props.defaultValue : props.value
      )
    );
    const [state, updateState] = useSetState({
      subtitle: "",
      currentDate: value
    });
    useUpdateEffect(() => {
      if (props.value === void 0)
        return;
      if (JSON.stringify(value) !== JSON.stringify(props.value)) {
        setValue(props.value);
      }
    }, [props.value]);
    useEffect(() => {
      if (JSON.stringify(state.currentDate) !== JSON.stringify(value)) {
        updateState({ currentDate: value });
      }
    }, [value]);
    const [monthRefs, setMonthRefs] = useRefs();
    const dayOffset = useMemo(
      () => props.firstDayOfWeek ? +props.firstDayOfWeek % 7 : 0,
      [props.firstDayOfWeek, props.firstDayOfWeek]
    );
    const months = useMemo(() => {
      const internalMonths = [];
      const cursor = new Date(props.minDate);
      cursor.setDate(1);
      do {
        internalMonths.push(new Date(cursor));
        cursor.setMonth(cursor.getMonth() + 1);
      } while (compareMonth(cursor, props.maxDate) !== 1);
      return internalMonths;
    }, [props.minDate, props.maxDate]);
    const buttonDisabled = useMemo(() => {
      const { currentDate } = state;
      if (currentDate) {
        if (props.type === "range") {
          return !currentDate[0] || !currentDate[1];
        }
        if (props.type === "multiple") {
          return !currentDate.length;
        }
      }
      return !currentDate;
    }, [props.type, state.currentDate]);
    const onScroll = () => {
      var _a2;
      const top = getScrollTop$1(bodyRef.current);
      const bottom = top + bodyHeightRef.current;
      const heights = months.map((item, index2) => monthRefs[index2].getHeight());
      const heightSum = heights.reduce((a, b) => a + b, 0);
      if (bottom > heightSum && top > 0) {
        return;
      }
      let height = 0;
      let currentMonth;
      const visibleRange = [-1, -1];
      for (let i = 0; i < months.length; i++) {
        const month = monthRefs[i];
        const visible2 = height <= bottom && height + heights[i] >= top;
        if (visible2) {
          visibleRange[1] = i;
          if (!currentMonth) {
            currentMonth = month;
            visibleRange[0] = i;
          }
          if (!monthRefs[i].showed) {
            monthRefs[i].showed = true;
            (_a2 = props.onMonthShow) == null ? void 0 : _a2.call(props, {
              date: month.date,
              title: month.getTitle()
            });
          }
        }
        height += heights[i];
      }
      months.forEach((_, index2) => {
        const visible2 = index2 >= visibleRange[0] - 1 && index2 <= visibleRange[1] + 1;
        monthRefs[index2].setVisible(visible2);
      });
      if (currentMonth && currentMonth.getTitle() !== state.subtitle) {
        updateState({ subtitle: currentMonth.getTitle() });
      }
    };
    const scrollToDate = (targetDate) => {
      raf(() => {
        months.some((month, index2) => {
          if (compareMonth(month, targetDate) === 0) {
            if (bodyRef.current) {
              monthRefs[index2].scrollIntoView(bodyRef.current);
            }
            return true;
          }
          return false;
        });
        onScroll();
      });
    };
    const scrollIntoView = () => {
      if (props.poppable && !visible) {
        return;
      }
      const { currentDate } = state;
      if (currentDate) {
        const targetDate = props.type === "single" ? currentDate : currentDate[0];
        scrollToDate(targetDate);
      } else {
        raf(onScroll);
      }
    };
    const init = () => {
      raf(() => {
        bodyHeightRef.current = Math.floor(useRect(bodyRef.current).height);
        scrollIntoView();
      });
    };
    const reset = (date = getInitialDate()) => {
      updateState({ currentDate: date });
      scrollIntoView();
    };
    const checkRange = (date) => {
      var _a2;
      const { maxRange, rangePrompt, showRangePrompt } = props;
      if (maxRange && calcDateNum(date) > maxRange) {
        if (showRangePrompt) {
          Toast.info(rangePrompt || locale.vanCalendar.rangePrompt(+maxRange));
        }
        (_a2 = props.onOverRange) == null ? void 0 : _a2.call(props);
        return false;
      }
      return true;
    };
    const onConfirm = () => {
      var _a2;
      const nextCurrentDate = cloneDates(state.currentDate);
      if (props.poppable) {
        setValue(nextCurrentDate);
      }
      (_a2 = props.onConfirm) == null ? void 0 : _a2.call(props, nextCurrentDate);
      actions.close();
    };
    const select = (date, complete) => {
      const setCurrentDate = (current) => {
        var _a2;
        state.currentDate = current;
        updateState({ currentDate: current });
        (_a2 = props.onSelect) == null ? void 0 : _a2.call(props, cloneDates(state.currentDate));
      };
      if (complete && props.type === "range") {
        const valid = checkRange(date);
        if (!valid) {
          if (props.showConfirm) {
            setCurrentDate([
              date[0],
              getDayByOffset(date[0], +props.maxRange - 1)
            ]);
          } else {
            setCurrentDate(date);
          }
          return;
        }
      }
      setCurrentDate(date);
      if (complete && !props.showConfirm) {
        onConfirm();
      }
    };
    const onClickDay = (item) => {
      var _a2;
      if (props.readOnly || !item.date) {
        return;
      }
      const { date } = item;
      const { type } = props;
      const { currentDate } = state;
      if (type === "range") {
        if (!currentDate) {
          select([date]);
          return;
        }
        const [startDay, endDay] = currentDate;
        if (startDay && !endDay) {
          const compareToStart = compareDay(date, startDay);
          if (compareToStart === 1) {
            select([startDay, date], true);
          } else if (compareToStart === -1) {
            select([date]);
          } else if (props.allowSameDay) {
            select([date, date], true);
          }
        } else {
          select([date]);
        }
      } else if (type === "multiple") {
        if (!currentDate) {
          select([date]);
          return;
        }
        let selectedIndex;
        const selected = state.currentDate.some(
          (dateItem, index2) => {
            const equal = compareDay(dateItem, date) === 0;
            if (equal) {
              selectedIndex = index2;
            }
            return equal;
          }
        );
        if (selected) {
          const [unselectedDate] = currentDate.splice(selectedIndex, 1);
          (_a2 = props.onUnselect) == null ? void 0 : _a2.call(props, cloneDate(unselectedDate));
          select([...currentDate]);
        } else if (props.maxRange && currentDate.length >= props.maxRange) {
          Toast(props.rangePrompt || `\u9009\u62E9\u5929\u6570\u4E0D\u80FD\u8D85\u8FC7 ${props.maxRange} \u5929`);
        } else {
          select([...currentDate, date]);
        }
      } else {
        select(date, true);
      }
    };
    const renderMonth = (date, index2) => {
      const showMonthTitle = index2 !== 0 || !props.showSubtitle;
      return /* @__PURE__ */ React.createElement(CalenderMonth, {
        key: index2,
        ref: setMonthRefs(index2),
        date,
        currentDate: state.currentDate,
        showMonthTitle,
        firstDayOfWeek: dayOffset,
        ...pick(props, [
          "type",
          "color",
          "minDate",
          "maxDate",
          "showMark",
          "formatter",
          "rowHeight",
          "showSubtitle",
          "lazyRender",
          "allowSameDay",
          "topInfoRender",
          "bottomInfoRender",
          "formatMonthTitle"
        ]),
        onClick: onClickDay
      });
    };
    const renderFooterButton = () => {
      if (props.footer) {
        return props.footer;
      }
      if (props.showConfirm) {
        const text = buttonDisabled ? props.confirmDisabledText : props.confirmText;
        return /* @__PURE__ */ React.createElement(Button, {
          round: true,
          block: true,
          type: "danger",
          color: props.color,
          className: clsx(bem$y("confirm")),
          disabled: buttonDisabled,
          nativeType: "button",
          onClick: onConfirm
        }, text || locale.vanCalendar.confirm);
      }
      return null;
    };
    const renderFooter = () => /* @__PURE__ */ React.createElement("div", {
      className: clsx(bem$y("footer"), {
        "rv-safe-area-bottom": props.safeAreaInsetBottom
      })
    }, renderFooterButton());
    const renderCalendar = () => /* @__PURE__ */ React.createElement("div", {
      className: clsx(className, bem$y()),
      style
    }, /* @__PURE__ */ React.createElement(CalenderHeader, {
      weekdays: props.weekdays,
      title: props.title,
      subtitle: props.subtitle || state.subtitle,
      showTitle: props.showTitle,
      showSubtitle: props.showSubtitle,
      firstDayOfWeek: dayOffset,
      onClickSubtitle: (event) => {
        var _a2;
        (_a2 = props.onClickSubtitle) == null ? void 0 : _a2.call(props, event);
      }
    }), /* @__PURE__ */ React.createElement("div", {
      ref: bodyRef,
      className: clsx(bem$y("body")),
      onScroll
    }, months.map(renderMonth)), renderFooter());
    const actions = {
      toggle: () => {
        if (props.poppable)
          setVisible((v) => !v);
      },
      open: () => {
        if (props.poppable) {
          setVisible(true);
        }
      },
      close: () => {
        if (props.poppable) {
          setVisible(false);
        }
      }
    };
    useEffect(() => {
      if (!props.poppable) {
        init();
      }
    }, []);
    useEffect(() => {
      if (props.poppable && visible) {
        init();
      }
    }, [visible]);
    useUpdateEffect(() => {
      reset(getInitialDate(state.currentDate));
    }, [props.type, props.minDate, props.maxDate]);
    useImperativeHandle(ref, () => ({
      reset,
      scrollToDate,
      ...actions
    }));
    if (props.poppable) {
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Popup, {
        visible,
        className: clsx(bem$y("popup")),
        round: props.round,
        position: props.position,
        closeable: props.showTitle || props.showSubtitle,
        closeOnPopstate: props.closeOnPopstate,
        closeOnClickOverlay: props.closeOnClickOverlay,
        onClose: actions.close,
        onClosed: () => {
          var _a2;
          if (props.poppable && JSON.stringify(state.currentDate) !== JSON.stringify(value)) {
            updateState({ currentDate: value });
          }
          (_a2 = props.onClosed) == null ? void 0 : _a2.call(props);
        }
      }, renderCalendar()), (_a = props.children) == null ? void 0 : _a.call(props, value, actions));
    }
    return renderCalendar();
  }
);
Calendar.defaultProps = {
  round: true,
  poppable: true,
  showMark: true,
  showTitle: true,
  showConfirm: true,
  showSubtitle: true,
  closeOnPopstate: true,
  closeOnClickOverlay: true,
  safeAreaInsetBottom: true,
  defaultValue: null,
  type: "single",
  position: "bottom",
  maxRange: null,
  minDate: getToday(),
  maxDate: (() => {
    const now = getToday();
    return new Date(now.getFullYear(), now.getMonth() + 6, now.getDate());
  })(),
  firstDayOfWeek: 0,
  showRangePrompt: true
};
var index$l = "";
function useCascaderExtend(options, keys, value) {
  const { childrenKey, valueKey } = keys;
  const depth = useMemo(() => {
    let depth2 = 0;
    function traverse(options2, currentDepth) {
      if (currentDepth > depth2)
        depth2 = currentDepth;
      const nextDepth = currentDepth + 1;
      options2.forEach((option) => {
        if (option[childrenKey]) {
          traverse(option[childrenKey], nextDepth);
        }
      });
    }
    traverse(options, 1);
    return depth2;
  }, [options, childrenKey]);
  const tabs = useMemo(() => {
    if (!value || !value.length) {
      return [options];
    }
    return value.reduce(
      (a, v, i) => {
        if (!v)
          return a;
        const next = a[i].find((option) => option[valueKey] === value[i]);
        if (next && next[childrenKey])
          a.push(next[childrenKey]);
        return a;
      },
      [options]
    );
  }, [value, childrenKey, valueKey, options]);
  const items = useMemo(() => {
    return value.map((val, i) => {
      var _a;
      const item = (_a = tabs[i].find((tab) => tab[valueKey] === val)) != null ? _a : void 0;
      return item;
    });
  }, [value, valueKey, tabs]);
  return { tabs, items, depth };
}
function useDebounceFn(fn, options) {
  var _a;
  const fnRef = useLatest(fn);
  const wait = (_a = options == null ? void 0 : options.wait) != null ? _a : 1e3;
  const debounced = useMemo(
    () => debounce(
      (...args) => {
        return fnRef.current(...args);
      },
      wait,
      options
    ),
    []
  );
  useUnmount(() => {
    debounced.cancel();
  });
  return {
    run: debounced,
    cancel: debounced.cancel,
    flush: debounced.flush
  };
}
function useDebounceEffect(effect, deps, options) {
  const [flag, setFlag] = useState({});
  const { run } = useDebounceFn(() => {
    setFlag({});
  }, options);
  useEffect(() => {
    return run();
  }, deps);
  useUpdateEffect(effect, [flag]);
}
const [bem$x] = createNamespace("cascader");
const Cascader = (props) => {
  const { locale } = useContext(ConfigProvider$1);
  const [value, setValue] = useState(
    () => props.value === void 0 ? props.defaultValue : props.value
  );
  const [activeTab, updateActiveTab] = useState(0);
  const {
    text: textKey,
    value: valueKey,
    children: childrenKey
  } = extend(
    {
      text: "text",
      value: "value",
      children: "children"
    },
    props.fieldNames
  );
  const { tabs, items, depth } = useCascaderExtend(
    props.options,
    { textKey, valueKey, childrenKey },
    value || []
  );
  useUpdateEffect(() => {
    if (props.value === void 0)
      return;
    if (JSON.stringify(value) !== JSON.stringify(props.value)) {
      setValue(props.value);
    }
  }, [props.value]);
  useEffect(() => {
    let tabIndex = 0;
    if (Array.isArray(value) && value.length > 0)
      tabIndex = value.length;
    if (tabIndex >= depth)
      tabIndex = depth - 1;
    if (tabIndex === activeTab)
      return;
    updateActiveTab(tabIndex);
  }, [value]);
  useDebounceEffect(
    () => {
      var _a, _b;
      if (JSON.stringify(props.value) === JSON.stringify(value))
        return;
      (_a = props.onChange) == null ? void 0 : _a.call(props, value, items);
      if (value.length >= depth) {
        (_b = props.onFinish) == null ? void 0 : _b.call(props, value, items);
      }
    },
    [value],
    {
      wait: 0,
      leading: false,
      trailing: true
    }
  );
  const onSelect = (option, tabIndex) => {
    if (option.disabled) {
      return;
    }
    setValue((prev2) => {
      const next = [...prev2];
      next[tabIndex] = option == null ? void 0 : option[valueKey];
      return next.slice(0, tabIndex + 1);
    });
  };
  const onClickTab = ({ name, index: index2 }) => {
    var _a;
    (_a = props.onClickTab) == null ? void 0 : _a.call(props, +name);
    updateActiveTab(index2);
  };
  const renderCloseIcon = () => {
    if (!props.closeable)
      return null;
    if (props.closeIcon) {
      return React.cloneElement(props.closeIcon, {
        className: clsx(bem$x("close-icon")),
        onClick: props.onClose
      });
    }
    return /* @__PURE__ */ React.createElement(Cross, {
      className: clsx(bem$x("close-icon")),
      onClick: props.onClose
    });
  };
  const renderHeader = () => /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$x("header"))
  }, /* @__PURE__ */ React.createElement("h2", {
    className: clsx(bem$x("title"))
  }, props.title), renderCloseIcon());
  const renderOption = (option, selected, tabIndex) => {
    const color = option.color || (selected ? props.activeColor : void 0);
    const Text2 = props.optionRender ? props.optionRender({ option, selected }) : /* @__PURE__ */ React.createElement("span", null, option[textKey]);
    return /* @__PURE__ */ React.createElement("li", {
      key: option[valueKey],
      className: clsx(
        bem$x("option", {
          selected,
          disabled: option.disabled
        }),
        option.className
      ),
      style: { color },
      onClick: () => onSelect(option, tabIndex)
    }, Text2, selected ? /* @__PURE__ */ React.createElement(Success, {
      className: clsx(bem$x("selected-icon"))
    }) : null);
  };
  const renderOptions = (options, selectedOption, tabIndex) => /* @__PURE__ */ React.createElement("ul", {
    key: tabIndex,
    className: clsx(bem$x("options"))
  }, options.map(
    (option) => renderOption(
      option,
      option[valueKey] === (selectedOption == null ? void 0 : selectedOption[valueKey]),
      tabIndex
    )
  ));
  const renderTab = (options, tabIndex) => {
    const selectedOption = items[tabIndex];
    const title = selectedOption ? selectedOption[textKey] : props.placeholder || locale.vanPicker.select;
    return /* @__PURE__ */ React.createElement(Tabs.TabPane, {
      key: tabIndex,
      title,
      titleClass: clsx(
        bem$x("tab", {
          unselected: !selectedOption
        })
      )
    }, renderOptions(options, selectedOption, tabIndex));
  };
  const renderTabs = () => /* @__PURE__ */ React.createElement(Tabs, {
    animated: true,
    active: activeTab,
    className: clsx(bem$x("tabs")),
    color: props.activeColor,
    swipeThreshold: 0,
    swipeable: props.swipeable,
    duration: 300,
    onClickTab
  }, tabs.map(renderTab));
  return /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$x())
  }, renderHeader(), tabs.length ? renderTabs() : null);
};
const CascaderPopup = React.forwardRef(
  (props, ref) => {
    var _a;
    const { visible: outerVisible, popup, ...cascaderProps } = props;
    const [visible, setVisible] = usePropsValue({
      value: outerVisible,
      defaultValue: false
    });
    const [value, setValue] = useState(
      () => props.value === void 0 ? props.defaultValue : props.value
    );
    const [innerValue, setInnerValue] = useState(value);
    const {
      text: textKey,
      value: valueKey,
      children: childrenKey
    } = extend(
      {
        text: "text",
        value: "value",
        children: "children"
      },
      props.fieldNames
    );
    const { items } = useCascaderExtend(
      props.options,
      { textKey, valueKey, childrenKey },
      value || []
    );
    useUpdateEffect(() => {
      if (props.value === void 0)
        return;
      if (JSON.stringify(value) !== JSON.stringify(props.value)) {
        setValue(props.value);
      }
    }, [props.value]);
    useEffect(() => {
      if (!popup && JSON.stringify(innerValue) !== JSON.stringify(value)) {
        setInnerValue(value);
      }
    }, [value]);
    useEffect(() => {
      if (popup && JSON.stringify(innerValue) !== JSON.stringify(value)) {
        setInnerValue(value);
      }
    }, [visible]);
    const actions = {
      toggle: () => {
        if (popup)
          setVisible((v) => !v);
      },
      open: () => {
        if (popup) {
          setVisible(true);
        }
      },
      close: () => {
        if (popup) {
          setVisible(false);
        }
      }
    };
    const onClose = () => {
      var _a2;
      (_a2 = props.onClose) == null ? void 0 : _a2.call(props);
      actions.close();
    };
    const onFinish = useMemoizedFn((val, selectedRows) => {
      var _a2;
      setValue(val);
      (_a2 = props.onFinish) == null ? void 0 : _a2.call(props, val, selectedRows);
      actions.close();
    });
    const onChange = useMemoizedFn((val, selectedRows) => {
      var _a2, _b;
      setInnerValue(val);
      if (popup) {
        if (visible)
          (_a2 = props.onChange) == null ? void 0 : _a2.call(props, val, selectedRows);
      } else {
        (_b = props.onChange) == null ? void 0 : _b.call(props, val, selectedRows);
      }
    });
    useImperativeHandle(ref, () => actions);
    const content = /* @__PURE__ */ React.createElement(Cascader, {
      value: innerValue,
      ...cascaderProps,
      onChange,
      onFinish,
      onClose
    });
    if (!popup)
      return content;
    const popupProps2 = isObject(popup) ? { closeOnClickOverlay: true, ...popup } : { closeOnClickOverlay: true };
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Popup, {
      position: "bottom",
      visible,
      closeOnClickOverlay: true,
      onClickOverlay: () => {
        if (!(popupProps2 == null ? void 0 : popupProps2.closeOnClickOverlay))
          return;
        setVisible(false);
      },
      ...popupProps2
    }, content), (_a = props.children) == null ? void 0 : _a.call(props, value, items, actions));
  }
);
CascaderPopup.defaultProps = {
  closeable: true,
  swipeable: false,
  defaultValue: [],
  options: []
};
var index$k = "";
const CheckboxContext = createContext({});
const [bem$w] = createNamespace("checkbox-group");
const CheckBoxGroup = forwardRef(
  (props, ref) => {
    const [childrenRefs, setChildrenRefs] = useRefs();
    const [checked, setChecked] = useMergedState({
      value: props.value,
      defaultValue: props.defaultValue
    });
    const toggleAll = (options = {}) => {
      if (typeof options === "boolean") {
        options = { checked: options };
      }
      const { checked: isChecked, skipDisabled } = options;
      const checkedChildren = childrenRefs.filter((item) => {
        if (!item.props.bindGroup) {
          return false;
        }
        if (item.props.disabled && skipDisabled) {
          return item.checked;
        }
        return isChecked != null ? isChecked : !item.checked;
      });
      const names = checkedChildren.map((item) => item.props.name);
      setChecked(names);
      props.onChange(names);
    };
    const toggle = (name) => {
      var _a;
      setChecked(name);
      (_a = props.onChange) == null ? void 0 : _a.call(props, name);
    };
    useImperativeHandle(ref, () => ({
      toggleAll
    }));
    return /* @__PURE__ */ React.createElement(CheckboxContext.Provider, {
      value: { parent: { props }, toggle, checked: checked || [] }
    }, /* @__PURE__ */ React.createElement("div", {
      className: clsx(props.className, bem$w([props.direction]))
    }, React.Children.toArray(props.children).filter(Boolean).map((child, index2) => {
      var _a;
      if (((_a = child.type) == null ? void 0 : _a.displayName) !== "Checkbox")
        return child;
      return React.cloneElement(child, { ref: setChildrenRefs(index2) });
    })));
  }
);
const [bem$v] = createNamespace("checkbox");
const CheckBox = forwardRef((props, ref) => {
  const { parent, ...context } = useContext(CheckboxContext);
  const [checked, setChecked] = useMergedState({
    value: props.checked,
    defaultValue: props.defaultChecked
  });
  const setParentValue = (isChecked2) => {
    const { name } = props;
    const { max } = parent.props;
    const value = context.checked.slice();
    if (isChecked2) {
      const overlimit = max && value.length >= max;
      if (!overlimit && value.indexOf(name) === -1) {
        value.push(name);
        if (props.bindGroup) {
          context.toggle(value);
        }
      }
    } else {
      const index2 = value.indexOf(name);
      if (index2 !== -1) {
        value.splice(index2, 1);
        if (props.bindGroup) {
          context.toggle(value);
        }
      }
    }
  };
  const isChecked = useMemo(() => {
    if (parent && props.bindGroup) {
      return context.checked.indexOf(props.name) !== -1;
    }
    return checked;
  }, [context.checked, checked]);
  const toggle = (newValue = !isChecked) => {
    var _a;
    if (parent && props.bindGroup) {
      setParentValue(newValue);
    } else {
      setChecked(newValue);
      (_a = props.onChange) == null ? void 0 : _a.call(props, newValue);
    }
  };
  useImperativeHandle(ref, () => ({
    toggle,
    checked: isChecked,
    props
  }));
  return /* @__PURE__ */ React.createElement(Checker, {
    ...props,
    bem: bem$v,
    role: "checkbox",
    parent,
    checked: isChecked,
    className: props.className,
    bindGroup: props.bindGroup,
    onToggle: toggle
  });
});
CheckBox.displayName = "Checkbox";
CheckBox.defaultProps = {
  bindGroup: true
};
const Checkbox = Object.assign(CheckBox, { Group: CheckBoxGroup });
var index$j = "";
const DEFAULT_DURATION = 200;
const MOMENTUM_LIMIT_TIME = 300;
const MOMENTUM_LIMIT_DISTANCE = 15;
function getElementTranslateY(element) {
  const style = window.getComputedStyle(element);
  const transform = style.transform || style.webkitTransform;
  const translateY = transform.slice(7, transform.length - 1).split(", ")[5];
  return Number(translateY);
}
const [bem$u] = createNamespace("picker-column");
const PickerColumn = memo(
  forwardRef((props, ref) => {
    const { locale } = useContext(ConfigProvider$1);
    const {
      valueKey,
      textKey,
      itemHeight,
      visibleItemCount,
      placeholder,
      value
    } = props;
    const options = useMemo(() => {
      if (Array.isArray(props.options) && !props.options.length)
        return [];
      if (placeholder) {
        const DEFAULT_OPTION = {
          [valueKey]: void 0,
          [textKey]: placeholder === true ? locale.vanPicker.select : placeholder
        };
        return [DEFAULT_OPTION, ...props.options];
      }
      return props.options;
    }, [props.options]);
    const wrapper = useRef(null);
    const moving = useRef(false);
    const startOffset = useRef(0);
    const transitionEndTrigger = useRef(null);
    const touchStartTime = useRef(0);
    const momentumOffset = useRef(0);
    const [state, updateState, stateRef] = useSetState({
      offset: 0,
      duration: 0
    });
    const touch = useTouch();
    const baseOffset = useMemo(() => {
      return itemHeight * (+visibleItemCount - 1) / 2;
    }, [itemHeight, visibleItemCount]);
    const adjustIndex = (index2) => {
      var _a, _b;
      index2 = range(index2, 0, options.length);
      for (let i = index2; i < options.length; i += 1) {
        if (!((_a = options[i]) == null ? void 0 : _a.disabled))
          return i;
      }
      for (let i = index2 - 1; i >= 0; i -= 1) {
        if (!((_b = options[i]) == null ? void 0 : _b.disabled))
          return i;
      }
      return null;
    };
    const onSelect = (val) => {
      props.onSelect(val, props.index);
    };
    const setIndex = (index2) => {
      index2 = adjustIndex(index2) || 0;
      const offset = -index2 * props.itemHeight;
      const trigger = () => {
        if (options[index2][valueKey] !== value) {
          onSelect(options[index2]);
        }
      };
      if (moving.current && offset !== stateRef.current.offset) {
        transitionEndTrigger.current = trigger;
      } else {
        trigger();
      }
      updateState({ offset });
    };
    const animate = (index2) => {
      index2 = adjustIndex(index2) || 0;
      const offset = -index2 * props.itemHeight;
      updateState({ offset });
    };
    useIsomorphicLayoutEffect(() => {
      if (options.length === 0) {
        if (value !== void 0) {
          onSelect(void 0);
        }
      } else {
        let targetIndex = options.findIndex((item) => item[valueKey] === value);
        if (targetIndex < 0) {
          targetIndex = 0;
          onSelect(options[0]);
        }
        animate(targetIndex);
      }
    }, [value, JSON.stringify(options)]);
    const onClickItem = (index2) => {
      if (moving.current || props.readOnly) {
        return;
      }
      transitionEndTrigger.current = null;
      updateState({ duration: DEFAULT_DURATION });
      setIndex(index2);
    };
    const getIndexByOffset = (offset) => range(Math.round(-offset / props.itemHeight), 0, options.length - 1);
    const momentum = (distance, _duration) => {
      const speed = Math.abs(distance / _duration);
      distance = stateRef.current.offset + speed / 3e-3 * (distance < 0 ? -1 : 1);
      const index2 = getIndexByOffset(distance);
      updateState({ duration: +props.swipeDuration });
      setIndex(index2);
    };
    const stopMomentum = () => {
      moving.current = false;
      updateState({ duration: 0 });
      if (transitionEndTrigger.current) {
        transitionEndTrigger.current();
        transitionEndTrigger.current = null;
      }
    };
    const onTouchStart = (event) => {
      if (props.readOnly) {
        return;
      }
      touch.start(event);
      let { offset } = state;
      if (moving.current) {
        const translateY = getElementTranslateY(wrapper.current);
        offset = Math.min(0, translateY - baseOffset);
        startOffset.current = offset;
      } else {
        startOffset.current = offset;
      }
      updateState({ duration: 0, offset });
      touchStartTime.current = Date.now();
      momentumOffset.current = startOffset.current;
      transitionEndTrigger.current = null;
    };
    const onTouchMove = (event) => {
      if (props.readOnly) {
        return;
      }
      touch.move(event);
      if (touch.isVertical()) {
        moving.current = true;
      }
      const offset = range(
        startOffset.current + touch.deltaY.current,
        -(options.length * props.itemHeight),
        props.itemHeight
      );
      updateState({
        offset
      });
      const now = Date.now();
      if (now - touchStartTime.current > MOMENTUM_LIMIT_TIME) {
        touchStartTime.current = now;
        momentumOffset.current = offset;
      }
    };
    const onTouchEnd = () => {
      if (props.readOnly || !moving.current) {
        return;
      }
      const distance = stateRef.current.offset - momentumOffset.current;
      const duration = Date.now() - touchStartTime.current;
      const allowMomentum = duration < MOMENTUM_LIMIT_TIME && Math.abs(distance) > MOMENTUM_LIMIT_DISTANCE;
      if (allowMomentum) {
        momentum(distance, duration);
        return;
      }
      const index2 = getIndexByOffset(stateRef.current.offset);
      updateState({ duration: DEFAULT_DURATION });
      setIndex(index2);
      setTimeout(() => {
        moving.current = false;
      }, 0);
    };
    const renderOptions = () => {
      const optionStyle = {
        height: `${props.itemHeight}px`
      };
      return options.map((option, index2) => {
        const { disabled } = option;
        const data = {
          role: "button",
          style: optionStyle,
          tabIndex: disabled ? -1 : 0,
          className: clsx(
            bem$u("item", {
              disabled,
              selected: option[valueKey] === value
            })
          ),
          onClick: () => {
            onClickItem(index2);
          }
        };
        const childData = {
          className: "rv-ellipsis",
          children: option[textKey]
        };
        return /* @__PURE__ */ React.createElement("li", {
          ...data,
          key: index2
        }, props.optionRender ? props.optionRender(option) : /* @__PURE__ */ React.createElement("div", {
          ...childData
        }));
      });
    };
    useImperativeHandle(ref, () => ({
      stopMomentum
    }));
    return /* @__PURE__ */ React.createElement("div", {
      className: clsx(bem$u(), props.className),
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onTouchCancel: onTouchEnd
    }, /* @__PURE__ */ React.createElement("ul", {
      ref: wrapper,
      style: {
        transform: `translate3d(0, ${state.offset + baseOffset}px, 0)`,
        transitionDuration: `${state.duration}ms`,
        transitionProperty: state.duration ? "all" : "none"
      },
      className: clsx(bem$u("wrapper")),
      onTransitionEnd: stopMomentum
    }, renderOptions()));
  }),
  (prev2, next) => {
    if (prev2.index !== next.index)
      return false;
    if (prev2.value !== next.value) {
      return false;
    }
    if (prev2.onSelect !== next.onSelect)
      return false;
    if (JSON.stringify(prev2.options) !== JSON.stringify(next.options)) {
      return false;
    }
    return true;
  }
);
function useColumnsFn(options, keys) {
  const { textKey, valueKey, childrenKey } = keys;
  const dataType = useMemo(() => {
    const firstColumn = options[0] || {};
    if (typeof firstColumn === "object") {
      if (childrenKey in firstColumn) {
        return "cascade";
      }
      return "object";
    }
    return "plain";
  }, [options, childrenKey]);
  const depth = useMemo(() => {
    let depth2 = 0;
    function traverse(options2, currentDepth) {
      if (currentDepth > depth2)
        depth2 = currentDepth;
      const nextDepth = currentDepth + 1;
      options2.forEach((option) => {
        if (option[childrenKey]) {
          traverse(option[childrenKey], nextDepth);
        }
      });
    }
    traverse(options, 1);
    return depth2;
  }, [options, childrenKey]);
  if (dataType !== "cascade")
    return options;
  return (selected) => {
    const columns = [];
    let currentOptions2 = options;
    let i = 0;
    while (true) {
      columns.push(
        currentOptions2.map((option) => {
          var _a;
          return {
            [textKey]: option[textKey],
            [valueKey]: (_a = option[valueKey]) != null ? _a : option[textKey]
          };
        })
      );
      const x = selected[i];
      const targetOptions = currentOptions2.find(
        (option) => {
          var _a;
          return ((_a = option[valueKey]) != null ? _a : option[textKey]) === x;
        }
      );
      if (!targetOptions || !targetOptions[childrenKey])
        break;
      currentOptions2 = targetOptions[childrenKey];
      i++;
    }
    while (i < depth - 1) {
      columns.push([]);
      i++;
    }
    return columns;
  };
}
function withCache(generate) {
  let cache = null;
  return () => {
    if (cache === null) {
      cache = generate();
    }
    return cache;
  };
}
function generateColumnsExtend(rawColumns, keys, val) {
  const { textKey, valueKey } = keys;
  const columns = withCache(() => {
    let cls = typeof rawColumns === "function" ? rawColumns(val) : rawColumns;
    if (!Array.isArray(cls[0]))
      cls = [cls];
    return cls.map(
      (column) => column.map((item) => {
        if (typeof item === "string")
          return { [textKey]: item, [valueKey]: item };
        if (!(valueKey in item))
          item[valueKey] = item[textKey];
        return item;
      })
    );
  });
  const items = withCache(() => {
    return val.map((v, index2) => {
      var _a;
      const column = columns()[index2];
      if (!column)
        return null;
      return (_a = column.find((item) => item[valueKey] === v)) != null ? _a : void 0;
    });
  });
  const indexes = withCache(() => {
    return val.map((v, index2) => {
      var _a;
      const column = columns()[index2];
      if (!column)
        return null;
      return (_a = column.findIndex((item) => item[valueKey] === v)) != null ? _a : null;
    });
  });
  const result = {
    get columns() {
      return columns();
    },
    get items() {
      return items();
    },
    get indexes() {
      return indexes();
    }
  };
  return result;
}
function useColumnsExtend(columns, keys, value) {
  const formatColumns = useColumnsFn(columns, keys);
  return useMemo(
    () => generateColumnsExtend(formatColumns, keys, value),
    [columns, keys, value]
  );
}
const [bem$t] = createNamespace("picker");
function PickerInner(props) {
  const { locale } = useContext(ConfigProvider$1);
  const wrapper = useRef(null);
  const [refs, setRefs] = useRefs();
  const {
    text: textKey,
    value: valueKey,
    children: childrenKey
  } = extend(
    {
      text: "text",
      value: "value",
      children: "children"
    },
    props.columnsFieldNames
  );
  const [innerValue, setInnerValue] = useState(props.value);
  useEffect(() => {
    if (props.value === void 0)
      return;
    if (JSON.stringify(innerValue) === JSON.stringify(props.value))
      return;
    setInnerValue(props.value);
  }, [props.value]);
  const formatColumns = useColumnsExtend(
    props.columns,
    { textKey, valueKey, childrenKey },
    innerValue
  );
  const { columns, items, indexes } = formatColumns;
  useDebounceEffect(
    () => {
      var _a;
      if (JSON.stringify(props.value) === JSON.stringify(innerValue))
        return;
      (_a = props.onChange) == null ? void 0 : _a.call(props, innerValue, items, indexes);
    },
    [innerValue],
    {
      wait: 0,
      leading: false,
      trailing: true
    }
  );
  const itemHeight = useMemo(
    () => unitToPx(props.itemHeight),
    [props.itemHeight]
  );
  const handleSelect = (val, index2) => {
    setInnerValue((prev2) => {
      const next = [...prev2];
      next[index2] = val == null ? void 0 : val[valueKey];
      return next;
    });
  };
  const confirm = () => {
    var _a;
    refs.forEach((_ref) => _ref.stopMomentum());
    (_a = props.onConfirm) == null ? void 0 : _a.call(props, innerValue, items, indexes);
  };
  const cancel = () => {
    var _a;
    (_a = props.onCancel) == null ? void 0 : _a.call(props);
  };
  const renderTitle = () => {
    if (props.title) {
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$t("title"), "rv-ellipsis")
      }, props.title);
    }
    return null;
  };
  const renderCancel = () => {
    const text = props.cancelButtonText || locale.cancel;
    return /* @__PURE__ */ React.createElement("button", {
      type: "button",
      className: clsx(bem$t("cancel")),
      onClick: cancel
    }, text);
  };
  const renderConfirm = () => {
    const text = props.confirmButtonText || locale.confirm;
    return /* @__PURE__ */ React.createElement("button", {
      type: "button",
      className: clsx(bem$t("confirm")),
      onClick: confirm
    }, text);
  };
  const renderToolbar = () => {
    if (props.showToolbar) {
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$t("toolbar"))
      }, props.toolbar || /* @__PURE__ */ React.createElement(React.Fragment, null, renderCancel(), renderTitle(), renderConfirm()));
    }
    return null;
  };
  const renderColumnItems = () => {
    return columns.map((item, columnIndex) => {
      const placeholder = Array.isArray(props.placeholder) ? props.placeholder[columnIndex] : props.placeholder;
      return /* @__PURE__ */ React.createElement(PickerColumn, {
        textKey,
        valueKey,
        key: columnIndex,
        ref: setRefs(columnIndex),
        placeholder,
        optionRender: props.optionRender,
        readOnly: props.readOnly,
        value: innerValue[columnIndex],
        itemHeight,
        index: columnIndex,
        swipeDuration: props.swipeDuration,
        visibleItemCount: props.visibleItemCount,
        options: item,
        onSelect: handleSelect
      });
    });
  };
  const renderColumns = () => {
    const wrapHeight = itemHeight * props.visibleItemCount;
    const frameStyle = { height: `${itemHeight}px` };
    const columnsStyle = { height: `${wrapHeight}px` };
    const maskStyle = {
      backgroundSize: `100% ${(wrapHeight - itemHeight) / 2}px`
    };
    return /* @__PURE__ */ React.createElement("div", {
      ref: wrapper,
      className: clsx(bem$t("columns")),
      style: columnsStyle
    }, renderColumnItems(), /* @__PURE__ */ React.createElement("div", {
      className: clsx(bem$t("mask")),
      style: maskStyle
    }), /* @__PURE__ */ React.createElement("div", {
      className: clsx(BORDER_UNSET_TOP_BOTTOM, bem$t("frame")),
      style: frameStyle
    }));
  };
  useEventListener("touchmove", preventDefault, {
    target: wrapper.current
  });
  return /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$t(), props.className)
  }, props.toolbarPosition === "top" ? renderToolbar() : null, props.loading ? /* @__PURE__ */ React.createElement(Loading, {
    className: clsx(bem$t("loading"))
  }) : null, props.columnsTop, renderColumns(), props.columnsBottom, props.toolbarPosition === "bottom" ? renderToolbar() : null);
}
function PopupPicker(props, ref) {
  const {
    visible: outerVisible,
    popup,
    children,
    defaultValue = [],
    ...pickerProps
  } = props;
  const [visible, setVisible] = usePropsValue({
    value: outerVisible,
    defaultValue: false,
    onChange: (v) => {
      var _a;
      if (v === false) {
        (_a = props.onClose) == null ? void 0 : _a.call(props);
      }
    }
  });
  const actions = {
    toggle: () => {
      if (popup)
        setVisible((v) => !v);
    },
    open: () => {
      if (popup) {
        setVisible(true);
      }
    },
    close: () => {
      if (popup) {
        setVisible(false);
      }
    }
  };
  useImperativeHandle(ref, () => actions);
  const formatValue2 = Array.isArray(props.value) ? props.value : props.value !== void 0 ? [props.value] : void 0;
  const formatDefaultValue = Array.isArray(defaultValue) ? defaultValue : defaultValue !== void 0 ? [defaultValue] : [];
  const {
    text: textKey,
    value: valueKey,
    children: childrenKey
  } = extend(
    {
      text: "text",
      value: "value",
      children: "children"
    },
    props.columnsFieldNames
  );
  const isPlainType = useMemo(() => {
    const firstColumn = props.columns[0] || {};
    if (Array.isArray(firstColumn))
      return false;
    if (typeof firstColumn === "object") {
      if (childrenKey in firstColumn) {
        return false;
      }
    }
    return true;
  }, [props.columns, childrenKey]);
  const parseValue = (target) => isPlainType ? target == null ? void 0 : target[0] : target;
  const [value, setValue] = usePropsValue({
    value: formatValue2,
    defaultValue: formatDefaultValue
  });
  const formatColumns = useColumnsExtend(
    props.columns,
    { textKey, valueKey, childrenKey },
    value
  );
  const [innerValue, setInnerValue] = useState(value);
  useEffect(() => {
    if (popup && JSON.stringify(innerValue) !== JSON.stringify(value)) {
      setInnerValue(value);
    }
  }, [visible]);
  useEffect(() => {
    if (!popup && JSON.stringify(innerValue) !== JSON.stringify(value)) {
      setInnerValue(value);
    }
  }, [value]);
  const onConfirm = (val, items, indexes) => {
    var _a;
    setValue(innerValue, true);
    (_a = props.onConfirm) == null ? void 0 : _a.call(props, parseValue(val), parseValue(items), parseValue(indexes));
    if (popup)
      actions.close();
  };
  const onCancel = () => {
    var _a;
    (_a = props.onCancel) == null ? void 0 : _a.call(props);
    if (popup)
      actions.close();
  };
  const onChange = useMemoizedFn((val, ext, indexes) => {
    var _a, _b;
    setInnerValue(val);
    if (popup) {
      if (visible)
        (_a = props.onChange) == null ? void 0 : _a.call(props, parseValue(val), parseValue(ext), parseValue(indexes));
    } else {
      (_b = props.onChange) == null ? void 0 : _b.call(props, parseValue(val), parseValue(ext), parseValue(indexes));
    }
  });
  const popupProps2 = isObject(popup) ? { closeOnClickOverlay: true, ...popup } : { closeOnClickOverlay: true };
  const content = /* @__PURE__ */ React.createElement(PickerInner, {
    ...pickerProps,
    value: innerValue,
    onCancel,
    onConfirm,
    onChange
  });
  if (!popup)
    return content;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Popup, {
    round: true,
    position: "bottom",
    visible,
    closeOnClickOverlay: true,
    onClickOverlay: () => {
      if (!(popupProps2 == null ? void 0 : popupProps2.closeOnClickOverlay))
        return;
      setVisible(false);
    },
    ...popupProps2
  }, content), children == null ? void 0 : children(parseValue(value), parseValue(formatColumns.items), actions));
}
const Picker = forwardRef(PopupPicker);
Picker.defaultProps = {
  columns: [],
  itemHeight: 44,
  visibleItemCount: 5,
  swipeDuration: 300,
  showToolbar: true,
  placeholder: true,
  toolbarPosition: "top"
};
function isDate(val) {
  return Object.prototype.toString.call(val) === "[object Date]" && !isNaN(val.getTime());
}
const DatePicker = forwardRef(
  (props, ref) => {
    const {
      value,
      defaultValue,
      formatter,
      columnsOrder,
      type: datePickerType,
      filter,
      minDate,
      maxDate,
      ...pickerProps
    } = props;
    const formatValue2 = (date) => {
      if (!isDate(date)) {
        date = minDate;
      }
      date = Math.max(date, minDate.getTime());
      date = Math.min(date, maxDate.getTime());
      return new Date(date);
    };
    const [currentDate, setCurrentDate, currentDateRef] = useRefState(
      () => formatValue2(value || defaultValue)
    );
    const getBoundary = (type, value2) => {
      const boundary = props[`${type}Date`];
      const year = boundary.getFullYear();
      let month = 1;
      let date = 1;
      let hour = 0;
      let minute = 0;
      if (type === "max") {
        month = 12;
        date = getMonthEndDay(value2.getFullYear(), value2.getMonth() + 1);
        hour = 23;
        minute = 59;
      }
      if (value2.getFullYear() === year) {
        month = boundary.getMonth() + 1;
        if (value2.getMonth() + 1 === month) {
          date = boundary.getDate();
          if (value2.getDate() === date) {
            hour = boundary.getHours();
            if (value2.getHours() === hour) {
              minute = boundary.getMinutes();
            }
          }
        }
      }
      return {
        [`${type}Year`]: year,
        [`${type}Month`]: month,
        [`${type}Date`]: date,
        [`${type}Hour`]: hour,
        [`${type}Minute`]: minute
      };
    };
    const originColumns = useMemo(() => {
      const { maxYear, maxDate: maxDate2, maxMonth, maxHour, maxMinute } = getBoundary(
        "max",
        currentDateRef.current
      );
      const { minYear, minDate: minDate2, minMonth, minHour, minMinute } = getBoundary(
        "min",
        currentDateRef.current
      );
      let result = [
        {
          type: "year",
          range: [minYear, maxYear]
        },
        {
          type: "month",
          range: [minMonth, maxMonth]
        },
        {
          type: "day",
          range: [minDate2, maxDate2]
        },
        {
          type: "hour",
          range: [minHour, maxHour]
        },
        {
          type: "minute",
          range: [minMinute, maxMinute]
        }
      ];
      switch (datePickerType) {
        case "date":
          result = result.slice(0, 3);
          break;
        case "year-month":
          result = result.slice(0, 2);
          break;
        case "month-day":
          result = result.slice(1, 3);
          break;
        case "datehour":
          result = result.slice(0, 4);
          break;
      }
      if (columnsOrder) {
        const columnsOrderArr = columnsOrder.concat(
          result.map((column) => column.type)
        );
        result.sort(
          (a, b) => columnsOrderArr.indexOf(a.type) - columnsOrderArr.indexOf(b.type)
        );
      }
      return result.map(({ type, range: rangeArr }) => {
        let values = times(rangeArr[1] - rangeArr[0] + 1, (index2) => {
          return padZero(rangeArr[0] + index2);
        });
        if (filter) {
          values = filter(type, values);
        }
        return {
          type,
          values
        };
      });
    }, [columnsOrder, currentDateRef.current, minDate, maxDate]);
    const columns = useMemo(
      () => originColumns.map(
        (column) => column.values.map((value2) => formatter(column.type, value2))
      ),
      [originColumns, formatter]
    );
    const pickerValue = useMemo(() => {
      const value2 = props.popup ? formatValue2(props.value) : currentDateRef.current;
      const values = originColumns.map((column) => {
        switch (column.type) {
          case "year":
            return formatter("year", `${value2.getFullYear()}`);
          case "month":
            return formatter("month", padZero(value2.getMonth() + 1));
          case "day":
            return formatter("day", padZero(value2.getDate()));
          case "hour":
            return formatter("hour", padZero(value2.getHours()));
          case "minute":
            return formatter("minute", padZero(value2.getMinutes()));
          default:
            return "";
        }
      });
      return values;
    }, [props.value, currentDateRef.current, formatValue2]);
    const updateInnerValue = (indexes) => {
      const { type } = props;
      const getValue = (datetimePickerColumnType) => {
        let index2 = 0;
        originColumns.forEach((column, columnIndex) => {
          if (datetimePickerColumnType === column.type) {
            index2 = columnIndex;
          }
        });
        const { values } = originColumns[index2];
        return getTrueValue(values[indexes[index2]]);
      };
      let year = null;
      let month = null;
      let day = null;
      if (type === "month-day") {
        year = (currentDate || minDate).getFullYear();
        month = getValue("month");
        day = getValue("day");
      } else {
        year = getValue("year");
        month = getValue("month");
        day = type === "year-month" ? 1 : getValue("day");
      }
      const maxDay = getMonthEndDay(year, month);
      day = day > maxDay ? maxDay : day;
      let hour = 0;
      let minute = 0;
      if (type === "datehour") {
        hour = +getValue("hour");
      }
      if (type === "datetime") {
        hour = +getValue("hour");
        minute = +getValue("minute");
      }
      return formatValue2(new Date(year, month - 1, day, hour, minute));
    };
    const onChange = (val, values, indexes) => {
      var _a;
      const nextValue = updateInnerValue(indexes);
      setCurrentDate(nextValue);
      (_a = props.onChange) == null ? void 0 : _a.call(props, nextValue);
    };
    const onConfirm = () => {
      var _a;
      (_a = props.onConfirm) == null ? void 0 : _a.call(props, currentDate);
    };
    useUpdateEffect(() => {
      const nextValue = formatValue2(value);
      if (nextValue && nextValue.valueOf() !== (currentDate == null ? void 0 : currentDate.valueOf())) {
        setCurrentDate(nextValue);
      }
    }, [value, filter, minDate, maxDate]);
    return /* @__PURE__ */ React.createElement(Picker, {
      ...pickerProps,
      value: pickerValue,
      ref,
      columns,
      onChange,
      onConfirm,
      onCancel: props.onCancel
    }, (_, selectRows, actions) => {
      var _a;
      return (_a = props.children) == null ? void 0 : _a.call(props, value, selectRows, actions);
    });
  }
);
const currentYear = new Date().getFullYear();
DatePicker.defaultProps = {
  type: "datetime",
  placeholder: false,
  minDate: new Date(currentYear - 10, 0, 1),
  maxDate: new Date(currentYear + 10, 11, 31),
  formatter: (type, value) => value
};
const TimePicker = forwardRef(
  (props, ref) => {
    const {
      value,
      defaultValue,
      formatter,
      filter,
      minHour,
      maxHour,
      minMinute,
      maxMinute,
      ...pickerProps
    } = props;
    const formatValue2 = (str) => {
      if (!str) {
        str = `${padZero(minHour)}:${padZero(minMinute)}`;
      }
      let [hour, minute] = str.split(":");
      hour = padZero(range(hour, +minHour, +maxHour));
      minute = padZero(range(minute, +minMinute, +maxMinute));
      return `${hour}:${minute}`;
    };
    const [currentDate, setCurrentDate] = useState(
      () => formatValue2(value === void 0 ? defaultValue : value)
    );
    const ranges = useMemo(
      () => [
        {
          type: "hour",
          range: [+minHour, +maxHour]
        },
        {
          type: "minute",
          range: [+minMinute, +maxMinute]
        }
      ],
      [minHour, maxHour, minMinute, maxMinute]
    );
    const originColumns = useMemo(
      () => ranges.map(({ type, range: rangeArr }) => {
        let values = times(
          rangeArr[1] - rangeArr[0] + 1,
          (index2) => padZero(rangeArr[0] + index2)
        );
        if (filter) {
          values = filter(type, values);
        }
        return {
          type,
          values
        };
      }),
      [ranges]
    );
    const columns = useMemo(
      () => originColumns.map(
        (column) => column.values.map((value2) => formatter(column.type, value2))
      ),
      [originColumns]
    );
    const pickerValue = useMemo(() => {
      const pair = (props.popup ? formatValue2(props.value) : currentDate).split(
        ":"
      );
      return [formatter("hour", pair[0]), formatter("minute", pair[1])];
    }, [props.value, currentDate, formatValue2]);
    const onConfirm = () => {
      var _a;
      (_a = props.onConfirm) == null ? void 0 : _a.call(props, currentDate);
    };
    const onCancel = () => {
      var _a;
      (_a = props.onCancel) == null ? void 0 : _a.call(props);
    };
    const onChange = (val) => {
      var _a;
      const nextValue = formatValue2(val.join(":"));
      setCurrentDate(nextValue);
      (_a = props.onChange) == null ? void 0 : _a.call(props, nextValue);
    };
    useUpdateEffect(() => {
      const nextValue = formatValue2(currentDate);
      setCurrentDate(nextValue);
    }, [filter, minHour, maxHour, minMinute, maxMinute]);
    useUpdateEffect(() => {
      const nextValue = formatValue2(value);
      if (nextValue !== currentDate) {
        setCurrentDate(nextValue);
      }
    }, [value]);
    return /* @__PURE__ */ React.createElement(Picker, {
      ...pickerProps,
      ref,
      columns,
      value: pickerValue,
      onChange,
      onConfirm,
      onCancel
    }, (_, selectRows, actions) => {
      var _a;
      return (_a = props.children) == null ? void 0 : _a.call(props, value, selectRows, actions);
    });
  }
);
TimePicker.defaultProps = {
  minHour: 0,
  maxHour: 23,
  minMinute: 0,
  maxMinute: 59,
  placeholder: false,
  defaultValue: "",
  formatter: (type, value) => value
};
const [bem$s] = createNamespace("datetime-picker");
const DateTimePicker = forwardRef(
  (props, ref) => {
    const isTimePicker = props.type === "time";
    if (isTimePicker)
      return /* @__PURE__ */ React.createElement(TimePicker, {
        ref,
        className: clsx(bem$s()),
        ...props
      });
    return /* @__PURE__ */ React.createElement(DatePicker, {
      ref,
      className: clsx(bem$s()),
      ...props
    });
  }
);
var index$i = "";
const [bem$r] = createNamespace("password-input");
const PasswordInput = forwardRef(
  (props, ref) => {
    const innerEffect = useRef(false);
    const inputRef = useRef(null);
    const [state, updateState] = useSetState({
      code: props.value || "",
      focused: props.autoFocus,
      inputType: props.type,
      inputMode: "text"
    });
    const codeArr = useMemo(
      () => {
        var _a;
        return (_a = state.code) == null ? void 0 : _a.toString().split("");
      },
      [state.code]
    );
    const cursorIndex = useMemo(() => codeArr.length, [codeArr.length]);
    const { length, onSubmit } = props;
    const focus = () => {
      var _a;
      (_a = inputRef.current) == null ? void 0 : _a.focus();
      updateState({ focused: true });
    };
    const blur = () => {
      var _a;
      (_a = inputRef.current) == null ? void 0 : _a.blur();
      updateState({ focused: false });
    };
    const clear2 = () => {
      updateState({ code: "" });
    };
    const formatValue2 = (val, callback) => {
      if (isDef(length) && (val == null ? void 0 : val.length) > +length) {
        val = val.slice(0, length);
      }
      if (props.type === "number") {
        val = formatNumber(val, false, false);
      }
      if (isFunction(props.validator)) {
        if (props.validator(val)) {
          updateState({ code: val });
          if (isFunction(callback))
            callback(val);
        }
      } else {
        updateState({ code: val });
        if (isFunction(callback))
          callback(val);
      }
    };
    const handleChange = (e) => {
      const val = e.target.value || "";
      innerEffect.current = true;
      formatValue2(val, props.onChange);
    };
    const renderPoints = () => {
      const Points = [];
      const { mask, gutter } = props;
      for (let i = 0; i < length; i++) {
        const char = codeArr[i];
        const showBorder = i !== 0 && !gutter;
        const showCursor = state.focused && cursorIndex === i && !char;
        let style;
        if (i !== 0 && gutter) {
          style = { marginLeft: addUnit(gutter) };
        }
        Points.push(
          /* @__PURE__ */ React.createElement("li", {
            key: i,
            className: clsx(
              {
                [BORDER_LEFT]: showBorder,
                [props.highlightClass]: props.highlightClass && char && !props.mask
              },
              bem$r("item", { focus: showCursor })
            ),
            style
          }, mask ? /* @__PURE__ */ React.createElement("i", {
            style: { visibility: char ? "visible" : "hidden" }
          }) : char, showCursor && /* @__PURE__ */ React.createElement("div", {
            className: clsx(bem$r("cursor"))
          }))
        );
      }
      return Points;
    };
    useUpdateEffect(() => {
      var _a;
      if (innerEffect.current) {
        innerEffect.current = false;
        return;
      }
      formatValue2((_a = props.value) != null ? _a : "");
    }, [props.value]);
    useEffect(() => {
      var _a, _b;
      if (state.code.length >= length) {
        (_b = (_a = inputRef == null ? void 0 : inputRef.current) == null ? void 0 : _a.blur) == null ? void 0 : _b.call(_a);
        onSubmit == null ? void 0 : onSubmit(state.code);
      }
    }, [length, state.code]);
    useUpdateEffect(() => {
      if (props.type === "number") {
        updateState({ inputType: "tel", inputMode: "numeric" });
      } else {
        updateState({ inputType: "text" });
      }
    }, [props.type]);
    useImperativeHandle(ref, () => ({
      focus,
      blur,
      clear: clear2
    }));
    const info = props.errorInfo || props.info;
    return /* @__PURE__ */ React.createElement("div", {
      className: clsx(bem$r(), props.className),
      style: props.style
    }, /* @__PURE__ */ React.createElement("ul", {
      className: clsx(bem$r("security"), {
        [BORDER_SURROUND]: !props.gutter
      })
    }, renderPoints(), /* @__PURE__ */ React.createElement("input", {
      ref: inputRef,
      type: state.inputType,
      inputMode: state.inputMode,
      pattern: "[0-9]*",
      maxLength: props.length,
      value: state.code,
      autoComplete: "false",
      autoCorrect: "off",
      autoCapitalize: "off",
      autoFocus: props.autoFocus,
      spellCheck: "false",
      onChange: handleChange,
      onFocus: (e) => {
        var _a;
        updateState({ focused: true });
        (_a = props.onFocus) == null ? void 0 : _a.call(props, e);
      },
      onBlur: (e) => {
        var _a;
        updateState({ focused: false });
        (_a = props.onBlur) == null ? void 0 : _a.call(props, e);
      }
    })), info ? /* @__PURE__ */ React.createElement("div", {
      className: clsx(bem$r(props.errorInfo ? "error-info" : "info"))
    }, info) : null);
  }
);
PasswordInput.defaultProps = {
  length: 6,
  gutter: 0,
  mask: true,
  type: "text"
};
var index$h = "";
const CollapseIcon = ({ bem: bem2 }) => /* @__PURE__ */ React.createElement("svg", {
  className: clsx(bem2("collapse-icon")),
  viewBox: "0 0 30 24"
}, /* @__PURE__ */ React.createElement("path", {
  d: "M25.877 12.843h-1.502c-.188 0-.188 0-.188.19v1.512c0 .188 0 .188.188.188h1.5c.187 0 .187 0 .187-.188v-1.511c0-.19 0-.191-.185-.191zM17.999 10.2c0 .188 0 .188.188.188h1.687c.188 0 .188 0 .188-.188V8.688c0-.187.004-.187-.186-.19h-1.69c-.187 0-.187 0-.187.19V10.2zm2.25-3.967h1.5c.188 0 .188 0 .188-.188v-1.7c0-.19 0-.19-.188-.19h-1.5c-.189 0-.189 0-.189.19v1.7c0 .188 0 .188.19.188zm2.063 4.157h3.563c.187 0 .187 0 .187-.189V4.346c0-.19.004-.19-.185-.19h-1.69c-.187 0-.187 0-.187.188v4.155h-1.688c-.187 0-.187 0-.187.189v1.514c0 .19 0 .19.187.19zM14.812 24l2.812-3.4H12l2.813 3.4zm-9-11.157H4.31c-.188 0-.188 0-.188.19v1.512c0 .188 0 .188.188.188h1.502c.187 0 .187 0 .187-.188v-1.511c0-.19.01-.191-.189-.191zm15.937 0H8.25c-.188 0-.188 0-.188.19v1.512c0 .188 0 .188.188.188h13.5c.188 0 .188 0 .188-.188v-1.511c0-.19 0-.191-.188-.191zm-11.438-2.454h1.5c.188 0 .188 0 .188-.188V8.688c0-.187 0-.187-.188-.189h-1.5c-.187 0-.187 0-.187.189V10.2c0 .188 0 .188.187.188zM27.94 0c.563 0 .917.21 1.313.567.518.466.748.757.748 1.51v14.92c0 .567-.188 1.134-.562 1.512-.376.378-.938.566-1.313.566H2.063c-.563 0-.938-.188-1.313-.566-.562-.378-.75-.945-.75-1.511V2.078C0 1.51.188.944.562.567.938.189 1.5 0 1.875 0zm-.062 2H2v14.92h25.877V2zM5.81 4.157c.19 0 .19 0 .19.189v1.762c-.003.126-.024.126-.188.126H4.249c-.126-.003-.126-.023-.126-.188v-1.7c-.187-.19 0-.19.188-.19zm10.5 2.077h1.503c.187 0 .187 0 .187-.188v-1.7c0-.19 0-.19-.187-.19h-1.502c-.188 0-.188.001-.188.19v1.7c0 .188 0 .188.188.188zM7.875 8.5c.187 0 .187.002.187.189V10.2c0 .188 0 .188-.187.188H4.249c-.126-.002-.126-.023-.126-.188V8.625c.003-.126.024-.126.188-.126zm7.875 0c.19.002.19.002.19.189v1.575c-.003.126-.024.126-.19.126h-1.563c-.126-.002-.126-.023-.126-.188V8.625c.002-.126.023-.126.189-.126zm-6-4.342c.187 0 .187 0 .187.189v1.7c0 .188 0 .188-.187.188H8.187c-.126-.003-.126-.023-.126-.188V4.283c.003-.126.024-.126.188-.126zm3.94 0c.185 0 .372 0 .372.189v1.762c-.002.126-.023.126-.187.126h-1.75C12 6.231 12 6.211 12 6.046v-1.7c0-.19.187-.19.187-.19z",
  fill: "currentColor"
}));
const DeleteIcon = ({ bem: bem2 }) => /* @__PURE__ */ React.createElement("svg", {
  className: clsx(bem2("delete-icon")),
  viewBox: "0 0 32 22"
}, /* @__PURE__ */ React.createElement("path", {
  d: "M28.016 0A3.991 3.991 0 0132 3.987v14.026c0 2.2-1.787 3.987-3.98 3.987H10.382c-.509 0-.996-.206-1.374-.585L.89 13.09C.33 12.62 0 11.84 0 11.006c0-.86.325-1.62.887-2.08L9.01.585A1.936 1.936 0 0110.383 0zm0 1.947H10.368L2.24 10.28c-.224.226-.312.432-.312.73 0 .287.094.51.312.729l8.128 8.333h17.648a2.041 2.041 0 002.037-2.04V3.987c0-1.127-.915-2.04-2.037-2.04zM23.028 6a.96.96 0 01.678.292.95.95 0 01-.003 1.377l-3.342 3.348 3.326 3.333c.189.188.292.43.292.679 0 .248-.103.49-.292.679a.96.96 0 01-.678.292.959.959 0 01-.677-.292L18.99 12.36l-3.343 3.345a.96.96 0 01-.677.292.96.96 0 01-.678-.292.962.962 0 01-.292-.68c0-.248.104-.49.292-.679l3.342-3.348-3.342-3.348A.963.963 0 0114 6.971c0-.248.104-.49.292-.679A.96.96 0 0114.97 6a.96.96 0 01.677.292l3.358 3.348 3.345-3.348A.96.96 0 0123.028 6z",
  fill: "currentColor"
}));
const [bem$q] = createNamespace("key");
const NumberKeyboardKey = ({
  children,
  className,
  style,
  ...props
}) => {
  const [active, setActive] = useState(false);
  const touch = useTouch();
  const onTouchStart = (event) => {
    touch.start(event);
    setActive(true);
  };
  const onTouchMove = (event) => {
    touch.move(event);
    if (touch.direction.current) {
      setActive(false);
    }
  };
  const onTouchEnd = (event) => {
    var _a;
    if (active) {
      if (!children) {
        event.preventDefault();
      }
      setActive(false);
      (_a = props.onPress) == null ? void 0 : _a.call(props, props.text, props.type);
    }
  };
  const renderContent = () => {
    if (props.loading) {
      return /* @__PURE__ */ React.createElement(Loading, {
        className: clsx(bem$q("loading-icon"))
      });
    }
    const text = children || props.text;
    switch (props.type) {
      case "delete":
        return text || /* @__PURE__ */ React.createElement(DeleteIcon, {
          bem: bem$q
        });
      case "extra":
        return text || /* @__PURE__ */ React.createElement(CollapseIcon, {
          bem: bem$q
        });
      default:
        return text;
    }
  };
  return /* @__PURE__ */ React.createElement("div", {
    style,
    className: clsx(className, bem$q("wrapper", { wider: props.wider })),
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onTouchCancel: onTouchEnd
  }, /* @__PURE__ */ React.createElement("div", {
    role: "button",
    tabIndex: 0,
    className: clsx(
      bem$q([
        props.color,
        {
          large: props.large,
          active,
          delete: props.type === "delete"
        }
      ])
    )
  }, renderContent()));
};
const [bem$p] = createNamespace("number-keyboard");
const NumberKeyboard = ({
  className,
  style,
  ...props
}) => {
  const root2 = useRef();
  const genBasicKeys = () => {
    const keys2 = Array(9).fill("").map((_, i) => ({ text: i + 1 }));
    if (props.randomKeyOrder) {
      keys2.sort(() => Math.random() > 0.5 ? 1 : -1);
    }
    return keys2;
  };
  const genDefaultKeys = () => [
    ...genBasicKeys(),
    { text: props.extraKey, type: "extra" },
    { text: 0 },
    {
      text: props.showDeleteKey ? props.deleteButtonText : "",
      type: props.showDeleteKey ? "delete" : ""
    }
  ];
  const genCustomKeys = () => {
    const keys2 = genBasicKeys();
    const { extraKey } = props;
    const extraKeys = Array.isArray(extraKey) ? extraKey : [extraKey];
    if (extraKeys.length === 1) {
      keys2.push({ text: 0, wider: true }, { text: extraKeys[0], type: "extra" });
    } else if (extraKeys.length === 2) {
      keys2.push(
        { text: extraKeys[0], type: "extra" },
        { text: 0 },
        { text: extraKeys[1], type: "extra" }
      );
    }
    return keys2;
  };
  const keys = useMemo(
    () => props.theme === "custom" ? genCustomKeys() : genDefaultKeys(),
    [props.theme]
  );
  const onBlur = () => {
    var _a;
    if (props.visible) {
      (_a = props.onBlur) == null ? void 0 : _a.call(props);
    }
  };
  const onClose = () => {
    var _a;
    (_a = props.onClose) == null ? void 0 : _a.call(props);
    if (props.blurOnClose) {
      onBlur();
    }
  };
  const onAnimationEnd = () => {
    var _a;
    (_a = props[props.visible ? "onShow" : "onHide"]) == null ? void 0 : _a.call(props);
  };
  const onPress = (text, type) => {
    var _a, _b, _c, _d;
    if (text === "") {
      if (type === "extra") {
        onBlur();
      }
      return;
    }
    const { value } = props;
    if (type === "delete") {
      (_a = props.onDelete) == null ? void 0 : _a.call(props);
      (_b = props.onChange) == null ? void 0 : _b.call(props, value.slice(0, value.length - 1));
    } else if (type === "close") {
      onClose();
    } else if (value.length < props.maxlength) {
      (_c = props.onInput) == null ? void 0 : _c.call(props, text);
      (_d = props.onChange) == null ? void 0 : _d.call(props, value + text);
    }
  };
  const renderTitle = () => {
    const { title, theme, closeButtonText } = props;
    const showClose = closeButtonText && theme === "default";
    const showTitle = title || showClose;
    if (!showTitle) {
      return null;
    }
    return /* @__PURE__ */ React.createElement("div", {
      className: clsx(bem$p("header"))
    }, title && /* @__PURE__ */ React.createElement("h2", {
      className: clsx(bem$p("title"))
    }, title), showClose && /* @__PURE__ */ React.createElement("button", {
      type: "button",
      className: clsx(bem$p("close")),
      onClick: onClose
    }, closeButtonText));
  };
  const renderKeys = () => keys.map((key, i) => {
    var _a, _b, _c;
    let keySlots = null;
    if (!key.type) {
      keySlots = (_a = props.numberKeyRender) == null ? void 0 : _a.call(props, key);
    }
    if (key.type === "delete") {
      keySlots = (_b = props.deleteRender) == null ? void 0 : _b.call(props);
    }
    if (key.type === "extra") {
      keySlots = (_c = props.extraKeyRender) == null ? void 0 : _c.call(props);
    }
    return /* @__PURE__ */ React.createElement(NumberKeyboardKey, {
      key: i,
      text: key.text,
      type: key.type,
      wider: key.wider,
      color: key.color,
      onPress,
      children: keySlots
    });
  });
  const renderSidebar = () => {
    if (props.theme === "custom") {
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$p("sidebar"))
      }, props.showDeleteKey && /* @__PURE__ */ React.createElement(NumberKeyboardKey, {
        large: true,
        text: props.deleteButtonText,
        type: "delete",
        onPress
      }), /* @__PURE__ */ React.createElement(NumberKeyboardKey, {
        large: true,
        text: props.closeButtonText,
        type: "close",
        color: "blue",
        loading: props.closeButtonLoading,
        onPress
      }));
    }
    return null;
  };
  useUpdateEffect(() => {
    var _a;
    if (!props.transition) {
      (_a = props[props.visible ? "onShow" : "onHide"]) == null ? void 0 : _a.call(props);
    }
  }, [props.visible]);
  useClickAway(root2, props.hideOnClickOutside ? onBlur : noop, "touchstart");
  const Title2 = renderTitle();
  const Content = /* @__PURE__ */ React.createElement(CSSTransition, {
    mountOnEnter: true,
    unmountOnExit: true,
    nodeRef: root2,
    in: props.visible,
    timeout: 300,
    classNames: props.transition ? "rv-slide-up" : "",
    onExited: onAnimationEnd
  }, /* @__PURE__ */ React.createElement("div", {
    ref: root2,
    style: { ...style, ...getZIndexStyle(props.zIndex) },
    className: clsx(
      className,
      bem$p({
        unfit: !props.safeAreaInsetBottom,
        "with-title": !!Title2
      })
    ),
    onTouchStart: stopPropagation
  }, Title2, /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$p("body"))
  }, /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$p("keys"))
  }, renderKeys()), renderSidebar())));
  return Content;
};
NumberKeyboard.defaultProps = {
  transition: true,
  blurOnClose: true,
  showDeleteKey: true,
  hideOnClickOutside: true,
  safeAreaInsetBottom: true,
  theme: "default",
  value: "",
  extraKey: "",
  maxlength: Number.MAX_VALUE
};
var index$g = "";
const [bem$o] = createNamespace("slider");
const Slider = (props) => {
  const [buttonRef1, setButtonRef1] = useState(null);
  const [buttonRef2, setButtonRef2] = useState(null);
  const buttonIndex = useRef();
  const startValue = useRef();
  const currentValue = useRef(props.value);
  const root2 = useRef();
  const dragStatus = useRef();
  const touch = useTouch();
  const scope = useMemo(
    () => Number(props.max) - Number(props.min),
    [props.max, props.min]
  );
  const wrapperStyle = useMemo(() => {
    const crossAxis = props.vertical ? "width" : "height";
    return {
      background: props.inactiveColor,
      [crossAxis]: addUnit(props.barHeight),
      ...props.style
    };
  }, [props.vertical, props.barHeight, props.inactiveColor, props.style]);
  const isRange = (val) => props.range && Array.isArray(val);
  const calcMainAxis = () => {
    const { value, min } = props;
    if (isRange(value)) {
      return `${(value[1] - value[0]) * 100 / scope}%`;
    }
    return `${(+value - Number(min)) * 100 / scope}%`;
  };
  const calcOffset = () => {
    const { value, min } = props;
    if (isRange(value)) {
      return `${(value[0] - Number(min)) * 100 / scope}%`;
    }
    return "0%";
  };
  const barStyle = useMemo(() => {
    const mainAxis = props.vertical ? "height" : "width";
    const style = {
      [mainAxis]: calcMainAxis(),
      background: props.activeColor
    };
    if (dragStatus.current) {
      style.transition = "none";
    }
    const getPositionKey = () => {
      if (props.vertical) {
        return props.reverse ? "bottom" : "top";
      }
      return props.reverse ? "right" : "left";
    };
    style[getPositionKey()] = calcOffset();
    return style;
  }, [calcOffset]);
  const format2 = (value) => {
    const min = +props.min;
    const max = +props.max;
    const step = +props.step;
    value = range(value, min, max);
    const diff = Math.round((value - min) / step) * step;
    return addNumber(min, diff);
  };
  const isSameValue = (newValue, oldValue) => JSON.stringify(newValue) === JSON.stringify(oldValue);
  const handleRangeValue = (value) => {
    var _a, _b;
    const left = (_a = value[0]) != null ? _a : Number(props.min);
    const right = (_b = value[1]) != null ? _b : Number(props.max);
    return left > right ? [right, left] : [left, right];
  };
  const updateValue = (value, end) => {
    var _a, _b;
    if (isRange(value)) {
      value = handleRangeValue(value).map(format2);
    } else {
      value = format2(value);
    }
    if (!isSameValue(value, props.value)) {
      (_a = props.onChange) == null ? void 0 : _a.call(props, value);
    }
    if (end && !isSameValue(value, startValue.current)) {
      (_b = props.onChangeAfter) == null ? void 0 : _b.call(props, value);
    }
    return value;
  };
  const onClick = (event) => {
    event.stopPropagation();
    if (props.disabled || props.readOnly) {
      return;
    }
    const { min, reverse, vertical, value: modelValue } = props;
    const rect = useRect(root2.current);
    const getDelta = () => {
      if (vertical) {
        if (reverse) {
          return rect.bottom - event.clientY;
        }
        return event.clientY - rect.top;
      }
      if (reverse) {
        return rect.right - event.clientX;
      }
      return event.clientX - rect.left;
    };
    const total = vertical ? rect.height : rect.width;
    const value = Number(min) + getDelta() / total * scope;
    if (isRange(modelValue)) {
      const [left, right] = modelValue;
      const middle = (left + right) / 2;
      if (value <= middle) {
        updateValue([value, right], true);
      } else {
        updateValue([left, value], true);
      }
    } else {
      updateValue(value, true);
    }
  };
  const onTouchStart = (event) => {
    if (props.disabled || props.readOnly) {
      return;
    }
    touch.start(event);
    currentValue.current = JSON.parse(JSON.stringify(props.value));
    if (isRange(currentValue.current)) {
      startValue.current = currentValue.current.map(format2);
    } else {
      startValue.current = format2(currentValue.current);
    }
    dragStatus.current = "start";
  };
  const onTouchMove = (event) => {
    var _a;
    if (props.disabled || props.readOnly) {
      return;
    }
    if (dragStatus.current === "start") {
      (_a = props.onDragStart) == null ? void 0 : _a.call(
        props,
        event,
        startValue.current
      );
    }
    preventDefault(event, true);
    touch.move(event);
    dragStatus.current = "dragging";
    const rect = useRect(root2.current);
    const delta = props.vertical ? touch.deltaY.current : touch.deltaX.current;
    const total = props.vertical ? rect.height : rect.width;
    let diff = delta / total * scope;
    if (props.reverse) {
      diff = -diff;
    }
    if (isRange(startValue.current)) {
      const index2 = props.reverse ? 1 - buttonIndex.current : buttonIndex.current;
      currentValue.current[index2] = startValue.current[index2] + diff;
    } else {
      currentValue.current = +startValue.current + diff;
    }
    updateValue(currentValue.current);
  };
  const onTouchEnd = (event) => {
    var _a;
    if (props.disabled || props.readOnly) {
      return;
    }
    if (dragStatus.current === "dragging") {
      const value = updateValue(currentValue.current, true);
      (_a = props.onDragEnd) == null ? void 0 : _a.call(props, event, value);
    }
    dragStatus.current = "";
  };
  const getButtonClassName = (index2) => {
    if (typeof index2 === "number") {
      const position = ["left", "right"];
      return bem$o("button-wrapper", position[index2]);
    }
    return bem$o("button-wrapper", props.reverse ? "left" : "right");
  };
  const renderButtonContent = (value, index2) => {
    if (typeof index2 === "number") {
      const slot = props[index2 === 0 ? "leftButton" : "rightButton"];
      if (slot) {
        return slot;
      }
    }
    if (typeof props.button === "function") {
      return props.button({ value });
    }
    if (props.button) {
      return props.button;
    }
    return /* @__PURE__ */ React.createElement("div", {
      className: clsx(bem$o("button")),
      style: getSizeStyle(props.buttonSize)
    });
  };
  const renderButton = (buttounRef, index2) => {
    const value = typeof index2 === "number" ? props.value[index2] : props.value;
    return /* @__PURE__ */ React.createElement("div", {
      ref: buttounRef,
      key: index2,
      role: "slider",
      className: clsx(getButtonClassName(index2)),
      tabIndex: props.disabled || props.readOnly ? -1 : 0,
      "aria-valuemin": props.min,
      "aria-valuenow": value,
      "aria-valuemax": props.max,
      "aria-orientation": props.vertical ? "vertical" : "horizontal",
      onTouchStart: (event) => {
        if (typeof index2 === "number") {
          buttonIndex.current = index2;
        }
        onTouchStart(event);
      },
      onTouchEnd,
      onTouchCancel: onTouchEnd,
      onClick: stopPropagation
    }, renderButtonContent(currentValue.current, index2));
  };
  useEventListener("touchmove", onTouchMove, {
    target: buttonRef1,
    depends: [
      touch.deltaX.current,
      touch.deltaY.current,
      props.disabled,
      props.readOnly
    ]
  });
  useEventListener("touchmove", onTouchMove, {
    target: buttonRef2,
    depends: [
      touch.deltaX.current,
      touch.deltaY.current,
      props.disabled,
      props.readOnly
    ]
  });
  return /* @__PURE__ */ React.createElement("div", {
    ref: root2,
    style: wrapperStyle,
    className: clsx(
      props.className,
      bem$o({
        vertical: props.vertical,
        disabled: props.disabled
      })
    ),
    onClick
  }, /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$o("bar")),
    style: barStyle
  }, props.range ? [renderButton(setButtonRef1, 0), renderButton(setButtonRef2, 1)] : renderButton(setButtonRef1)));
};
Slider.defaultProps = {
  min: 0,
  max: 100,
  step: 1
};
var index$f = "";
const LONG_PRESS_INTERVAL = 100;
const LONG_PRESS_START_TIME = 600;
function add(num1, num2) {
  const cardinal = 10 ** 10;
  return Math.round((num1 + num2) * cardinal) / cardinal;
}
const [bem$n] = createNamespace("stepper");
const Stepper = React.forwardRef(
  (props, ref) => {
    const { defaultValue = 0 } = props;
    let actionType;
    const inputRef = useRef(null);
    const [value, setValue] = usePropsValue({
      ...props,
      defaultValue,
      onChange: (v) => {
        var _a;
        (_a = props.onChange) == null ? void 0 : _a.call(props, v, { name: props.name });
      }
    });
    const format2 = (v) => {
      v = +formatNumber(String(v), !props.integer);
      if (isNaN(v))
        return;
      let target = bound(v, props.min, props.max);
      if (props.decimalLength !== void 0) {
        target = parseFloat(target.toFixed(props.decimalLength));
      }
      return target;
    };
    const setValueWithCheck = (v) => {
      setValue(format2(v));
    };
    const [inputValue, setInputValue, inputValueRef] = useRefState(
      () => convertValueToText(value, props.decimalLength)
    );
    const [hasFocus, setHasFocus] = useState(false);
    useEffect(() => {
      if (!hasFocus) {
        setInputValue(convertValueToText(value, props.decimalLength));
      }
    }, [hasFocus]);
    useEffect(() => {
      if (!hasFocus) {
        setInputValue(convertValueToText(value, props.decimalLength));
      }
    }, [value, props.decimalLength]);
    const minusDisabled = useMemo(
      () => props.disabled || props.disableMinus || +value <= +props.min,
      [props.disabled, props.disableMinus, props.min, value]
    );
    const plusDisabled = useMemo(
      () => props.disabled || props.disablePlus || +value >= +props.max,
      [props.disabled, props.disablePlus, props.max, value]
    );
    const inputStyle = useMemo(
      () => ({
        width: addUnit(props.inputWidth),
        height: addUnit(props.buttonSize)
      }),
      [props.inputWidth, props.buttonSize]
    );
    const buttonStyle = useMemo(
      () => getSizeStyle(props.buttonSize),
      [props.buttonSize]
    );
    const onChange = (e) => {
      var _a, _b, _c;
      const isMinus = actionType === "minus";
      if (actionType === "plus" && plusDisabled || isMinus && minusDisabled) {
        (_a = props.onOverlimit) == null ? void 0 : _a.call(props, actionType);
        return;
      }
      const diff = isMinus ? -props.step : +props.step;
      const val = add(+inputValueRef.current, diff);
      setValueWithCheck(val);
      if (isMinus) {
        (_b = props.onMinus) == null ? void 0 : _b.call(props, e, val);
      } else {
        (_c = props.onPlus) == null ? void 0 : _c.call(props, e, val);
      }
    };
    const onLongPressChange = () => {
      const isMinus = actionType === "minus";
      const diff = isMinus ? -props.step : +props.step;
      const val = add(+inputValueRef.current, diff);
      setInputValue(`${format2(val)}`);
    };
    const onInput = (event) => {
      const { value: inputValue2 } = event.target;
      setInputValue(inputValue2);
      const value2 = convertTextToValue(inputValue2);
      if (value2 === null) {
        if (props.allowEmpty) {
          setValue(null);
        } else {
          setValue(defaultValue);
        }
      } else {
        setValueWithCheck(value2);
      }
    };
    const onFocus = (event) => {
      var _a;
      setHasFocus(true);
      if (props.disableInput && inputRef.current) {
        inputRef.current.blur();
      } else {
        (_a = props.onFocus) == null ? void 0 : _a.call(props, event);
      }
    };
    const onBlur = (event) => {
      var _a;
      setHasFocus(false);
      (_a = props.onBlur) == null ? void 0 : _a.call(props, event);
      resetScroll();
    };
    const isLongPress = useRef(false);
    const longPressTimer = useRef(null);
    const longPressStep = () => {
      longPressTimer.current = setTimeout(() => {
        onLongPressChange();
        longPressStep();
      }, LONG_PRESS_INTERVAL);
    };
    const onTouchStart = () => {
      if (props.longPress) {
        isLongPress.current = false;
        clearTimeout(longPressTimer.current);
        longPressTimer.current = setTimeout(() => {
          isLongPress.current = true;
          longPressStep();
        }, LONG_PRESS_START_TIME);
      }
    };
    const onTouchEnd = (event) => {
      if (props.longPress) {
        clearTimeout(longPressTimer.current);
        if (isLongPress.current) {
          preventDefault(event);
        }
      }
    };
    const onMousedown = (event) => {
      if (props.disableInput) {
        event.preventDefault();
      }
    };
    const createListeners = (type) => ({
      onClick: (event) => {
        event.preventDefault();
        actionType = type;
        onChange(event);
      },
      onTouchStart: () => {
        actionType = type;
        onTouchStart();
      },
      onTouchEnd,
      onTouchCancel: onTouchEnd
    });
    React.useImperativeHandle(ref, () => ({
      focus: () => inputRef.current.focus(),
      blur: () => inputRef.current.blur()
    }));
    return /* @__PURE__ */ React.createElement("div", {
      className: clsx(props.className, bem$n([props.theme])),
      style: props.style
    }, props.showMinus && /* @__PURE__ */ React.createElement("button", {
      type: "button",
      "aria-label": "minus",
      style: buttonStyle,
      className: clsx(bem$n("minus", { disabled: minusDisabled })),
      ...createListeners("minus")
    }), props.showInput && /* @__PURE__ */ React.createElement("input", {
      ref: inputRef,
      type: props.integer ? "tel" : "text",
      role: "spinbutton",
      className: clsx(bem$n("input")),
      value: inputValue,
      style: inputStyle,
      disabled: props.disabled || props.disableInput,
      readOnly: props.disableInput,
      inputMode: props.integer ? "numeric" : "decimal",
      placeholder: props.placeholder,
      "aria-valuemax": +props.max,
      "aria-valuemin": +props.min,
      "aria-valuenow": +inputValue,
      onChange: onInput,
      onBlur,
      onFocus,
      onMouseDown: onMousedown,
      onClick: props.onClick
    }), props.showPlus && /* @__PURE__ */ React.createElement("button", {
      type: "button",
      "aria-label": "add",
      style: buttonStyle,
      className: clsx(bem$n("plus", { disabled: plusDisabled })),
      ...createListeners("plus")
    }));
  }
);
function convertValueToText(value, digits) {
  if (value === null || value === void 0)
    return "";
  if (digits !== void 0) {
    return value.toFixed(digits);
  } else {
    return value.toString();
  }
}
function convertTextToValue(text) {
  if (text === "")
    return null;
  return parseFloat(text);
}
Stepper.defaultProps = {
  theme: "default",
  max: Number.MAX_VALUE,
  step: 1,
  showPlus: true,
  showMinus: true,
  showInput: true,
  longPress: true
};
const [bem$m] = createNamespace("switch");
const Swtich = (props) => {
  const { loading, disabled, size, activeColor, inactiveColor } = props;
  const [checked, setChecked] = useMergedState({
    value: props.checked,
    defaultValue: props.defaultChecked
  });
  const isChecked = useMemo(
    () => checked === props.activeValue,
    [checked, props.activeValue]
  );
  const style = {
    fontSize: addUnit(size),
    backgroundColor: isChecked ? activeColor : inactiveColor,
    ...props.style
  };
  const onClick = (e) => {
    var _a, _b;
    if (!props.disabled) {
      (_a = props.onClick) == null ? void 0 : _a.call(props, e);
    }
    if (!props.disabled && !props.loading) {
      const newValue = isChecked ? props.inactiveValue : props.activeValue;
      setChecked(newValue);
      (_b = props.onChange) == null ? void 0 : _b.call(props, newValue);
    }
  };
  const renderLoading = () => {
    if (props.loading) {
      const color = isChecked ? props.activeColor : props.inactiveColor;
      return /* @__PURE__ */ React.createElement(Loading, {
        className: clsx(bem$m("loading")),
        color
      });
    }
    return null;
  };
  return /* @__PURE__ */ React.createElement("div", {
    role: "switch",
    tabIndex: 0,
    className: clsx(
      props.className,
      bem$m({
        on: isChecked,
        loading,
        disabled
      })
    ),
    style,
    "aria-checked": isChecked,
    onClick
  }, /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$m("node"))
  }, renderLoading()));
};
Swtich.defaultProps = {
  activeValue: true,
  inactiveValue: false
};
var index$e = "";
var index$d = "";
function toArray(item) {
  if (Array.isArray(item)) {
    return item;
  }
  return [item];
}
function readFileContent(file, resultType) {
  return new Promise((resolve) => {
    if (resultType === "file") {
      resolve();
      return;
    }
    if (isImageFile(file)) {
      resolve(URL.createObjectURL(file));
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    if (resultType === "dataUrl") {
      reader.readAsDataURL(file);
    } else if (resultType === "text") {
      reader.readAsText(file);
    }
  });
}
function isOversize(files, maxSize) {
  return toArray(files).some((file) => {
    if (file) {
      if (isFunction(maxSize)) {
        return maxSize(file);
      }
      return file.size > maxSize;
    }
    return false;
  });
}
function filterFiles(items, maxSize) {
  const valid = [];
  const invalid = [];
  items.forEach((item) => {
    if (isOversize([item], maxSize)) {
      invalid.push(item);
    } else {
      valid.push(item);
    }
  });
  return { valid, invalid };
}
const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
function isImageUrl(url) {
  return IMAGE_REGEXP.test(url);
}
function isImageFile(item, isImage) {
  if (isImage) {
    return true;
  }
  if (item.file && item.file.type) {
    return item.file.type.indexOf("image") === 0;
  }
  if (item.url) {
    return isImageUrl(item.url);
  }
  if (item.thumbnail) {
    return isImageUrl(item.thumbnail);
  }
  return false;
}
const [bem$l] = createNamespace("uploader");
const UploaderPreviewItem = (props) => {
  const { onPreview, statusTextRender, status, file, url } = props;
  const isImage = useMemo(() => isImageFile({ file, url }), [file, url]);
  const imageSrc = useMemo(() => {
    if (isImage) {
      if (url)
        return url;
      if (file) {
        return URL.createObjectURL(file);
      }
    }
    return "";
  }, [isImage, file, url]);
  const renderMask = () => {
    if (status === "failed" || status === "pending") {
      const MaskIcon = status === "failed" ? /* @__PURE__ */ React.createElement(Close, {
        className: clsx(bem$l("mask-icon"))
      }) : /* @__PURE__ */ React.createElement(Loading, {
        className: clsx(bem$l("loading"))
      });
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$l("mask"))
      }, MaskIcon, statusTextRender && /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$l("mask-message"))
      }, statusTextRender(status)));
    }
    return null;
  };
  const renderDeleteIcon = () => {
    if (props.deletable) {
      return props.deleteRender ? props.deleteRender(props.onDelete) : /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$l("preview-delete")),
        onClick: props.onDelete
      }, /* @__PURE__ */ React.createElement(Cross, {
        className: clsx(bem$l("preview-delete-icon"))
      }));
    }
    return null;
  };
  const renderCover = () => {
    var _a;
    return (_a = props.previewCoverRender) == null ? void 0 : _a.call(props);
  };
  const renderPreview = () => {
    if (isImage) {
      return /* @__PURE__ */ React.createElement(ImageNamespace, {
        fit: props.imageFit,
        src: imageSrc,
        className: clsx(bem$l("preview-image")),
        width: props.previewSize,
        height: props.previewSize,
        onClick: onPreview
      }, renderCover());
    }
    return /* @__PURE__ */ React.createElement("div", {
      className: clsx(bem$l("file")),
      style: getSizeStyle(props.previewSize)
    }, /* @__PURE__ */ React.createElement(Description, {
      className: clsx(bem$l("file-icon"))
    }), /* @__PURE__ */ React.createElement("div", {
      className: clsx(bem$l("file-name"), "rv-ellipsis")
    }, file ? file.name : url), renderCover());
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$l("preview")),
    onClick: props.onClick
  }, renderPreview(), renderMask(), renderDeleteIcon());
};
const [bem$k] = createNamespace("uploader");
const Uploader = forwardRef((props, ref) => {
  var _a;
  const [value, setValue] = usePropsValue({
    ...props,
    defaultValue: (_a = props.defaultValue) != null ? _a : []
  });
  const imagePreview = useRef(null);
  const inputRef = useRef();
  const [tasks, setTasks] = useState([]);
  const idCountRef = useRef(0);
  useIsomorphicLayoutEffect(() => {
    if (!Array.isArray(value))
      return;
    setTasks(
      (prev2) => prev2.filter((task) => {
        if (task.url === void 0)
          return true;
        return !value.some((fileItem) => fileItem.url === task.url);
      })
    );
  }, [value]);
  const { maxCount, maxSize, resultType, beforeRead } = props;
  async function processFile(file, fileList) {
    let transformedFile = file;
    transformedFile = await (beforeRead == null ? void 0 : beforeRead(file, fileList));
    return transformedFile;
  }
  const onChange = async (event) => {
    var _a2;
    event.persist();
    const { files: rawFiles } = event.target;
    if (!rawFiles)
      return;
    let files = [].slice.call(rawFiles);
    event.target.value = "";
    if (props.disabled) {
      return;
    }
    if (props.beforeRead) {
      const postFiles = files.map((file) => {
        return processFile(file, files);
      });
      await Promise.all(postFiles).then((filesList) => {
        files = filesList.filter(Boolean);
      });
    }
    if (files.length === 0) {
      return;
    }
    if (maxCount > 0) {
      const exceed = value.length + files.length - maxCount;
      if (exceed > 0) {
        files = files.slice(0, files.length - exceed);
      }
      if (isOversize(files, maxSize)) {
        const result = filterFiles(files, maxSize);
        (_a2 = props.onOversize) == null ? void 0 : _a2.call(props, result.invalid);
        return;
      }
    }
    const newTasks = files.map(
      (file) => ({
        id: idCountRef.current++,
        status: "pending",
        file
      })
    );
    setTasks((prev2) => [...prev2, ...newTasks]);
    await Promise.all(
      newTasks.map(async (currentTask) => {
        try {
          let result = {};
          if (props.upload) {
            result = await props.upload(currentTask.file);
          } else {
            const dataUrl = await readFileContent(
              currentTask.file,
              resultType
            );
            result.url = dataUrl;
            result.file = currentTask.file;
            result.key = currentTask.id;
          }
          setTasks((prev2) => {
            return prev2.map((task) => {
              if (task.id === currentTask.id) {
                return {
                  ...task,
                  url: result.url
                };
              }
              return task;
            });
          });
          setValue((prev2) => {
            const newVal = { ...result, file: currentTask.file };
            return [...prev2, newVal];
          });
        } catch (e) {
          setTasks((prev2) => {
            return prev2.map((task) => {
              if (task.id === currentTask.id) {
                return {
                  ...task,
                  status: "failed"
                };
              }
              return task;
            });
          });
          throw e;
        }
      })
    ).catch((error) => console.error(error));
  };
  const previewImage = (item) => {
    if (props.previewFullImage) {
      const imageFiles = value.filter((v) => isImageFile(v));
      const images = imageFiles.map((image) => image.url || image.thumbnail).filter(Boolean);
      imagePreview.current = ImagePreview.open(
        extend(
          {
            images,
            startPosition: imageFiles.indexOf(item),
            onClose: props.onClosePreview
          },
          props.previewOptions
        )
      );
    }
  };
  const closeImagePreview = () => {
    if (imagePreview.current) {
      imagePreview.current.close();
    }
  };
  const renderPreviewItem = (item, index2) => {
    var _a2, _b;
    return /* @__PURE__ */ React.createElement(UploaderPreviewItem, {
      file: item.file,
      key: (_a2 = item.key) != null ? _a2 : `-${index2}`,
      name: props.name,
      url: (_b = item.thumbnail) != null ? _b : item.url,
      imageFit: props.imageFit,
      deletable: props.deletable,
      previewSize: props.previewSize,
      deleteRender: props.deleteRender,
      previewCoverRender: () => {
        var _a3;
        return (_a3 = props.previewCoverRender) == null ? void 0 : _a3.call(props, item);
      },
      onClick: () => {
        var _a3;
        return (_a3 = props.onClickPreview) == null ? void 0 : _a3.call(props, item, index2);
      },
      onDelete: async () => {
        var _a3;
        const canDelete = await ((_a3 = props.onDelete) == null ? void 0 : _a3.call(props, item));
        if (canDelete === false)
          return;
        setValue(value.filter((_, i) => i !== index2));
      },
      onPreview: () => previewImage(item)
    });
  };
  const renderPreviewList = () => {
    if (props.previewImage) {
      return /* @__PURE__ */ React.createElement(React.Fragment, null, value.map(renderPreviewItem), tasks.map((task) => {
        if (task.status === "failed")
          return null;
        return /* @__PURE__ */ React.createElement(UploaderPreviewItem, {
          key: task.id,
          file: task.file,
          status: task.status,
          statusTextRender: props.statusTextRender,
          deletable: task.status !== "pending",
          deleteRender: props.deleteRender,
          imageFit: props.imageFit,
          onDelete: () => {
            setTasks(tasks.filter((x) => x.id !== task.id));
          }
        });
      }));
    }
    return null;
  };
  const renderUploadIcon = () => {
    if (props.uploadIcon) {
      return React.cloneElement(props.uploadIcon, {
        className: clsx(bem$k("upload-icon"))
      });
    }
    return null;
  };
  const renderUpload = () => {
    if (props.showUpload && (maxCount === 0 || value.length + tasks.length < maxCount)) {
      const Input2 = props.readOnly ? null : /* @__PURE__ */ React.createElement("input", {
        ref: inputRef,
        type: "file",
        className: clsx(bem$k("input")),
        accept: props.accept,
        capture: props.capture,
        multiple: props.multiple,
        disabled: props.disabled,
        onChange
      });
      if (props.children) {
        return /* @__PURE__ */ React.createElement("div", {
          className: clsx(bem$k("input-wrapper")),
          onClick: props.onClickUpload
        }, props.children, Input2);
      }
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$k("upload", { readOnly: props.readOnly })),
        style: getSizeStyle(props.previewSize),
        onClick: props.onClickUpload
      }, renderUploadIcon(), props.uploadText && /* @__PURE__ */ React.createElement("span", {
        className: clsx(bem$k("upload-text"))
      }, props.uploadText), Input2);
    }
    return null;
  };
  const chooseFile = () => {
    if (inputRef.current && !props.disabled) {
      inputRef.current.click();
    }
  };
  useImperativeHandle(ref, () => ({
    chooseFile,
    closeImagePreview
  }));
  return /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$k())
  }, /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$k("wrapper", { disabled: props.disabled }))
  }, renderPreviewList(), renderUpload()));
});
Uploader.defaultProps = {
  maxSize: Number.MAX_VALUE,
  maxCount: Number.MAX_VALUE,
  deletable: true,
  showUpload: true,
  previewImage: true,
  previewFullImage: true,
  name: "",
  accept: "image/*",
  imageFit: "cover",
  resultType: "dataUrl",
  uploadIcon: /* @__PURE__ */ React.createElement(Photograph, null)
};
var index$c = "";
const [bem$j] = createNamespace("progress");
const Progress = (props) => {
  const background = useMemo(
    () => props.inactive ? "#cacaca" : props.color,
    [props.inactive, props.color]
  );
  const renderPivot = () => {
    const { textColor, pivotText, pivotColor, percentage: percentage2 } = props;
    const text = pivotText != null ? pivotText : `${percentage2}%`;
    if (props.showPivot && text) {
      const style = {
        color: textColor,
        left: `${+percentage2}%`,
        transform: `translate(-${+percentage2}%,-50%)`,
        background: pivotColor || background
      };
      return /* @__PURE__ */ React.createElement("span", {
        style,
        className: clsx(bem$j("pivot"))
      }, text);
    }
    return null;
  };
  const { trackColor, percentage, strokeWidth } = props;
  const rootStyle = {
    ...props.style,
    background: trackColor,
    height: addUnit(strokeWidth)
  };
  const portionStyle = {
    background,
    transform: `scaleX(${+percentage / 100})`
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$j(), props.className),
    style: rootStyle
  }, /* @__PURE__ */ React.createElement("span", {
    className: clsx(bem$j("portion")),
    style: portionStyle
  }), renderPivot());
};
Progress.defaultProps = {
  showPivot: true,
  percentage: 0
};
var index$b = "";
let uid = 0;
function format(rate) {
  return Math.min(Math.max(+rate, 0), 100);
}
function getPath(clockwise, viewBoxSize) {
  const sweepFlag = clockwise ? 1 : 0;
  return `M ${viewBoxSize / 2} ${viewBoxSize / 2} m 0, -500 a 500, 500 0 1, ${sweepFlag} 0, 1000 a 500, 500 0 1, ${sweepFlag} 0, -1000`;
}
const ROTATE_ANGLE_MAP = {
  top: 0,
  right: 90,
  bottom: 180,
  left: 270
};
const [bem$i] = createNamespace("circle");
const Circle = (props) => {
  const id = `van-circle-${uid++}`;
  const [currentRate, setCurrentRate] = useState(() => props.defaultRate || 0);
  const [current] = useMergedState({
    defaultValue: props.defaultRate,
    value: props.rate
  });
  const viewBoxSize = useMemo(
    () => +props.strokeWidth + 1e3,
    [props.strokeWidth]
  );
  const path = useMemo(
    () => getPath(props.clockwise, viewBoxSize),
    [props.clockwise, viewBoxSize]
  );
  const svgStyle = useMemo(() => {
    const angleValue = ROTATE_ANGLE_MAP[props.startPosition];
    if (angleValue) {
      return {
        transform: `rotate(${angleValue}deg)`
      };
    }
    return void 0;
  }, [props.startPosition]);
  useEffect(() => {
    let rafId2;
    const startTime = Date.now();
    const startRate = currentRate;
    const endRate = format(current);
    const duration = Math.abs((startRate - endRate) * 1e3 / +props.speed);
    const animate = () => {
      var _a;
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const rate = progress * (endRate - startRate) + startRate;
      const crate = format(parseFloat(rate.toFixed(1)));
      setCurrentRate(crate);
      if (endRate > startRate ? rate < endRate : rate > endRate) {
        rafId2 = raf(animate);
      } else {
        (_a = props.onChange) == null ? void 0 : _a.call(props, crate);
      }
    };
    if (props.speed) {
      if (rafId2) {
        cancelRaf(rafId2);
      }
      rafId2 = raf(animate);
    } else {
      setCurrentRate(endRate);
    }
  }, [current]);
  const renderHover = () => {
    const PERIMETER = 3140;
    const { strokeWidth } = props;
    const offset = PERIMETER * currentRate / 100;
    const color = isObject(props.color) ? `url(#${id})` : props.color;
    const style = {
      stroke: color,
      strokeWidth: `${+strokeWidth + 1}px`,
      strokeLinecap: props.strokeLinecap,
      strokeDasharray: `${offset}px ${PERIMETER}px`
    };
    return /* @__PURE__ */ React.createElement("path", {
      d: path,
      style,
      className: clsx(bem$i("hover")),
      stroke: color
    });
  };
  const renderLayer = () => {
    const style = {
      fill: props.fill,
      stroke: props.layerColor,
      strokeWidth: `${props.strokeWidth}px`
    };
    return /* @__PURE__ */ React.createElement("path", {
      className: clsx(bem$i("layer")),
      style,
      d: path
    });
  };
  const renderGradient = () => {
    const { color } = props;
    if (!isObject(color)) {
      return null;
    }
    const Stops = Object.keys(color).sort((a, b) => parseFloat(a) - parseFloat(b)).map((key, index2) => /* @__PURE__ */ React.createElement("stop", {
      key: index2,
      offset: key,
      stopColor: color[key]
    }));
    return /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("linearGradient", {
      id,
      x1: "100%",
      y1: "0%",
      x2: "0%",
      y2: "0%"
    }, Stops));
  };
  const renderText = () => {
    if (props.text) {
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$i("text"))
      }, props.text);
    }
    return props.children;
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$i(), props.className),
    style: { ...props.style, ...getSizeStyle(props.size) }
  }, /* @__PURE__ */ React.createElement("svg", {
    viewBox: `0 0 ${viewBoxSize} ${viewBoxSize}`,
    style: svgStyle
  }, renderGradient(), renderLayer(), renderHover()), renderText());
};
Circle.defaultProps = {
  clockwise: true,
  speed: 100,
  fill: "none",
  strokeWidth: 40,
  startPosition: "top"
};
var index$a = "";
function makePage(number, text, active) {
  return { number, text, active };
}
const [bem$h] = createNamespace("pagination");
const Pagination = (props) => {
  const { locale } = useContext(ConfigProvider$1);
  const count = useMemo(() => {
    const { pageCount, totalItems, itemsPerPage } = props;
    const innerCount = +pageCount || Math.ceil(+totalItems / +itemsPerPage);
    return Math.max(1, innerCount);
  }, [props.pageCount, props.totalItems, props.itemsPerPage]);
  const pages = useMemo(() => {
    const items = [];
    const pageCount = count;
    const showPageSize = +props.showPageSize;
    const { value: value2, forceEllipses } = props;
    if (props.mode !== "multi") {
      return items;
    }
    let startPage = 1;
    let endPage = pageCount;
    const isMaxSized = showPageSize < pageCount;
    if (isMaxSized) {
      startPage = Math.max(value2 - Math.floor(showPageSize / 2), 1);
      endPage = startPage + showPageSize - 1;
      if (endPage > pageCount) {
        endPage = pageCount;
        startPage = endPage - showPageSize + 1;
      }
    }
    for (let number = startPage; number <= endPage; number++) {
      const page = makePage(number, number, number === value2);
      items.push(page);
    }
    if (isMaxSized && showPageSize > 0 && forceEllipses) {
      if (startPage > 1) {
        const prevPages = makePage(startPage - 1, "...");
        items.unshift(prevPages);
      }
      if (endPage < pageCount) {
        const nextPages = makePage(endPage + 1, "...");
        items.push(nextPages);
      }
    }
    return items;
  }, [props.showPageSize, props.forceEllipses, props.value, count]);
  const select = (page, emitChange) => {
    var _a;
    page = Math.min(count, Math.max(1, page));
    if (props.value !== page) {
      if (emitChange) {
        (_a = props.onChange) == null ? void 0 : _a.call(props, page);
      }
    }
  };
  useEffect(() => {
    select(props.value);
  }, [props.value]);
  const renderDesc = () => {
    if (props.mode !== "multi") {
      return /* @__PURE__ */ React.createElement("li", {
        className: clsx(bem$h("page-desc"))
      }, props.pageDesc ? props.pageDesc : `${props.value}/${count}`);
    }
    return null;
  };
  const simple = props.mode !== "multi";
  const onSelect = (value2) => () => select(value2, true);
  const { value } = props;
  return /* @__PURE__ */ React.createElement("ul", {
    className: clsx(bem$h({ simple }))
  }, /* @__PURE__ */ React.createElement("li", {
    className: clsx(
      bem$h("item", { disabled: value === 1 }),
      bem$h("prev"),
      BORDER
    ),
    onClick: onSelect(value - 1)
  }, props.prevText || locale.vanPagination.prev), pages.map((page, index2) => /* @__PURE__ */ React.createElement("li", {
    key: index2,
    className: clsx(
      bem$h("item", { active: page.active }),
      bem$h("page"),
      BORDER
    ),
    onClick: onSelect(page.number)
  }, props.pageRender ? props.pageRender(page) : page.text)), renderDesc(), /* @__PURE__ */ React.createElement("li", {
    className: clsx(
      bem$h("item", { disabled: value === count }),
      bem$h("next"),
      BORDER
    ),
    onClick: onSelect(value + 1)
  }, props.nextText || locale.vanPagination.next));
};
Pagination.defaultProps = {
  mode: "multi",
  pageCount: 0,
  totalItems: 0,
  itemsPerPage: 10,
  showPageSize: 5
};
var index$9 = "";
const TabbarContext = createContext({});
const [bem$g] = createNamespace("tabbar");
const Tabbar$1 = (props) => {
  const [current, setCurrent] = useMergedState({
    value: props.value,
    defaultValue: props.defaultValue
  });
  const root2 = useRef();
  const height = useHeight(root2);
  const renderPlaceholder = (renderContent) => {
    return /* @__PURE__ */ React.createElement("div", {
      className: clsx(bem$g("placeholder")),
      style: { height }
    }, renderContent());
  };
  const enableSafeArea = () => {
    var _a;
    return (_a = props.safeAreaInsetBottom) != null ? _a : props.fixed;
  };
  const setActive = (active) => {
    var _a;
    if (active !== props.value) {
      (_a = props.onChange) == null ? void 0 : _a.call(props, active);
      setCurrent(active);
    }
  };
  const renderTabbar = () => {
    const { fixed, zIndex, border } = props;
    return /* @__PURE__ */ React.createElement(TabbarContext.Provider, {
      value: { parent: { ...props, value: current } }
    }, /* @__PURE__ */ React.createElement("div", {
      ref: root2,
      style: { ...props.style, ...getZIndexStyle(zIndex) },
      className: clsx(props.className, bem$g({ fixed }), {
        [BORDER_TOP_BOTTOM]: border,
        "rv-safe-area-bottom": enableSafeArea()
      })
    }, React.Children.toArray(props.children).filter(Boolean).map(
      (child, index2) => React.cloneElement(child, {
        setActive,
        index: index2
      })
    )));
  };
  if (props.fixed && props.placeholder) {
    return renderPlaceholder(renderTabbar);
  }
  return renderTabbar();
};
Tabbar$1.defaultProps = {
  fixed: true,
  border: true,
  defaultValue: 0
};
const [bem$f] = createNamespace("tabbar-item");
const TabbarItem = (props) => {
  const { setActive, index: index2 } = props;
  const { parent } = useContext(TabbarContext);
  const { activeColor, inactiveColor } = parent;
  const active = useMemo(() => {
    return (props.name || index2) === parent.value;
  }, [props.name, index2, parent.value]);
  const onClick = (event) => {
    var _a, _b;
    setActive((_a = props.name) != null ? _a : index2);
    (_b = props.onClick) == null ? void 0 : _b.call(props, event);
  };
  const renderIcon = () => {
    if (typeof props.icon === "function") {
      return props.icon(active);
    }
    if (props.icon) {
      return props.icon;
    }
    return null;
  };
  const color = active ? activeColor : inactiveColor;
  return /* @__PURE__ */ React.createElement("div", {
    className: clsx(props.className, bem$f({ active })),
    style: { ...props.style, color },
    onClick
  }, /* @__PURE__ */ React.createElement(Badge, {
    ...props.badge,
    className: clsx(bem$f("icon"))
  }, renderIcon()), /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$f("text"))
  }, typeof props.children === "function" ? props.children(active) : props.children));
};
const Tabbar = Object.assign(Tabbar$1, { Item: TabbarItem });
function mapThemeVarsToCSSVars(themeVars, prefix2) {
  const cssVars = {};
  Object.keys(themeVars).forEach((key) => {
    if (key.toString().startsWith(`--${prefix2}-`)) {
      cssVars[key] = themeVars[key];
    } else {
      cssVars[`--${prefix2}-${kebabCase(key)}`] = themeVars[key];
    }
  });
  return cssVars;
}
const ConfigProvider = ({
  className,
  style,
  themeVars,
  tag = "div",
  children,
  ...props
}) => {
  const TagElement = tag;
  const varStyle = useMemo(() => {
    if (themeVars) {
      return { ...style, ...mapThemeVarsToCSSVars(themeVars, "rv") };
    }
    return style;
  }, [style, themeVars]);
  return /* @__PURE__ */ React.createElement(ConfigProvider$1.Provider, {
    value: { ...INITIAL_STATE$1, ...props }
  }, /* @__PURE__ */ React.createElement(TagElement, {
    className,
    style: varStyle
  }, children));
};
ConfigProvider.defaultProps = {
  themeVars: {}
};
var index$8 = "";
const FormSubscribe = (props) => {
  const update = useUpdate();
  const form = useContext(FieldContext);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, props.children(form.getFieldsValue(props.to), form), props.to.map((namePath) => /* @__PURE__ */ React.createElement(Watcher, {
    key: namePath.toString(),
    form,
    namePath,
    onChange: update
  })));
};
const Watcher = memo((props) => {
  const value = useWatch(props.namePath, props.form);
  useIsomorphicUpdateLayoutEffect(() => {
    props.onChange();
  }, [value]);
  return null;
});
const DEFAULT_FORM_CONTEXT = {
  colon: false,
  showValidateMessage: true,
  border: true,
  labelAlign: "left",
  controlAlign: "left"
};
const FormContext = React.createContext(DEFAULT_FORM_CONTEXT);
const [bem$e] = createNamespace("form");
const Form$1 = forwardRef((props, ref) => {
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
    showValidateMessage,
    ...formProps
  } = props;
  return /* @__PURE__ */ React.createElement(RcForm, {
    className: clsx(bem$e(), className),
    style,
    ref,
    ...formProps
  }, /* @__PURE__ */ React.createElement(FormContext.Provider, {
    value: {
      layout,
      colon,
      border,
      showValidateMessage,
      controlAlign,
      labelAlign
    }
  }, children), footer && /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$e("footer"))
  }, footer));
});
Form$1.defaultProps = {
  showValidateMessage: true
};
function shouldConstruct(Component) {
  const prototype = Component.prototype;
  return !!(prototype && prototype.isReactComponent);
}
function isSimpleFunctionComponent(type) {
  return typeof type === "function" && !shouldConstruct(type) && type.defaultProps === void 0;
}
function isSafeSetRefComponent(component) {
  if (!isForwardRef(component))
    return false;
  if (isFragment(component))
    return false;
  if (isMemo(component))
    return isSafeSetRefComponent(component.type);
  return !isSimpleFunctionComponent(component.type);
}
function undefinedFallback(...items) {
  let i;
  for (i = 0; i < items.length; i++) {
    if (items[i] !== void 0)
      break;
  }
  return items[i];
}
const MemoInput = React.memo(
  ({ children, ...props }) => React.cloneElement(
    children,
    props
  ),
  (prev2, next) => prev2.value === next.value && prev2.update === next.update
);
const [bem$d] = createNamespace("form-item");
const FormItemLayout = (props) => {
  var _a, _b, _c, _d, _e, _f;
  const { meta, ...fieldProps } = props;
  const context = React.useContext(FormContext);
  const layout = (_a = props.layout) != null ? _a : context.layout;
  const border = (_b = props.border) != null ? _b : context.border;
  const colon = (_c = props.colon) != null ? _c : context.colon;
  const showValidateMessage = (_d = props.showValidateMessage) != null ? _d : context.showValidateMessage;
  const labelAlign = (_e = props.labelAlign) != null ? _e : context.labelAlign;
  const controlAlign = (_f = props.controlAlign) != null ? _f : context.controlAlign;
  const error = meta && meta.errors.length > 0;
  const errorMessage = showValidateMessage && error ? meta.errors[0] : null;
  const attrs = {
    ...fieldProps,
    className: clsx(bem$d({ vertical: layout === "vertical" }), props.className),
    colon,
    error: showValidateMessage ? false : error,
    errorMessage,
    labelAlign,
    controlAlign,
    border
  };
  return /* @__PURE__ */ React.createElement(FieldNamespace, {
    ...attrs
  }, props.children);
};
const FormItem = (props) => {
  const {
    name,
    noStyle,
    rules,
    trigger = "onChange",
    validateTrigger = trigger,
    shouldUpdate,
    dependencies,
    messageVariables,
    label,
    required,
    disabled,
    children,
    onClick,
    ...rcFieldProps
  } = props;
  const fieldProps = pick(props, [
    "style",
    "className",
    "tooltip",
    "intro",
    "colon",
    "labelWidth",
    "labelAlign",
    "labelClass",
    "showValidateMessage",
    "controlAlign",
    "errorMessageAlign",
    "border",
    "layout",
    "isLink",
    "size",
    "arrowDirection",
    "leftIcon",
    "rightIcon",
    "prefix",
    "suffix"
  ]);
  const { validateTrigger: contextValidateTrigger } = React.useContext(FieldContext);
  const mergedValidateTrigger = undefinedFallback(
    validateTrigger,
    contextValidateTrigger,
    trigger
  );
  const widgetRef = React.useRef(null);
  const updateRef = React.useRef(0);
  updateRef.current += 1;
  function renderLayout(baseChildren, fieldId, meta, isRequired) {
    if (noStyle) {
      return baseChildren;
    }
    return /* @__PURE__ */ React.createElement(FormItemLayout, {
      htmlFor: fieldId,
      meta,
      ...fieldProps,
      required: isRequired,
      label,
      disabled,
      onClick: (e) => onClick == null ? void 0 : onClick(e, widgetRef)
    }, baseChildren);
  }
  const isRenderProps = typeof children === "function";
  if (!name && !isRenderProps && !props.dependencies) {
    return renderLayout(children);
  }
  let variables = {};
  if (typeof label === "string") {
    variables.label = label;
  }
  if (messageVariables) {
    variables = { ...variables, ...messageVariables };
  }
  return /* @__PURE__ */ React.createElement(Field$1, {
    ...rcFieldProps,
    name,
    shouldUpdate,
    dependencies,
    rules,
    trigger,
    validateTrigger: mergedValidateTrigger
  }, (control, meta, context) => {
    let childNode = null;
    const isRequired = required !== void 0 ? required : rules && rules.some(
      (rule) => !!(rule && typeof rule === "object" && rule.required)
    );
    const fieldId = (toArray(name).length && meta ? meta.name : []).join(
      "_"
    );
    if (isRenderProps) {
      if ((shouldUpdate || dependencies) && !name) {
        childNode = children(context);
      }
    } else if (dependencies && !name)
      ;
    else if (React.isValidElement(children)) {
      if (children.props.defaultValue)
        ;
      const childProps = { ...children.props, ...control };
      if (isSafeSetRefComponent(children)) {
        childProps.ref = (instance) => {
          const originRef = children.ref;
          if (originRef) {
            if (typeof originRef === "function") {
              originRef(instance);
            }
            if ("current" in originRef) {
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
      }
      const triggers = /* @__PURE__ */ new Set([
        ...toArray(trigger),
        ...toArray(mergedValidateTrigger)
      ]);
      triggers.forEach((eventName) => {
        childProps[eventName] = (...args) => {
          var _a, _b, _c;
          (_a = control[eventName]) == null ? void 0 : _a.call(control, ...args);
          (_c = (_b = children.props)[eventName]) == null ? void 0 : _c.call(_b, ...args);
        };
      });
      childNode = /* @__PURE__ */ React.createElement(MemoInput, {
        value: control[props.valuePropName || "value"],
        update: updateRef.current
      }, React.cloneElement(children, childProps));
    } else {
      childNode = children;
    }
    return renderLayout(childNode, fieldId, meta, isRequired);
  });
};
const Form = Object.assign(Form$1, { Item: FormItem, useForm, List: List$1, Subscribe: FormSubscribe, useWatch });
const INHERIT_PROPS = [
  "title",
  "visible",
  "popup",
  "value",
  "defaultValue",
  "loading",
  "readOnly",
  "itemHeight",
  "swipeDuration",
  "visibleItemCount",
  "cancelButtonText",
  "confirmButtonText",
  "toolbar",
  "columnsTop",
  "columnsBottom",
  "optionRender",
  "placeholder",
  "onChange",
  "onCancel",
  "onConfirm",
  "children"
];
function parseVanAreaList(data, columnsNum) {
  const { province_list = {}, city_list = {}, county_list = {} } = data;
  const provinces = Object.entries(province_list).map(([value, text]) => ({
    value,
    text
  }));
  const citys = Object.entries(city_list).map(([value, text]) => ({
    value,
    text
  }));
  const countrys = Object.entries(county_list).map(([value, text]) => ({
    value,
    text
  }));
  if (columnsNum > 2) {
    citys.forEach((city) => {
      var _a;
      const value = (_a = city.value) == null ? void 0 : _a.slice(0, 4);
      const children = countrys.filter(
        (country) => {
          var _a2;
          return ((_a2 = country.value) == null ? void 0 : _a2.slice(0, 4)) === value;
        }
      );
      city.children = children;
    });
  }
  if (columnsNum > 1) {
    provinces.forEach((province) => {
      var _a;
      const provinceCode = (_a = province.value) == null ? void 0 : _a.slice(0, 2);
      const children = citys.filter(
        (city) => {
          var _a2;
          return ((_a2 = city.value) == null ? void 0 : _a2.slice(0, 2)) === provinceCode;
        }
      );
      province.children = children;
    });
  }
  return provinces;
}
const [bem$c] = createNamespace("area");
const Area = forwardRef(
  (props, ref) => {
    const columns = useMemo(
      () => {
        var _a;
        return (_a = props.columns) != null ? _a : parseVanAreaList(props.areaList, +props.columnsNum);
      },
      [props.columnsNum, props.areaList, props.columns]
    );
    return /* @__PURE__ */ React.createElement(Picker, {
      ref,
      style: props.style,
      className: clsx(bem$c(), props.className),
      columns,
      ...pick(props, INHERIT_PROPS)
    });
  }
);
Area.defaultProps = {
  areaList: {},
  columnsNum: 3
};
var index$7 = "";
const CardHeader = (props) => {
  const [bem2] = createNamespace("card-header");
  return /* @__PURE__ */ React.createElement("div", {
    className: clsx(props.className, bem2(), { [BORDER_BOTTOM]: props.border }),
    style: props.style,
    onClick: props.onClick
  }, /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem2("content"))
  }, props.children), props.extra && /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem2("extra"))
  }, props.extra));
};
const CardBody = (props) => {
  const [bem2] = createNamespace("card-body");
  return /* @__PURE__ */ React.createElement("div", {
    className: clsx(props.className, bem2()),
    style: props.style,
    onClick: props.onClick
  }, props.children);
};
const CardFooter = (props) => {
  const [bem2] = createNamespace("card-footer");
  return /* @__PURE__ */ React.createElement("div", {
    className: clsx(props.className, bem2({ compact: props.compact }), {
      [BORDER_TOP]: props.border
    }),
    style: props.style,
    onClick: props.onClick
  }, props.children);
};
const CardCover = (props) => {
  const [bem2] = createNamespace("card-cover");
  return /* @__PURE__ */ React.createElement("div", {
    className: clsx(props.className, bem2()),
    style: props.style,
    onClick: props.onClick
  }, props.children);
};
const Card$1 = (props) => {
  const [bem2] = createNamespace("card");
  const { className, style, round, border, children } = props;
  return /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem2({ round, border }), className),
    style,
    onClick: props.onClick
  }, children);
};
Card$1.defaultProps = {};
const Card = Object.assign(Card$1, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
  Cover: CardCover
});
var index$6 = "";
function isStringOrNumber(target) {
  return typeof target === "string" || typeof target === "number";
}
const [bem$b] = createNamespace("product-card");
const ProductCard = (props) => {
  const renderTitle = () => {
    if (props.title) {
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$b("title"), "rv-multi-ellipsis--l2")
      }, props.title);
    }
    return null;
  };
  const renderThumbTag = () => {
    if (props.tag) {
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$b("tag"))
      }, isStringOrNumber(props.tag) ? /* @__PURE__ */ React.createElement(Tag, {
        mark: true,
        type: "danger"
      }, props.tag) : props.tag);
    }
    return null;
  };
  const renderThumbImage = () => {
    if (!props.thumb)
      return null;
    if (typeof props.thumb === "string") {
      return /* @__PURE__ */ React.createElement(ImageNamespace, {
        src: props.thumb,
        fit: "cover",
        width: "100%",
        height: "100%",
        lazyload: props.lazyload
      });
    }
    return props.thumb;
  };
  const renderThumb = () => {
    if (props.thumb) {
      return /* @__PURE__ */ React.createElement("a", {
        href: props.thumbLink,
        className: clsx(bem$b("thumb")),
        onClick: props.onClickThumb
      }, renderThumbImage(), renderThumbTag());
    }
    return null;
  };
  const renderDesc = () => {
    if (props.desc) {
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$b("desc"), "rv-ellipsis")
      }, props.desc);
    }
    return null;
  };
  const renderPriceText = () => {
    if (isStringOrNumber(props.price)) {
      const priceArr = props.price.toString().split(".");
      return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", {
        className: clsx(bem$b("price-currency"))
      }, props.currency), /* @__PURE__ */ React.createElement("span", {
        className: clsx(bem$b("price-integer"))
      }, priceArr[0]), props.decimal && /* @__PURE__ */ React.createElement(React.Fragment, null, ".", /* @__PURE__ */ React.createElement("span", {
        className: clsx(bem$b("price-decimal"))
      }, priceArr[1] || "00")));
    }
    return props.price;
  };
  const renderOriginalPrice = () => {
    return /* @__PURE__ */ React.createElement("div", {
      className: clsx(bem$b("origin-price"))
    }, isStringOrNumber(props.originPrice) ? `${props.currency} ${props.originPrice}` : props.originPrice);
  };
  const showNum = isDef(props.num);
  const showPrice = isDef(props.price);
  const showOriginPrice = isDef(props.originPrice);
  const showBottom = showNum || showPrice || showOriginPrice || props.bottom;
  const Price = showPrice && /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$b("price"))
  }, renderPriceText());
  const OriginPrice = showOriginPrice && renderOriginalPrice();
  const Num = showNum && /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$b("num"))
  }, isStringOrNumber(props.num) ? `x${props.num}` : props.num);
  const Footer = props.footer && /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$b("footer"))
  }, props.footer);
  const Bottom = showBottom && /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$b("bottom"))
  }, props.priceTop, Price, OriginPrice, Num, props.bottom);
  return /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$b(), props.className),
    style: props.style,
    onClick: props.onClick
  }, /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$b("header"))
  }, renderThumb(), /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$b("content", { centered: props.centered }))
  }, /* @__PURE__ */ React.createElement("div", null, renderTitle(), renderDesc(), props.tags), Bottom)), Footer);
};
ProductCard.defaultProps = {
  currency: "\xA5",
  decimal: true
};
var index$5 = "";
const [bem$a] = createNamespace("submit-bar");
const SubmitBar = (props) => {
  const { locale } = useContext(ConfigProvider$1);
  const renderText = () => {
    const { price, label, currency, textAlign, suffixLabel, decimalLength } = props;
    if (typeof +price === "number") {
      const pricePair = (+price / 100).toFixed(+decimalLength).split(".");
      const decimal = decimalLength ? `.${pricePair[1]}` : "";
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$a("text")),
        style: { textAlign }
      }, /* @__PURE__ */ React.createElement("span", null, label || locale.vanSubmitBar.label), /* @__PURE__ */ React.createElement("span", {
        className: clsx(bem$a("price"))
      }, currency, /* @__PURE__ */ React.createElement("span", {
        className: clsx(bem$a("price-integer"))
      }, pricePair[0]), decimal), suffixLabel && /* @__PURE__ */ React.createElement("span", {
        className: clsx(bem$a("suffix-label"))
      }, suffixLabel));
    }
    return null;
  };
  const renderTip = () => {
    const { tip, tipIcon } = props;
    if (tip) {
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$a("tip"))
      }, tipIcon && React.cloneElement(tipIcon, {
        className: clsx(bem$a("tip-icon"))
      }), tip && /* @__PURE__ */ React.createElement("span", {
        className: clsx(bem$a("tip-text"))
      }, tip));
    }
    return null;
  };
  const onClickButton = () => props == null ? void 0 : props.onSubmit();
  const renderButton = () => {
    if (props.button) {
      return props.button;
    }
    return /* @__PURE__ */ React.createElement(Button, {
      round: true,
      type: props.buttonType,
      text: props.buttonText,
      className: clsx(bem$a("button", props.buttonType)),
      color: props.buttonColor,
      loading: props.loading,
      disabled: props.disabled,
      onClick: onClickButton
    });
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: clsx(props.className, bem$a(), {
      "rv-safe-area-bottom": props.safeAreaInsetBottom
    }),
    style: props.style
  }, props.top, renderTip(), /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$a("bar"))
  }, props.children, renderText(), renderButton()));
};
SubmitBar.defaultProps = {
  buttonType: "danger",
  decimalLength: 2,
  currency: "\xA5",
  safeAreaInsetBottom: true
};
var index$4 = "";
function formatValue(coupons, chosenCoupon, currency, locale) {
  const coupon = coupons[+chosenCoupon];
  if (coupon) {
    let value = 0;
    if (isDef(coupon.value)) {
      ({ value } = coupon);
    } else if (isDef(coupon.denominations)) {
      value = coupon.denominations;
    }
    return `-${currency} ${(value / 100).toFixed(2)}`;
  }
  return coupons.length === 0 ? locale.noCoupon : locale.vanCouponCell.count(coupons.length);
}
const [bem$9] = createNamespace("coupon-cell");
const CouponCell = (props) => {
  const { locale } = useContext(ConfigProvider$1);
  const selected = props.coupons[+props.chosenCoupon];
  const value = formatValue(
    props.coupons,
    props.chosenCoupon,
    props.currency,
    locale
  );
  return /* @__PURE__ */ React.createElement(Cell, {
    style: props.style,
    className: clsx(bem$9(), props.className),
    value,
    title: props.title || locale.vanCouponCell.title,
    border: props.border,
    isLink: props.editable,
    valueClass: clsx(bem$9("value", { selected })),
    onClick: props.onClick
  });
};
CouponCell.defaultProps = {
  border: true,
  editable: true,
  coupons: [],
  currency: "\xA5",
  chosenCoupon: -1
};
var index$3 = "";
function getDate(timeStamp) {
  const date = new Date(timeStamp * 1e3);
  return `${date.getFullYear()}.${padZero(date.getMonth() + 1)}.${padZero(
    date.getDate()
  )}`;
}
function formatDiscount(discount) {
  return (discount / 10).toFixed(discount % 10 === 0 ? 0 : 1);
}
function formatAmount(amount) {
  return (amount / 100).toFixed(
    amount % 100 === 0 ? 0 : amount % 10 === 0 ? 1 : 2
  );
}
const [bem$8] = createNamespace("coupon");
const Coupon = (props) => {
  const { locale } = useContext(ConfigProvider$1);
  const validPeriod = useMemo(() => {
    const { startAt, endAt } = props.coupon;
    return `${getDate(startAt)} - ${getDate(endAt)}`;
  }, [props.coupon]);
  const faceAmount = useMemo(() => {
    const { coupon: coupon2, currency } = props;
    if (coupon2.valueDesc) {
      return /* @__PURE__ */ React.createElement(React.Fragment, null, coupon2.valueDesc, " ", /* @__PURE__ */ React.createElement("span", null, coupon2.unitDesc || ""));
    }
    if (coupon2.denominations) {
      const denominations = formatAmount(coupon2.denominations);
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", null, currency), " $", denominations);
    }
    if (coupon2.discount) {
      return locale.vanCoupon.discount(+formatDiscount(coupon2.discount));
    }
    return "";
  }, [props.coupon, props.coupon]);
  const conditionMessage = useMemo(() => {
    const condition = formatAmount(props.coupon.originCondition || 0);
    return condition === "0" ? locale.vanCoupon.unlimited : locale.vanCoupon.condition(+condition);
  }, [props.coupon.originCondition]);
  const { chosen, coupon, disabled } = props;
  const description = disabled && coupon.reason || coupon.description;
  return /* @__PURE__ */ React.createElement("div", {
    className: clsx(props.className, bem$8({ disabled })),
    style: props.style,
    onClick: props.onClick
  }, /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$8("content"))
  }, /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$8("head"))
  }, /* @__PURE__ */ React.createElement("h2", {
    className: clsx(bem$8("amount"))
  }, faceAmount), /* @__PURE__ */ React.createElement("p", {
    className: clsx(bem$8("condition"))
  }, coupon.condition || conditionMessage)), /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$8("body"))
  }, /* @__PURE__ */ React.createElement("p", {
    className: clsx(bem$8("name"))
  }, coupon.name), /* @__PURE__ */ React.createElement("p", {
    className: clsx(bem$8("valid"))
  }, validPeriod), !disabled && /* @__PURE__ */ React.createElement(Checkbox, {
    className: clsx(bem$8("corner")),
    checked: chosen
  }))), description && /* @__PURE__ */ React.createElement("p", {
    className: clsx(bem$8("description"))
  }, description));
};
Coupon.defaultProps = {
  currency: "\xA5"
};
const [bem$7] = createNamespace("coupon-list");
const CouponList = (props) => {
  var _a;
  const { locale } = useContext(ConfigProvider$1);
  const innerEffect = useRef(false);
  const [state, updateState] = useSetState({
    tab: 0,
    code: props.code
  });
  const buttonDisabled = useMemo(
    () => !props.exchangeButtonLoading && (props.exchangeButtonDisabled || !state.code || state.code.length < props.exchangeMinLength),
    [
      props.exchangeButtonLoading,
      props.exchangeButtonDisabled,
      state.code,
      props.exchangeMinLength
    ]
  );
  const innerChange = (code) => {
    updateState({ code });
    innerEffect.current = true;
  };
  const onExchange = () => {
    if (props.onExchange)
      props.onExchange(state.code);
    if (!props.code) {
      innerChange("");
    }
  };
  const renderEmpty = () => /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$7("empty"))
  }, /* @__PURE__ */ React.createElement("img", {
    alt: "empty",
    src: props.emptyImage
  }), /* @__PURE__ */ React.createElement("p", null, locale.noCoupon));
  const renderExchangeBar = () => {
    if (props.showExchangeBar) {
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(bem$7("exchange-bar"))
      }, /* @__PURE__ */ React.createElement(FieldNamespace, {
        value: state.code,
        onChange: innerChange,
        clearable: true,
        border: false,
        className: clsx(bem$7("field")),
        placeholder: props.inputPlaceholder || locale.vanCouponList.placeholder,
        maxLength: 20
      }), /* @__PURE__ */ React.createElement(Button, {
        plain: true,
        type: "primary",
        className: clsx(bem$7("exchange")),
        text: props.exchangeButtonText || locale.vanCouponList.exchange,
        loading: props.exchangeButtonLoading,
        disabled: buttonDisabled,
        onClick: onExchange
      }));
    }
    return null;
  };
  const renderCouponTab = () => {
    const { coupons } = props;
    const count = props.showCount ? ` (${coupons.length})` : "";
    const title = (props.enabledTitle || locale.vanCouponList.enable) + count;
    return /* @__PURE__ */ React.createElement(Tabs.TabPane, {
      title
    }, /* @__PURE__ */ React.createElement("div", {
      className: clsx(
        bem$7("list", {
          "with-bar": props.showExchangeBar,
          "with-bottom": props.showCloseButton
        })
      )
    }, coupons.map((coupon, index2) => /* @__PURE__ */ React.createElement(Coupon, {
      key: coupon.id,
      coupon,
      chosen: index2 === props.chosenCoupon,
      currency: props.currency,
      onClick: () => props.onChange(index2)
    })), !coupons.length && renderEmpty(), props.listFooter));
  };
  const renderDisabledTab = () => {
    const { disabledCoupons } = props;
    const count = props.showCount ? ` (${disabledCoupons.length})` : "";
    const title = (props.disabledTitle || locale.vanCouponList.disabled) + count;
    return /* @__PURE__ */ React.createElement(Tabs.TabPane, {
      title
    }, /* @__PURE__ */ React.createElement("div", {
      className: clsx(
        bem$7("list", {
          "with-bar": props.showExchangeBar,
          "with-bottom": props.showCloseButton
        })
      )
    }, disabledCoupons.map((coupon) => /* @__PURE__ */ React.createElement(Coupon, {
      disabled: true,
      key: coupon.id,
      coupon,
      currency: props.currency
    })), !disabledCoupons.length && renderEmpty(), props.disabledListFooter));
  };
  useEffect(() => {
    if (innerEffect.current) {
      innerEffect.current = true;
      return;
    }
    updateState({ code: props.code });
  }, [props.code]);
  return /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$7(), props.className),
    style: props.style
  }, renderExchangeBar(), /* @__PURE__ */ React.createElement(Tabs, {
    active: state.tab,
    border: false,
    ...props.tabsProps,
    className: clsx(bem$7("tab"), (_a = props.tabsProps) == null ? void 0 : _a.className)
  }, renderCouponTab(), renderDisabledTab()), /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$7("bottom"))
  }, /* @__PURE__ */ React.createElement(Button, {
    "v-show": props.showCloseButton,
    round: true,
    block: true,
    type: "primary",
    className: clsx(bem$7("close")),
    text: props.closeButtonText || locale.vanCouponList.close,
    onClick: () => {
      var _a2;
      return (_a2 = props.onChange) == null ? void 0 : _a2.call(props, -1);
    }
  })));
};
const EMPTY_IMAGE = "https://img.yzcdn.cn/vant/coupon-empty.png";
CouponList.defaultProps = {
  showCount: true,
  showExchangeBar: true,
  showCloseButton: true,
  code: "",
  exchangeMinLength: 1,
  chosenCoupon: -1,
  coupons: [],
  disabledCoupons: [],
  displayedCouponIndex: -1,
  currency: "\xA5",
  emptyImage: EMPTY_IMAGE
};
var index$2 = "";
const LIMIT_TYPE = {
  QUOTA_LIMIT: 0,
  STOCK_LIMIT: 1
};
const UNSELECTED_SKU_VALUE_ID = "";
function getSkuImgValue(sku, selectedSku) {
  let imgValue;
  sku.tree.some((item) => {
    const id = selectedSku[item.k_s];
    if (id && item.v) {
      const matchedSkuIdx = item.v.findIndex((skuValue) => skuValue.id === id);
      const matchedSku = item.v[matchedSkuIdx];
      const img = (matchedSku == null ? void 0 : matchedSku.previewImgUrl) || (matchedSku == null ? void 0 : matchedSku.imgUrl) || (matchedSku == null ? void 0 : matchedSku.img_url);
      if (img) {
        imgValue = {
          ...matchedSku,
          ks: item.k_s,
          imgUrl: img,
          position: matchedSkuIdx
        };
        return true;
      }
    }
    return false;
  });
  return imgValue;
}
const normalizeSkuTree = (skuTree) => {
  const normalizedTree = {};
  skuTree.forEach((treeItem) => {
    normalizedTree[treeItem.k_s] = treeItem.v;
  });
  return normalizedTree;
};
const normalizePropList = (propList) => {
  const normalizedProp = {};
  propList.forEach((item) => {
    const itemObj = {};
    item.v.forEach((it) => {
      itemObj[it.id] = it;
    });
    normalizedProp[item.k_id] = itemObj;
  });
  return normalizedProp;
};
const isAllSelected = (skuTree, selectedSku) => {
  const selected = Object.keys(selectedSku).filter(
    (skuKeyStr) => selectedSku[skuKeyStr] !== UNSELECTED_SKU_VALUE_ID
  );
  return skuTree.length === selected.length;
};
const getSkuComb = (skuList, selectedSku) => {
  const skuComb = skuList.filter(
    (item) => Object.keys(selectedSku).every(
      (skuKeyStr) => String(item[skuKeyStr]) === String(selectedSku[skuKeyStr])
    )
  );
  return skuComb[0];
};
const getSelectedSkuValues = (skuTree, selectedSku) => {
  const normalizedTree = normalizeSkuTree(skuTree);
  return Object.keys(selectedSku).reduce((selectedValues, skuKeyStr) => {
    const skuValues = normalizedTree[skuKeyStr];
    const skuValueId = selectedSku[skuKeyStr];
    if (skuValueId !== UNSELECTED_SKU_VALUE_ID) {
      const skuValue = skuValues.filter((value) => value.id === skuValueId)[0];
      skuValue && selectedValues.push(skuValue);
    }
    return selectedValues;
  }, []);
};
const isSkuChoosable = (skuList, selectedSku, skuToChoose) => {
  const { key, valueId } = skuToChoose;
  const matchedSku = {
    ...selectedSku,
    [key]: valueId
  };
  const skusToCheck = Object.keys(matchedSku).filter(
    (skuKey) => matchedSku[skuKey] !== UNSELECTED_SKU_VALUE_ID
  );
  const filteredSku = skuList.filter(
    (sku) => skusToCheck.every(
      (skuKey) => String(matchedSku[skuKey]) === String(sku[skuKey])
    )
  );
  const stock = filteredSku.reduce((total, sku) => {
    total += sku.stock_num;
    return total;
  }, 0);
  return stock > 0;
};
const getSelectedPropValues = (propList, selectedProp) => {
  const normalizeProp = normalizePropList(propList);
  return Object.keys(selectedProp).reduce((acc, cur) => {
    selectedProp[cur].forEach((it) => {
      acc.push({
        ...normalizeProp[cur][it]
      });
    });
    return acc;
  }, []);
};
const getSelectedProperties = (propList, selectedProp) => {
  const list = [];
  (propList || []).forEach((prop) => {
    if (selectedProp[prop.k_id] && selectedProp[prop.k_id].length > 0) {
      const v = [];
      prop.v.forEach((it) => {
        if (selectedProp[prop.k_id].indexOf(it.id) > -1) {
          v.push({ ...it });
        }
      });
      list.push({
        ...prop,
        v
      });
    }
  });
  return list;
};
const [bem$6] = createNamespace("sku-row");
const SkuRow = (props) => {
  const { skuRow } = props;
  const renderTitle = () => {
    return /* @__PURE__ */ React.createElement("div", {
      className: clsx(bem$6("title"))
    }, skuRow.k, skuRow.is_multiple && /* @__PURE__ */ React.createElement("span", {
      className: clsx(bem$6("title-multiple"))
    }, "\uFF08\u53EF\u591A\u9009\uFF09"));
  };
  const renderContent = () => {
    const { largeImageMode } = skuRow;
    return largeImageMode ? /* @__PURE__ */ React.createElement("div", {
      className: clsx(bem$6("scroller"))
    }, /* @__PURE__ */ React.createElement("div", {
      className: clsx(bem$6("row"))
    }, props.children)) : props.children;
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$6(), BORDER_BOTTOM)
  }, renderTitle(), renderContent());
};
const [bem$5] = createNamespace("sku-row");
const SkuRowItem = (props) => {
  var _a, _b;
  const classPrefix = props.largeImageMode ? "image-item" : "item";
  const imgUrl = useMemo(() => {
    const url = props.skuValue.imgUrl || props.skuValue.img_url;
    return props.largeImageMode ? url || "https://img01.yzcdn.cn/upload_files/2020/06/24/FmKWDg0bN9rMcTp9ne8MXiQWGtLn.png" : url;
  }, [props.skuValue]);
  const choosable = useMemo(() => {
    if (!props.disableSoldoutSku) {
      return true;
    }
    return isSkuChoosable(props.skuList, props.selectedSku, {
      key: props.skuKeyStr,
      valueId: props.skuValue.id
    });
  }, [
    JSON.stringify(props.skuList),
    JSON.stringify(props.selectedSku),
    props.skuKeyStr
  ]);
  const imageRender = () => {
    if (imgUrl) {
      return /* @__PURE__ */ React.createElement(ImageNamespace, {
        fit: "cover",
        src: imgUrl,
        lazyload: props.lazyload,
        className: clsx(bem$5(`${classPrefix}-img`))
      });
    }
    return null;
  };
  const onSelect = () => {
    if (choosable) {
      props.onSkuSelected({ ...props.skuValue, skuKeyStr: props.skuKeyStr });
    }
  };
  const onPreviewImg = (event) => {
    event.stopPropagation();
    const { skuValue, skuKeyStr } = props;
    props.onSkuPreviewImage({
      ...skuValue,
      ks: skuKeyStr,
      imgUrl: skuValue.imgUrl || skuValue.img_url
    });
  };
  const choosed = props.skuValue.id === props.selectedSku[props.skuKeyStr];
  return /* @__PURE__ */ React.createElement("span", {
    className: clsx(
      bem$5(classPrefix, {
        active: choosed,
        disabled: !choosable
      })
    ),
    onClick: onSelect
  }, imageRender(), /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$5(`${classPrefix}-name`))
  }, props.largeImageMode ? /* @__PURE__ */ React.createElement("span", {
    className: clsx("rv-multi-ellipsis--l2")
  }, (_a = props.skuValue) == null ? void 0 : _a.name) : (_b = props.skuValue) == null ? void 0 : _b.name), props.largeImageMode && (props.previewIcon || /* @__PURE__ */ React.createElement(ExpandO, {
    className: clsx(bem$5(`${classPrefix}-img-icon`)),
    onClick: onPreviewImg
  })));
};
const [bem$4] = createNamespace("sku-row");
const SkuRowPropItem = (props) => {
  var _a;
  const choosed = useMemo(() => {
    const { selectedProp, skuKeyStr, skuValue } = props;
    if (selectedProp && selectedProp[skuKeyStr]) {
      return selectedProp[skuKeyStr].indexOf(skuValue.id) > -1;
    }
    return false;
  }, [
    JSON.stringify(props.selectedProp),
    JSON.stringify(props.skuValue),
    props.skuKeyStr
  ]);
  const onSelect = () => {
    props.onSkuPropSelected({
      ...props.skuValue,
      skuKeyStr: props.skuKeyStr,
      multiple: props.multiple
    });
  };
  return /* @__PURE__ */ React.createElement("span", {
    className: clsx(
      bem$4("item", {
        active: choosed
      })
    ),
    onClick: onSelect
  }, /* @__PURE__ */ React.createElement("span", {
    className: clsx(bem$4("item-name"))
  }, (_a = props.skuValue) == null ? void 0 : _a.name));
};
const { QUOTA_LIMIT: QUOTA_LIMIT$1, STOCK_LIMIT } = LIMIT_TYPE;
const [bem$3] = createNamespace("sku");
const SkuStepper = (props) => {
  const [limitType, setLimitType] = useState(STOCK_LIMIT);
  const stepperLimit = useMemo(() => {
    const quotaLimit = +props.quota - +props.quotaUsed;
    let limit;
    let currentLimitType;
    if (+props.quota > 0 && quotaLimit <= props.stock) {
      limit = quotaLimit < 0 ? 0 : quotaLimit;
      currentLimitType = QUOTA_LIMIT$1;
    } else {
      limit = props.stock;
      currentLimitType = STOCK_LIMIT;
    }
    setLimitType(currentLimitType);
    return limit;
  }, [props.quota, props.quotaUsed, props.stock]);
  const stepperMinLimit = useMemo(() => {
    return +props.startSaleNum < 1 ? 1 : +props.startSaleNum;
  }, [props.startSaleNum]);
  const quotaContent = useMemo(() => {
    const { quotaText, hideQuotaText } = props.customStepperConfig;
    if (hideQuotaText)
      return "";
    let text = "";
    if (quotaText) {
      text = quotaText;
    } else {
      const textArr = [];
      if (+props.startSaleNum > 1) {
        textArr.push(`${props.startSaleNum}\u4EF6\u8D77\u552E`);
      }
      if (+props.quota > 0) {
        textArr.push(`\u9650\u8D2D${+props.quota}\u4EF6`);
      }
      text = textArr.join(",");
    }
    return text;
  }, [
    JSON.stringify(props.customStepperConfig),
    props.startSaleNum,
    props.quota
  ]);
  const checkState = (min, max) => {
    if (props.currentNum < min || min > max) {
      props.onChange(min);
    } else if (props.currentNum > max) {
      props.onChange(max);
    }
    props.onSkuStepperState({
      valid: min <= max,
      min,
      max,
      limitType,
      quota: props.quota,
      quotaUsed: props.quotaUsed,
      startSaleNum: props.startSaleNum
    });
  };
  const setCurrentNum = (num) => {
    props.onChange(num);
    checkState(stepperMinLimit, stepperLimit);
  };
  const onChange = (currentValue) => {
    const intValue = parseInt(currentValue, 10);
    const { handleStepperChange } = props.customStepperConfig;
    if (handleStepperChange)
      handleStepperChange(intValue);
    setCurrentNum(currentValue);
  };
  const onOverLimit = (action) => {
    props.onSkuOverLimit({
      action,
      limitType,
      quota: props.quota,
      quotaUsed: props.quotaUsed,
      startSaleNum: props.startSaleNum
    });
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$3("stepper-stock"))
  }, /* @__PURE__ */ React.createElement("div", {
    className: clsx(bem$3("stepper-title"))
  }, props.stepperTitle), /* @__PURE__ */ React.createElement(Stepper, {
    min: stepperMinLimit,
    max: stepperLimit,
    className: clsx(bem$3("stepper")),
    disableInput: props.disableStepperInput,
    value: props.currentNum,
    onChange,
    onOverlimit: onOverLimit
  }), !props.hideQuotaText && quotaContent && /* @__PURE__ */ React.createElement("span", {
    className: clsx(bem$3("stepper-quota"))
  }, quotaContent));
};
SkuStepper.defaultProps = {
  quota: 0,
  quotaUsed: 0,
  startSaleNum: 1,
  customStepperConfig: {}
};
const { QUOTA_LIMIT } = LIMIT_TYPE;
const [bem$2] = createNamespace("sku");
const Sku = forwardRef((props, ref) => {
  var _a, _b;
  const stepperError = useRef(false);
  const [visible, setVisible] = useState(false);
  const [state, updateState] = useSetState({
    selectedSku: {},
    selectedProp: {},
    selectedNum: props.startSaleNum
  });
  const { sku, properties = [] } = props;
  const { tree = [] } = sku;
  const bodyStyle = useMemo(() => {
    const maxHeight = window.innerHeight - props.bodyOffsetTop;
    return {
      maxHeight: `${maxHeight}px`
    };
  }, [props.bodyOffsetTop]);
  const imageList = useMemo(() => {
    const { goods } = props;
    const rs = [goods == null ? void 0 : goods.picture];
    if (sku.tree.length > 0) {
      sku.tree.forEach((treeItem) => {
        if (!treeItem.v)
          return;
        treeItem.v.forEach((vItem) => {
          const img = vItem.previewImgUrl || vItem.imgUrl || vItem.img_url;
          if (img && rs.indexOf(img) === -1) {
            rs.push(img);
          }
        });
      });
    }
    return rs;
  }, [(_a = props.goods) == null ? void 0 : _a.picture, sku.tree]);
  const hasSku = useMemo(() => !sku.none_sku, [sku.none_sku]);
  const hasSkuOrAttr = useMemo(
    () => hasSku || properties.length > 0,
    [hasSku, properties]
  );
  const isSkuCombSelected = useMemo(() => {
    if (hasSku && !isAllSelected(tree, state.selectedSku)) {
      return false;
    }
    return !properties.filter((i) => i.is_necessary !== false).some((i) => (state.selectedProp[i.k_id] || []).length === 0);
  }, [hasSku, state]);
  const selectedSkuValues = useMemo(() => {
    return getSelectedSkuValues(tree, state.selectedSku);
  }, [tree, state.selectedSku]);
  const selectedPropValues = useMemo(() => {
    return getSelectedPropValues(properties, state.selectedProp);
  }, [properties, state.selectedProp]);
  const selectedSkuComb = useMemo(() => {
    let skuComb = null;
    if (isSkuCombSelected) {
      if (hasSku) {
        skuComb = getSkuComb(sku.list, state.selectedSku);
      } else {
        skuComb = {
          id: sku.collection_id,
          price: Math.round(+sku.price * 100),
          stock_num: sku.stock_num
        };
      }
      if (skuComb) {
        skuComb.properties = getSelectedProperties(
          properties,
          state.selectedProp
        );
        skuComb.property_price = selectedPropValues.reduce(
          (acc, cur) => acc + (cur.price || 0),
          0
        );
      }
    }
    return skuComb;
  }, [
    isSkuCombSelected,
    hasSku,
    JSON.stringify(sku),
    JSON.stringify(state),
    properties,
    selectedPropValues
  ]);
  const unselectedSku = useMemo(() => {
    return tree.filter((item) => !state.selectedSku[item.k_s]).map((item) => item.k);
  }, [tree, state.selectedSku]);
  const getUnselectedProp = useCallback(
    (isNecessary) => {
      return properties.filter((item) => isNecessary ? item.is_necessary !== false : true).filter((item) => (state.selectedProp[item.k_id] || []).length < 1).map((item) => item.k);
    },
    [properties, state.selectedProp]
  );
  const selectedText = useMemo(() => {
    if (selectedSkuComb) {
      const values = selectedSkuValues.concat(selectedPropValues);
      return `\u5DF2\u9009 ${values.map((item) => item.name).join(" ")}`;
    }
    return `\u8BF7\u9009\u62E9 ${unselectedSku.concat(getUnselectedProp()).join(" ")}`;
  }, [
    unselectedSku,
    getUnselectedProp,
    selectedSkuComb,
    selectedSkuValues,
    selectedPropValues
  ]);
  const price = useMemo(() => {
    if (selectedSkuComb) {
      return ((selectedSkuComb.price + selectedSkuComb.property_price) / 100).toFixed(2);
    }
    return sku.price;
  }, [JSON.stringify(selectedSkuComb), sku.price]);
  const stock = useMemo(() => {
    const { stockNum } = props.customStepperConfig;
    if (stockNum !== void 0) {
      return stockNum;
    }
    if (selectedSkuComb) {
      return selectedSkuComb.stock_num;
    }
    return sku.stock_num;
  }, [sku.stock_num, JSON.stringify(selectedSkuComb)]);
  const stockContent = useMemo(() => {
    if (props.stockRender) {
      return props.stockRender(stock);
    }
    return /* @__PURE__ */ React.createElement(React.Fragment, null, "\u5269\u4F59", /* @__PURE__ */ React.createElement("span", {
      className: clsx(
        bem$2("stock-num", {
          highlight: stock < props.stockThreshold
        })
      )
    }, stock), "\u4EF6");
  }, [stock]);
  const onSelect = (skuValue) => {
    const selectedSku = state.selectedSku[skuValue.skuKeyStr] === skuValue.id ? {
      ...state.selectedSku,
      [skuValue.skuKeyStr]: UNSELECTED_SKU_VALUE_ID
    } : { ...state.selectedSku, [skuValue.skuKeyStr]: skuValue.id };
    updateState({ selectedSku });
    if (props.onSkuSelected) {
      props.onSkuSelected({
        skuValue,
        selectedSku: state.selectedSku,
        selectedSkuComb
      });
    }
  };
  const onPropSelect = (propValue) => {
    const arr = state.selectedProp[propValue.skuKeyStr] || [];
    const pos = arr.indexOf(propValue.id);
    if (pos > -1) {
      arr.splice(pos, 1);
    } else if (propValue.multiple) {
      arr.push(propValue.id);
    } else {
      arr.splice(0, 1, propValue.id);
    }
    const selectedProp = {
      ...state.selectedProp,
      [propValue.skuKeyStr]: arr
    };
    updateState({ selectedProp });
    if (props.onSkuPropSelected) {
      props.onSkuPropSelected({
        propValue,
        selectedProp: state.selectedProp,
        selectedSkuComb
      });
    }
  };
  const onOverLimit = (data) => {
    const { action, limitType, quota, quotaUsed } = data;
    const { handleOverLimit } = props.customStepperConfig;
    if (handleOverLimit) {
      handleOverLimit(data);
      return;
    }
    if (action === "minus") {
      if (props.startSaleNum > 1) {
        Toast(`${props.startSaleNum}\u4EF6\u8D77\u552E`);
      } else {
        Toast("\u81F3\u5C11\u9009\u62E9\u4E00\u4EF6");
      }
    } else if (action === "plus") {
      if (limitType === QUOTA_LIMIT) {
        if (quotaUsed > 0) {
          Toast(`\u6BCF\u4EBA\u9650\u8D2D${quota}\u4EF6\uFF0C\u4F60\u5DF2\u8D2D\u4E70${quotaUsed}\u4EF6`);
        } else {
          Toast(`\u6BCF\u4EBA\u9650\u8D2D${quota}\u4EF6`);
        }
      } else {
        Toast("\u5E93\u5B58\u4E0D\u8DB3");
      }
    }
  };
  const onStepperState = (data) => {
    stepperError.current = data.valid ? null : {
      ...data,
      action: "plus"
    };
  };
  const validateSku = () => {
    if (state.selectedNum === 0) {
      return "\u5546\u54C1\u5DF2\u7ECF\u65E0\u6CD5\u8D2D\u4E70\u5566";
    }
    if (isSkuCombSelected) {
      return "";
    }
    return `\u8BF7\u9009\u62E9 ${unselectedSku.concat(getUnselectedProp(true)).join(" ")}`;
  };
  const getSkuData = () => {
    return {
      goodsId: props.goodsId,
      selectedNum: state.selectedNum,
      selectedSkuComb
    };
  };
  const onAddCart = (data) => {
    var _a2;
    (_a2 = props.onAddCart) == null ? void 0 : _a2.call(props, data);
  };
  const onBuyClicked = (data) => {
    var _a2;
    (_a2 = props.onBuyClicked) == null ? void 0 : _a2.call(props, data);
  };
  const onBuyOrAddCart = async (type) => {
    if (stepperError.current) {
      onOverLimit(stepperError.current);
      return;
    }
    if (props.customSkuValidator) {
      if (!await props.customSkuValidator(type, {
        ...state.selectedSku,
        ...state.selectedProp
      })) {
        return;
      }
    } else {
      const error = validateSku();
      if (error) {
        Toast(error);
        return;
      }
    }
    const data = getSkuData();
    if (type === "add-cart") {
      onAddCart(data);
    } else {
      onBuyClicked(data);
    }
  };
  const show2 = (initialValue) => {
    setVisible(true);
    if (initialValue) {
      updateState(initialValue);
    }
  };
  const reset = () => {
    updateState({
      selectedSku: {},
      selectedProp: {},
      selectedNum: props.startSaleNum
    });
  };
  const onPopupClose = () => {
    setVisible(false);
    if (props.popupProps && props.popupProps.onClose)
      props.popupProps.onClose();
  };
  const onPopupClosed = () => {
    if (props.resetOnHide) {
      reset();
    }
    if (props.popupProps && props.popupProps.onClosed)
      props.popupProps.onClosed();
  };
  const onPreviewImage = (selectedValue) => {
    let index2 = 0;
    let indexImage = imageList[0];
    if (selectedValue && selectedValue.imgUrl) {
      imageList.some((image, pos) => {
        if (image === selectedValue.imgUrl) {
          index2 = pos;
          return true;
        }
        return false;
      });
      indexImage = selectedValue.imgUrl;
    }
    const params = {
      ...selectedValue,
      index: index2,
      imageList,
      indexImage
    };
    if (!props.previewOnClickImage)
      return;
    ImagePreview.open({
      images: imageList,
      startPosition: index2,
      onClose: () => {
        if (props.onClosePreview)
          props.onClosePreview(params);
      }
    });
    if (props.onOpenPreview) {
      props.onOpenPreview(params);
    }
  };
  const renderHeaderInfo = () => {
    var _a2;
    return /* @__PURE__ */ React.createElement(React.Fragment, null, ((_a2 = props.skuHeaderPriceRender) == null ? void 0 : _a2.call(props, price)) || /* @__PURE__ */ React.createElement("div", {
      className: clsx(bem$2("goods-price"))
    }, /* @__PURE__ */ React.createElement("span", {
      className: clsx(bem$2("price-symbol"))
    }, "\uFFE5"), /* @__PURE__ */ React.createElement("span", {
      className: clsx(bem$2("price-num"))
    }, price), props.priceTag && /* @__PURE__ */ React.createElement("span", {
      className: clsx(bem$2("price-tag"))
    }, props.priceTag)), props.skuHeaderOriginPrice && /* @__PURE__ */ React.createElement("div", {
      className: clsx(bem$2("header-item"))
    }, props.skuHeaderOriginPrice), !props.hideStock && /* @__PURE__ */ React.createElement("div", {
      className: clsx(bem$2("header-item"))
    }, /* @__PURE__ */ React.createElement("span", {
      className: clsx(bem$2("stock"))
    }, stockContent)), !props.hideSelectedText && /* @__PURE__ */ React.createElement("div", {
      className: clsx(bem$2("header-item"))
    }, selectedText));
  };
  const renderHeader = () => {
    if (props.skuHeader)
      return props.skuHeader;
    const selectedValue = getSkuImgValue(sku, state.selectedSku);
    const imgUrl = selectedValue ? selectedValue.imgUrl : props.goods.picture;
    return /* @__PURE__ */ React.createElement("div", {
      className: clsx(bem$2("header"), BORDER_BOTTOM)
    }, props.showHeaderImage && /* @__PURE__ */ React.createElement(ImageNamespace, {
      fit: "cover",
      src: imgUrl,
      className: clsx(bem$2("header__img-wrap")),
      onClick: () => onPreviewImage(selectedValue)
    }, props.skuHeaderImageExtra), /* @__PURE__ */ React.createElement("div", {
      className: clsx(bem$2("header__goods-info"))
    }, renderHeaderInfo(), props.skuHeaderExtra));
  };
  const renderGroup = () => {
    return props.skuGroup || hasSkuOrAttr && /* @__PURE__ */ React.createElement("div", {
      className: clsx(
        bem$2("group-container", {
          "hide-soldout": !props.showSoldoutSku
        })
      )
    }, tree.map((skuTreeItem, i) => /* @__PURE__ */ React.createElement(SkuRow, {
      key: i,
      skuRow: skuTreeItem
    }, skuTreeItem.v.map((skuValue, idx) => /* @__PURE__ */ React.createElement(SkuRowItem, {
      key: idx,
      skuList: sku.list,
      skuValue,
      skuKeyStr: `${skuTreeItem.k_s}`,
      selectedSku: state.selectedSku,
      disableSoldoutSku: props.disableSoldoutSku,
      largeImageMode: skuTreeItem.largeImageMode,
      previewIcon: props.previewIcon,
      onSkuSelected: onSelect,
      onSkuPreviewImage: (selectedValue) => onPreviewImage(selectedValue)
    })))), properties.map((skuTreeItem, i) => /* @__PURE__ */ React.createElement(SkuRow, {
      key: i,
      skuRow: skuTreeItem
    }, skuTreeItem.v.map((skuValue, idx) => /* @__PURE__ */ React.createElement(SkuRowPropItem, {
      key: idx,
      skuValue,
      skuKeyStr: `${skuTreeItem.k_id}`,
      selectedProp: state.selectedProp,
      multiple: skuTreeItem.is_multiple,
      onSkuPropSelected: onPropSelect
    })))));
  };
  const renderStepper = () => props.skuStepper || /* @__PURE__ */ React.createElement(SkuStepper, {
    currentNum: state.selectedNum,
    onChange: (currentValue) => {
      updateState({ selectedNum: parseInt(`${currentValue}`, 10) });
      if (props.onStepperChange)
        props.onStepperChange(currentValue);
    },
    stock,
    quota: props.quota,
    quotaUsed: props.quotaUsed,
    startSaleNum: props.startSaleNum,
    disableStepperInput: props.disableStepperInput,
    customStepperConfig: props.customStepperConfig,
    stepperTitle: props.stepperTitle,
    hideQuotaText: props.hideQuotaText,
    onSkuStepperState: onStepperState,
    onSkuOverLimit: onOverLimit
  });
  const renderBody = () => {
    return /* @__PURE__ */ React.createElement("div", {
      className: clsx(bem$2("body")),
      style: bodyStyle
    }, props.skuBodyTop, renderGroup(), props.skuGroupExtra, renderStepper());
  };
  const renderActions = () => {
    return props.skuActions || /* @__PURE__ */ React.createElement("div", {
      className: clsx(bem$2("actions"))
    }, /* @__PURE__ */ React.createElement(ActionBar, null, props.showAddCartBtn && /* @__PURE__ */ React.createElement(ActionBar.Button, {
      type: "warning",
      text: props.addCartText || "\u52A0\u5165\u8D2D\u7269\u8F66",
      onClick: () => onBuyOrAddCart("add-cart")
    }), /* @__PURE__ */ React.createElement(ActionBar.Button, {
      type: "danger",
      text: props.buyText || "\u7ACB\u5373\u8D2D\u4E70",
      onClick: () => onBuyOrAddCart("buy-clicked")
    })));
  };
  useEffect(() => {
    if (props.initialSku) {
      updateState(props.initialSku);
    }
  }, [JSON.stringify(props.initialSku)]);
  useImperativeHandle(ref, () => ({
    reset,
    getSkuData,
    show: show2,
    update: updateState
  }));
  return /* @__PURE__ */ React.createElement(Popup, {
    round: true,
    closeable: true,
    position: "bottom",
    ...props.popupProps,
    visible,
    onClose: onPopupClose,
    onClosed: onPopupClosed,
    className: clsx((_b = props.popupProps) == null ? void 0 : _b.className, bem$2("container"))
  }, renderHeader(), renderBody(), props.skuActionsTop, renderActions(), props.skuActionsBottom);
});
Sku.defaultProps = {
  stepperTitle: "\u8D2D\u4E70\u6570\u91CF",
  properties: [],
  showAddCartBtn: true,
  disableSoldoutSku: true,
  showHeaderImage: true,
  previewOnClickImage: true,
  showSoldoutSku: true,
  resetOnHide: true,
  safeAreaInsetBottom: true,
  quota: 0,
  quotaUsed: 0,
  startSaleNum: 1,
  stockThreshold: 50,
  bodyOffsetTop: 200,
  customStepperConfig: {}
};
var index$1 = "";
const FloatingBallItem$1 = createContext({});
var FloatingBallItem = (props) => {
  const parent = React.useContext(FloatingBallItem$1);
  const handleItemClick = () => {
    parent == null ? void 0 : parent.close();
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: clsx("rv-floating-ball__menu__item"),
    onClick: handleItemClick
  }, props.children);
};
function getDirection(x, y) {
  if (x > y) {
    return "horizontal";
  }
  if (y > x) {
    return "vertical";
  }
  return "";
}
const INITIAL_STATE = {
  startX: 0,
  startY: 0,
  deltaX: 0,
  deltaY: 0,
  offsetX: 0,
  offsetY: 0,
  _pointX: 0,
  _pointY: 0,
  ready: false,
  direction: ""
};
const useFloatingTouch = (props) => {
  const { boundary = true } = props;
  const [state, update] = useSetState(INITIAL_STATE);
  useIsomorphicLayoutEffect(() => {
    if (!props.target)
      return;
    const rect = props.target.getBoundingClientRect();
    const { width, height } = rect;
    const offset = Object.entries(props.offset).reduce((a, [k, v]) => {
      let px = unitToPx(v);
      let axis = "deltaY";
      if (k === "left")
        px = window.innerWidth - px - width;
      if (k === "top")
        px = window.innerHeight - px - height;
      if (k === "left" || k === "right")
        axis = "deltaX";
      a[axis] = -px;
      return a;
    }, {});
    update({ ...offset });
    raf(() => {
      update({ ready: true });
    });
  }, [props.target]);
  const getBound = useCallback(() => {
    if (!props.target)
      return {};
    return props.target.getBoundingClientRect();
  }, [props.target]);
  const isVertical = useCallback(
    () => state.direction === "vertical",
    [state.direction]
  );
  const isHorizontal = useCallback(
    () => state.direction === "horizontal",
    [state.direction]
  );
  const reset = () => {
    update(INITIAL_STATE);
  };
  const start = (event) => {
    const rect = getBound();
    update(
      (v) => ({
        startX: event.touches[0].clientX - v.deltaX,
        startY: event.touches[0].clientY - v.deltaY,
        _pointX: event.touches[0].clientX - rect.left,
        _pointY: event.touches[0].clientY - rect.top
      })
    );
  };
  const move = (event) => {
    const touch = event.touches[0];
    const rect = getBound();
    update((value) => {
      const newState = { ...value };
      newState.deltaX = touch.clientX - newState.startX;
      if (boundary && touch.clientX - newState._pointX <= 0)
        newState.deltaX = -window.innerWidth + rect.width;
      if (boundary && touch.clientX - newState._pointX >= window.innerWidth - rect.width)
        newState.deltaX = 0;
      newState.deltaY = touch.clientY - newState.startY;
      if (boundary && touch.clientY - newState._pointY <= 0)
        newState.deltaY = -window.innerHeight + rect.height;
      if (boundary && touch.clientY - newState._pointY >= window.innerHeight - rect.height)
        newState.deltaY = 0;
      newState.offsetX = Math.abs(newState.deltaX);
      newState.offsetY = Math.abs(newState.deltaY);
      const LOCK_DIRECTION_DISTANCE = 10;
      if (!newState.direction || newState.offsetX < LOCK_DIRECTION_DISTANCE && newState.offsetY < LOCK_DIRECTION_DISTANCE) {
        newState.direction = getDirection(newState.offsetX, newState.offsetY);
      }
      return newState;
    });
  };
  return {
    ...state,
    update,
    move,
    start,
    reset,
    isVertical,
    isHorizontal
  };
};
const TOUCH_DURATION = 0;
const TRANSITION_DURATION = 300;
const DEFAULT_ADSORB = { indent: 0.5, distance: 0 };
const [bem$1] = createNamespace("floating-ball");
const FloatingBall = forwardRef(
  (props, ref) => {
    var _a, _b, _c, _d;
    const timer = React.useRef(null);
    const [position, setPosition] = useState("bottom right");
    const [container, setContainer] = React.useState();
    const touch = useFloatingTouch({
      target: container,
      offset: props.offset
    });
    const [active, updateActive] = useMergedState({
      value: (_a = props.menu) == null ? void 0 : _a.active,
      defaultValue: (_b = props.menu) == null ? void 0 : _b.defaultActive
    });
    const [state, updateState] = useSetState({
      indenting: false,
      duration: TOUCH_DURATION
    });
    const isIndenting = state.indenting;
    const isDraggable = (event) => props.draggable && event.touches.length === 1 && container && !props.disabled;
    const adsorb = React.useMemo(() => {
      if (typeof props.adsorb === "boolean") {
        if (!props.adsorb)
          return false;
        return DEFAULT_ADSORB;
      }
      return { ...DEFAULT_ADSORB, ...props.adsorb };
    }, [props.adsorb]);
    const validMenus = React.useMemo(
      () => {
        var _a2, _b2;
        return (props == null ? void 0 : props.menu.items) && Array.isArray((_a2 = props.menu) == null ? void 0 : _a2.items) ? (_b2 = props.menu) == null ? void 0 : _b2.items.filter(Boolean).filter((_, i) => i < 5) : [];
      },
      [(_c = props.menu) == null ? void 0 : _c.items]
    );
    const renderMenus = React.useCallback(() => {
      var _a2, _b2;
      if (!validMenus.length)
        return null;
      const [position1, position2] = position.split(" ");
      return /* @__PURE__ */ React.createElement("div", {
        className: clsx(
          bem$1("menu", {
            [(_a2 = props.menu) == null ? void 0 : _a2.direction]: !!((_b2 = props.menu) == null ? void 0 : _b2.direction),
            [position1]: !!position1,
            [position2]: !!position2
          }),
          `list-${Math.max(validMenus.length, 5)}`
        )
      }, validMenus.map((cld, i) => /* @__PURE__ */ React.createElement(FloatingBallItem, {
        key: i
      }, cld)));
    }, [position, (_d = props.menu) == null ? void 0 : _d.direction, validMenus]);
    const checkMenuPosition = () => {
      if (container) {
        const {
          rect: { left, top, width, height }
        } = getSideWithRect();
        const windowW = window.innerWidth;
        const windowH = window.innerHeight;
        if (left + width / 2 < windowW / 2) {
          position.indexOf("right") >= 0 && setPosition((state2) => state2.replace("right", "left"));
        } else if (position.indexOf("left") >= 0) {
          setPosition((state2) => state2.replace("left", "right"));
        }
        if (top + height / 2 < windowH / 2) {
          position.indexOf("bottom") >= 0 && setPosition((state2) => state2.replace("bottom", "top"));
        } else if (position.indexOf("top") >= 0) {
          setPosition((state2) => state2.replace("top", "bottom"));
        }
      }
    };
    const innerChange = (value) => {
      var _a2, _b2;
      updateActive(value);
      (_b2 = (_a2 = props.menu) == null ? void 0 : _a2.onChange) == null ? void 0 : _b2.call(_a2, value);
    };
    const handleBaseClick = () => {
      if (props.disabled || !validMenus.length)
        return;
      innerChange(!active);
    };
    const getSideWithRect = () => {
      const rect = container.getBoundingClientRect();
      const side = rect.left + rect.width / 2 > window.innerWidth / 2 ? "right" : "left";
      return { rect, side };
    };
    const checkPosition = () => {
      const { side, rect } = getSideWithRect();
      if (adsorb) {
        const { distance } = adsorb;
        const isRightSide = side === "right";
        const x = isRightSide ? -distance : -(window.innerWidth - rect.width) + +distance;
        updateState({ duration: TRANSITION_DURATION });
        touch.update({ deltaX: x });
      }
    };
    const onTouchStart = (event) => {
      if (!isDraggable(event) || isIndenting)
        return;
      updateState({ duration: TOUCH_DURATION });
      touch.start(event);
    };
    const onTouchMove = (event) => {
      if (!isDraggable(event) || isIndenting)
        return;
      touch.move(event);
      if (typeof event.cancelable !== "boolean" || event.cancelable) {
        event.preventDefault();
      }
      if (active)
        innerChange(false);
    };
    const onTouchEnd = () => {
      if (isIndenting)
        return;
      checkPosition();
      checkMenuPosition();
    };
    useIsomorphicLayoutEffect(() => {
      if (!active || !touch.ready)
        return;
      checkMenuPosition();
    }, [touch.ready]);
    useEventListener("touchmove", onTouchMove, {
      target: container,
      depends: [
        container,
        touch.deltaX,
        touch.deltaY,
        props.disabled,
        props.draggable
      ]
    });
    useClickAway(container, () => {
      innerChange(false);
    });
    useImperativeHandle(ref, () => ({
      open: () => {
        if (!validMenus.length)
          return;
        raf(() => innerChange(true));
      },
      close: () => {
        if (!validMenus.length)
          return;
        raf(() => innerChange(false));
      }
    }));
    useIsomorphicLayoutEffect(() => {
      if (props.disabled || !adsorb || !touch.ready)
        return;
      const onScroll = () => {
        const { side, rect } = getSideWithRect();
        const { indent, distance } = adsorb;
        const isRightSide = side === "right";
        const indentPx = rect.width * (isRightSide ? +indent : 1 - +indent);
        const offsetX = isRightSide ? +indentPx : -(window.innerWidth - indentPx);
        updateState({
          indenting: true,
          duration: TRANSITION_DURATION
        });
        innerChange(false);
        touch.update({ deltaX: offsetX });
        if (timer.current)
          clearTimeout(timer.current);
        timer.current = setTimeout(() => {
          const x = isRightSide ? -distance : -(window.innerWidth - rect.width) + +distance;
          updateState({ indenting: false });
          touch.update({ deltaX: x });
        }, 600);
      };
      const handle = throttle(() => raf(onScroll), 300);
      window.addEventListener("scroll", handle);
      return () => window.removeEventListener("scroll", handle);
    }, [touch.ready, container, adsorb, props.disabled]);
    const indentClassName = React.useMemo(() => {
      if (!adsorb)
        return "";
      if (state.indenting)
        return adsorb.indentClassName;
      return "";
    }, [adsorb, state.indenting]);
    const trackStyle = React.useMemo(
      () => ({
        ...props.style,
        transitionDuration: `${state.duration}ms`,
        transform: `translate3d(${touch.deltaX}px,${touch.deltaY}px, 0)`
      }),
      [props.style, state.duration, touch.deltaX, touch.deltaY]
    );
    return /* @__PURE__ */ React.createElement(FloatingBallItem$1.Provider, {
      value: {
        close: () => {
          var _a2, _b2;
          const closeable = (_b2 = (_a2 = props.menu) == null ? void 0 : _a2.itemClickClose) != null ? _b2 : true;
          if (closeable)
            innerChange(false);
        }
      }
    }, /* @__PURE__ */ React.createElement("div", {
      className: clsx(props.className, indentClassName, bem$1({ active })),
      style: trackStyle,
      ref: setContainer,
      onTouchStart,
      onTouchEnd,
      onTouchCancel: onTouchEnd
    }, renderMenus(), /* @__PURE__ */ React.createElement("div", {
      className: clsx(
        bem$1("base", {
          [props.disabledClassName]: props.disabled
        })
      ),
      onClick: handleBaseClick
    }, typeof props.children === "function" ? props.children({ active, indenting: state.indenting }) : props.children)));
  }
);
FloatingBall.defaultProps = {
  adsorb: DEFAULT_ADSORB,
  draggable: true,
  menu: {},
  offset: {
    right: 0,
    bottom: "30vh"
  }
};
var index = "";
const DEFAULT_FONT = {
  style: "normal",
  weight: "normal",
  color: "rgba(0,0,0,.15)",
  size: 14,
  family: "sans-serif"
};
const [bem] = createNamespace("water-mark");
const WaterMark = (props) => {
  const { zIndex, gapX, gapY, width, height, rotate, image, content, font } = props;
  const [base64Url, setBase64Url] = React.useState("");
  React.useEffect(() => {
    const canvas = document.createElement("canvas");
    const ratio = window.devicePixelRatio;
    const ctx = canvas.getContext("2d");
    const canvasWidth = `${(gapX + width) * ratio}px`;
    const canvasHeight = `${(gapY + height) * ratio}px`;
    const markWidth = width * ratio;
    const markHeight = height * ratio;
    canvas.setAttribute("width", canvasWidth);
    canvas.setAttribute("height", canvasHeight);
    if (ctx) {
      if (image) {
        const { width: width2, height: height2, src } = image;
        ctx.translate(markWidth / 2, markHeight / 2);
        ctx.rotate(Math.PI / 180 * Number(rotate));
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.referrerPolicy = "no-referrer";
        img.src = src;
        img.onload = () => {
          ctx.drawImage(
            img,
            -width2 * ratio / 2,
            -height2 * ratio / 2,
            width2 * ratio,
            height2 * ratio
          );
          ctx.restore();
          setBase64Url(canvas.toDataURL());
        };
      } else if (content) {
        const frontProps = { ...font, ...DEFAULT_FONT };
        const { size, family, style, weight, color } = frontProps;
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.translate(markWidth / 2, markHeight / 2);
        ctx.rotate(Math.PI / 180 * Number(rotate));
        const markSize = Number(size) * ratio;
        ctx.font = `${style} normal ${weight} ${markSize}px/${markHeight}px ${family}`;
        ctx.fillStyle = color;
        ctx.fillText(content, 0, 0);
        ctx.restore();
        setBase64Url(canvas.toDataURL());
      }
    } else {
      throw new Error("\u5F53\u524D\u73AF\u5883\u4E0D\u652F\u6301Canvas");
    }
  }, [gapX, gapY, rotate, width, height, image, content, font]);
  return /* @__PURE__ */ React.createElement("div", {
    className: clsx(
      bem({
        full: props.fullPage
      })
    ),
    style: {
      zIndex,
      backgroundSize: `${gapX + width}px`,
      backgroundImage: `url('${base64Url}')`
    }
  });
};
WaterMark.defaultProps = {
  zIndex: 2e3,
  gapX: 24,
  gapY: 48,
  width: 100,
  height: 64,
  rotate: -22,
  font: DEFAULT_FONT,
  fullPage: true
};
export { ActionBar, ActionSheet, Area, Badge, Button, Calendar, Card, CascaderPopup as Cascader, Cell, CellGroup, Checkbox, CheckBoxGroup as CheckboxGroup, Circle, Collapse, CollapseItem, ConfigProvider, CountDown, CouponCell, CouponList, DateTimePicker as DatetimePicker, Dialog, Divider, DropdownMenu, Empty, FieldNamespace as Field, Flex, FloatingBall, Form, GridNamespace as Grid, GridItem, ImageNamespace as Image, ImagePreview, IndexAnchor, IndexBar, Input, Lazyload, List, Loading, NavBar, NoticeBar, exportNotifyNamespace as Notify, NumberKeyboard, Overlay, Pagination, PasswordInput, Picker, Popover, Popup, ProductCard, Progress, PullRefresh, Radio, RadioGroup, Rate, Search, Selector, ShareSheet, Sidebar, SidebarItem, Skeleton, Sku, Slider, Space, Stepper, Steps, StepsItem, Sticky, SubmitBar, SwipeCell, Swiper, Swtich as Switch, Tabbar, TabbarItem, Tabs, Tag, Toast, TypographyNamespace as Typography, Uploader, WaterMark, index$14 as hooks };
