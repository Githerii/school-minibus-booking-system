import * as React from "react"

export interface RadioGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  onValueChange?: (value: string) => void
}

const RadioGroupContext = React.createContext<{
  value: string
  onValueChange: (value: string) => void
}>({
  value: "",
  onValueChange: () => {},
})

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ value = "", onValueChange, children, ...props }, ref) => {
    return (
      <RadioGroupContext.Provider value={{ value, onValueChange: onValueChange || (() => {}) }}>
        <div ref={ref} role="radiogroup" {...props}>
          {children}
        </div>
      </RadioGroupContext.Provider>
    )
  }
)
RadioGroup.displayName = "RadioGroup"

export interface RadioGroupItemProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
}

const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ value, className = "", ...props }, ref) => {
    const context = React.useContext(RadioGroupContext)

    return (
      <input
        ref={ref}
        type="radio"
        value={value}
        checked={context.value === value}
        onChange={() => context.onValueChange(value)}
        className={`h-4 w-4 border border-gray-300 bg-white checked:bg-primary checked:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer accent-primary ${className}`}
        {...props}
      />
    )
  }
)
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }