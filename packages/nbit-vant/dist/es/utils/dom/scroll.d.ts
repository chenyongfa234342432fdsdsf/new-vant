declare type ScrollElement = Element | Window;
export declare function getScrollTop(el: ScrollElement): number;
export declare function getRootScrollTop(): number;
export declare function setRootScrollTop(value: number): void;
export declare function getElementTop(el: ScrollElement, scroller?: HTMLElement): number;
export declare function getVisibleHeight(el: ScrollElement): number;
export declare function getVisibleTop(el: ScrollElement): number;
export declare function setScrollTop(el: ScrollElement, value: number): void;
export declare function scrollLeftTo(scroller: HTMLElement, to: number, duration: number): void;
export declare function scrollTopTo(scroller: HTMLElement, to: number, duration: number, callback: () => void): void;
export declare function resetScroll(): void;
export {};
