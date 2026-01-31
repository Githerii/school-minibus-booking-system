import * as React from "react"
import { Check } from "lucide-react"

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = "", ...props }, ref) => (
    <input
      type="checkbox"
      ref={ref}
      className={`h-4 w-4 rounded border border-gray-300 bg-white checked:bg-primary checked:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer accent-primary ${className}`}
      {...props}
    />
  )
)
Checkbox.displayName = "Checkbox"

export { Checkbox }