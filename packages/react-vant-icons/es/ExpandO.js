import * as React from 'react';
import IconBase from './IconBase';
const SvgIcon = (props) => (React.createElement("svg", Object.assign({ width: "1em", height: "1em", viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg", fill: "currentColor" }, props),
    React.createElement("g", { fillRule: "evenodd" },
        React.createElement("path", { d: "M166.667 166.667v666.666h666.666V166.667H166.667zm0-55.556h666.666c30.683 0 55.556 24.873 55.556 55.556v666.666c0 30.683-24.873 55.556-55.556 55.556H166.667c-30.683 0-55.556-24.873-55.556-55.556V166.667c0-30.683 24.873-55.556 55.556-55.556z", fillRule: "nonzero" }),
        React.createElement("path", { d: "M583.333 222.222H750c15.341 0 27.778 12.437 27.778 27.778S765.34 277.778 750 277.778H583.333c-15.34 0-27.777-12.437-27.777-27.778s12.436-27.778 27.777-27.778z" }),
        React.createElement("path", { d: "M750 222.222c15.341 0 27.778 12.437 27.778 27.778v166.667c0 15.34-12.437 27.777-27.778 27.777s-27.778-12.436-27.778-27.777V250c0-15.341 12.437-27.778 27.778-27.778z" }),
        React.createElement("path", { d: "M602.975 436.309c-10.848 10.847-28.436 10.847-39.284 0-10.847-10.848-10.847-28.436 0-39.284l166.667-166.667c10.848-10.848 28.436-10.848 39.284 0 10.848 10.848 10.848 28.436 0 39.284L602.975 436.309z", fillRule: "nonzero" }),
        React.createElement("g", null,
            React.createElement("path", { d: "M416.667 777.778H250c-15.341 0-27.778-12.437-27.778-27.778S234.66 722.222 250 722.222h166.667c15.34 0 27.777 12.437 27.777 27.778s-12.436 27.778-27.777 27.778z" }),
            React.createElement("path", { d: "M250 777.778c-15.341 0-27.778-12.437-27.778-27.778V583.333c0-15.34 12.437-27.777 27.778-27.777s27.778 12.436 27.778 27.777V750c0 15.341-12.437 27.778-27.778 27.778z" }),
            React.createElement("path", { d: "M397.025 563.691c10.848-10.847 28.436-10.847 39.284 0 10.847 10.848 10.847 28.436 0 39.284L269.642 769.642c-10.848 10.848-28.436 10.848-39.284 0-10.848-10.848-10.848-28.436 0-39.284l166.667-166.667z", fillRule: "nonzero" })))));
const SvgExpandO = React.forwardRef((props, ref) => {
    return (React.createElement(IconBase, Object.assign({ name: "SvgExpandO" }, props, { ref: ref }),
        React.createElement(SvgIcon, null)));
});
export default SvgExpandO;
