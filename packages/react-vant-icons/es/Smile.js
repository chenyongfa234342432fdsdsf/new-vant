import * as React from 'react';
import IconBase from './IconBase';
const SvgIcon = (props) => (React.createElement("svg", Object.assign({ width: "1em", height: "1em", viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg", fill: "currentColor" }, props),
    React.createElement("path", { d: "M500 55.556c245.46 0 444.444 198.984 444.444 444.444S745.46 944.444 500 944.444 55.556 745.46 55.556 500 254.54 55.556 500 55.556zm222.61 475.907c-15.497-5.477-32.5 2.645-37.978 18.143-27.095 76.658-99.805 128.965-182.452 128.965-82.648 0-155.358-52.307-182.453-128.965-5.477-15.498-22.48-23.62-37.978-18.143-15.498 5.478-23.62 22.481-18.143 37.979 35.438 100.264 130.503 168.653 238.574 168.653 108.07 0 203.135-68.39 238.573-168.653 5.478-15.498-2.645-32.501-18.142-37.979zM347.003 345.238c-26.3 0-47.62 21.32-47.62 47.62 0 26.298 21.32 47.618 47.62 47.618 26.299 0 47.619-21.32 47.619-47.619 0-26.3-21.32-47.619-47.62-47.619zm308.642 0c-26.3 0-47.62 21.32-47.62 47.62 0 26.298 21.32 47.618 47.62 47.618 26.299 0 47.619-21.32 47.619-47.619 0-26.3-21.32-47.619-47.62-47.619z", fillRule: "evenodd" })));
const SvgSmile = React.forwardRef((props, ref) => {
    return (React.createElement(IconBase, Object.assign({ name: "SvgSmile" }, props, { ref: ref }),
        React.createElement(SvgIcon, null)));
});
export default SvgSmile;
