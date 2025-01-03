// src/lib/api.ts
import { CreateItemDto, UpdateItemDto, Item } from '@/lib/types'

const TENANT_ID = 'c_todo' // 고유한 tenant ID
const API_BASE = `https://assignment-todolist-api.vercel.app/api/${TENANT_ID}`

export async function getTodos(): Promise<Item[]> {
    const response = await fetch(`${API_BASE}/items`)
    if (!response.ok) {
        throw new Error('Failed to fetch todos')
    }
    return response.json()
}

export async function createTodo(data: CreateItemDto): Promise<Item> {
    const response = await fetch(`${API_BASE}/items`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    if (!response.ok) {
        throw new Error('Failed to create todo')
    }
    return response.json()
}

export async function updateTodo(itemId: string, data: UpdateItemDto): Promise<Item> {
    const response = await fetch(`${API_BASE}/items/${itemId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    if (!response.ok) {
        throw new Error('Failed to update todo')
    }
    return response.json()
}

export async function deleteTodo(itemId: string): Promise<void> {
    const response = await fetch(`${API_BASE}/items/${itemId}`, {
        method: 'DELETE',
    })
    if (!response.ok) {
        throw new Error('Failed to delete todo')
    }
}

// 이미지 업로드 함수 추가
export async function uploadImage(file: File): Promise<string> {
    const formData = new FormData()
    formData.append('image', file)

    const response = await fetch(`${API_BASE}/images/upload`, {
        method: 'POST',
        body: formData,
    })

    if (!response.ok) {
        throw new Error('Failed to upload image')
    }

    const data = await response.json()

    // API 응답에서 URL 추출
    const url = data.imageUrl || data.url || data?.data?.imageUrl || data?.data?.url
    if (!url) {
        throw new Error('No image URL in response')
    }

    return url
}