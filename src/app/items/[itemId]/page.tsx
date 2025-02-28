// src/app/items/[itemId]/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Item } from '@/lib/types'
import { updateTodo, deleteTodo, uploadImage } from '@/lib/api'
import Image from 'next/image'


const TENANT_ID = 'c_todo'
const MAX_IMAGE_SIZE_MB = 5;
const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;
const VALID_FILENAME_REGEX = /^[a-zA-Z0-9._-]+$/;

export default function ItemDetail() {
    const params = useParams()
    const itemId = params?.itemId as string
    const router = useRouter()
    const [item, setItem] = useState<Item | null>(null)
    const [name, setName] = useState('')
    const [memo, setMemo] = useState('')
    const [isCompleted, setIsCompleted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [imageError, setImageError] = useState<string | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    useEffect(() => {
        const fetchItem = async () => {
            try {
                setIsLoading(true)
                const response = await fetch(
                    `https://assignment-todolist-api.vercel.app/api/${TENANT_ID}/items/${itemId}`
                )

                if (!response.ok) {
                    throw new Error('Failed to fetch item')
                }

                const data = await response.json()
                setItem(data)
                setName(data.name)
                setMemo(data.memo || '')
                setIsCompleted(data.isCompleted)
                if (data.imageUrl) {
                    setImagePreview(data.imageUrl)
                }
                setError(null)
            } catch (error) {
                console.error('Failed to fetch item:', error)
                setError('할 일을 불러오는데 실패했습니다.')
            } finally {
                setIsLoading(false)
            }
        }

        if (itemId) {
            fetchItem()
        }
    }, [itemId])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!item || isLoading) return

        try {
            setIsLoading(true)
            await updateTodo(item.id, {
                name,
                memo,
                isCompleted,
            })
            setIsEditing(false)
            router.push('/')
        } catch (error) {
            console.error('Failed to update item:', error)
            setError('할 일을 수정하는데 실패했습니다.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async () => {
        if (!item || isLoading) return

        try {
            setIsLoading(true)
            await deleteTodo(item.id)
            router.push('/')
        } catch (error) {
            console.error('Failed to delete item:', error)
            setError('할 일을 삭제하는데 실패했습니다.')
        }
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file || !item) return

        if (!VALID_FILENAME_REGEX.test(file.name)) {
            setImageError('이미지 파일 이름은 영어로만 이루어져야 합니다.')
            return
        }

        if (file.size > MAX_IMAGE_SIZE_BYTES) {
            setImageError(`이미지 파일 크기는 ${MAX_IMAGE_SIZE_MB}MB 이하여야 합니다.`)
            return
        }

        try {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file)

            setIsLoading(true)
            const imageUrl = await uploadImage(file)
            await updateTodo(item.id, { imageUrl })
            setImageError(null)
        } catch (error) {
            console.error('Failed to upload image:', error)
            setImageError('이미지 업로드에 실패했습니다.')
            setImagePreview(null)
        } finally {
            setIsLoading(false)
        }
    }

    if (isLoading && !item) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="text-center text-slate-500">로딩 중...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-rose-100 text-rose-700 p-4 rounded-lg">
                    {error}
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm">
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <button
                            type="button"
                            onClick={() => setIsCompleted(!isCompleted)}
                            className={`w-5 h-5 rounded-full border flex items-center justify-center
                                ${isCompleted
                                ? 'border-violet-600 bg-violet-600'
                                : 'border-slate-300'}`}
                        >
                            {isCompleted && (
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
                        <div className="flex-1">
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full text-lg px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600"
                                    placeholder="할 일을 입력해주세요"
                                    onBlur={() => setIsEditing(false)}
                                    autoFocus
                                />
                            ) : (
                                <div
                                    onClick={() => setIsEditing(true)}
                                    className="text-lg cursor-pointer hover:bg-slate-50 px-3 py-2 rounded-lg"
                                >
                                    {name || '할 일을 입력해주세요'}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="text-amber-800 font-medium mb-2">Memo</div>
                        <textarea
                            value={memo}
                            onChange={(e) => setMemo(e.target.value)}
                            placeholder="메모를 입력해주세요"
                            className="w-full h-32 p-4 bg-amber-50/30 rounded-lg resize-none focus:outline-none"
                        />
                    </div>

                    <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 mb-6">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            id="imageUpload"
                            className="hidden"
                        />
                        {!imagePreview ? (
                            <label
                                htmlFor="imageUpload"
                                className="flex flex-col items-center justify-center cursor-pointer"
                            >
                                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-2">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M12 4v16m-8-8h16" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </div>
                                <p className="text-slate-400 text-sm">클릭하여 이미지를 업로드하세요</p>
                            </label>
                        ) : (
                            <div className="relative w-full aspect-video">
                                <Image
                                    src={imagePreview}
                                    alt="Uploaded preview"
                                    fill
                                    className="rounded-lg object-cover"
                                />
                                <label
                                    htmlFor="imageUpload"
                                    className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600">
                                        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
                                    </svg>
                                </label>
                            </div>
                        )}
                        {imageError && (
                            <p className="text-rose-500 text-sm mt-2">{imageError}</p>
                        )}
                    </div>
                </div>

                <div className="flex justify-between p-6 border-t border-slate-100">
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="px-6 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600"
                        disabled={isLoading}
                    >
                        삭제하기
                    </button>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => router.push('/')}
                            className="px-6 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
                            disabled={isLoading}
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
                            disabled={isLoading}
                        >
                            수정 완료
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}