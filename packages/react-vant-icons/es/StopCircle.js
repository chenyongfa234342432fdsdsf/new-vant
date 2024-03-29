import * as React from 'react';
import IconBase from './IconBase';
const SvgIcon = (props) => (React.createElement("svg", Object.assign({ width: "1em", height: "1em", viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg", fill: "currentColor" }, props),
    React.createElement("path", { d: "M500 944.444C254.54 944.444 55.556 745.46 55.556 500S254.54 55.556 500 55.556 944.444 254.54 944.444 500 745.46 944.444 500 944.444zm-110.578-583.58c-15.341 0-27.778 12.436-27.778 27.777v222.222c0 15.342 12.437 27.778 27.778 27.778h222.222c15.342 0 27.778-12.436 27.778-27.778V388.641c0-15.341-12.436-27.778-27.778-27.778H389.422z", fillRule: "evenodd" })));
const SvgStopCircle = React.forwardRef((props, ref) => {
    return (React.createElement(IconBase, Object.assign({ name: "SvgStopCircle" }, props, { ref: ref }),
        React.createElement(SvgIcon, null)));
});
export default SvgStopCircle;
