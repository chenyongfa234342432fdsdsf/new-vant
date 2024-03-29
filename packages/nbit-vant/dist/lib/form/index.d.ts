/// <reference types="react" />
import './style/index.less';
import { useWatch, useForm } from 'rc-field-form';
declare const Form: import("react").ForwardRefExoticComponent<{
    layout?: import("./PropsType").FormLayout;
    colon?: boolean;
    footer?: import("react").ReactNode;
    showValidateMessage?: boolean;
} & Omit<import("rc-field-form").FormProps<any>, "style"> & import("../utils").BaseTypeProps & Pick<import("..").FieldProps, "border" | "labelAlign" | "controlAlign"> & import("react").RefAttributes<import("rc-field-form").FormInstance<any>>> & {
    Item: import("react").FC<import("./PropsType").FormItemProps<any>>;
    useForm: typeof useForm;
    List: import("react").FunctionComponent<import("rc-field-form/es/List").ListProps>;
    Subscribe: import("react").FC<import("./FormSubscribe").FormSubscribeProps>;
    useWatch: typeof useWatch;
};
export { Form };
export type { FormProps, FormItemProps, FormInstance } from './PropsType';
export type { FormSubscribeProps } from './FormSubscribe';
