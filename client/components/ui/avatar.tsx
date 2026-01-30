import * as React from "react"

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg"
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className = "", size = "md", children, ...props }, ref) => {
    const sizes = {
      sm: "h-8 w-8",
      md: "h-10 w-10",
      lg: "h-12 w-12",
    }

    return (
      <div
        ref={ref}
        className={`relative flex items-center justify-center overflow-hidden rounded-full bg-gray-200 ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Avatar.displayName = "Avatar"

export interface AvatarImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {}

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className = "", ...props }, ref) => (
    <img
      ref={ref}
      className={`h-full w-full object-cover ${className}`}
      {...props}
    />
  )
)
AvatarImage.displayName = "AvatarImage"

export interface AvatarFallbackProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const AvatarFallback = React.forwardRef<HTMLDivElement, AvatarFallbackProps>(
  ({ className = "", children, ...props }, ref) => (
    <div
      ref={ref}
      className={`flex h-full w-full items-center justify-center bg-gray-300 text-sm font-semibold text-gray-700 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
)
AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarImage, AvatarFallback }