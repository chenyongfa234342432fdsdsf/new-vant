import * as React from 'react';
import IconBase from './IconBase';
const SvgIcon = (props) => (React.createElement("svg", Object.assign({ width: "1em", height: "1em", viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg", fill: "currentColor" }, props),
    React.createElement("path", { d: "M222.222 888.889c-30.682 0-55.555-24.873-55.555-55.556V500c-30.683 0-55.556-24.873-55.556-55.556V277.778c0-30.683 24.873-55.556 55.556-55.556h86.112c12.869-63.396 68.917-111.11 136.11-111.11 45.435 0 85.774 21.816 111.114 55.545 25.334-33.73 65.673-55.546 111.108-55.546 67.193 0 123.241 47.715 136.11 111.11l86.112.001c30.376 0 55.058 24.378 55.548 54.637l.008.919v166.666c0 30.376-24.378 55.058-54.637 55.549l-.919.007v333.333c0 30.376-24.378 55.058-54.637 55.548l-.918.008H222.222zm333.333-611.112h-111.11v555.556h111.11V277.777zM388.89 500H222.222v333.333H388.89V500zm388.889 0H611.11v333.333h166.667V500zm-388.89-222.222H166.668v166.666h222.222V277.778zm444.445 0H611.111v166.666h222.222V277.778zM611.111 166.667c-36.284 0-67.151 23.189-78.591 55.555h157.183c-11.44-32.366-42.308-55.555-78.592-55.555zm-222.222 0c-36.284 0-67.152 23.189-78.592 55.555H467.48c-11.44-32.366-42.307-55.555-78.591-55.555z", fillRule: "nonzero" })));
const SvgGiftO = React.forwardRef((props, ref) => {
    return (React.createElement(IconBase, Object.assign({ name: "SvgGiftO" }, props, { ref: ref }),
        React.createElement(SvgIcon, null)));
});
export default SvgGiftO;
