import React from 'react';
import { FormLayout, FormItemProps } from './PropsType';
export declare type FormContextType = {
    layout?: FormLayout;
    colon?: boolean;
    border?: boolean;
    showValidateMessage?: boolean;
} & Pick<FormItemProps, 'labelAlign' | 'controlAlign' | 'border'>;
export declare const DEFAULT_FORM_CONTEXT: FormContextType;
export declare const FormContext: React.Context<FormContextType>;
