import { badgeVariants, VariantProps } from "@/lib/badge-variants"
import { cn } from "@/lib/utils"
import * as React from "react"

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge }

