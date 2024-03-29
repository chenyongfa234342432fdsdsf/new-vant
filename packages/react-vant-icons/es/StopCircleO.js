import * as React from 'react';
import IconBase from './IconBase';
const SvgIcon = (props) => (React.createElement("svg", Object.assign({ width: "1em", height: "1em", viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg", fill: "currentColor" }, props),
    React.createElement("path", { d: "M389.422 360.863h222.222c15.342 0 27.778 12.437 27.778 27.778v222.222c0 15.342-12.436 27.778-27.778 27.778H389.422c-15.341 0-27.778-12.436-27.778-27.778V388.641c0-15.341 12.437-27.778 27.778-27.778zM500 888.89c214.777 0 388.889-174.112 388.889-388.889 0-214.777-174.112-388.889-388.889-388.889-214.777 0-388.889 174.112-388.889 388.889 0 214.777 174.112 388.889 388.889 388.889zm0 55.555C254.54 944.444 55.556 745.46 55.556 500S254.54 55.556 500 55.556 944.444 254.54 944.444 500 745.46 944.444 500 944.444z", fillRule: "evenodd" })));
const SvgStopCircleO = React.forwardRef((props, ref) => {
    return (React.createElement(IconBase, Object.assign({ name: "SvgStopCircleO" }, props, { ref: ref }),
        React.createElement(SvgIcon, null)));
});
export default SvgStopCircleO;
