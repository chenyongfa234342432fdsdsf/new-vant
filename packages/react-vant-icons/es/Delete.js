import * as React from 'react';
import IconBase from './IconBase';
const SvgIcon = (props) => (React.createElement("svg", Object.assign({ width: "1em", height: "1em", viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg", fill: "currentColor" }, props),
    React.createElement("g", { fillRule: "evenodd" },
        React.createElement("path", { d: "M141 434.955c0 .025-.02.045-.045.045h-9.91a.045.045 0 01-.045-.045V425h10v9.955zM142.5 424h-13a.5.5 0 000 1h.5v9.955c0 .577.468 1.045 1.045 1.045h9.91c.577 0 1.045-.468 1.045-1.045V425h.5a.5.5 0 000-1zm-4 9a.5.5 0 00.5-.5v-5a.5.5 0 00-1 0v5a.5.5 0 00.5.5m-5 0a.5.5 0 00.5-.5v-5a.5.5 0 00-1 0v5a.5.5 0 00.5.5m2.5 0a.5.5 0 00.5-.5v-5a.5.5 0 00-1 0v5a.5.5 0 00.5.5m-3.5-10h7a.5.5 0 000-1h-7a.5.5 0 000 1" }),
        React.createElement("path", { d: "M861.002 222.117c15.334 0 27.778 12.444 27.778 27.778 0 15.333-12.444 27.778-27.778 27.778h-27.778V830.73c0 32.055-26 58.056-58.055 58.056H224.61c-32.055 0-58.055-26-58.055-58.056V277.673h-27.778c-15.334 0-27.778-12.445-27.778-27.778 0-15.334 12.444-27.778 27.778-27.778zM638.78 388.779c-15.333 0-27.778 12.444-27.778 27.777v277.779c0 15.333 12.445 27.778 27.778 27.778 15.334 0 27.778-12.445 27.778-27.778V416.556c0-15.333-12.444-27.777-27.778-27.777zm-277.778 0c-15.334 0-27.778 12.444-27.778 27.777v277.779c0 15.333 12.444 27.778 27.778 27.778 15.333 0 27.778-12.445 27.778-27.778V416.556c0-15.333-12.445-27.777-27.778-27.777zm138.889 0c-15.333 0-27.778 12.444-27.778 27.777v277.779c0 15.333 12.445 27.778 27.778 27.778 15.333 0 27.778-12.445 27.778-27.778V416.556c0-15.333-12.445-27.777-27.778-27.777zM305.445 166.556h388.89c15.333 0 27.778-12.445 27.778-27.778 0-15.334-12.445-27.778-27.778-27.778h-388.89c-15.333 0-27.778 12.444-27.778 27.778 0 15.333 12.445 27.778 27.778 27.778" }))));
const SvgDelete = React.forwardRef((props, ref) => {
    return (React.createElement(IconBase, Object.assign({ name: "SvgDelete" }, props, { ref: ref }),
        React.createElement(SvgIcon, null)));
});
export default SvgDelete;
