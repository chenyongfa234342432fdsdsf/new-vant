import * as React from 'react';
import IconBase from './IconBase';
const SvgIcon = (props) => (React.createElement("svg", Object.assign({ width: "1em", height: "1em", viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg", fill: "currentColor" }, props),
    React.createElement("g", { fillRule: "evenodd" },
        React.createElement("path", { d: "M305.556 388.889c-15.334 0-27.778-12.5-27.778-27.778 0-15.278 12.444-27.778 27.778-27.778 15.333 0 27.777 12.5 27.777 27.778 0 15.278-12.444 27.778-27.777 27.778m0-111.111c-46.056 0-83.334 37.333-83.334 83.333s37.278 83.333 83.334 83.333c46.055 0 83.333-37.333 83.333-83.333s-37.278-83.333-83.333-83.333" }),
        React.createElement("path", { d: "M653.889 327.667c-11.056-12.945-26.611-19.445-42.167-19.445-15.778 0-31.555 6.722-42.666 20.056L333.333 611.11l-71.777-71.833C250.666 528.388 236.444 523 222.222 523c-14.166 0-28.389 5.389-39.278 16.278l-71.833 71.833V222.222H888.89v379.611l-235-274.166zm235 450.11H111.11v-88.11l111.111-111.111 71.834 71.833c23.11 23.111 61.055 21.333 82-3.778L611.61 363.778h.111L888.89 687.222v90.556zm0-611.11H111.11c-30.667 0-55.555 24.833-55.555 55.555v555.555c0 30.667 24.888 55.556 55.555 55.556H888.89c30.722 0 55.555-24.889 55.555-55.555V222.222c0-30.722-24.833-55.555-55.555-55.555z" }))));
const SvgPhotoO = React.forwardRef((props, ref) => {
    return (React.createElement(IconBase, Object.assign({ name: "SvgPhotoO" }, props, { ref: ref }),
        React.createElement(SvgIcon, null)));
});
export default SvgPhotoO;
