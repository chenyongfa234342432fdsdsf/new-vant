import * as React from 'react';
import IconBase from './IconBase';
const SvgIcon = (props) => (React.createElement("svg", Object.assign({ width: "1em", height: "1em", viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg", fill: "currentColor" }, props),
    React.createElement("path", { d: "M694.667 527.778h-166.89v166.889c0 15.277-12.444 27.777-27.777 27.777s-27.778-12.5-27.778-27.777v-166.89H305.333c-15.277 0-27.777-12.444-27.777-27.777s12.5-27.778 27.777-27.778h166.89V305.333c0-15.277 12.444-27.777 27.777-27.777s27.778 12.5 27.778 27.777v166.89h166.889c15.277 0 27.777 12.444 27.777 27.777s-12.5 27.778-27.777 27.778M500 55.556c-245.444 0-444.444 199-444.444 444.444 0 245.444 199 444.444 444.444 444.444 245.444 0 444.444-199 444.444-444.444 0-245.444-199-444.444-444.444-444.444", fillRule: "evenodd" })));
const SvgAdd = React.forwardRef((props, ref) => {
    return (React.createElement(IconBase, Object.assign({ name: "SvgAdd" }, props, { ref: ref }),
        React.createElement(SvgIcon, null)));
});
export default SvgAdd;
