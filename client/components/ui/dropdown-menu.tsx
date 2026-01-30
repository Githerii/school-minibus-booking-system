import * as React from "react"
import { ChevronDown } from "lucide-react"

export interface DropdownMenuProps {
  children?: React.ReactNode
}

const DropdownMenuContext = React.createContext<{
  open: boolean
  setOpen: (open: boolean) => void
}>({
  open: false,
  setOpen: () => {},
})

const DropdownMenu: React.FC<DropdownMenuProps> = ({ children }) => {
  const [open, setOpen] = React.useState(false)

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block">{children}</div>
    </DropdownMenuContext.Provider>
  )
}

const DropdownMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className = "", children, ...props }, ref) => {
  const context = React.useContext(DropdownMenuContext)

  return (
    <button
      ref={ref}
      onClick={() => context.setOpen(!context.open)}
      className={`inline-flex items-center justify-center rounded-md bg-transparent p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
})
DropdownMenuTrigger.displayName = "DropdownMenuTrigger"

const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", children, ...props }, ref) => {
  const context = React.useContext(DropdownMenuContext)

  return context.open ? (
    <div
      ref={ref}
      className={`absolute right-0 z-50 min-w-[200px] overflow-hidden rounded-md border border-gray-300 bg-white shadow-md ${className}`}
      {...props}
    >
      {children}
    </div>
  ) : null
})
DropdownMenuContent.displayName = "DropdownMenuContent"

const DropdownMenuItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", children, ...props }, ref) => {
  const context = React.useContext(DropdownMenuContext)

  return (
    <div
      ref={ref}
      onClick={() => context.setOpen(false)}
      className={`cursor-pointer px-4 py-2 text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none ${className}`}
      {...props}
    >
      {children}
    </div>
  )
})
DropdownMenuItem.displayName = "DropdownMenuItem"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
}