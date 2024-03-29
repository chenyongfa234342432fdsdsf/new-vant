import * as React from 'react';
import IconBase from './IconBase';
const SvgIcon = (props) => (React.createElement("svg", Object.assign({ width: "1em", height: "1em", viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg", fill: "currentColor" }, props),
    React.createElement("path", { d: "M111.111 500c0-214.777 174.112-388.889 388.889-388.889 214.777 0 388.889 174.112 388.889 388.889v277.778c0 30.682-24.873 55.555-55.556 55.555h-55.555c-30.683 0-55.556-24.873-55.556-55.555V555.556c0-30.683 24.873-55.556 55.556-55.556h55.555c0-184.095-149.238-333.333-333.333-333.333-184.095 0-333.333 149.238-333.333 333.333h55.555c30.683 0 55.556 24.873 55.556 55.556v222.222c0 30.682-24.873 55.555-55.556 55.555h-55.555c-30.683 0-55.556-24.873-55.556-55.555V500z", fillRule: "evenodd" })));
const SvgAudio = React.forwardRef((props, ref) => {
    return (React.createElement(IconBase, Object.assign({ name: "SvgAudio" }, props, { ref: ref }),
        React.createElement(SvgIcon, null)));
});
export default SvgAudio;
