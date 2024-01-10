import * as React from 'react';
import IconBase from './IconBase';
const SvgIcon = (props) => (React.createElement("svg", Object.assign({ width: "1em", height: "1em", viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg", fill: "currentColor" }, props),
    React.createElement("path", { d: "M166.667 222.222v611.111h666.666v-611.11H166.667zm527.777-111.11c15.342 0 27.778 12.436 27.778 27.777v27.778h111.111c30.683 0 55.556 24.873 55.556 55.555v611.111c0 30.683-24.873 55.556-55.556 55.556H166.667c-30.683 0-55.556-24.873-55.556-55.556v-611.11c0-30.683 24.873-55.556 55.556-55.556h111.11v-27.778c0-15.341 12.437-27.778 27.779-27.778 15.34 0 27.777 12.437 27.777 27.778v27.778h333.334v-27.778c0-15.341 12.436-27.778 27.777-27.778zm-83.766 366.035H394.012V589.37c-.556 47.222-8.334 86.11-23.334 116.666l22.223 20c19.444-35.555 29.444-81.944 30-138.889v-83.333H581.79v185c0 6.111-3.334 9.445-10 9.445-10.556 0-21.667-.556-33.612-1.39l7.5 27.778h34.723c20 0 30.277-8.61 30.277-25.555V477.147zm-50.555 134.445H441.512v73.611h118.61v-73.611zm-27.778 24.167v24.444H469.29v-24.444h63.055zm-15.833-126.112h-28.056v17.778h-46.944v23.89h46.944v20.555h-54.444v25H570.4v-25h-53.89v-20.556h45.556v-23.889h-45.555v-17.778zm316.821-176.314H166.667v55.556h666.666v-55.556zm-500-111.11h-55.555V250c0 15.341 12.436 27.778 27.778 27.778 15.34 0 27.777-12.437 27.777-27.778v-27.778zm388.89 0h-55.556V250c0 15.341 12.436 27.778 27.777 27.778 15.342 0 27.778-12.437 27.778-27.778v-27.778z", fillRule: "nonzero" })));
const SvgCalendarO = React.forwardRef((props, ref) => {
    return (React.createElement(IconBase, Object.assign({ name: "SvgCalendarO" }, props, { ref: ref }),
        React.createElement(SvgIcon, null)));
});
export default SvgCalendarO;