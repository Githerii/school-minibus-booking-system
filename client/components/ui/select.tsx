import * as React from "react"
import { ChevronDown } from "lucide-react"

export interface SelectProps {
  children?: React.ReactNode
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
}

const SelectContext = React.createContext<{
  value: string
  onValueChange: (value: string) => void
}>({
  value: "",
  onValueChange: () => {},
})

const Select = React.forwardRef<
  HTMLDivElement,
  SelectProps & React.HTMLAttributes<HTMLDivElement>
>(({ defaultValue = "", value, onValueChange, children, ...props }, ref) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const currentValue = value ?? internalValue

  const handleValueChange = (newValue: string) => {
    setInternalValue(newValue)
    onValueChange?.(newValue)
  }

  return (
    <SelectContext.Provider
      value={{ value: currentValue, onValueChange: handleValueChange }}
    >
      <div ref={ref} {...props}>
        {children}
      </div>
    </SelectContext.Provider>
  )
})
Select.displayName = "Select"

const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className = "", children, ...props }, ref) => {
  const context = React.useContext(SelectContext)

  return (
    <button
      ref={ref}
      className={`flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      <span>{children}</span>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  )
})
SelectTrigger.displayName = "SelectTrigger"

interface SelectValueProps {
  placeholder?: string
}

const SelectValue = React.forwardRef<
  HTMLSpanElement,
  SelectValueProps & React.HTMLAttributes<HTMLSpanElement>
>(({ placeholder }, ref) => {
  const context = React.useContext(SelectContext)
  return (
    <span ref={ref}>
      {context.value || placeholder || "Select..."}
    </span>
  )
})
SelectValue.displayName = "SelectValue"

const SelectContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`absolute z-50 min-w-[200px] overflow-hidden rounded-md border border-gray-300 bg-white shadow-md ${className}`}
      {...props}
    >
      {children}
    </div>
  )
})
SelectContent.displayName = "SelectContent"

interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ value, className = "", children, ...props }, ref) => {
    const context = React.useContext(SelectContext)

    return (
      <div
        ref={ref}
        onClick={() => context.onValueChange(value)}
        className={`cursor-pointer px-3 py-2 text-sm hover:bg-gray-100 ${
          context.value === value ? "bg-gray-100 font-medium" : ""
        } ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)
SelectItem.displayName = "SelectItem"

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
}