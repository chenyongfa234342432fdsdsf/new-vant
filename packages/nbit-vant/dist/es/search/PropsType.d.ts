import React from 'react';
import { FieldCommonProps } from '../field/PropsType';
export interface SearchProps extends FieldCommonProps {
    /** 搜索框左侧文本	 */
    label?: React.ReactNode;
    /** 取消按钮文字	 */
    actionText?: React.ReactNode;
    /** 搜索框外部背景色	 */
    background?: string;
    /** 是否在搜索框右侧显示取消按钮	 */
    showAction?: Boolean;
    /** 搜索框形状，可选值为 round	 */
    shape?: 'square' | 'round';
    /**  确定搜索时触发	 */
    onSearch?: (val: string) => void;
    /** 点击取消按钮时触发	 */
    onCancel?: () => void;
    /** 点击输入区域时触发	 */
    onClickInput?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onFocus?: (e: React.FocusEvent) => void;
    onBlur?: (e: React.FocusEvent) => void;
}
export declare type SearchInstance = {
    /** 获取输入框焦点	 */
    focus?: (e: React.MouseEvent) => void;
    /** 取消输入框焦点	 */
    blur?: (e: React.MouseEvent) => void;
};
