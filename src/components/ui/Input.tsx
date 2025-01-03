// src/components/ui/Input.tsx
export function Input({
                          className = '',
                          ...props
                      }: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className={`w-full px-4 py-2 rounded-lg border border-slate-300 
                  focus:outline-none focus:ring-2 focus:ring-violet-600 
                  focus:border-transparent ${className}`}
        />
    )
}