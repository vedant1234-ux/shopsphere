import { cva, type VariantProps } from "class-variance-authority";

export const sidebarMenuButtonVariants = cva(
    "flex h-9 min-w-0 flex-1 cursor-pointer items-center gap-2 truncate rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
    {
        variants: {
            size: {
                default: "h-9",
                sm: "h-7",
                lg: "h-10",
            },
        },
        defaultVariants: {
            size: "default",
        },
    }
);

export type { VariantProps };
