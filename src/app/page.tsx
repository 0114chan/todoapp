// src/app/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { TodoItem } from '@/components/ui/TodoItem'
import { EmptyState } from '@/components/ui/EmptyState'
import { Item } from '@/lib/types'
import { createTodo, getTodos, updateTodo } from '@/lib/api'

export default function Home() {
    const [todos, setTodos] = useState<Item[]>([])
    const [newTodo, setNewTodo] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const data = await getTodos()
                setTodos(data)
            } catch (error) {
                console.error('Failed to fetch todos:', error)
            }
        }
        fetchTodos()
    }, [])

    const handleAddTodo = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newTodo.trim() || isLoading) return

        try {
            setIsLoading(true)
            const createdTodo = await createTodo({ name: newTodo })
            setTodos(prev => [...prev, createdTodo])
            setNewTodo('')
        } catch (error) {
            console.error('Failed to create todo:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleToggleTodo = async (todo: Item) => {
        try {
            const updatedTodo = await updateTodo(todo.id, {
                isCompleted: !todo.isCompleted
            })
            setTodos(prev => prev.map(t =>
                t.id === updatedTodo.id ? updatedTodo : t
            ))
        } catch (error) {
            console.error('Failed to update todo:', error)
        }
    }

    const pendingTodos = todos.filter(todo => !todo.isCompleted)
    const completedTodos = todos.filter(todo => todo.isCompleted)

    return (
        <div className="max-w-[800px] mx-auto px-4 py-8">
            <form onSubmit={handleAddTodo} className="flex gap-2 mb-8">
                <Input
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="할 일을 입력해주세요"
                    className="flex-1"
                    disabled={isLoading}
                />
                <Button variant="primary" type="submit" disabled={isLoading}>
                    + 추가하기
                </Button>
            </form>

            <div className="flex gap-4">
                <div className="flex-1">
                    <div className="inline-block px-4 py-1 bg-[#D1F0BC] rounded-full text-[#137722] font-medium text-sm mb-4">
                        TO DO
                    </div>
                    <div className="space-y-2">
                        {pendingTodos.length === 0 ? (
                            <EmptyState
                                type="todo"
                                message="할 일이 없어요"
                                submessage="TODO를 새로게 추가해주세요!"
                            />
                        ) : (
                            pendingTodos.map(todo => (
                                <TodoItem
                                    key={todo.id}
                                    todo={todo}
                                    onToggle={handleToggleTodo}
                                />
                            ))
                        )}
                    </div>
                </div>

                <div className="flex-1">
                    <div className="inline-block px-4 py-1 bg-[#0F766E] rounded-full text-white font-medium text-sm mb-4">
                        DONE
                    </div>
                    <div className="space-y-2">
                        {completedTodos.length === 0 ? (
                            <EmptyState
                                type="done"
                                message="아직 다 한 일이 없어요"
                                submessage="해야 할 일을 체크해보세요!"
                            />
                        ) : (
                            completedTodos.map(todo => (
                                <TodoItem
                                    key={todo.id}
                                    todo={todo}
                                    onToggle={handleToggleTodo}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}