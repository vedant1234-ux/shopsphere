import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

export const SIDEBAR_COOKIE_NAME = "sidebar:state";
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
export const SIDEBAR_WIDTH = "16rem";
export const SIDEBAR_WIDTH_MOBILE = "18rem";
export const SIDEBAR_WIDTH_ICON = "3rem";
export const SIDEBAR_KEYBOARD_SHORTCUT = "b";

type SidebarContext = {
    state: "expanded" | "collapsed";
    open: boolean;
    setOpen: (open: boolean) => void;
    openMobile: boolean;
    setOpenMobile: (open: boolean) => void;
    isMobile: boolean;
    toggleSidebar: () => void;
};

export const SidebarContext = React.createContext<SidebarContext>(
    {} as SidebarContext
);

export function useSidebar() {
    return React.useContext(SidebarContext);
}

export const sidebarVariants = cva(
    "flex h-full flex-col overflow-hidden border-r bg-sidebar-background text-sidebar-foreground transition-all duration-300 ease-in-out",
    {
        variants: {
            state: {
                expanded: "w-64",
                collapsed: "w-16",
            },
            mobile: {
                open: "w-full",
                closed: "w-0",
            },
        },
        compoundVariants: [
            {
                state: "collapsed",
                mobile: "closed",
                className: "lg:w-16",
            },
            {
                state: "expanded",
                mobile: "closed",
                className: "lg:w-64",
            },
            {
                state: "collapsed",
                mobile: "open",
                className: "w-0",
            },
            {
                state: "expanded",
                mobile: "open",
                className: "w-full",
            },
        ],
        defaultVariants: {
            state: "expanded",
            mobile: "closed",
        },
    }
);

export type { VariantProps };
