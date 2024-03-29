import * as React from 'react';
import IconBase from './IconBase';
const SvgIcon = (props) => (React.createElement("svg", Object.assign({ width: "1em", height: "1em", viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg", fill: "currentColor" }, props),
    React.createElement("path", { d: "M500 55.556c245.46 0 444.444 198.984 444.444 444.444S745.46 944.444 500 944.444 55.556 745.46 55.556 500 254.54 55.556 500 55.556zm29.333 166.666h-3.11c-13.445 0-24 10.222-25.612 23.111-.055.667-.278 1.167-.333 1.834-.056.444-.278.833-.278 1.277v333.612c-14.611-7.778-30.944-12.612-48.611-12.612h-69.445c-57.5 0-104.166 46.667-104.166 104.167s46.666 104.167 104.166 104.167h69.445c57.5 0 104.167-46.667 104.167-104.167 0-1.194-.14-2.347-.3-3.493l-.193-1.374a31.94 31.94 0 01-.23-2.077h.723V298.11l74.555 43.056a27.663 27.663 0 0013.833 3.722c9.612 0 18.945-5 24.056-13.889 7.722-13.278 3.167-30.278-10.111-38l-113.722-65.611c-4.278-3-9.167-5.167-14.834-5.167zM451.39 625C478.167 625 500 646.833 500 673.611s-21.833 48.611-48.611 48.611h-69.445c-26.777 0-48.61-21.833-48.61-48.61 0-26.779 21.833-48.612 48.61-48.612h69.445z", fillRule: "evenodd" })));
const SvgMusic = React.forwardRef((props, ref) => {
    return (React.createElement(IconBase, Object.assign({ name: "SvgMusic" }, props, { ref: ref }),
        React.createElement(SvgIcon, null)));
});
export default SvgMusic;
