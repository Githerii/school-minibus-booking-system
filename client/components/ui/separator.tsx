import * as React from "react"

const Separator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    orientation?: "horizontal" | "vertical"
  }
>(({ className = "", orientation = "horizontal", ...props }, ref) => (
  <div
    ref={ref}
    className={`shrink-0 ${
      orientation === "horizontal"
        ? "h-[1px] w-full bg-gray-200"
        : "h-full w-[1px] bg-gray-200"
    } ${className}`}
    {...props}
  />
))
Separator.displayName = "Separator"

export { Separator }