import * as React from 'react';
import IconBase from './IconBase';
const SvgIcon = (props) => (React.createElement("svg", Object.assign({ width: "1em", height: "1em", viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg", fill: "currentColor" }, props),
    React.createElement("path", { d: "M159.722 222.222h680.556c26.847 0 48.61 21.764 48.61 48.611 0 26.848-21.763 48.611-48.61 48.611H159.722c-26.847 0-48.61-21.763-48.61-48.61 0-26.848 21.763-48.612 48.61-48.612zm0 243.056h680.556c26.847 0 48.61 21.764 48.61 48.61 0 26.848-21.763 48.612-48.61 48.612H159.722c-26.847 0-48.61-21.764-48.61-48.611 0-26.847 21.763-48.611 48.61-48.611zm0 243.055h680.556c26.847 0 48.61 21.764 48.61 48.611 0 26.848-21.763 48.612-48.61 48.612H159.722c-26.847 0-48.61-21.764-48.61-48.612 0-26.847 21.763-48.61 48.61-48.61z", fillRule: "evenodd" })));
const SvgWapNav = React.forwardRef((props, ref) => {
    return (React.createElement(IconBase, Object.assign({ name: "SvgWapNav" }, props, { ref: ref }),
        React.createElement(SvgIcon, null)));
});
export default SvgWapNav;
