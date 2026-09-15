import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-hover shadow-sm',
  secondary: 'bg-primary-soft text-primary hover:bg-primary/15',
  ghost: 'bg-transparent text-foreground hover:bg-surface-soft',
}

export function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
  inline-flex h-11 items-center justify-center
  rounded-control px-5
  font-medium
  transition-[background-color,transform,box-shadow]
  duration-200
  hover:-translate-y-px
  focus-visible:outline-2
  focus-visible:outline-offset-2
  focus-visible:outline-primary
  disabled:pointer-events-none
  disabled:opacity-50
  ${variants[variant]}
  ${className}
`}
      {...props}
    >
      {children}
    </button>
  )
}
