import * as React from 'react';
import IconBase, { IconBaseProps } from './IconBase';

const SvgIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    {...props}
  >
    <path
      d="M727.566 114.481c32.544 32.544 14.956 102.895-39.283 157.135a234.744 234.744 0 01-6.4 6.163l151.45-.001c30.683 0 55.556 24.873 55.556 55.555v111.111c0 30.376-24.378 55.058-54.637 55.549l-.919.007v333.333c0 30.683-24.873 55.556-55.555 55.556H222.222c-30.682 0-55.555-24.873-55.555-55.556V500c-30.683 0-55.556-24.873-55.556-55.556v-111.11c0-30.683 24.873-55.556 55.556-55.556l187.942.001a234.743 234.743 0 01-6.4-6.163c-54.24-54.24-71.827-124.591-39.283-157.135 32.543-32.544 102.895-14.956 157.134 39.284 26.578 26.577 44.355 57.023 51.746 84.994l.44 1.71c7.109-28.437 25.066-59.584 52.185-86.704 54.24-54.24 124.592-71.828 157.135-39.284zM472.222 500l-250 .001v333.333h250V499.998zm305.556.001h-250v333.332l250 .001V500zM472.222 333.332l-305.555.001v111.111h305.555V333.332zm361.111.001H527.777v111.111h305.556v-111.11zM609.715 193.05c-35.366 35.366-44.79 73.06-39.284 78.567 5.507 5.506 43.201-3.917 78.568-39.284 35.367-35.366 44.79-73.06 39.284-78.567-5.507-5.507-43.201 3.917-78.568 39.284zM348.21 153.765c-5.506 5.506 3.917 43.2 39.284 78.567 35.367 35.367 73.06 44.79 78.567 39.284 5.507-5.507-3.917-43.2-39.283-78.567-35.367-35.367-73.061-44.79-78.568-39.284z"
      fillRule="nonzero"
    />
  </svg>
);

const SvgPointGiftO = React.forwardRef<SVGSVGElement, Omit<IconBaseProps, 'name'>>((props, ref) => {
  return (
    <IconBase name="SvgPointGiftO" {...props} ref={ref}>
      <SvgIcon />
    </IconBase>
  );
});

export default SvgPointGiftO;
