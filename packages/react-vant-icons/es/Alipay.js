import * as React from 'react';
import IconBase from './IconBase';
const SvgIcon = (props) => (React.createElement("svg", Object.assign({ width: "1em", height: "1em", viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg", fill: "currentColor" }, props),
    React.createElement("path", { d: "M764.447 111.111c68.444 0 124.442 56.114 124.442 124.695v403.696S864 636.383 752.003 598.977c-31.114-10.911-73.112-26.5-119.778-43.644 28-48.316 49.774-104.43 65.33-163.659h-154v-54.556H731.78v-31.173H543.556v-91.961h-76.223c-13.438 0-13.975 12.926-13.997 13.96v79.56H263.557v31.174h189.777v52.994H296.222v31.172h304.89c-10.89 38.969-26.443 74.816-43.554 107.549-98.001-32.733-203.782-59.226-270.67-42.082-42.001 10.908-70.002 29.613-85.556 48.318-73.11 88.843-20.222 224.448 133.779 224.448 91.777 0 180.443-51.435 248.887-135.605 100.615 48.88 296.842 130.696 304.65 133.949l.24.1v4.675c0 68.58-55.998 124.693-124.44 124.693H235.555c-68.445 0-124.445-56.113-124.445-124.693v-528.39c0-68.58 56-124.695 124.445-124.695zm-463.56 422.4c71.56-7.792 138.446 20.264 217.781 59.232-57.555 71.696-127.555 116.9-197.556 116.9-121.335 0-157.113-95.076-96.445-148.076 20.22-17.145 56.001-26.494 76.22-28.055z", fillRule: "evenodd" })));
const SvgAlipay = React.forwardRef((props, ref) => {
    return (React.createElement(IconBase, Object.assign({ name: "SvgAlipay" }, props, { ref: ref }),
        React.createElement(SvgIcon, null)));
});
export default SvgAlipay;
