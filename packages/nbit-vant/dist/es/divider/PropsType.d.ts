import React from 'react';
import { BaseTypeProps } from '../utils';
export declare type DividerContentPosition = 'left' | 'center' | 'right';
export interface DividerProps extends BaseTypeProps, Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> {
    /** 是否使用虚线	 */
    dashed?: boolean;
    /**
     * 是否使用 0.5px 线
     * @default true
     */
    hairline?: boolean;
    /**
     * 水平还是垂直类型
     * @default 'horizontal'
     */
    type?: 'horizontal' | 'vertical';
    /**
     * 内容位置
     * @default 'center'
     */
    contentPosition?: DividerContentPosition;
}
