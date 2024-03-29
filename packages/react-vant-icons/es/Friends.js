import * as React from 'react';
import IconBase from './IconBase';
const SvgIcon = (props) => (React.createElement("svg", Object.assign({ width: "1em", height: "1em", viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg", fill: "currentColor" }, props),
    React.createElement("path", { d: "M612.603 111.111c107.389 0 194.445 87.056 194.445 194.445 0 77.966-45.888 145.215-112.13 176.212v-.013c143.529 37.168 249.526 167.56 249.526 322.71l-.003-.46.003.46c0 15.34-12.436 27.777-27.777 27.777H305.556l-.46-.003c-15.13-.246-27.318-12.587-27.318-27.774l.044-5.513c2.488-153.41 108.613-281.628 251.414-317.691l.002.012c-65.676-31.214-111.08-98.164-111.08-175.717 0-107.39 87.056-194.445 194.445-194.445zm-222.47 64.633c9.076 0 17.978.746 26.648 2.181-25.387 36.116-40.289 80.133-40.289 127.63 0 65.807 28.871 126.407 76.44 167.758-120.969 52.685-205.463 168.814-215.761 303.372l-102.912.002-.383-.003c-12.607-.205-22.765-10.489-22.765-23.145l.037-4.594c2.073-127.843 90.511-234.691 209.513-264.743l.001.01c-54.73-26.01-92.567-81.802-92.567-146.43 0-89.491 72.547-162.038 162.037-162.038z", fillRule: "evenodd" })));
const SvgFriends = React.forwardRef((props, ref) => {
    return (React.createElement(IconBase, Object.assign({ name: "SvgFriends" }, props, { ref: ref }),
        React.createElement(SvgIcon, null)));
});
export default SvgFriends;
