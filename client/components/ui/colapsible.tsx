import * as React from "react"
import { ChevronDown } from "lucide-react"

/* =======================
   Collapsible Root
======================= */

export interface CollapsibleProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(
  ({ open: controlledOpen, onOpenChange, children, ...props }, ref) => {
    const [internalOpen, setInternalOpen] = React.useState(false)

    const isOpen = controlledOpen ?? internalOpen

    const handleOpenChange = (nextOpen: boolean) => {
      setInternalOpen(nextOpen)
      onOpenChange?.(nextOpen)
    }

    return (
      <div ref={ref} {...props}>
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child

          if (
            child.type === CollapsibleTrigger ||
            child.type === CollapsibleContent
          ) {
            return React.cloneElement(child, {
              open: isOpen,
              onOpenChange: handleOpenChange,
            } as any)
          }

          return child
        })}
      </div>
    )
  }
)

Collapsible.displayName = "Collapsible"

/* =======================
   Trigger
======================= */

export interface CollapsibleTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const CollapsibleTrigger = React.forwardRef<
  HTMLButtonElement,
  CollapsibleTriggerProps
>(({ open, onOpenChange, className = "", children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      onClick={() => onOpenChange?.(!open)}
      className={`flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${className}`}
      {...props}
    >
      <span>{children}</span>
      <ChevronDown
        className={`h-4 w-4 transition-transform duration-200 ${
          open ? "rotate-180" : ""
        }`}
      />
    </button>
  )
})

CollapsibleTrigger.displayName = "CollapsibleTrigger"

/* =======================
   Content
======================= */

export interface CollapsibleContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean
}

const CollapsibleContent = React.forwardRef<
  HTMLDivElement,
  CollapsibleContentProps
>(({ open, className = "", children, ...props }, ref) => {
  if (!open) return null

  return (
    <div
      ref={ref}
      className={`overflow-hidden border border-t-0 border-gray-300 bg-gray-50 px-4 py-3 text-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  )
})

CollapsibleContent.displayName = "CollapsibleContent"

/* =======================
   Exports
======================= */

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
