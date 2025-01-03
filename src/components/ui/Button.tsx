// src/components/ui/Button.tsx
import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger'
}

export function Button({
                           variant = 'primary',
                           className = '',
                           children,
                           ...props
                       }: ButtonProps) {
    const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-colors'

    const variantStyles = {
        primary: 'bg-violet-600 text-white hover:bg-violet-700 disabled:opacity-50',
        secondary: 'bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-50',
        danger: 'bg-rose-500 text-white hover:bg-rose-600 disabled:opacity-50'
    }

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}