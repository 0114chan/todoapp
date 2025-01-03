// src/components/ui/TodoItem.tsx
import { Item } from '@/lib/types'
import Link from 'next/link'

interface TodoItemProps {
    todo: Item
    onToggle: (todo: Item) => void
}

export function TodoItem({ todo, onToggle }: TodoItemProps) {
    return (
        <Link href={`/items/${todo.id}`}>
            <div className={`flex items-center gap-3 p-4 rounded-lg transition-colors cursor-pointer
                ${todo.isCompleted
                ? 'bg-violet-100'
                : 'bg-white border border-slate-200 hover:bg-slate-50'}`}>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        onToggle(todo)
                    }}
                    className={`w-5 h-5 rounded-full border flex items-center justify-center 
                        ${todo.isCompleted
                        ? 'border-violet-600 bg-violet-600'
                        : 'border-slate-300'}`}
                >
                    {todo.isCompleted && (
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path
                                d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    )}
                </button>
                <span className={todo.isCompleted ? 'text-slate-500' : 'text-slate-900'}>
                    {todo.name}
                </span>
            </div>
        </Link>
    )
}