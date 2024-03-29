import React from 'react';
import type { FormInstance } from 'rc-field-form';
declare const Form: React.ForwardRefExoticComponent<{
    layout?: import("./PropsType").FormLayout;
    colon?: boolean;
    footer?: React.ReactNode;
    showValidateMessage?: boolean;
} & Omit<import("rc-field-form").FormProps<any>, "style"> & import("../utils").BaseTypeProps & Pick<import("..").FieldProps, "border" | "labelAlign" | "controlAlign"> & React.RefAttributes<FormInstance<any>>>;
export default Form;
