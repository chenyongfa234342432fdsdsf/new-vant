import * as React from 'react';
import IconBase from './IconBase';
const SvgIcon = (props) => (React.createElement("svg", Object.assign({ width: "1em", height: "1em", viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg", fill: "currentColor" }, props),
    React.createElement("path", { d: "M722.206 555.572c92.055 0 166.666 74.556 166.666 166.667 0 92.055-74.61 166.667-166.666 166.667s-166.667-74.612-166.667-166.667c0-92.111 74.611-166.667 166.667-166.667zm55.572-444.46c30.722 0 55.555 24.832 55.555 55.555v364.166C800.5 511.723 762.89 500 722.223 500 599.5 500 500 599.5 500 722.222c0 66.722 30.056 125.945 76.667 166.667H222.222c-30.722 0-55.555-24.833-55.555-55.556V166.667c0-30.723 24.833-55.556 55.555-55.556zm-55.572 501.571c-15.334 0-27.778 12.5-27.778 27.778v71.167a55.545 55.545 0 0016.278 39.278l53.833 53.888c10.833 10.834 28.444 10.834 39.278 0 10.833-10.833 10.833-28.444 0-39.277l-53.834-53.89v-71.166c0-15.278-12.389-27.778-27.777-27.778zM416.666 500h-111.11c-15.334 0-27.778 12.444-27.778 27.778 0 15.333 12.444 27.778 27.778 27.778h111.11c15.334 0 27.778-12.445 27.778-27.778C444.444 512.444 432 500 416.667 500zm111.112-111.111H305.556c-15.334 0-27.778 12.444-27.778 27.778 0 15.333 12.444 27.777 27.778 27.777h222.222c15.333 0 27.778-12.444 27.778-27.777 0-15.334-12.445-27.778-27.778-27.778zm111.11-111.111H305.557c-15.334 0-27.778 12.444-27.778 27.778 0 15.333 12.444 27.777 27.778 27.777h333.333c15.333 0 27.778-12.444 27.778-27.777 0-15.334-12.445-27.778-27.778-27.778z", fillRule: "evenodd" })));
const SvgTodoList = React.forwardRef((props, ref) => {
    return (React.createElement(IconBase, Object.assign({ name: "SvgTodoList" }, props, { ref: ref }),
        React.createElement(SvgIcon, null)));
});
export default SvgTodoList;
