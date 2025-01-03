// src/components/ui/EmptyState.tsx
import Image from 'next/image'

interface EmptyStateProps {
    type: 'todo' | 'done'
    message: string
    submessage: string
}

export function EmptyState({ type, message, submessage }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-16">
            <Image
                src={`/images/empty.svg`}
                alt={type === 'todo' ? '할 일 없음' : '완료된 일 없음'}
                width={200}
                height={200}
                className="mb-4"
                priority
            />
            <p className="text-center font-medium mb-1 text-slate-600">{message}</p>
            <p className="text-sm text-slate-400">{submessage}</p>
        </div>
    )
}